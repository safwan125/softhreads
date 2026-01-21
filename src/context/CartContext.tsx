'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getToken, getUser } from '@/lib/auth';
import { getCart, addCartItem, updateCartItemQuantum, removeCartItem, clearCartAPI } from '@/lib/cart-api';
import { fetchWooProduct } from '@/lib/wordpress';

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    color: string;
    size: string;
    quantity: number;
    key?: string; // For Woo Cart
    databaseId?: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: { id: string; name: string; price: number; image: string; databaseId?: number }, color: string, size: string, quantity?: number) => void;
    updateQuantity: (index: number, newQuantity: number) => void;
    removeItem: (index: number) => void;
    clearCart: () => void;
    cartCount: number;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartDocumentId, setCartDocumentId] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);



    const initializeCart = useCallback(async () => {
        const token = getToken();
        if (token) {
            console.log('[Cart] User logged in, fetching server cart...');
            try {
                let serverCart = await getCart(token);

                // If cart is null (error state), try to clear it and retry once
                if (!serverCart) {
                    console.warn('[Cart] Server cart corrupted or error, attempting to clear and retry...');
                    await clearCartAPI(token);
                    serverCart = await getCart(token);
                }

                if (serverCart && serverCart.items) {
                    // Transform Server Cart to Local Cart Item format
                    const serverItems: CartItem[] = serverCart.items.map(node => {
                        const productNode = node.product.node;
                        const variationNode = node.variation?.node;

                        // Try to extract color/size from attributes if variation
                        let color = 'Default';
                        let size = 'One Size';

                        if (variationNode?.attributes?.nodes) {
                            variationNode.attributes.nodes.forEach(attr => {
                                if (attr.name.toLowerCase().includes('color')) color = attr.value;
                                if (attr.name.toLowerCase().includes('size')) size = attr.value;
                            });
                        }

                        return {
                            productId: productNode.slug, // We use slug locally
                            name: productNode.name,
                            price: parseFloat(variationNode?.price?.replace(/[^0-9.]/g, '') || productNode.price?.replace(/[^0-9.]/g, '') || '0'),
                            image: productNode.image?.sourceUrl || '/placeholder.png',
                            color,
                            size,
                            quantity: node.quantity,
                            key: node.key, // Store the key for updates/removals!
                            databaseId: productNode.databaseId
                        };
                    });
                    setCartItems(serverItems);
                } else {
                    console.error("[Cart] Critical: Server cart unavailable even after reset. Using local fallback.");
                    // Fallback to local storage or empty?
                    // If we are logged in but server is dead, maybe safer to show nothing or local.
                    // Let's assume empty for safety as we don't want to mix guest/user data if we can't confirm.
                    // Or we could try to load local storage?
                    // For now, empty array is safe.
                }
            } catch (e) {
                console.error("Failed to fetch server cart", e);
            }

            // Fallback / Merge: If server cart is empty (or failed), try to load local storage
            // This ensures meaningful data persists even if server sync is broken.
            const localCartJson = localStorage.getItem('softhreads_cart');
            if (localCartJson) {
                try {
                    const parsed = JSON.parse(localCartJson);
                    const validItems = parsed.filter((item: any) => item.productId);

                    if (validItems.length > 0) {
                        console.log('[Cart] Merging/Using Local Cart due to empty server response.');
                        // If server had items, we might want to merge, but for now, if server is empty, just use local.
                        setCartItems(prev => {
                            if (prev.length === 0) return validItems;
                            return prev; // Keep server items if we got them
                        });

                        // Optional: Try to sync these local items to server now?
                        // validItems.forEach(item => addToCart(...) ) - might cause infinite loop or duplicates if not careful.
                    }
                } catch (e) { }
            }
        } else {
            const localCartJson = localStorage.getItem('softhreads_cart');
            console.log('[Cart] Initializing from local storage.');

            if (localCartJson) {
                try {
                    const parsed = JSON.parse(localCartJson);
                    // Basic validation
                    const validItems = parsed.filter((item: any) =>
                        item.productId &&
                        typeof item.price === 'number' && !isNaN(item.price) &&
                        typeof item.quantity === 'number' && !isNaN(item.quantity)
                    );
                    setCartItems(validItems);
                } catch (e) {
                    console.error("[Cart] Error parsing local cart:", e);
                    setCartItems([]);
                }
            }
        }
        setIsInitialized(true);
    }, []);

    // Initialize Cart on Mount
    useEffect(() => {
        initializeCart();
    }, [initializeCart]);

    // Sync on Change (Local Storage Only for now - Server sync is imperative on action)
    useEffect(() => {
        if (!isInitialized) return;
        localStorage.setItem('softhreads_cart', JSON.stringify(cartItems));
    }, [cartItems, isInitialized]);



    const addToCart = async (product: { id: string; name: string; price: number; image: string; databaseId?: number }, color: string, size: string, quantity: number = 1) => {
        // Optimistic Update
        setCartItems((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.productId === product.id && item.color === color && item.size === size
            );

            if (existingIndex >= 0) {
                const updated = [...prev];
                const existingItem = updated[existingIndex];
                updated[existingIndex] = {
                    ...existingItem,
                    quantity: existingItem.quantity + quantity
                };
                return updated;
            } else {
                return [...prev, {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    color,
                    size,
                    quantity: quantity,
                    databaseId: product.databaseId
                }];
            }
        });

        const token = getToken();
        console.log('[Cart] addToCart detected:', { product, token }); // Debug Log

        if (token && product.databaseId) {
            // Sync to Server
            try {
                console.log('[Cart] Syncing to server...', product.databaseId);
                const res = await addCartItem(product.databaseId, quantity, undefined, token);
                console.log('[Cart] Server Sync Success:', res);
            } catch (e: any) {
                console.error("[Cart] Server sync failed:", e);
                // toast.error("Failed to save to account. Cart is local only.");
                // We don't want to scare the user, but for debugging this is critical.
                // improved logging:
                console.warn("Server Error Details:", JSON.stringify(e, null, 2));
            }
        } else {
            console.log('[Cart] Skipping server sync. Token:', !!token, 'DB ID:', product.databaseId);
        }
    };

    const updateQuantity = async (index: number, newQuantity: number) => {
        // Optimistic Update
        let itemKey: string | undefined;
        setCartItems((prev) => {
            const updated = [...prev];
            updated[index].quantity = newQuantity;
            itemKey = updated[index].key;
            return updated;
        });

        const token = getToken();
        if (token && itemKey) {
            try {
                await updateCartItemQuantum(itemKey, newQuantity, token);
            } catch (e) {
                console.error("Server quantity sync failed", e);
            }
        }
    };

    const removeItem = async (index: number) => {
        let itemKey: string | undefined;
        setCartItems((prev) => {
            const item = prev[index];
            itemKey = item?.key;
            return prev.filter((_, i) => i !== index);
        });

        const token = getToken();
        if (token && itemKey) {
            try {
                await removeCartItem([itemKey], token);
            } catch (e) {
                console.error("Server remove sync failed", e);
            }
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeItem,
                clearCart,
                cartCount,
                refreshCart: initializeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
