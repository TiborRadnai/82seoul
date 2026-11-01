import { notFound } from "next/navigation";
import { client } from "../../../../sanity/lib/client";
import { getTravelArticleBySlugQuery } from "../../../../sanity/queries";
import CityDetailView from "@/components/subpages/ktravel/details/CityDetailView";
// import CultureDetailView from "@/components/subpages/ktravel/details/CultureDetailView";
// import NatureDetailView from "@/components/subpages/ktravel/details/NatureDetailView";
// import GuideDetailView from "@/components/subpages/ktravel/details/GuideDetailView";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
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
    //   return <CultureDetailView article={article} />;
    // case "nature":
    //   return <NatureDetailView article={article} />;
    // case "guide":
    //   return <GuideDetailView article={article} />;
    default:
      return <CityDetailView article={article} />;
  }
}