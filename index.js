const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("portfolio");
    const blogsCollection = db.collection("blog");
    const projectCollection = db.collection("project");
    const skillsCollection = db.collection("project");

    // main code
    //blogs
    app.post("/blog", async (req, res) => {
      const { image, title, description } = req.body;
      const currentDate = new Date();
      const result = await blogsCollection.insertOne({
        image,
        title,
        description,
        date: currentDate,
      });
      res.send(result);
    });

    app.get("/blogs", async (req, res) => {
      const result = await blogsCollection.find().toArray();
      res.send(result);
    });

    //projects
    app.post("/project", async (req, res) => {
      const data = req.body;
      const result = await projectCollection.insertOne(data);
      res.send(result);
    });

    app.get("/projects", async (req, res) => {
      const result = await projectCollection.find().toArray();
      res.send(result);
    });

    //skills
    app.post("/project", async (req, res) => {
      const data = req.body;
      const result = await skillsCollection.insertOne(data);
      res.send(result);
    });

    app.get("/projects", async (req, res) => {
      const result = await skillsCollection.find().toArray();
      res.send(result);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});
