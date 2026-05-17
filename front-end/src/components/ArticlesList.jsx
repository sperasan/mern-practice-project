import { Link } from "react-router-dom";

const ArticlesList = ({ articles }) => {
  return (
    <>
      {articles.map((a) => (
        <Link key={a.name} to={"/articles/" + a.name}>
          <h3>
            {a.title} Comments({a.comments.length}) Upvotes({a.upvotes})
          </h3>
          <p>{a.content[0].substring(0, 100)}</p>
        </Link>
      ))}
    </>
  );
};

export default ArticlesList;
