import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import articles from "../data/article-content";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddComment from "../components/AddComment";
import useUser from "../scripts/useUser";

const ArticlePage = () => {
  const { user } = useUser();
  const { name } = useParams();
  const { upvotes: intialUpvotes, comments: initialComments } = useLoaderData();
  const article = articles.find((item) => {
    return item.name === name;
  });
  const [upvotes, setUpvotes] = useState(intialUpvotes);
  const [comments, setComments] = useState(initialComments);
  const onUpvoteClick = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      "/api/articles/" + name + "/upvote",
      null,
      { headers },
    );
    const updatedArticle = response.data;

    setUpvotes(updatedArticle.upvotes);
    setComments(updatedArticle.comments);
  };

  const onAddComment = async ({ nameText, commentText }) => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      "/api/articles/" + name + "/comment",
      {
        postedBy: nameText,
        text: commentText,
      },
      { headers },
    );
    const updateArticleData = response.data;
    setComments(updateArticleData.comments);
  };

  return (
    <>
      <h1>{article.title}</h1>
      {user && <button onClick={onUpvoteClick}>Upvote</button>}
      <h3>
        This article has {upvotes} upvotes! with {comments.length} comment(s).
      </h3>
      {article.content.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {user ? (
        <AddComment onAddComment={onAddComment} />
      ) : (
        <p>Log in to add a comment</p>
      )}
      <CommentsList comments={comments} />
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }) => {
  const response = await axios.get("/api/articles/" + params.name);
  const { upvotes, comments } = response.data;
  return { upvotes, comments };
};

export default ArticlePage;
