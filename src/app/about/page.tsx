export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8 lg:py-16 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">About Softhreads</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                Welcome to Softhreads, where style meets comfort. Born in the heart of Kerala, we are dedicated to providing premium quality clothing that doesn't compromise on elegance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Our Mission</h2>
                    <p className="text-muted-foreground">
                        To revolutionize the way you dress by offering a curated collection of apparel that blends modern aesthetics with traditional values of quality and durability.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Our Vision</h2>
                    <p className="text-muted-foreground">
                        To become a leading fashion destination known for our commitment to customer satisfaction and sustainable fashion practices.
                    </p>
                </div>
            </div>

            <div className="mt-16 bg-secondary/20 p-8 rounded-2xl shadow-neu-inner">
                <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
                <p className="text-muted-foreground">
                    050, Chamavila Kizhakkathil, Kampalady,<br />
                    Poruvazhy P.O, Kunnathur,<br />
                    Kollam, Kerala 690520
                </p>
                <p className="mt-4 font-medium text-lg">+91 9048360561</p>
                <p className="text-primary">support@softhreads.com</p>
            </div>
        </div>
    );
}
