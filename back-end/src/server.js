import express from "express";
import { MongoClient, ReturnDocument, ServerApiVersion } from "mongodb";

let db;
const connectToDb = async () => {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  db = client.db("full-stack-react-db");
};

const app = express();
app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const article = await db.collection("articles").findOne({ name });
  res.json(article);
});

app.get("/api/articles", async (req, res) => {
  const articles = await db.collection("articles").find({}).toArray();
  res.json(articles);
});

app.post("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const article = await db
    .collection("articles")
    .findOneAndUpdate(
      { name },
      { $inc: { upvotes: 1 } },
      { returnDocument: "after" },
    );
  res.json(article);
});

app.post("/api/articles/:name/comment", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const article = await db
    .collection("articles")
    .findOneAndUpdate(
      { name },
      { $push: { comments: { text, postedBy } }, $set: {} },
      { returnDocument: "after" },
    );

  res.json(article);
});

const start = async () => {
  await connectToDb();
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
};

start();
