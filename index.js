const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ooo4k.mongodb.net/reacttodo?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("reacttodo");
    const todoCollection = database.collection("todos");

     // create a todo
     app.post("/todos", async (req, res) => {
      const result = await todoCollection.insertOne(req.body);
      res.send(result);
    });

    // get todos
    app.get("/todos", async (req, res) => {
        const result = await todoCollection.find({}).toArray();
        res.send(result);
    });

    //update a todo
    app.put("/todos/:id", async (req, res) => {
      const id = req.params.id;
      const updatedTodo = req.body;
      const todoToBeUpdated = await todoCollection.findOne({ id: id });

      const options = { upsert: true };
      const todoUpdate = {
        $set: {
          id: todoToBeUpdated.id,
          title: updatedTodo.title,
          description: updatedTodo.description,
          isCompleted: updatedTodo.isCompleted,
        },
      };
      const result = await todoCollection.updateOne(
        {id: todoToBeUpdated.id},
        todoUpdate,
        options
      );
      res.send(result);
    });

    // delete a todo
    app.delete("/todos/:id", async (req, res) => {
      const id = req.params.id;
      const query = { id: id };
      const result = await todoCollection.deleteOne(query);
      res.send(result);
    });

    console.log("connected to reacttodo database");
  } finally {
    //   await client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running react todo server..");
});

app.listen(port, () => {
  console.log("Listening to react todo server on", port);
});


module.exports = app;
