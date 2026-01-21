'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { loginUser, setToken, setUser } from '@/lib/auth';
import { toast } from 'sonner';

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await loginUser(identifier, password);
            setToken(data.jwt);
            setUser(data.user);

            toast.success('Welcome back!');
            router.push('/');
            router.refresh();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Back Button */}
            <div className="absolute top-8 left-8 z-50">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium transition-colors hover:text-primary bg-background/70 backdrop-blur-md px-4 py-2 rounded-full hover:bg-background/90"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Store
                </Link>
            </div>

            {/* Hero Side */}
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-black/20" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="relative z-20 flex items-center text-lg font-medium">
                    <span className="mr-2 text-2xl font-bold tracking-tight">softhreads</span>
                </div>

                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-xl font-light italic">
                            &ldquo;Fashion is about dressing according to what's fashionable. Style is more about being yourself.&rdquo;
                        </p>
                        <footer className="text-sm font-medium tracking-wide">
                            Oscar de la Renta
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Login Form Side */}
            <div className="lg:p-8 flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                        <p className="text-muted-foreground">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <Card className="relative rounded-3xl border border-border/60 bg-background/80 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden">
                        <CardHeader className="pb-0" />

                        <CardContent className="px-8 pt-8 pb-6">
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email or Username</Label>
                                        <Input
                                            id="email"
                                            type="text"
                                            placeholder="m@example.com"
                                            required
                                            value={identifier}
                                            onChange={(e) => setIdentifier(e.target.value)}
                                            className="h-11 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/40 transition"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            <Link
                                                href="#"
                                                className="text-sm text-primary hover:underline font-medium"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="h-11 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/40 transition"
                                        />
                                    </div>

                                    <Button
                                        className="w-full h-11 rounded-xl text-base font-medium transition-all hover:shadow-md active:scale-[0.98]"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Sign In
                                    </Button>
                                </div>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-5 border-t bg-muted/20 px-8 pb-8 pt-6">
                            <p className="text-center text-sm text-muted-foreground w-full">
                                Don&apos;t have an account?{' '}
                                <Link
                                    href="/signup"
                                    className="underline underline-offset-4 hover:text-primary font-medium"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
