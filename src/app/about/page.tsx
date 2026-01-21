import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            {/* Hero Section */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h1 className="text-5xl font-bold mb-6">Redefining Comfort</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Softhreads was born from a simple idea: that clothes should feel as good as they look.
                    We believe in the perfect balance of premium aesthetics and uncompromising comfort.
                </p>
            </div>

            {/* Mission Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                    {/* Placeholder for About Image - Using Unsplash if possible or gray box */}
                    <Image
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000"
                        alt="Our Studio"
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-muted-foreground mb-6">
                        We are on a mission to create the world's most comfortable wardrobe staples.
                        By sourcing the finest organic cottons and sustainable blends, we engineer fabrics that breathe, stretch, and move with you.
                    </p>
                    <p className="text-muted-foreground mb-8">
                        Every stitch is considered, every seam reinforced. We reject fast fashion in favor of timeless pieces designed to last for years, not just seasons.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/shop">Explore Our Collection</Link>
                    </Button>
                </div>
            </div>

            {/* Material Quality Section */}
            <div className="bg-muted/50 rounded-3xl p-12 mb-24">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold mb-4">Material Quality</h2>
                    <p className="text-muted-foreground">
                        The difference is in the touch. We obsess over fabric so you don't have to.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-background p-8 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-3">100% Organic Cotton</h3>
                        <p className="text-muted-foreground text-sm">
                            Grown without harmful chemicals, our cotton is softer, safer, and better for the planet.
                        </p>
                    </div>
                    <div className="bg-background p-8 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-3">Ethical Production</h3>
                        <p className="text-muted-foreground text-sm">
                            We partner with factories that pay fair wages and ensure safe working conditions.
                        </p>
                    </div>
                    <div className="bg-background p-8 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-3">Pre-Shrunk</h3>
                        <p className="text-muted-foreground text-sm">
                            Our garments are pre-washed and treated to minimize shrinkage, ensuring the perfect fit stays perfect.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
