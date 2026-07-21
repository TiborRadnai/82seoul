// K-Drama és Film típusdefiníció
export interface MediaItem {
  id: string;
  title: string;
  koreanTitle?: string;
  type: 'drama' | 'movie';
  genre: string[];
  releaseYear: number;
  episodes?: number;
  rating: number;
  summary: string;
  coverImage: string;
  featured?: boolean;
}

// K-Pop Banda típusdefiníció
export interface KPopGroup {
  id: string;
  name: string;
  koreanName?: string;
  agency: string;
  debutYear: number;
  membersCount: number;
  fandomName?: string;
  description: string;
  image: string;
}