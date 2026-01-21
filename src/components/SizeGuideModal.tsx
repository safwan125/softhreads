'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";

export function SizeGuideModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground hover:text-primary">
                    <Ruler className="w-3 h-3 mr-1" />
                    Size Guide
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Size Guide</DialogTitle>
                    <DialogDescription>
                        Measurements are in inches. Use this chart to find your perfect fit.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    <h3 className="font-semibold mb-2">T-Shirts & Tops</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-2 text-left">Size</th>
                                    <th className="p-2 text-left">Chest</th>
                                    <th className="p-2 text-left">Length</th>
                                    <th className="p-2 text-left">Shoulder</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-2 font-medium">XS</td>
                                    <td className="p-2">34-36</td>
                                    <td className="p-2">27</td>
                                    <td className="p-2">16.5</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-2 font-medium">S</td>
                                    <td className="p-2">36-38</td>
                                    <td className="p-2">28</td>
                                    <td className="p-2">17</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-2 font-medium">M</td>
                                    <td className="p-2">38-40</td>
                                    <td className="p-2">29</td>
                                    <td className="p-2">18</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-2 font-medium">L</td>
                                    <td className="p-2">40-42</td>
                                    <td className="p-2">30</td>
                                    <td className="p-2">19</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-2 font-medium">XL</td>
                                    <td className="p-2">42-44</td>
                                    <td className="p-2">31</td>
                                    <td className="p-2">20</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="font-semibold mt-6 mb-2">Jeans & Bottoms</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-2 text-left">Size</th>
                                    <th className="p-2 text-left">Waist</th>
                                    <th className="p-2 text-left">Inseam</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-2 font-medium">28</td>
                                    <td className="p-2">28-29</td>
                                    <td className="p-2">30</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-2 font-medium">30</td>
                                    <td className="p-2">30-31</td>
                                    <td className="p-2">31</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-2 font-medium">32</td>
                                    <td className="p-2">32-33</td>
                                    <td className="p-2">32</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-2 font-medium">34</td>
                                    <td className="p-2">34-35</td>
                                    <td className="p-2">32</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
