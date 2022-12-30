const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

//

const uri = `mongodb+srv://${process.env.DT_USER}:${process.env.DT_PASS}@cluster0.2xlnexh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    const addTasksCollection = client.db("dailyTasks").collection("addTasks");

    app.post("/addtasks", async (req, res) => {
      const tasks = req.body;

      const result = await addTasksCollection.insertOne(tasks);
      res.send(result);
    });
    app.get("/addtasks", async (req, res) => {
      const query = {};
      const tasks = await addTasksCollection.find(query).toArray();

      res.send(tasks);
    });
  } finally {
  }
}
run()
  .then()
  .catch((err) => console.error(err));

app.get("/", async (req, res) => {
  res.send("Daily Tasks Server");
});
app.listen(port, () => {
  console.log("Daily Tasks server running on ", port);
});
