export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating: string;
  tag?: string;
  image: string;
  description: string;
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Glow Serum With Rice Water",
    brand: "BEAUTY OF JOSEON",
    category: "SZÉRUM & ESSZENCIA",
    price: "7.890 Ft",
    originalPrice: "9.500 Ft",
    rating: "4.9",
    tag: "BESTSELLER",
    // Unsplash PNG kiemelt kozmetikum kép
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
    description: "Ragyogást adó, mélyen hidratáló szérum rizsfehérjével és niacinamiddal a tiszta üveg-bőrért (Glass Skin).",
  },
  {
    id: 2,
    name: "Snail 96 Mucin Power Essence",
    brand: "COSRX",
    category: "MÉLYHIDRATÁLÁS",
    price: "6.490 Ft",
    rating: "5.0",
    tag: "TRENDING",
    image: "https://images.unsplash.com/photo-1608248597309-f538a8395976?w=600&auto=format&fit=crop&q=80",
    description: "96% csigaesszenciát tartalmazó kultikus koreai bőrápoló, ami újjáépíti a sérült bőrbarriert.",
  },
  {
    id: 3,
    name: "Centella Water Refresh Cleanser",
    brand: "SKIN1004",
    category: "ARCTISZTÍTÁS",
    price: "5.990 Ft",
    originalPrice: "6.990 Ft",
    rating: "4.8",
    tag: "ÚJ",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    description: "Nyugtató habzó arctisztító Ázsiai Gázló kivonattal az érzékeny, gyulladásra hajlamos bőrre.",
  },
  {
    id: 4,
    name: "Water Bank Moisture Cream",
    brand: "LANEIGE",
    category: "ARCKRÉM",
    price: "11.200 Ft",
    rating: "4.9",
    tag: "POPULÁRIS",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80",
    description: "Hialuronsavas feltöltő hidratáló krém, ami 100 órán át megőrzi a bőr nedvességtartalmát.",
  },
];