import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function SizeChartSection() {
    return (
        <div className="mt-12 mb-12 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-6">Size Guide</h2>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Size</TableHead>
                            <TableHead>Chest (in)</TableHead>
                            <TableHead>Waist (in)</TableHead>
                            <TableHead>Length (in)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">XS</TableCell>
                            <TableCell>34-36</TableCell>
                            <TableCell>28-30</TableCell>
                            <TableCell>27</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">S</TableCell>
                            <TableCell>36-38</TableCell>
                            <TableCell>30-32</TableCell>
                            <TableCell>28</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">M</TableCell>
                            <TableCell>38-40</TableCell>
                            <TableCell>32-34</TableCell>
                            <TableCell>29</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">L</TableCell>
                            <TableCell>40-42</TableCell>
                            <TableCell>34-36</TableCell>
                            <TableCell>30</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">XL</TableCell>
                            <TableCell>42-44</TableCell>
                            <TableCell>36-38</TableCell>
                            <TableCell>31</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">XXL</TableCell>
                            <TableCell>44-46</TableCell>
                            <TableCell>38-40</TableCell>
                            <TableCell>32</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
                * Measurements are in inches. Fits may vary by style.
            </p>
        </div>
    )
}
