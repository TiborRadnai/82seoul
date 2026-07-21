import { MediaItem, KPopGroup } from '@/types';

export const SAMPLE_DRAMAS: MediaItem[] = [
  {
    id: 'squid-game',
    title: 'Squid Game',
    koreanTitle: '오징어 게임',
    type: 'drama',
    genre: ['Thriller', 'Drama', 'Survival'],
    releaseYear: 2021,
    episodes: 9,
    rating: 4.8,
    summary: 'Százak nincstelen embere fogadja el a furcsa meghívást egy gyerekjátékokból álló versenyre. A tét halálos.',
    coverImage: 'https://images.unsplash.com/photo-1634157703702-3c124b455499?q=80&w=800&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'crash-landing-on-you',
    title: 'Crash Landing on You',
    koreanTitle: '사랑의 불시착',
    type: 'drama',
    genre: ['Romance', 'Comedy', 'Drama'],
    releaseYear: 2019,
    episodes: 16,
    rating: 4.9,
    summary: 'Egy dél-koreai örökösnő siklóernyőzés közben Észak-Koreában landol, ahol egy katonatiszt bújtatja el.',
    coverImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop',
    featured: true,
  },
];

export const SAMPLE_GROUPS: KPopGroup[] = [
  {
    id: 'bts',
    name: 'BTS',
    koreanName: '방탄소년단',
    agency: 'HYBE (Big Hit Music)',
    debutYear: 2013,
    membersCount: 7,
    fandomName: 'ARMY',
    description: 'A globális K-pop jelenség, akik áttörték a nyugati zeneipar határait.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
  },
];