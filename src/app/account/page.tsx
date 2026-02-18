"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const { user, logout, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login"); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, router]);

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const orders = user.orders?.edges.map(edge => edge.node) || [];

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar / Profile Card */}
                <div className="w-full md:w-1/3 space-y-6">
                    <Card className="shadow-neu-md border-none bg-background">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center shadow-neu-inner">
                                    <span className="text-2xl font-bold text-primary">{user.firstName ? user.firstName[0] : "U"}</span>
                                </div>
                                <div>
                                    <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="h-px bg-secondary my-2" />
                            <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
                                <LogOut className="w-4 h-4" /> Sign Out
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="w-full md:w-2/3 space-y-6">
                    <h2 className="text-2xl font-bold font-serif">Order History</h2>
                    <div className="space-y-4">
                        {orders.length === 0 ? (
                            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                        ) : (
                            orders.map((order) => (
                                <Card key={order.id} className="shadow-neu-sm border-none bg-background hover:shadow-neu-md transition-all">
                                    <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold font-serif">Order #{order.orderNumber}</h3>
                                            <p className="text-sm text-muted-foreground">{new Date(order.processedAt).toLocaleDateString()}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {order.lineItems.edges.map(e => `${e.node.title} x${e.node.quantity}`).join(", ")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">{order.totalPrice.currencyCode} {parseFloat(order.totalPrice.amount).toLocaleString()}</p>
                                            <div className="flex gap-2 justify-end mt-1">
                                                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/30 text-foreground">
                                                    {order.financialStatus}
                                                </span>
                                                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/30 text-foreground">
                                                    {order.fulfillmentStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
