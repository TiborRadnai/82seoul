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

// Lekéri az összes drámát/filmet a listázó oldalhoz
export const getDramasQuery = `*[_type == "drama"]{
  title,
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
    "image": image.asset->url
  }
}`;

// Lekér egyetlen drámát/filmet az ID-ja alapján a részletes oldalhoz
export const getDramaByIdQuery = `*[_type == "drama" && id == $id][0]{
  title,
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
    "image": image.asset->url
  }
}`;

// Lekéri az összes színészt (ha külön is listázni szeretnénk őket)
export const getActorsQuery = `*[_type == "actor"]{
  name,
  id,
  bio,
  "image": image.asset->url
}`;