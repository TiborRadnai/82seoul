// --- K-POP LEKÉRDEZÉSEK ---

export const getArtistsQuery = `*[_type == "artist"]{
  name,
  id,
  rank,
  category,
  gender,
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
  gender,
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


export const getShopProductsQuery = `*[_type == "shopProduct"]{
  _id,
  title,
  koreanTitle,
  "slug": coalesce(id.current, id),
  category,
  badge,
  "image": image.asset->url,
  tagline,
  rating,
  variants[]{
    size,
    price,
    onSale,
    salePrice,
    stock
  },
  featured
}`;

export const getShopProductBySlugQuery = `*[_type == "shopProduct" && (id.current == $slug || id == $slug)][0]{
  _id,
  title,
  koreanTitle,
  "slug": coalesce(id.current, id),
  category,
  badge,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  tagline,
  description,
  ingredients,
  howToUse,
  variants[]{
    size,
    price,
    onSale,
    salePrice,
    stock
  },
  rating,
  featured
}`;


// --- ÜGYFÉL & RENDELÉS LEKÉRDEZÉSEK ---

export const getCustomerByUserIdQuery = `*[_type == "customer" && userId == $userId][0]{
  _id,
  userId,
  email,
  lastName,
  firstName,
  koreanName,
  phone,
  shippingAddress,
  createdAt
}`;

export const getOrdersByUserIdOrEmailQuery = `
  *[_type == "order" && (userId == $userId || customerEmail == $email)] | order(_createdAt desc) {
    _id,
    _createdAt,
    stripeSessionId,
    invoiceNumber,
    "invoiceUrl": invoiceFile.asset->url,
    amountTotal,
    currency,
    paymentStatus,
    items,
    shippingDetails,
    createdAt
  }
`;

// --- KOREA TRAVEL LEKÉRDEZÉSEK ---

// 1. Lekérdezi az adott pillér (kategória) kiemelt elemeit a főoldalra (sorrend szerint)
export const getTravelArticlesByCategoryQuery = `*[_type == "travelArticle" && category == $category && isFeaturedOnSection == true] | order(orderRank asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  tag,
  description,
  "image": image.asset->url,
  isFeaturedOnSection,
  orderRank
}`;

// 2. Lekérdezi az összes elemet egy adott pillérhez (pl. a részletes / overview aloldalra)
export const getAllTravelArticlesByCategoryQuery = `*[_type == "travelArticle" && category == $category] | order(orderRank asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  tag,
  description,
  "image": image.asset->url,
  isFeaturedOnSection,
  orderRank
}`;

// 3. Lekérdezi egyedi cikk adatait slug alapján (a részletes cikk oldalakhoz - BŐVÍTVE galériával és body-val!)
export const getTravelArticleBySlugQuery = `*[_type == "travelArticle" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  category,
  tag,
  description,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  body,
  isFeaturedOnSection,
  orderRank
}`;

// 4. Lekérdezi a Travel Guide (Kisokos) elemeit sorrendben
export const getTravelGuideItemsQuery = `*[_type == "travelGuideItem"] | order(orderRank asc) {
  _id,
  title,
  "slug": slug.current,
  tag,
  description,
  orderRank
}`;