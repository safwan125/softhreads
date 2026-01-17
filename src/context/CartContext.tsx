'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getToken, getUser } from '@/lib/auth';
import { fetchAPI } from '@/lib/strapi';

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    color: string;
    size: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: { id: string; name: string; price: number; image: string }, color: string, size: string) => void;
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
        const user = getUser();
        const localCartJson = localStorage.getItem('softhreads_cart');
        console.log('[Cart] Initializing. Token:', !!token, 'User:', user?.id);

        let localItems: CartItem[] = [];

        if (localCartJson) {
            try {
                const parsed = JSON.parse(localCartJson);
                localItems = parsed.filter((item: any) =>
                    item.productId &&
                    typeof item.price === 'number' && !isNaN(item.price) &&
                    typeof item.quantity === 'number' && !isNaN(item.quantity)
                );
                console.log('[Cart] Found local items:', localItems.length);
            } catch (e) {
                console.error("Failed to parse local cart", e);
            }
        }

        if (token && user) {
            // Logged In: Fetch Remote Cart
            try {
                console.log('[Cart] Fetching remote cart for user:', user.id);
                const res = await fetchAPI('/carts', {
                    filters: { user: { id: { $eq: user.id } } },
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res && res.data && res.data.length > 0) {
                    const remoteCart = res.data[0];
                    const remoteItems = remoteCart.items || [];
                    console.log('[Cart] Remote cart found:', remoteCart.documentId, 'Items:', remoteItems.length);
                    setCartDocumentId(remoteCart.documentId);

                    let finalItems = [...remoteItems];

                    // Identify items that are in local but NOT in remote
                    const uniqueLocalItems = localItems.filter(lItem =>
                        !remoteItems.some((rItem: any) =>
                            rItem.productId === lItem.productId &&
                            rItem.color === lItem.color &&
                            rItem.size === lItem.size
                        )
                    );

                    if (uniqueLocalItems.length > 0) {
                        console.log('[Cart] Merging local items:', uniqueLocalItems.length);
                        finalItems = [...remoteItems, ...uniqueLocalItems];
                    }

                } else {
                    console.log('[Cart] No remote cart found. Using local items.');
                    setCartItems(localItems);
                }
            } catch (error) {
                console.error("Error fetching remote cart:", error);
                setCartItems(localItems);
            }
        } else {
            console.log('[Cart] Guest mode. Using local storage.');
            setCartItems(localItems);
        }
        setIsInitialized(true);
    }, []);

    // Initial Load
    useEffect(() => {
        initializeCart();
    }, [initializeCart]);

    // Sync on Change
    useEffect(() => {
        if (!isInitialized) return;

        // ALWAYS save to local storage as a backup/cache for speed
        localStorage.setItem('softhreads_cart', JSON.stringify(cartItems));

        const token = getToken();
        const user = getUser();
        console.log('[Cart] Sync effect triggered. Items:', cartItems.length, 'Token:', !!token);

        if (token && user) {
            // Sync to Backend
            const syncToBackend = async () => {
                try {
                    console.log('[Cart] Syncing to backend...');
                    if (cartDocumentId) {
                        await fetchAPI(`/carts/${cartDocumentId}`, {}, {
                            method: 'PUT',
                            headers: { Authorization: `Bearer ${token}` },
                            body: JSON.stringify({
                                data: {
                                    items: cartItems
                                }
                            })
                        });
                        console.log('[Cart] Sync update success.');
                    } else {
                        const res = await fetchAPI('/carts', {}, {
                            method: 'POST',
                            headers: { Authorization: `Bearer ${token}` },
                            body: JSON.stringify({
                                data: {
                                    user: user.id, // Link to user
                                    items: cartItems
                                }
                            })
                        });

                        if (res && res.data) {
                            setCartDocumentId(res.data.documentId);
                            console.log('[Cart] Sync create success. New ID:', res.data.documentId);
                        }
                    }
                } catch (error) {
                    console.error("Failed to sync cart to backend", error);
                }
            };

            const timeout = setTimeout(syncToBackend, 500);
            return () => clearTimeout(timeout);
        }
    }, [cartItems, isInitialized, cartDocumentId]);

    const addToCart = (product: { id: string; name: string; price: number; image: string }, color: string, size: string) => {
        setCartItems((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.productId === product.id && item.color === color && item.size === size
            );

            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex].quantity += 1;
                return updated;
            } else {
                return [...prev, {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    color,
                    size,
                    quantity: 1
                }];
            }
        });
    };

    const updateQuantity = (index: number, newQuantity: number) => {
        setCartItems((prev) => {
            const updated = [...prev];
            updated[index].quantity = newQuantity;
            return updated;
        });
    };

    const removeItem = (index: number) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
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
