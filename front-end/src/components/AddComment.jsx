import { useState } from "react";

const AddComment = ({ onAddComment }) => {
  const [nameText, setNameText] = useState("");
  const [commentText, setCommentText] = useState("");

  return (
    <>
      <div>
        <h3>Add a comment</h3>
        <label>
          Name:
          <input
            value={nameText}
            onChange={(e) => {
              const { value } = e.target;
              setNameText(value);
            }}
          />
        </label>
        <label>
          Comment:
          <input
            value={commentText}
            onChange={(e) => {
              const { value } = e.target;
              setCommentText(value);
            }}
          />
        </label>
        <button
          onClick={() => {
            onAddComment({ nameText, commentText });
            setNameText("");
            setCommentText("");
          }}
        >
          Add Comment
        </button>
      </div>
    </>
  );
};

export default AddComment;
