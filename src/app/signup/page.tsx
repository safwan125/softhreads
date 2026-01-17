'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { registerUser, setToken, setUser } from '@/lib/auth';
import { toast } from 'sonner';

export default function Signup() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await registerUser(username, email, password);
            // Save token and user
            setToken(data.jwt);
            setUser(data.user);

            toast.success('Account created successfully!');
            router.push('/'); // Redirect to home
            router.refresh();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Back Button */}
            <div className="absolute top-8 left-8 z-50">
                <Link href="/" className="inline-flex items-center text-sm font-medium transition-colors hover:text-primary bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-background/80">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Store
                </Link>
            </div>

            {/* Hero Side */}
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-black/20" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="relative z-20 flex items-center text-lg font-medium">
                    <span className="mr-2 text-2xl font-bold tracking-tight">softhreads</span>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-xl font-light italic">
                            &ldquo;Style is a way to say who you are without having to speak.&rdquo;
                        </p>
                        <footer className="text-sm font-medium tracking-wide">Rachel Zoe</footer>
                    </blockquote>
                </div>
            </div>

            {/* Signup Form Side */}
            <div className="lg:p-8 flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                        <p className="text-muted-foreground">
                            Enter your details to get started
                        </p>
                    </div>

                    <Card className="border shadow-lg rounded-2xl overflow-hidden p-2">
                        <CardHeader className="space-y-1">
                            {/* Optional Header Content */}
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="johndoe"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="rounded-xl h-11"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="rounded-xl h-11"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="rounded-xl h-11"
                                        />
                                    </div>
                                    <Button className="w-full rounded-xl h-11 text-base" type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Create Account
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 bg-muted/30 pb-6 pt-2 rounded-xl">
                            <p className="px-8 text-center text-sm text-muted-foreground mt-2">
                                Already have an account?{" "}
                                <Link href="/login" className="underline underline-offset-4 hover:text-primary font-medium">
                                    Login
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
