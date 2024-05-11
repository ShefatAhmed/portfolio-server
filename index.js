const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
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

    app.get('/blog/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await blogsCollection.findOne(query);
      res.send(result);
    })

    app.delete("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogsCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const { image, title, description } = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateData = {
        $set: {
          image,
          title,
          description,
        },
      };
      const result = await blogsCollection.updateOne(filter, updateData);
      res.send(result);
    });

    //projects
    app.post("/project", async (req, res) => {
      const { title, image, description, technology, gitLink, liveLink } =
        req.body;
      const result = await projectCollection.insertOne({
        title,
        image,
        description,
        technology,
        gitLink,
        liveLink,
      });
      res.send(result);
    });

    app.get("/projects", async (req, res) => {
      const result = await projectCollection.find().toArray();
      res.send(result);
    });

    app.get('/project/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await projectCollection.findOne(query);
      res.send(result);
    })

    app.delete("/project/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await projectCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/project/:id", async (req, res) => {
      const id = req.params.id;
      const { title, image, description, technology, gitLink, liveLink } =
        req.body;
      const filter = { _id: new ObjectId(id) };
      const updateData = {
        $set: {
          title,
          image,
          description,
          technology,
          gitLink,
          liveLink,
        },
      };
      const result = await projectCollection.updateOne(filter, updateData);
      res.send(result);
    });

    //skills
    app.post("/skill", async (req, res) => {
      const { skill_name } = req.body;
      const result = await skillsCollection.insertOne({ skill_name });
      res.send(result);
    });

    app.get("/skills", async (req, res) => {
      const result = await skillsCollection.find().toArray();
      res.send(result);
    });

    app.get('/skill/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await skillsCollection.findOne(query);
      res.send(result);
    })

    app.delete("/skill/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await skillsCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/skill/:id", async (req, res) => {
      const id = req.params.id;
      const { skill_name } = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateData = {
        $set: {
          skill_name,
        },
      };
      const result = await skillsCollection.updateOne(filter, updateData);
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
