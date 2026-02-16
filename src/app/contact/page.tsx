import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <h1 className="text-4xl font-bold text-center mb-12 text-primary">Get in Touch</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-bg p-8 rounded-2xl shadow-neu">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-accent" /> Email Us
                        </h3>
                        <p className="text-secondary">support@softhreads.com</p>
                        <p className="text-secondary">sales@softhreads.com</p>
                    </div>

                    <div className="bg-bg p-8 rounded-2xl shadow-neu">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-accent" /> Call Us
                        </h3>
                        <p className="text-secondary">+91 9048360561</p>
                        <p className="text-secondary text-sm">Mon-Fri: 9am - 6pm EST</p>
                    </div>

                    <div className="bg-bg p-8 rounded-2xl shadow-neu">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-accent" /> Visit Us
                        </h3>
                        <p className="text-secondary">
                            050, Chamavila Kizhakkathil,<br />
                            Kampalady, Poruvazhy P.O,<br />
                            Kollam, Kerala 690520
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-bg p-8 rounded-2xl shadow-neu">
                    <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-secondary">First Name</label>
                                <Input className="bg-bg border-none shadow-neu-inset" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-secondary">Last Name</label>
                                <Input className="bg-bg border-none shadow-neu-inset" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Email</label>
                            <Input type="email" className="bg-bg border-none shadow-neu-inset" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Message</label>
                            <textarea
                                className="w-full min-h-[150px] p-3 rounded-xl bg-bg border-none shadow-neu-inset focus:outline-none focus:ring-1 focus:ring-accent resize-y"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>
                        <Button className="w-full h-12 rounded-xl text-lg font-medium shadow-neu active:shadow-neu-inset bg-primary text-white hover:bg-primary/90 transition-all">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div >
        </div >
    );
}
