import { useEffect, useState } from "react";
import { fetchArticles } from "@/utils/api";
import { useRouter } from "next/router";
import MainLayout from "@/components/MainLayout";

export default function ArticlePage() {
  const [article, setArticle] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const articlesData = await fetchArticles(accessToken);

        const articleData = articlesData.data.find(
          (article) => article.slug === slug
        );
        setArticle(articleData);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticleData();
  }, [slug]);

  if (!article) {
    return;
    <MainLayout>
      <div>Loading...</div>
    </MainLayout>;
  }

  return (
    <MainLayout>
      <div className="flex flex-col px-6 mt-4 gap-4">
        <img src={article.image} alt={article.title} className="rounded-2xl" />
        <h1>{article.title}</h1>
        <p>{article.description}</p>
      </div>
    </MainLayout>
  );
}
