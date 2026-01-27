
export interface Review {
    id: string;
    productId: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
}

export const reviews: Review[] = [
    {
        id: 'r1',
        productId: '1',
        author: 'Sarah M.',
        rating: 5,
        date: '2026-01-10',
        comment: 'Perfect fit and amazing quality! The fabric feels so soft and the white color is exactly as shown. Highly recommend!',
    },
    {
        id: 'r2',
        productId: '1',
        author: 'James K.',
        rating: 4,
        date: '2026-01-08',
        comment: 'Great basic tee. Runs slightly large so consider sizing down if you want a fitted look.',
    },
    {
        id: 'r3',
        productId: '1',
        author: 'Emily R.',
        rating: 5,
        date: '2026-01-05',
        comment: 'Love this! Bought three in different colors. The quality is outstanding for the price.',
    },
    {
        id: 'r4',
        productId: '2',
        author: 'Michael T.',
        rating: 5,
        date: '2026-01-09',
        comment: 'Most comfortable hoodie I own. The fleece is incredibly soft and it keeps me warm without being too heavy.',
    },
    {
        id: 'r5',
        productId: '2',
        author: 'Lisa P.',
        rating: 4,
        date: '2026-01-07',
        comment: 'Love the fit and the quality. Only wish it came in more color options!',
    },
    {
        id: 'r6',
        productId: '3',
        author: 'David L.',
        rating: 5,
        date: '2026-01-11',
        comment: 'These jeans are fantastic! The stretch denim is comfortable and the fit is perfect. Worth every penny.',
    },
    {
        id: 'r7',
        productId: '3',
        author: 'Rachel N.',
        rating: 5,
        date: '2026-01-06',
        comment: 'Finally found the perfect jeans! They fit like a glove and the quality is exceptional.',
    },
];
