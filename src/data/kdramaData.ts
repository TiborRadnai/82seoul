export interface CastMember {
  name: string;
  role?: string;
  image: string;
}

export interface KDramaItem {
  id: number;
  title: string;
  originalTitle?: string;
  rating: string;
  category: string;
  year?: string;
  episodes?: string;
  cast?: CastMember[];
  description: string;
  fullDescription?: string;
  image: string;
}

export const DRAMA_SLIDES: KDramaItem[] = [
  {
    id: 1,
    title: "Can This Love Be Translated?",
    originalTitle: "이 사랑 통역 되나요?",
    rating: "4.9",
    category: "NETFLIX DRAMA",
    year: "2024",
    episodes: "10 Epizód",
    cast: [
      { name: "Kim Seon-ho", role: "Ju Ho-jin", image: "/images/cast/kim-seon-ho.webp" },
      { name: "Go Youn-jung", role: "Cha Mu-hee", image: "/images/cast/go-youn-jung.webp" },
    ],
    description: "Egy több nyelven beszélő tolmács és egy feltörekvő színésznő szellemes, mégis mély félreértésekkel teli szerelmi története.",
    fullDescription: "A sorozat Ju Ho-jin, a zseniális poliglott tolmács és Cha Mu-hee, a sziporkázó globális sztár kapcsolatát követi nyomon. Bár a szavak szintjén mindent megértenek, a szerelem nyelve gyakran félreértésekhez és komikus, szívhez szóló pillanatokhoz vezet.",
    image: "/images/kdrama/can-this-love-be-translated.webp",
  },
  {
    id: 2,
    title: "Alchemy of Souls",
    originalTitle: "환혼",
    rating: "5.0",
    category: "NETFLIX FANTASY",
    year: "2022-2023",
    episodes: "30 Epizód",
    cast: [
      { name: "Lee Jae-wook", role: "Jang Uk", image: "/images/cast/lee-jae-wook.webp" },
      { name: "Jung So-min", role: "Mu-deok", image: "/images/cast/jung-so-min.webp" },
      { name: "Go Youn-jung", role: "Nak-su", image: "/images/cast/go-youn-jung.webp" },
    ],
    description: "Varázslat, lélekeltolódás és végzetes szerelem Daeho fiktív birodalmában – a modern K-Fantasy csúcsa.",
    fullDescription: "Egy varázslatos országban játszódó történet, ahol a mágusok sorsát megváltoztatja a 'hwanhonso' (a lelkek cseréje). Egy elit bérgyilkos lelke egy vak szolgálólány testébe szorul, aki egy nemesi család elkényeztetett, de titokzatos urának mestere lesz.",
    image: "/images/kdrama/alchemy-of-souls.webp",
  },
  {
    id: 3,
    title: "Love Next Door",
    originalTitle: "엄마친구아들",
    rating: "4.8",
    category: "NETFLIX ROM-COM",
    year: "2024",
    episodes: "16 Epizód",
    cast: [
      { name: "Jung Hae-in", role: "Choi Seung-hyo", image: "/images/cast/jung-hae-in.webp" },
      { name: "Jung So-min", role: "Baek Seok-ryu", image: "/images/cast/jung-so-min.webp" },
    ],
    description: "A gyerekkori barátokból lett felnőttek káosza és újraegymásra találása – édes, vicces és nagyon szerethető.",
    fullDescription: "Baek Seok-ryu próbálja újrakezdeni elrontottnak hitt életét, miután visszatér Koreába. Újra találkozik gyerekkori barátjával, Choi Seung-hyóval, a sikeres fiatal építésszel, akivel közös múltjuk tele van kínos és elfeledhetetlen emlékekkel.",
    image: "/images/kdrama/love-next-door.webp",
  },
  {
    id: 4,
    title: "Resident Playbook",
    originalTitle: "언젠가는 슬기로운 전공의생활",
    rating: "4.9",
    category: "NETFLIX MEDICAL",
    year: "2024",
    episodes: "12 Epizód",
    cast: [
      { name: "Go Youn-jung", role: "Oh Yi-young", image: "/images/cast/go-youn-jung.webp" },
      { name: "Shin Si-ah", role: "Pyo Nam-kyung", image: "/images/cast/shin-si-ah.webp" },
      { name: "Kang You-seok", role: "Uhm Jae-min", image: "/images/cast/kang-you-seok.webp" },
    ],
    description: "A Hospital Playlist univerzum legújabb gyöngyszeme: fiatal szülész-nőgyógyász rezidensek kendőzetlen hétköznapjai.",
    fullDescription: "A Yulje Onkölógiai és Szülészeti Központ Jongno-i fióktelepén játszódó sorozat az elsőéves rezidensek kemény, mégis emberi mindennapjait, barátságait és felnőtté válását mutatja be.",
    image: "/images/kdrama/resident-playbook.webp",
  },
  {
    id: 5,
    title: "Snowdrop",
    originalTitle: "설강화",
    rating: "4.8",
    category: "DISNEY+ DRAMA",
    year: "2021-2022",
    episodes: "16 Epizód",
    cast: [
      { name: "Jung Hae-in", role: "Lim Soo-ho", image: "/images/cast/jung-hae-in.webp" },
      { name: "JISOO", role: "Eun Yeong-ro", image: "/images/cast/jisoo.webp" },
    ],
    description: "Feszült politikai intrikák és tragikus szerelem az 1987-es Szöul szívében, Jisoo és Jung Hae-in főszereplésével.",
    fullDescription: "1987-ben, a demokratikus mozgalmak idején egy véres férfi rejtőzik el egy női egyetemi kollégiumban. Young-ro, a kedves egyetemista lány elrejti és ápolja őt, nem tudva, hogy a férfi egy veszélyes politikai hálózat tagja.",
    image: "/images/kdrama/snowdrop.webp",
  },
  {
    id: 6,
    title: "Boyfriend on Demand",
    originalTitle: "월간남친",
    rating: "4.7",
    category: "K-DRAMA HIGHLIGHT",
    year: "2025",
    episodes: "10 Epizód",
    cast: [
      { name: "JISOO", role: "Lead Role", image: "/images/cast/jisoo.webp" },
      { name: "Seo In-guk", role: "Lead Role", image: "/images/cast/seo-in-guk.webp" },
    ],
    description: "Amikor a tökéletes társ csak egy kattintásra van: izgalmas, modern romantikus utazás a virtuális vágyak világában.",
    fullDescription: "Egy virtuális előfizetéses szolgáltatás segítségével a felhasználók megtapasztalhatják a tökéletes randevúkat. De mi történik akkor, amikor a virtuális szimuláció és a valós érzelmek határai elmosódnak?",
    image: "/images/kdrama/boyfriend-on-demand.webp",
  },
];