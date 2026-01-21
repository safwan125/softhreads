
export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White Tee',
    price: 45,
    salePrice: 35,
    category: 'T-Shirts',
    description: 'Premium cotton essential tee',
    longDescription: 'Crafted from 100% organic cotton, this classic white tee is a wardrobe essential. Features a relaxed fit with reinforced seams for durability. Perfect for layering or wearing on its own.',
    image: 'https://images.unsplash.com/photo-1729864210127-0c0dc835dd78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMGFwcGFyZWx8ZW58MXx8fHwxNzY4Mjc1NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#9CA3AF' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Comfort Hoodie',
    price: 89,
    category: 'Hoodies',
    description: 'Soft fleece hoodie for everyday wear',
    longDescription: 'Stay cozy in our premium fleece hoodie. Features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Made with soft, sustainable materials for ultimate comfort.',
    image: 'https://images.unsplash.com/photo-1588011025378-15f4778d2558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMHN0cmVldHdlYXJ8ZW58MXx8fHwxNzY4Mjc2OTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#1E3A8A' },
      { name: 'Forest', hex: '#3E4437' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Slim Fit Denim',
    price: 120,
    salePrice: 95,
    category: 'Jeans',
    description: 'Classic slim fit jeans',
    longDescription: 'These slim fit jeans offer the perfect balance of style and comfort. Made from premium stretch denim with a modern cut that flatters all body types. Features classic five-pocket styling.',
    image: 'https://images.unsplash.com/photo-1602585198422-d795fa9bfd6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjgyNTQ5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: [
      { name: 'Dark Blue', hex: '#1E3A8A' },
      { name: 'Light Blue', hex: '#60A5FA' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Cozy Knit Sweater',
    price: 95,
    category: 'Sweaters',
    description: 'Chunky knit sweater',
    longDescription: 'Embrace comfort with this chunky knit sweater. Perfect for layering during cooler months. Features a crew neck design and relaxed fit. Made from a soft wool blend.',
    image: 'https://images.unsplash.com/photo-1633008004964-730029021e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdGVyJTIwa25pdHdlYXJ8ZW58MXx8fHwxNzY4MjQzNjgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: [
      { name: 'Cream', hex: '#F5F5DC' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Burgundy', hex: '#800020' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Premium Jacket',
    price: 189,
    category: 'Jackets',
    description: 'Versatile all-season jacket',
    longDescription: 'A versatile jacket designed for all seasons. Water-resistant exterior with a soft interior lining. Multiple pockets for functionality. Perfect for both casual and smart-casual looks.',
    image: 'https://images.unsplash.com/photo-1727518154538-59e7dc479f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWNrZXQlMjBvdXRlcndlYXJ8ZW58MXx8fHwxNzY4MjQzNjgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: [
      { name: 'Olive', hex: '#3E4437' },
      { name: 'Black', hex: '#000000' },
      { name: 'Tan', hex: '#D2B48C' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true,
  },
  {
    id: '6',
    name: 'Summer Dress',
    price: 75,
    category: 'Dresses',
    description: 'Lightweight summer dress',
    longDescription: 'Flow through summer in this lightweight dress. Made from breathable cotton with a flattering silhouette. Features an adjustable waist tie and side pockets.',
    image: 'https://images.unsplash.com/photo-1760124146284-0720713f0311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBkcmVzcyUyMGNsb3RoaW5nfGVufDF8fHx8MTc2ODIxNjkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: [
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Coral', hex: '#FF7F50' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false,
  },
  {
    id: '7',
    name: 'Casual Button-Up',
    price: 65,
    category: 'Shirts',
    description: 'Classic casual shirt',
    longDescription: 'A timeless button-up shirt for any occasion. Made from breathable cotton with a modern fit. Roll up the sleeves for a relaxed look or keep them down for a polished appearance.',
    image: 'https://images.unsplash.com/photo-1657405592096-0eb9199a8634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzaGlydCUyMGZhc2hpb258ZW58MXx8fHwxNzY4MTYwNTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Pink', hex: '#FFB6C1' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: false,
  },
  {
    id: '8',
    name: 'Athletic Wear Set',
    price: 110,
    salePrice: 88,
    category: 'Activewear',
    description: 'Complete activewear set',
    longDescription: 'High-performance activewear designed for your workout. Moisture-wicking fabric keeps you dry and comfortable. Includes matching top and bottom with four-way stretch.',
    image: 'https://images.unsplash.com/photo-1679768763201-e07480531b49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdlYXIlMjBzcG9ydHN3ZWFyfGVufDF8fHx8MTc2ODI3Njk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#1E3A8A' },
      { name: 'Gray', hex: '#6B7280' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
  },
  {
    id: '9',
    name: 'Winter Coat',
    price: 249,
    category: 'Outerwear',
    description: 'Warm winter coat',
    longDescription: 'Stay warm all winter long with this insulated coat. Features a removable hood, multiple zippered pockets, and a water-resistant outer shell. Filled with premium down alternative.',
    image: 'https://images.unsplash.com/photo-1768134152610-27355e256513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBjb2F0JTIwZmFzaGlvbnxlbnwxfHx8fDE3NjgyNTA1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#1E3A8A' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: false,
  },
  {
    id: '10',
    name: 'Minimalist Outfit',
    price: 135,
    category: 'Sets',
    description: 'Complete minimalist set',
    longDescription: 'Embrace simplicity with this minimalist outfit set. Includes coordinated pieces that can be worn together or separately. Made from sustainable fabrics with clean lines and modern design.',
    image: 'https://images.unsplash.com/photo-1507297448044-a99b358cd06e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwY2xvdGhpbmclMjBmYXNoaW9ufGVufDF8fHx8MTc2ODI3Njk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: [
      { name: 'Beige', hex: '#F5F5DC' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false,
  },
];

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
