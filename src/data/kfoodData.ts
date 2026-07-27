export interface KFoodItem {
  id: string;
  title: string;
  category: string;
  image: string;
  time: string;
  spiciness?: string;
  tagline: string;
  tags: string[];
  featured?: boolean;
  size: "large" | "medium" | "small";
  link?: string; // <-- Opcionális mező a közvetlen cikk/aloldal hivatkozásnak
}

export const KFOOD_ITEMS: KFoodItem[] = [
  {
    id: "tteokbokki",
    title: "Tteokbokki",
    category: "Street Food",
    image: "/images/kfood/tteokbokki.webp",
    time: "20 perc",
    spiciness: "🌶️🌶️",
    tagline: "A koreai utca elmaradhatatlan, csípős-édes rizslepény ínyencsége.",
    tags: ["#StreetFood", "#Popular", "#Spicy"],
    featured: true,
    size: "large",
    // link: "/k-food/tteokbokki", // Un-commenteld, ha elkészül a dedikált cikk!
  },
  {
    id: "bibimbap",
    title: "Bibimbap",
    category: "Tradicionális",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=800&q=80",
    time: "35 perc",
    tagline: "Szimfónia egy tálban: friss zöldségek, marhahús és fermentált gochujang.",
    tags: ["#Healthy", "#Classic"],
    size: "medium",
    // link: "/k-food/bibimbap",
  },
  {
    id: "bingsu",
    title: "K-Desszertek & Bingsu",
    category: "Desszert & Kávézó",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    time: "10 perc",
    tagline: "Pihe-puha tejes borotvált jég édes babbal, gyümölcsökkel és matcha öntettel.",
    tags: ["#Dessert", "#Sweet"],
    size: "small",
    // link: "/k-food/bingsu",
  },
  {
    id: "soju-culture",
    title: "Soju & Koreai Italok",
    category: "Italkultúra",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    time: "Klasszikus",
    tagline: "A híres zöld üveges soju, makgeolli és a koreai koccintási etikett.",
    tags: ["#Nightlife", "#SojuCulture"],
    size: "small",
    // link: "/k-food/soju-culture",
  },
];