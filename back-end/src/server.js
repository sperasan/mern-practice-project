import express from "express";
import { MongoClient, ReturnDocument, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";
import fs from "fs";

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

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

app.use(async (req, res, next) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    const user = await admin.auth().verifyIdToken(authtoken);
    req.user = user;
    next();
  } else {
    res.sendStatus(400);
  }
});

app.post("/api/articles/:name/upvote", async (req, res) => {
  const { uid } = req.user;
  const { name } = req.params;

  let article = await db.collection("articles").findOne({ name });
  const { upvoteIds = [] } = article;

  if (uid && !upvoteIds.includes(uid)) {
    article = await db.collection("articles").findOneAndUpdate(
      { name },
      {
        $inc: { upvotes: 1 },
        $push: { upvoteIds: uid },
      },
      { returnDocument: "after" },
    );
    res.json(article);
  } else {
    res.sendStatus(403);
  }
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
