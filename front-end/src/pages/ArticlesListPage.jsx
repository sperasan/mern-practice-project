import { useLoaderData } from "react-router-dom";
import axios from "axios";
import ArticlesList from "../components/ArticlesList";
import articles from "../data/article-content";

const ArticlesListPage = () => {
  const articlesFromDb = useLoaderData();
  let articlesListData = [];
  for (let i = 0; i < articlesFromDb.length; i++) {
    const art = articles.find(
      (myarticle) => myarticle.name == articlesFromDb[i].name,
    );
    articlesListData.push({ ...art, ...articlesFromDb[i] });
  }
  return (
    <>
      <h1>Articles</h1>
      <ArticlesList articles={articlesListData} />
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const response = await axios.get("/api/articles/");
  return response.data;
};

export default ArticlesListPage;
