// --- K-POP LEKÉRDEZÉSEK ---

export const getArtistsQuery = `*[_type == "artist"]{
  name,
  id,
  rank,
  category,
  filterAgency,
  agency,
  generation,
  themeColor,
  tagline,
  "image": image.asset->url,
  "wideImage": wideImage.asset->url,
  members,
  fandom,
  description,
  extendedHistory,
  membersList[]{
    name,
    fullName,
    koreanName,
    role,
    birthDate,
    zodiac,
    height,
    bloodType,
    birthPlace,
    signatureTrack,
    brandAmbassador,
    instagram,
    quote,
    shortBio,
    "image": image.asset->url
  },
  albums[]{
    id,
    title,
    type,
    releaseDate,
    "coverImage": coverImage.asset->url,
    spotifyUrl,
    tracks
  }
}`;

export const getArtistByIdQuery = `*[_type == "artist" && id == $id][0]{
  name,
  id,
  rank,
  category,
  filterAgency,
  agency,
  generation,
  themeColor,
  tagline,
  "image": image.asset->url,
  "wideImage": wideImage.asset->url,
  members,
  fandom,
  description,
  extendedHistory,
  membersList[]{
    name,
    fullName,
    koreanName,
    role,
    birthDate,
    zodiac,
    height,
    bloodType,
    birthPlace,
    signatureTrack,
    brandAmbassador,
    instagram,
    quote,
    shortBio,
    "image": image.asset->url
  },
  albums[]{
    id,
    title,
    type,
    releaseDate,
    "coverImage": coverImage.asset->url,
    spotifyUrl,
    tracks
  }
}`;


// --- K-DRAMA & MOVIE LEKÉRDEZÉSEK ---

export const getDramasQuery = `*[_type == "drama"] | order(order asc) {
  title,
  koreanTitle,
  id,
  order,
  type,
  tagline,
  description,
  platform,
  releaseYear,
  episodes,
  "image": image.asset->url,
  "wideImage": wideImage.asset->url,
  rating,
  featured,
  cast[]->{
    name,
    id,
    "image": image.asset->url
  }
}`;

export const getDramaByIdQuery = `*[_type == "drama" && id == $id][0]{
  title,
  koreanTitle,
  id,
  type,
  tagline,
  description,
  platform,
  releaseYear,
  episodes,
  "image": image.asset->url,
  "wideImage": wideImage.asset->url,
  rating,
  featured,
  cast[]->{
    name,
    id,
    bio,
    birthDate,
    birthPlace,
    instagramUrl,
    education,
    debutYear,
    filmography[]{
      mediaType,
      year,
      title,
      role
    },
    "image": image.asset->url
  }
}`;

// Lekéri az összes színészt az új mezőkkel együtt
export const getActorsQuery = `*[_type == "actor"]{
  name,
  id,
  bio,
  birthDate,
  birthPlace,
  instagramUrl,
  education,
  debutYear,
  filmography[]{
    mediaType,
    year,
    title,
    role
  },
  "image": image.asset->url
}`;

// --- K-FOOD LEKÉRDEZÉSEK ---

export const getKFoodsQuery = `*[_type == "kfood"] | order(order asc) {
  title,
  koreanTitle,
  "id": id.current,
  category,
  subCategory,
  tagline,
  description,
  "image": image.asset->url,
  order,
  featured,
  prepTime,
  difficulty,
  ingredients,
  price,
  location
}`;

export const getKFoodByIdQuery = `*[_type == "kfood" && id.current == $id][0]{
  title,
  koreanTitle,
  "id": id.current,
  category,
  subCategory,
  tagline,
  description,
  "image": image.asset->url,
  order,
  featured,
  prepTime,
  difficulty,
  ingredients,
  price,
  location
}`;