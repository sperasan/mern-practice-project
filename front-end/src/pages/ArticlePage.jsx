import { useParams } from "react-router-dom";
import articles from "../data/article-content";

const ArticlePage = () => {
  const { name } = useParams();
  const article = articles.find((item) => {
    return item.name === name;
  });

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </>
  );
};

export default ArticlePage;
