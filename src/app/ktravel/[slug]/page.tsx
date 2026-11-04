import { notFound } from "next/navigation";
import { client } from "../../../../sanity/lib/client";
import { getTravelArticleBySlugQuery } from "../../../../sanity/queries";
import CityDetailView from "@/components/subpages/ktravel/details/CityDetailView";
import CultureDetailView from "@/components/subpages/ktravel/details/CultureDetailView";
import NatureDetailView from "@/components/subpages/ktravel/details/NatureDetailView";
// import GuideDetailView from "@/components/subpages/ktravel/details/GuideDetailView";
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ==========================================
// DINAMIKUS METADATA GENERÁTOR K-TRAVEL CIKKEKHET (NÉMETÜL)
// ==========================================
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const article = await client.fetch(getTravelArticleBySlugQuery, { slug });

    if (!article) {
      return {
        title: 'Reiseartikel nicht gefunden | 82seoul K-Travel',
        description: 'Der gesuchte Reiseführer oder Artikel wurde auf 82seoul nicht gefunden.',
      };
    }

    // Kategória alapú címke meghatározása németül
    let categoryLabel = 'Reiseführer';
    switch (article.category) {
      case 'city':
        categoryLabel = 'Stadt & Metropole';
        break;
      case 'culture':
        categoryLabel = 'Kultur & Tradition';
        break;
      case 'nature':
        categoryLabel = 'Natur & Landschaften';
        break;
      case 'guide':
        categoryLabel = 'Travel Guide';
        break;
    }

    return {
      title: `${article.title} | 82seoul K-Travel (${categoryLabel})`,
      description: article.description || `Entdecke spannende Einblicke und Tipps zu ${article.title} in Südkorea auf 82seoul.`,
      openGraph: {
        title: article.title,
        description: article.description,
        images: article.image ? [article.image] : [],
      },
    };
  } catch (error) {
    console.error("METADATA FEHLER (KTRAVEL):", error);
    return {
      title: '82seoul | K-Travel',
    };
  }
}

export default async function TravelArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const article = await client.fetch(getTravelArticleBySlugQuery, { slug });

  if (!article) {
    notFound();
  }

  // Kategória alapján a subpages/details mappából húzzuk be a megfelelő dizájnt
  switch (article.category) {
    case "city":
      return <CityDetailView article={article} />;
    case "culture":
      return <CultureDetailView article={article} />;
    case "nature":
      return <NatureDetailView article={article} />;
    case "guide":
    //   return <GuideDetailView article={article} />;
    default:
      return <CityDetailView article={article} />;
  }
}