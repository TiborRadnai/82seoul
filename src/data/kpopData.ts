export type KPopMember = {
  name: string;
  role?: string;
  image?: string;
};

export interface KPopGroupData {
  id: string;
  name: string;
  tagline: string;
  image: string;
  wideImage: string;
  members: string; // pl. "7 tag" vagy "Szóló előadó"
  fandom?: string;
  membersList?: KPopMember[]; // 👈 Opcionális, ha véletlenül nincs megadva
  agency: string;
  description: string;
  category: 'bg' | 'gg' | 'solo';
  filterAgency: 'HYBE' | 'SM' | 'YG' | 'JYP' | 'OTHER';
  rank: number; // 👈 Szám típus a .sort((a, b) => a.rank - b.rank) rendezéshez!
}

export const KPOP_GROUPS: KPopGroupData[] = [
  {
    id: "bts",
    name: "BTS",
    rank: 1,
    category: "bg",
    tagline: "A világot összekötő érzelmek hangja",
    image: "/images/kpop/bts-mini.webp",
    wideImage: '/images/kpop/bts.webp',
    members: "7 tag",
    fandom: "ARMY",
    membersList: [
      { name: "RM", role: "Leader, Main Rapper", image: "/images/kpop/members/bts-rm.webp" },
      { name: "Jin", role: "Vocalist, Visual", image: "/images/kpop/members/bts-jin.webp" },
      { name: "SUGA", role: "Lead Rapper", image: "/images/kpop/members/bts-suga.webp" },
      { name: "j-hope", role: "Main Dancer, Lead Rapper", image: "/images/kpop/members/bts-jhope.webp" },
      { name: "Jimin", role: "Main Dancer, Lead Vocalist", image: "/images/kpop/members/bts-jimin.webp" },
      { name: "V", role: "Lead Dancer, Vocalist, Visual", image: "/images/kpop/members/bts-v.webp" },
      { name: "Jung Kook", role: "Main Vocalist, Lead Dancer, Center", image: "/images/kpop/members/bts-jungkook.webp" }
    ],
    agency: "BIGHIT MUSIC (HYBE)",
    filterAgency: "HYBE",
    description: "A BTS (Bangtan Sonyeondan) a XXI. század globális popikonja, akik megdöntötték a zeneipar rekordjait és világszerte fiatalok millióit inspirálják.",
  },
  {
    id: "blackpink",
    name: "Blackpink",
    rank: 5,
    category: "gg",
    tagline: "A K-Pop koronázatlan királynői",
    image: "/images/kpop/blackpink-mini.webp",
    wideImage: '/images/kpop/blackpink.webp',
    members: "4 tag",
    fandom: "BLINK",
    membersList: [
      { name: "Jennie", role: "Main Rapper, Lead Vocalist", image: "/images/kpop/members/blackpink-jennie.webp" },
      { name: "Jisoo", role: "Lead Vocalist, Visual", image: "/images/kpop/members/blackpink-jisoo.webp" },
      { name: "Rosé", role: "Main Vocalist, Lead Dancer", image: "/images/kpop/members/blackpink-rose.webp" },
      { name: "Lisa", role: "Main Dancer, Lead Rapper", image: "/images/kpop/members/blackpink-lisa.webp" }
    ],
    agency: "YG Entertainment",
    filterAgency: "YG",
    description: "A Blackpink a világ legnépszerűbb lánybandája, akik ikonikus stílusukkal, stadionos turnéikkal és divatvilági jelenlétükkel uralják a popkultúrát.",
  },
  {
    id: "straykids",
    name: "Stray Kids",
    rank: 8,
    category: "bg",
    tagline: "A saját szabályaikat író, energiától robbanó úttörők",
    image: "/images/kpop/stray-kids-mini.webp",
    wideImage: '/images/kpop/straykids.webp',
    members: "8 tag",
    fandom: "STAY",
    membersList: [
      { name: "Bang Chan", role: "Leader, Producer, Vocalist", image: "/images/kpop/members/straykids-bangchan.webp" },
      { name: "Lee Know", role: "Main Dancer, Vocalist", image: "/images/kpop/members/straykids-leeknow.webp" },
      { name: "Changbin", role: "Main Rapper, Producer", image: "/images/kpop/members/straykids-changbin.webp" },
      { name: "Hyunjin", role: "Main Dancer, Visual, Rapper", image: "/images/kpop/members/straykids-hyunjin.webp" },
      { name: "HAN", role: "Main Rapper, Lead Vocalist, Producer", image: "/images/kpop/members/straykids-han.webp" },
      { name: "Felix", role: "Lead Dancer, Lead Rapper", image: "/images/kpop/members/straykids-felix.webp" },
      { name: "Seungmin", role: "Main Vocalist", image: "/images/kpop/members/straykids-seungmin.webp" },
      { name: "I.N", role: "Sub Vocalist, Maknae", image: "/images/kpop/members/straykids-in.webp" }
    ],
    agency: "JYP Entertainment",
    filterAgency: "JYP",
    description: "Saját maguk által írt és hangszerelt robbanékony dalaikkal a Stray Kids a negyedik generációs K-Pop határozott vezetője.",
  },
  {
    id: "twice",
    name: "TWICE",
    rank: 17,
    category: "gg",
    tagline: "A K-Pop megunhatatlan és ragyogó szupersztárjai",
    image: "/images/kpop/twice-mini.webp",
    wideImage: '/images/kpop/twice.webp',
    members: "9 tag",
    fandom: "ONCE",
    membersList: [
      { name: "Jihyo", role: "Leader, Main Vocalist", image: "/images/kpop/members/twice-jihyo.webp" },
      { name: "Nayeon", role: "Lead Vocalist, Lead Dancer, Center", image: "/images/kpop/members/twice-nayeon.webp" },
      { name: "Jeongyeon", role: "Lead Vocalist", image: "/images/kpop/members/twice-jeongyeon.webp" },
      { name: "Momo", role: "Main Dancer, Sub Vocalist", image: "/images/kpop/members/twice-momo.webp" },
      { name: "Sana", role: "Sub Vocalist", image: "/images/kpop/members/twice-sana.webp" },
      { name: "Mina", role: "Main Dancer, Sub Vocalist", image: "/images/kpop/members/twice-mina.webp" },
      { name: "Dahyun", role: "Lead Rapper, Sub Vocalist", image: "/images/kpop/members/twice-dahyun.webp" },
      { name: "Chaeyoung", role: "Main Rapper, Sub Vocalist", image: "/images/kpop/members/twice-chaeyoung.webp" },
      { name: "Tzuyu", role: "Lead Dancer, Sub Vocalist, Visual", image: "/images/kpop/members/twice-tzuyu.webp" }
    ],
    agency: "JYP Entertainment",
    filterAgency: "JYP",
    description: "Elképesztő slágerlistás sikerekkel és elragadó energiával a TWICE a modern K-Pop történetének egyik legsikeresebb lánycsapata.",
  },
  {
    id: "newjeans",
    name: "NewJeans",
    rank: 16,
    category: "gg",
    tagline: "A nosztalgikus Y2K életérzés és a laza elegancia ikonjai",
    image: "/images/kpop/new-jeans-mini.webp",
    wideImage: '/images/kpop/new-jeans.webp',
    members: "5 tag",
    fandom: "Bunnies (Bonnies)",
    membersList: [
      { name: "Minji", role: "Vocalist, Dancer", image: "/images/kpop/members/newjeans-minji.webp" },
      { name: "Hanni", role: "Vocalist, Dancer", image: "/images/kpop/members/newjeans-hanni.webp" },
      { name: "Danielle", role: "Vocalist, Dancer", image: "/images/kpop/members/newjeans-danielle.webp" },
      { name: "Haerin", role: "Vocalist, Dancer", image: "/images/kpop/members/newjeans-haerin.webp" },
      { name: "Hyein", role: "Vocalist, Dancer, Maknae", image: "/images/kpop/members/newjeans-hyein.webp" }
    ],
    agency: "ADOR (HYBE)",
    filterAgency: "HYBE",
    description: "Friss, Y2K inspirálta R&B hangzásukkal és laza, közvetlen stílusukkal a NewJeans azonnal meghódította a globális zenei élvonalat.",
  },
  {
    id: "aespa",
    name: "Aespa",
    rank: 3,
    category: "gg",
    tagline: "A digitális világ és a valóság határán született ikonok",
    image: "/images/kpop/aespa-mini.webp",
    wideImage: '/images/kpop/aespa.webp',
    members: "4 tag",
    fandom: "MY",
    membersList: [
      { name: "Karina", role: "Leader, Main Dancer, Lead Rapper, Visual", image: "/images/kpop/members/aespa-karina.webp" },
      { name: "Giselle", role: "Main Rapper, Sub Vocalist", image: "/images/kpop/members/aespa-giselle.webp" },
      { name: "Winter", role: "Lead Vocalist, Lead Dancer, Visual", image: "/images/kpop/members/aespa-winter.webp" },
      { name: "Ningning", role: "Main Vocalist, Maknae", image: "/images/kpop/members/aespa-ningning.webp" }
    ],
    agency: "SM Entertainment",
    filterAgency: "SM",
    description: "Futurisztikus koncepciójukkal és az AI avatárokkal kiegészült világukkal az aespa a K-Pop innovációjának úttörője.",
  },
  {
    id: "enhypen",
    name: "ENHYPEN",
    rank: 19,
    category: "bg",
    tagline: "A sötét elegancia és a misztikus történetek mesterei",
    image: "/images/kpop/enhypen-mini.webp",
    wideImage: '/images/kpop/enhypen.webp',
    members: "6 tag",
    fandom: "ENGENE",
    membersList: [
      { name: "Jungwon", role: "Leader, Lead Vocalist, Lead Dancer", image: "/images/kpop/members/enhypen-jungwon.webp" },
      { name: "Jay", role: "Main Rapper, Lead Dancer", image: "/images/kpop/members/enhypen-jay.webp" },
      { name: "Jake", role: "Rapper, Vocalist", image: "/images/kpop/members/enhypen-jake.webp" },
      { name: "Sunghoon", role: "Lead Dancer, Vocalist, Visual", image: "/images/kpop/members/enhypen-sunghoon.webp" },
      { name: "Sunoo", role: "Lead Vocalist", image: "/images/kpop/members/enhypen-sunoo.webp" },
      { name: "NI-KI", role: "Main Dancer, Lead Rapper, Maknae", image: "/images/kpop/members/enhypen-niki.webp" }
    ],
    agency: "BELIFT LAB (HYBE)",
    filterAgency: "HYBE",
    description: "Különleges, koncepcionális történetmesélésükkel és precíz koreográfiáikkal az ENHYPEN a globális K-Pop élvonalába tartozik.",
  },
  {
    id: "lesserafim",
    name: "LE SSERAFIM",
    rank: 12,
    category: "gg",
    tagline: "Félelem nélküli, megtörhetetlen dívák",
    image: "/images/kpop/le-sserafim-mini.webp",
    wideImage: '/images/kpop/le sserafim.webp',
    members: "5 tag",
    fandom: "FEARNOT",
    membersList: [
      { name: "Chaewon", role: "Leader, Lead Vocalist, Lead Dancer", image: "/images/kpop/members/lesserafim-chaewon.webp" },
      { name: "Sakura", role: "Vocalist, Visual", image: "/images/kpop/members/lesserafim-sakura.webp" },
      { name: "Yunjin", role: "Main Vocalist", image: "/images/kpop/members/lesserafim-yunjin.webp" },
      { name: "Kazuha", role: "Main Dancer, Sub Vocalist, Sub Rapper", image: "/images/kpop/members/lesserafim-kazuha.webp" },
      { name: "Eunchae", role: "Lead Dancer, Sub Vocalist, Maknae", image: "/images/kpop/members/lesserafim-eunchae.webp" }
    ],
    agency: "SOURCE MUSIC (HYBE)",
    filterAgency: "HYBE",
    description: "A megalkuvást nem ismerő, félelem nélküli hozzáállás és a modern magabiztosság megtestesítői.",
  },
  {
    id: "ive",
    name: "IVE",
    rank: 6,
    category: "gg",
    tagline: "A magabiztos elegancia és a slágerlista-uralom megtestesítői",
    image: "/images/kpop/ive-mini.webp",
    wideImage: '/images/kpop/ive.webp',
    members: "6 tag",
    fandom: "DIVE",
    membersList: [
      { name: "An Yujin", role: "Leader, Main Vocalist, Lead Dancer", image: "/images/kpop/members/ive-anyujin.webp" },
      { name: "Gaeul", role: "Main Rapper, Lead Dancer", image: "/images/kpop/members/ive-gaeul.webp" },
      { name: "Rei", role: "Main Rapper, Sub Vocalist", image: "/images/kpop/members/ive-rei.webp" },
      { name: "Jang Wonyoung", role: "Lead Vocalist, Visual, Center", image: "/images/kpop/members/ive-jangwonyoung.webp" },
      { name: "Liz", role: "Main Vocalist", image: "/images/kpop/members/ive-liz.webp" },
      { name: "Leeseo", role: "Lead Dancer, Sub Vocalist, Maknae", image: "/images/kpop/members/ive-leeseo.webp" }
    ],
    agency: "Starship Entertainment",
    filterAgency: "OTHER",
    description: "Elegáns és fülbemászó kiadványaikkal az IVE rekordidő alatt vált a koreai zenei toplisták állandó szereplőjévé.",
  },
  {
    id: "gidle",
    name: "(G)I-DLE",
    rank: 20,
    category: "gg",
    tagline: "Önálló, merész és megalkuvást nem ismerő látnokok",
    image: "/images/kpop/idle-mini.webp",
    wideImage: '/images/kpop/idle.webp',
    members: "5 tag",
    fandom: "NEVERLAND",
    membersList: [
      { name: "Soyeon", role: "Leader, Main Rapper, Producer", image: "/images/kpop/members/gidle-soyeon.webp" },
      { name: "Miyeon", role: "Main Vocalist, Visual", image: "/images/kpop/members/gidle-miyeon.webp" },
      { name: "Minnie", role: "Main Vocalist", image: "/images/kpop/members/gidle-minnie.webp" },
      { name: "Yuqi", role: "Lead Dancer, Lead Vocalist, Sub Rapper", image: "/images/kpop/members/gidle-yuqi.webp" },
      { name: "Shuhua", role: "Sub Vocalist, Visual, Maknae", image: "/images/kpop/members/gidle-shuhua.webp" }
    ],
    agency: "Cube Entertainment",
    filterAgency: "OTHER",
    description: "Saját dalaikat író és koncepcióikat alakító merész művészek, akik folyamatosan döntögetik a társadalmi tabukat.",
  },
  {
    id: "babymonster",
    name: "BABYMONSTER",
    rank: 9,
    category: "gg",
    tagline: "A nyers tehetség és az új generáció pusztító energiája",
    image: "/images/kpop/babymonster-mini.webp",
    wideImage: '/images/kpop/babymonster.webp',
    members: "7 tag",
    fandom: "MONSTIEZ",
    membersList: [
      { name: "Pharita", role: "Vocalist", image: "/images/kpop/members/babymonster-pharita.webp" },
      { name: "Ruka", role: "Main Rapper, Main Dancer", image: "/images/kpop/members/babymonster-ruka.webp" },
      { name: "Asa", role: "Main Rapper, Lead Dancer", image: "/images/kpop/members/babymonster-asa.webp" },
      { name: "Ahyeon", role: "All-Rounder, Center, Vocalist, Rapper", image: "/images/kpop/members/babymonster-ahyeon.webp" },
      { name: "Rami", role: "Main Vocalist", image: "/images/kpop/members/babymonster-rami.webp" },
      { name: "Rora", role: "Lead Vocalist", image: "/images/kpop/members/babymonster-rora.webp" },
      { name: "Chiquita", role: "Lead Vocalist, Lead Dancer, Maknae", image: "/images/kpop/members/babymonster-chiquita.webp" }
    ],
    agency: "YG Entertainment",
    filterAgency: "YG",
    description: "A YG legújabb generációs csapata, elképesztő vokális és hip-hop képességekkel felvértezve.",
  },
  {
    id: "ateez",
    name: "ATEEZ",
    rank: 24,
    category: "bg",
    tagline: "A színpadi jelenlét és a teátrális intenzitás királyai",
    image: "/images/kpop/ateez-mini.webp",
    wideImage: '/images/kpop/ateez.webp',
    members: "8 tag",
    fandom: "ATINY",
    membersList: [
      { name: "Hongjoong", role: "Leader, Lead Rapper, Producer", image: "/images/kpop/members/ateez-hongjoong.webp" },
      { name: "Seonghwa", role: "Lead Vocalist, Visual", image: "/images/kpop/members/ateez-seonghwa.webp" },
      { name: "Yunho", role: "Main Dancer, Vocalist", image: "/images/kpop/members/ateez-yunho.webp" },
      { name: "Yeosang", role: "Lead Dancer, Vocalist, Visual", image: "/images/kpop/members/ateez-yeosang.webp" },
      { name: "San", role: "Main Dancer, Lead Vocalist", image: "/images/kpop/members/ateez-san.webp" },
      { name: "Mingi", role: "Main Rapper, Lead Dancer", image: "/images/kpop/members/ateez-mingi.webp" },
      { name: "Wooyoung", role: "Main Dancer, Vocalist", image: "/images/kpop/members/ateez-wooyoung.webp" },
      { name: "Jongho", role: "Main Vocalist, Maknae", image: "/images/kpop/members/ateez-jongho.webp" }
    ],
    agency: "KQ Entertainment",
    filterAgency: "OTHER",
    description: "A színpadi energiájukról és teátrális előadásmódjukról híres ATEEZ az arénák nemzetközi kedvence.",
  },
  {
    id: "illit",
    name: "ILLIT",
    rank: 11,
    category: "gg",
    tagline: "Az álomszerű, varázslatos és fülbemászó világ megteremtői",
    image: "/images/kpop/illit-mini.webp",
    wideImage: '/images/kpop/illit.webp',
    members: "5 tag",
    fandom: "GLLIT",
    membersList: [
      { name: "Yunah", role: "Vocalist, Dancer", image: "/images/kpop/members/illit-yunah.webp" },
      { name: "Minju", role: "Vocalist", image: "/images/kpop/members/illit-minju.webp" },
      { name: "Moka", role: "Dancer, Vocalist", image: "/images/kpop/members/illit-moka.webp" },
      { name: "Wonhee", role: "Vocalist, Center", image: "/images/kpop/members/illit-wonhee.webp" },
      { name: "Iroha", role: "Main Dancer, Vocalist, Maknae", image: "/images/kpop/members/illit-iroha.webp" }
    ],
    agency: "BELIFT LAB (HYBE)",
    filterAgency: "HYBE",
    description: "Könnyed, álomszerű dallamaikkal és friss megjelenésükkel az ILLIT azonnal elrabolta a fiatalok szívét.",
  },
  {
    id: "treasure",
    name: "TREASURE",
    rank: 31,
    category: "bg",
    tagline: "A színtiszta fiatalos erő és a megállíthatalan közösségi vibe",
    image: "/images/kpop/treasure-mini.webp",
    wideImage: '/images/kpop/treasure.webp',
    members: "10 tag",
    fandom: "Teume",
    membersList: [
      { name: "Choi Hyun-suk", role: "Leader, Main Rapper, Main Dancer", image: "/images/kpop/members/treasure-choihyunsuk.webp" },
      { name: "Jihoon", role: "Leader, Main Dancer, Lead Vocalist", image: "/images/kpop/members/treasure-jihoon.webp" },
      { name: "Yoshi", role: "Main Rapper", image: "/images/kpop/members/treasure-yoshi.webp" },
      { name: "Junkyu", role: "Main Vocalist, Visual", image: "/images/kpop/members/treasure-junkyu.webp" },
      { name: "Yoon Jae-hyuk", role: "Sub Vocalist", image: "/images/kpop/members/treasure-yoonjaehyuk.webp" },
      { name: "Asahi", role: "Sub Vocalist, Producer", image: "/images/kpop/members/treasure-asahi.webp" },
      { name: "Doyoung", role: "Main Dancer, Sub Vocalist", image: "/images/kpop/members/treasure-doyoung.webp" },
      { name: "Haruto", role: "Main Rapper, Visual", image: "/images/kpop/members/treasure-haruto.webp" },
      { name: "Park Jeong-woo", role: "Main Vocalist", image: "/images/kpop/members/treasure-parkjeongwoo.webp" },
      { name: "So Jung-hwan", role: "Main Dancer, Vocalist, Maknae", image: "/images/kpop/members/treasure-sojunghwan.webp" }
    ],
    agency: "YG Entertainment",
    filterAgency: "YG",
    description: "Robbanékony buli-hangulatú slágereikkel és dinamikus felállásukkal a TREASURE a fiatalos lendület képviselője.",
  },
  {
    id: "boynextdoor",
    name: "Boynextdoor",
    rank: 30,
    category: "bg",
    tagline: "A szomszéd fiúk közvetlen, szerethető és friss stílusa",
    image: "/images/kpop/boynextdoor-mini.webp",
    wideImage: '/images/kpop/boynextdoor.webp',
    members: "6 tag",
    fandom: "ONEDOOR",
    membersList: [
      { name: "Jaehyun", role: "Leader, Main Vocalist, Rapper", image: "/images/kpop/members/boynextdoor-jaehyun.webp" },
      { name: "Sungho", role: "Main Vocalist", image: "/images/kpop/members/boynextdoor-sungho.webp" },
      { name: "Riwoo", role: "Main Dancer, Vocalist", image: "/images/kpop/members/boynextdoor-riwoo.webp" },
      { name: "Taesan", role: "Vocalist, Rapper, Writer", image: "/images/kpop/members/boynextdoor-taesan.webp" },
      { name: "Leehan", role: "Vocalist", image: "/images/kpop/members/boynextdoor-leehan.webp" },
      { name: "Woonhak", role: "Vocalist, Rapper, Maknae", image: "/images/kpop/members/boynextdoor-woonhak.webp" }
    ],
    agency: "KOZ Entertainment (HYBE)",
    filterAgency: "HYBE",
    description: "Természetes, közvetlen és szerethető stílusukkal a mindennapi életérzéseket és érzelmeket öntik zenébe.",
  },
  {
    id: "meovv",
    name: "MEOVV",
    rank: 26,
    category: "gg",
    tagline: "A kecses vagányság és a prémium attitude új arca",
    image: "/images/kpop/meovv-mini.webp",
    wideImage: '/images/kpop/meovv.webp',
    members: "5 tag",
    fandom: "MEOVV CHUU",
    membersList: [
      { name: "Ella", role: "Vocalist, Model", image: "/images/kpop/members/meovv-ella.webp" },
      { name: "Gawon", role: "Vocalist, Rapper", image: "/images/kpop/members/meovv-gawon.webp" },
      { name: "Sooin", role: "Main Dancer, Vocalist", image: "/images/kpop/members/meovv-sooin.webp" },
      { name: "Anna", role: "Vocalist, Visual", image: "/images/kpop/members/meovv-anna.webp" },
      { name: "Narin", role: "Rapper, Vocalist, Maknae", image: "/images/kpop/members/meovv-narin.webp" }
    ],
    agency: "THEBLACKLABEL",
    filterAgency: "OTHER",
    description: "A THEBLACKLABEL égisze alatt debütált prémium lánybanda, akik a kecses eleganciát ötvözik a kemény hip-hop ütemekkel.",
  },
   {
     id: "txt",
     name: "TOMORROW X TOGETHER",
     rank: 18,
     category: "bg",
     tagline: "A mesebeli történetek és a fiatalság narrátorai",
     image: "/images/kpop/txt-mini.webp",
     wideImage: '/images/kpop/bts.webp',
     members: "5 tag",
     fandom: "MOA",
     membersList: [
       { name: "Soobin", role: "Leader, Vocalist", image: "/images/kpop/members/txt-soobin.webp" },
       { name: "Yeonjun", role: "Main Dancer, Main Rapper, Vocalist", image: "/images/kpop/members/txt-yeonjun.webp" },
       { name: "Beomgyu", role: "Vocalist, Dancer, Visual", image: "/images/kpop/members/txt-beomgyu.webp" },
       { name: "Taehyun", role: "Main Vocalist", image: "/images/kpop/members/txt-taehyun.webp" },
       { name: "Hueningkai", role: "Main Vocalist, Maknae", image: "/images/kpop/members/txt-hueningkai.webp" }
     ],
     agency: "BIGHIT MUSIC (HYBE)",
     filterAgency: "HYBE",
     description: "Művészi látásmódjukkal és elgondolkodtató történetmesélésükkel a TXT a Z-generáció egyik legmeghatározóbb együttese.",
   },
   {
     id: "seventeen",
     name: "SEVENTEEN",
     rank: 14,
     category: "bg",
     tagline: "A tökéletes szinkronitás és az önálló alkotás mesterei",
     image: "/images/kpop/seventeen-mini.webp",
     wideImage: '/images/kpop/bts.webp',
     members: "13 tag",
     fandom: "CARAT",
     membersList: [
       { name: "S.Coups", role: "Leader, Hip-Hop Leader, Main Rapper", image: "/images/kpop/members/seventeen-scoups.webp" },
       { name: "Jeonghan", role: "Lead Vocalist, Visual", image: "/images/kpop/members/seventeen-jeonghan.webp" },
       { name: "Joshua", role: "Lead Vocalist", image: "/images/kpop/members/seventeen-joshua.webp" },
       { name: "Jun", role: "Lead Dancer, Sub Vocalist", image: "/images/kpop/members/seventeen-jun.webp" },
       { name: "Hoshi", role: "Performance Leader, Main Dancer, Lead Vocalist", image: "/images/kpop/members/seventeen-hoshi.webp" },
       { name: "Wonwoo", role: "Lead Rapper, Sub Vocalist", image: "/images/kpop/members/seventeen-wonwoo.webp" },
       { name: "WOOZI", role: "Vocal Leader, Main Vocalist, Main Producer", image: "/images/kpop/members/seventeen-woozi.webp" },
       { name: "DK", role: "Main Vocalist", image: "/images/kpop/members/seventeen-dk.webp" },
       { name: "Mingyu", role: "Lead Rapper, Visual", image: "/images/kpop/members/seventeen-mingyu.webp" },
       { name: "THE 8", role: "Lead Dancer, Sub Vocalist", image: "/images/kpop/members/seventeen-the8.webp" },
       { name: "Seungkwan", role: "Main Vocalist", image: "/images/kpop/members/seventeen-seungkwan.webp" },
       { name: "Vernon", role: "Main Rapper", image: "/images/kpop/members/seventeen-vernon.webp" },
       { name: "Dino", role: "Main Dancer, Sub Vocalist, Maknae", image: "/images/kpop/members/seventeen-dino.webp" }
     ],
     agency: "PLEDIS Entertainment (HYBE)",
     filterAgency: "HYBE",
     description: "A 13 tagú, saját magát producerelő szupercsapat páratlan szinkronitásáról és lenyűgöző stadionos előadásairól híres világszerte.",
   },
   {
     id: "redvelvet",
     name: "Red Velvet",
     rank: 28,
     category: "gg",
     tagline: "A művészi sokoldalúság és a koncepcionális varázs királynői",
     image: "/images/kpop/red-velvet-mini.webp",
     wideImage: '/images/kpop/bts.webp',
     members: "5 tag",
     fandom: "ReVeluv",
     membersList: [
       { name: "Irene", role: "Leader, Main Rapper, Lead Dancer, Visual", image: "/images/kpop/members/redvelvet-irene.webp" },
       { name: "Seulgi", role: "Main Dancer, Lead Vocalist", image: "/images/kpop/members/redvelvet-seulgi.webp" },
       { name: "Wendy", role: "Main Vocalist", image: "/images/kpop/members/redvelvet-wendy.webp" },
       { name: "Joy", role: "Lead Rapper, Sub Vocalist", image: "/images/kpop/members/redvelvet-joy.webp" },
       { name: "Yeri", role: "Sub Vocalist, Sub Rapper, Maknae", image: "/images/kpop/members/redvelvet-yeri.webp" }
     ],
     agency: "SM Entertainment",
     filterAgency: "SM",
     description: "Az élénk, vidám 'Red' és a finom, érett 'Velvet' stílus ötvözésével a Red Velvet a zenei kísérletezés csúcsa.",
   },
   {
     id: "itzy",
     name: "ITZY",
     rank: 27,
     category: "gg",
     tagline: "Az önelfogadás és a kitörő energia nagykövetei",
     image: "/images/kpop/itzy-mini.webp",
     wideImage: '/images/kpop/bts.webp',
     members: "5 tag",
     fandom: "MIDZY",
     membersList: [
       { name: "Yeji", role: "Leader, Main Dancer, Lead Vocalist, Sub Rapper", image: "/images/kpop/members/itzy-yeji.webp" },
       { name: "Lia", role: "Main Vocalist", image: "/images/kpop/members/itzy-lia.webp" },
       { name: "Ryujin", role: "Main Rapper, Lead Dancer, Sub Vocalist, Center", image: "/images/kpop/members/itzy-ryujin.webp" },
       { name: "Chaeryeong", role: "Main Dancer, Sub Vocalist, Sub Rapper", image: "/images/kpop/members/itzy-chaeryeong.webp" },
       { name: "Yuna", role: "Lead Dancer, Lead Rapper, Visual, Maknae", image: "/images/kpop/members/itzy-yuna.webp" }
     ],
     agency: "JYP Entertainment",
     filterAgency: "JYP",
     description: "Erőteljes koreográfiáikkal és az 'önmagad vállalása' üzenetével az ITZY a negyedik generáció egyik leghatározottabb csapata.",
   },
   {
     id: "riize",
     name: "RIIZE",
     rank: 22,
     category: "bg",
     tagline: "Az érzelmes pop és a folyamatos fejlődés úttörői",
     image: "/images/kpop/riize-mini.webp",
     wideImage: '/images/kpop/bts.webp',
     members: "6 tag",
     fandom: "BRIIZE",
     membersList: [
       { name: "Shotaro", role: "Main Dancer", image: "/images/kpop/members/riize-shotaro.webp" },
       { name: "Eunseok", role: "Vocalist, Visual", image: "/images/kpop/members/riize-eunseok.webp" },
       { name: "Sungchan", role: "Rapper", image: "/images/kpop/members/riize-sungchan.webp" },
       { name: "Wonbin", role: "Center, Dancer, Vocalist, Guitarist", image: "/images/kpop/members/riize-wonbin.webp" },
       { name: "Sohee", role: "Main Vocalist", image: "/images/kpop/members/riize-sohee.webp" },
       { name: "Anton", role: "Vocalist, Cellist, Maknae", image: "/images/kpop/members/riize-anton.webp" }
     ],
     agency: "SM Entertainment",
     filterAgency: "SM",
     description: "Az 'Emotional Pop' műfaj megteremtőiként a RIIZE a mindennapi érzelmeket önti magával ragadó zenei formába.",
   },
  //  {
  //    id: "zerobaseone",
  //    name: "ZEROBASEONE",
  //    rank: 25,
  //    category: "bg",
  //    image: "/images/kpop/zerobaseone-mini.webp",
  //    wideImage: '/images/kpop/bts.webp',
  //    members: "9 tag",
  //    fandom: "ZEROSE",
  //   membersList: [
  //     { name: "Sung Han Bin", role: "Leader, Main Dancer, Lead Vocalist", image: "/images/kpop/members/zerobaseone-sunghanbin.webp" },
  //      { name: "Kim Ji Woong", role: "Lead Rapper, Lead Dancer, Visual", image: "/images/kpop/members/zerobaseone-kimjiwoong.webp" },
  //      { name: "Zhang Hao", role: "Main Vocalist, Center", image: "/images/kpop/members/zerobaseone-zhanghao.webp" },
  //      { name: "Seok Matthew", role: "Lead Vocalist, Lead Dancer", image: "/images/kpop/members/zerobaseone-seokmatthew.webp" },
  //      { name: "Kim Tae Rae", role: "Main Vocalist", image: "/images/kpop/members/zerobaseone-kimtaerae.webp" },
  //      { name: "Ricky", role: "Sub Vocalist, Visual", image: "/images/kpop/members/zerobaseone-ricky.webp" },
  //      { name: "Kim Gyu Vin", role: "Lead Dancer, Sub Vocalist", image: "/images/kpop/members/zerobaseone-kimgyuvin.webp" },
  //      { name: "Park Gun Wook", role: "Main Rapper, Lead Vocalist, Lead Dancer", image: "/images/kpop/members/zerobaseone-parkgunwook.webp" },
  //      { name: "Han Yu Jin", role: "Main Dancer, Sub Vocalist, Maknae", image: "/images/kpop/members/zerobaseone-hanyujin.webp" }
  //    ],
  //    agency: "WAKEONE",
  //    filterAgency: "OTHER",
  //    description: "A Boys Planet műsorban megalakult fiúcsapat rekorddöntő eladásokkal robbant be a globális zenei élvonalba.",
  //  },
   {
     id: "kissoflife",
     name: "KISS OF LIFE",
     rank: 23,
     category: "gg",
     tagline: "A nyers vokalitás és az autentikus R&B újjászületése",
     image: "/images/kpop/kiss-of-life-mini.webp",
     wideImage: '/images/kpop/bts.webp',
     members: "4 tag",
     fandom: "KISSY",
     membersList: [
       { name: "Julie", role: "Leader, Main Rapper, Lead Dancer", image: "/images/kpop/members/kissoflife-julie.webp" },
       { name: "Natty", role: "Main Dancer, Lead Rapper, Sub Vocalist", image: "/images/kpop/members/kissoflife-natty.webp" },
       { name: "Belle", role: "Main Vocalist, Composer", image: "/images/kpop/members/kissoflife-belle.webp" },
       { name: "Haneul", role: "Lead Vocalist, Maknae", image: "/images/kpop/members/kissoflife-haneul.webp" }
     ],
     agency: "S2 Entertainment",
     filterAgency: "OTHER",
     description: "Kiemelkedő énekhangjukkal és korai 2000-es évek R&B hatásaikkal a KISS OF LIFE a kritikusok és rajongók nagy kedvence.",
   },
   {
     id: "nmixx",
     name: "NMIXX",
     rank: 29,
     category: "gg",
     tagline: "A műfajokat egyesítő MIXX POP varázslói",
     image: "/images/kpop/nmixx-mini.webp",
     wideImage: '/images/kpop/bts.webp',
     members: "6 tag",
     fandom: "NSWER",
     membersList: [
       { name: "Lily", role: "Main Vocalist", image: "/images/kpop/members/nmixx-lily.webp" },
       { name: "Haewon", role: "Leader, Main Vocalist", image: "/images/kpop/members/nmixx-haewon.webp" },
       { name: "Sullyoon", role: "Lead Vocalist, Sub Dancer, Visual", image: "/images/kpop/members/nmixx-sullyoon.webp" },
       { name: "Bae", role: "Lead Vocalist, Lead Dancer", image: "/images/kpop/members/nmixx-bae.webp" },
       { name: "Jiwoo", role: "Main Rapper, Lead Dancer, Sub Vocalist", image: "/images/kpop/members/nmixx-jiwoo.webp" },
       { name: "Kyujin", role: "Main Dancer, Lead Vocalist, Lead Rapper, Maknae", image: "/images/kpop/members/nmixx-kyujin.webp" }
     ],
     agency: "JYP Entertainment",
     filterAgency: "JYP",
     description: "Elképesztő élő vokális tudásukkal és a műfajokat váltogató MIXX POP koncepciójukkal egyedülálló színfoltot képviselnek.",
   }

];

// --- SZÓLÓ ELŐADÓK ADATBÁZIS BEJEGYZÉSEI ---

export const KPOP_SOLOISTS: KPopGroupData[] = [
  {
    id: "rose",
    name: "Rosé",
    rank: 2,
    category: "solo",
    tagline: "A hang, ami elvarázsolta a világot",
    image: "/images/kpop/rose-mini.webp",
    wideImage: "/images/kpop/rose.webp",
    members: "Szóló előadó",
    fandom: "Number One",
    membersList: [
      {
        name: "Rosé",
        role: "Main Vocalist, Soloist",
        image: "/images/kpop/members/rose.webp"
      }
    ],
    agency: "THEBLACKLABEL / Atlantic",
    filterAgency: "OTHER",
    description: "A Blackpink énekesnője, aki 'rosie' című albumával és a Bruno Marssal közös 'APT.' slágerével globális rekorder sanzonénekesnővé vált.",
  },
  {
    id: "jungkook",
    name: "Jungkook",
    rank: 4,
    category: "solo",
    tagline: "A globális pop zenei világ aranyifjúja",
    image: "/images/kpop/jungkook-mini.webp",
    wideImage: "/images/kpop/jungkook.webp",
    members: "Szóló előadó",
    fandom: "ARMY",
    membersList: [
      {
        name: "Jungkook",
        role: "Main Vocalist, Main Dancer, Soloist",
        image: "/images/kpop/members/bts-jungkook.webp"
      }
    ],
    agency: "BIGHIT MUSIC (HYBE)",
    filterAgency: "HYBE",
    description: "A BTS 'Golden Maknae'-ja, aki 'Seven' című dalával és 'GOLDEN' szólóalbumával történelmi eladási és lejátszási rekordokat döntött a Spotify-on.",
  },
  {
    id: "jennie",
    name: "Jennie",
    rank: 7,
    category: "solo",
    tagline: "A pop- és divatvilág megkérdőjelezhetetlen ikonja",
    image: "/images/kpop/jennie-mini.webp",
    wideImage: "/images/kpop/jennie.webp",
    members: "Szóló előadó",
    fandom: "Jensetters",
    membersList: [
      {
        name: "Jennie",
        role: "Main Rapper, Lead Vocalist, Soloist",
        image: "/images/kpop/members/blackpink-jennie.webp"
      }
    ],
    agency: "OA (ODDATELIER) / Columbia",
    filterAgency: "OTHER",
    description: "Stílusikon, énekesnő és rapper, a 'SOLO' és 'You & Me' előadója, aki saját kiadójával (OA) építi globális karrierjét.",
  },
  {
    id: "jimin",
    name: "Jimin",
    rank: 10,
    category: "solo",
    tagline: "A kifejező mozgás és az érzelmes vokál mestere",
    image: "/images/kpop/jimin-mini.webp",
    wideImage: "/images/kpop/jimin.webp",
    members: "Szóló előadó",
    fandom: "ARMY",
    membersList: [
      {
        name: "Jimin",
        role: "Main Dancer, Lead Vocalist, Soloist",
        image: "/images/kpop/members/bts-jimin.webp"
      }
    ],
    agency: "BIGHIT MUSIC (HYBE)",
    filterAgency: "HYBE",
    description: "A BTS tagja, aki 'Like Crazy' című dalával az első dél-koreai szólóénekes lett, aki a Billboard Hot 100 lista élén debütált.",
  },
  {
    id: "jin",
    name: "Jin",
    rank: 13,
    category: "solo",
    tagline: "A Worldwide Handsome ikonikus hangja",
    image: "/images/kpop/jin-mini.webp",
    wideImage: "/images/kpop/jin.webp",
    members: "Szóló előadó",
    fandom: "ARMY",
    membersList: [
      {
        name: "Jin",
        role: "Vocalist, Visual, Soloist",
        image: "/images/kpop/members/bts-jin.webp"
      }
    ],
    agency: "BIGHIT MUSIC (HYBE)",
    filterAgency: "HYBE",
    description: "A BTS legidősebb tagja, aki 'The Astronaut' című Coldplay-jel közös dalával és visszatérése óta sugárzó showman jelenlétével varázsolja el a rajongókat.",
  },
  {
    id: "lisa",
    name: "Lisa",
    rank: 15,
    category: "solo",
    tagline: "Robbanékony energia és karizmával teli fellépés",
    image: "/images/kpop/lisa-mini.webp",
    wideImage: "/images/kpop/lisa.webp",
    members: "Szóló előadó",
    fandom: "Lilies",
    membersList: [
      {
        name: "Lisa",
        role: "Main Dancer, Lead Rapper, Soloist",
        image: "/images/kpop/members/blackpink-lisa.webp"
      }
    ],
    agency: "LLOUD / RCA",
    filterAgency: "OTHER",
    description: "A Blackpink thaiföldi származású sztárja, aki 'LALISA', 'MONEY' és 'ROCKSTAR' számaival a világ legkövetettebb K-Pop szólóelőadója.",
  },
  {
    id: "jhope",
    name: "j-hope",
    rank: 21,
    category: "solo",
    tagline: "A tiszta ritmus, szenvedély és pozitivitás motorja",
    image: "/images/kpop/jhope-mini.webp",
    wideImage: "/images/kpop/jhope.webp",
    members: "Szóló előadó",
    fandom: "ARMY",
    membersList: [
      {
        name: "j-hope",
        role: "Main Dancer, Lead Rapper, Soloist",
        image: "/images/kpop/members/bts-jhope.webp"
      }
    ],
    agency: "BIGHIT MUSIC (HYBE)",
    filterAgency: "HYBE",
    description: "A BTS táncos-rapper zsenije, aki 'Jack In The Box' albumával és a Lollapalooza főfellépőjeként írt történelmet.",
  },
  {
    id: "suga",
    name: "Suga (Agust D)",
    rank: 32,
    category: "solo",
    tagline: "A mély dalszövegek és nyers hip-hop víziók alkotója",
    image: "/images/kpop/suga-mini.webp",
    wideImage: "/images/kpop/suga.webp",
    members: "Szóló előadó",
    fandom: "ARMY",
    membersList: [
      {
        name: "Suga (Agust D)",
        role: "Lead Rapper, Producer, Soloist",
        image: "/images/kpop/members/bts-suga.webp"
      }
    ],
    agency: "BIGHIT MUSIC (HYBE)",
    filterAgency: "HYBE",
    description: "Zenei producer, a BTS rappere, aki Agust D néven 'D-DAY' albumával és világkörüli arénaturnéjával mutatta meg virtuóz művészetét.",
  }
];

export const getKPopGroupById = (id: string): KPopGroupData | undefined => {
  return KPOP_GROUPS.find((group) => group.id === id);
};

export const searchKPopGroups = (query: string): KPopGroupData[] => {
  const q = query.toLowerCase().trim();
  if (!q) return KPOP_GROUPS;

  return KPOP_GROUPS.filter((group) => {
    // 1. Keresés a névben
    const matchesName = group.name.toLowerCase().includes(q);
    
    // 2. Keresés az ügynökségben (Agency)
    const matchesAgency = group.agency.toLowerCase().includes(q);

    // 3. Keresés a leírásban vagy tagline-ban (ha van)
    const matchesDescription = group.description.toLowerCase().includes(q) ||
      (group.tagline && group.tagline.toLowerCase().includes(q));

    // 4. Keresés a Fandom névben (ha van)
    const matchesFandom = group.fandom ? group.fandom.toLowerCase().includes(q) : false;

    // 5. Keresés a Tagok közt (BIZTONSÁGOSAN: Optional chaining '?.')
    const matchesMembers = group.membersList?.some((m) => {
      if (typeof m === "string") {
        return (m as string).toLowerCase().includes(q);
      }
      return (
        m.name.toLowerCase().includes(q) ||
        (m.role ? m.role.toLowerCase().includes(q) : false)
      );
    }) ?? false;

    return matchesName || matchesAgency || matchesDescription || matchesFandom || matchesMembers;
  });
};