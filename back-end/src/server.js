import express from "express";

const articleInfo = [
  {
    articleName: "learn-node",
    upvotes: 0,
    comments: [],
  },
  {
    articleName: "learn-react",
    upvotes: 0,
    comments: [],
  },
  {
    articleName: "learn-mongodb",
    upvotes: 0,
    comments: [],
  },
];
const app = express();
app.use(express.json());

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;
  const article = articleInfo.find((a) => a.articleName === articleName);

  article.upvotes += 1;

  res.json(article);
});

app.post("/api/articles/:name/comment", (req, res) => {
  const { name: articleName } = req.params;
  const { postedBy, text: comment } = req.body;
  const article = articleInfo.find((a) => a.articleName === articleName);

  article.comments.push(comment);

  res.json({
    message: `Success! The article ${articleName} has now ${article.comments.length} comments posted by ${postedBy} "${comment}"`,
    article,
  });
});

// app.get("/hello", (req, res) => {
//   res.send("GET: Hello!");
// });

// app.get("/hello/:name", (req, res) => {
//   res.send(`GET: Hello ${req.params.name}!`);
// });

// app.post("/hello", (req, res) => {
//   res.send(`POST: Hello ${req.body.name}!`);
// });

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
