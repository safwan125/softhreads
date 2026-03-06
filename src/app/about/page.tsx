import { ShieldCheck, Cloud, RefreshCw, Clock } from "lucide-react";

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-secondary/10 py-16 md:py-24 rounded-3xl shadow-neu-inset mx-4 mb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-serif">About Softhreads</h1>
                    <p className="max-w-2xl mx-auto text-lg text-black leading-relaxed">
                        Welcome to Softhreads, where style meets comfort. Born in the heart of Kerala, we are dedicated to providing premium quality clothing that doesn't compromise on elegance.
                    </p>
                </div>
            </section>

            {/* Mission & Vision Grid */}
            <section className="container mx-auto px-4 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Mission */}
                    <div className="bg-bg rounded-neu p-8 shadow-neu hover:shadow-neu-sm transition-all duration-300 border border-white/20">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-primary font-serif">Our Mission</h2>
                        </div>
                        <p className="text-black leading-relaxed">
                            To revolutionize the way you dress by offering a curated collection of apparel that blends modern aesthetics with traditional values of quality and durability.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-bg rounded-neu p-8 shadow-neu hover:shadow-neu-sm transition-all duration-300 border border-white/20">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-primary font-serif">Our Vision</h2>
                        </div>
                        <p className="text-black leading-relaxed">
                            To become a leading fashion destination known for our commitment to customer satisfaction and sustainable fashion practices.
                        </p>
                    </div>
                </div>
            </section>

            {/* Promise Section */}
            <section className="bg-[#78866B] text-white py-20 rounded-3xl mx-4 mb-20 shadow-neu-inset">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">Our Commitment</span>
                        <h2 className="text-3xl md:text-5xl font-serif mt-4 font-medium">The SOFTHREADS Promise</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8 max-w-4xl mx-auto">
                        {/* Item 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6">
                                <ShieldCheck className="w-7 h-7 text-white/80" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-medium mb-3 font-serif tracking-wide">No Shrinkage</h3>
                            <p className="text-white/50 tracking-wide text-sm">Pre-washed for perfect fit</p>
                        </div>
                        {/* Item 2 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6">
                                <Cloud className="w-7 h-7 text-white/80" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-medium mb-3 font-serif tracking-wide">Breathable Fit</h3>
                            <p className="text-white/50 tracking-wide text-sm">Natural airflow technology</p>
                        </div>
                        {/* Item 3 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6">
                                <RefreshCw className="w-7 h-7 text-white/80" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-medium mb-3 font-serif tracking-wide">Anti-Pilling</h3>
                            <p className="text-white/50 tracking-wide text-sm">Smooth texture that lasts</p>
                        </div>
                        {/* Item 4 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6">
                                <Clock className="w-7 h-7 text-white/80" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-medium mb-3 font-serif tracking-wide">Long-Wear Softness</h3>
                            <p className="text-white/50 tracking-wide text-sm">Gets softer with every wash</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-bg py-16 mb-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary text-center mb-12 font-serif">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-2xl hover:bg-white/50 transition-colors">
                            <h3 className="text-xl font-bold text-primary mb-2 font-serif">Passion for Quality</h3>
                            <p className="text-secondary">Every thread is chosen with care to ensure lasting comfort.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl hover:bg-white/50 transition-colors">
                            <h3 className="text-xl font-bold text-primary mb-2 font-serif">Sustainable Practices</h3>
                            <p className="text-secondary">We believe in fashion that respects the planet.</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl hover:bg-white/50 transition-colors">
                            <h3 className="text-xl font-bold text-primary mb-2 font-serif">Community First</h3>
                            <p className="text-secondary">Building a community of conscious, stylish individuals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map / Visit Us Section */}
            <section className="bg-secondary/5 py-16 rounded-t-3xl shadow-neu-inner">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-8 font-serif">Visit Us</h2>
                    <div className="bg-bg p-8 rounded-neu shadow-neu max-w-2xl mx-auto border border-white/20">
                        <p className="text-lg text-primary font-medium mb-2">Softhreads HeadQuarters</p>
                        <p className="text-secondary mb-6">
                            050, Chamavila Kizhakkathil, Kampaladi<br />
                            Poruvazhy P.O, Kunnathur<br />
                            Kollam, Kerala 690520<br />
                            India
                        </p>
                        <div className="flex justify-center gap-4">
                            {/* <Button className="shadow-neu-sm hover:shadow-neu-pressed bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
                          Get Directions
                      </Button> */} {/* Assuming Button is a component */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
