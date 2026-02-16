"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Ruler } from "lucide-react";

export default function SizeChart() {
    const [unit, setUnit] = useState<"cm" | "in">("cm");

    const data = [
        { size: "S", chest: { cm: 96, in: 38 }, length: { cm: 70, in: 27.5 } },
        { size: "M", chest: { cm: 102, in: 40 }, length: { cm: 72, in: 28.3 } },
        { size: "L", chest: { cm: 108, in: 42.5 }, length: { cm: 74, in: 29.1 } },
        { size: "XL", chest: { cm: 114, in: 45 }, length: { cm: 76, in: 29.9 } },
        { size: "XXL", chest: { cm: 120, in: 47 }, length: { cm: 78, in: 30.7 } },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary gap-1">
                    <Ruler className="w-4 h-4" /> Size Chart
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Size Guide</DialogTitle>
                </DialogHeader>
                <div className="flex justify-end mb-4 gap-2">
                    <Button
                        variant={unit === "cm" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setUnit("cm")}
                        className="rounded-full shadow-neu-sm"
                    >
                        cm
                    </Button>
                    <Button
                        variant={unit === "in" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setUnit("in")}
                        className="rounded-full shadow-neu-sm"
                    >
                        in
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Size</TableHead>
                            <TableHead>Chest ({unit})</TableHead>
                            <TableHead>Length ({unit})</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.size}>
                                <TableCell className="font-medium">{row.size}</TableCell>
                                <TableCell>{row.chest[unit]}</TableCell>
                                <TableCell>{row.length[unit]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
}
