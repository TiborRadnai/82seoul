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

export const getRecipesQuery = `*[_type == "recipe"] | order(order asc) {
  title,
  koreanTitle,
  "id": coalesce(id.current, id),
  subCategory,
  tagline,
  description,
  "image": image.asset->url,
  order,
  featured,
  prepTime,
  difficulty,
  ingredients,
  spiceLevel
}`;

export const getRecipeByIdQuery = `*[_type == "recipe" && (id.current == $id || id == $id)][0]{
  title,
  koreanTitle,
  "id": coalesce(id.current, id),
  subCategory,
  tagline,
  description,
  "image": image.asset->url,
  prepTime,
  difficulty,
  ingredients,
  instructions,
  spiceLevel
}`;

export const getProductsQuery = `*[_type == "kFoodProduct"] | order(order asc) {
  title,
  koreanTitle,
  "id": coalesce(id.current, id),
  subCategory,
  tagline,
  description,
  "image": image.asset->url,
  order,
  featured,
  price,
  location,
  spiceLevel
}`;

export const getProductByIdQuery = `*[_type == "kFoodProduct" && (id.current == $id || id == $id)][0]{
  title,
  koreanTitle,
  "id": coalesce(id.current, id),
  subCategory,
  tagline,
  description,
  "image": image.asset->url,
  price,
  location,
  spiceLevel
}`;

// --- K-BEAUTY / WEBSHOP LEKÉRDEZÉSEK ---

export const getShopProductsQuery = `*[_type == "shopProduct"]{
  _id,
  title,
  koreanTitle,
  "slug": id.current,
  category,
  badge,
  "image": image.asset->url,
  tagline,
  rating,
  variants,
  featured
}`;

export const getShopProductBySlugQuery = `*[_type == "shopProduct" && id.current == $slug][0]{
  _id,
  title,
  koreanTitle,
  "slug": id.current,
  category,
  badge,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  tagline,
  description,
  ingredients,
  howToUse,
  variants,
  stock,
  rating,
  featured
}`;