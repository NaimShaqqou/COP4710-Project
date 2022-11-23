const express = require("express");
const bodyParser = require("body-parser"); // to parse json
const cors = require("cors"); // prevents cors errors
require("dotenv").config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

dbConnection = client.db("LargeProject");
console.log("Successfully connected to MongoDB.");

const PORT = process.env.PORT || 5000;  

const app = express();
app.use(cors());
app.use(bodyParser.json());

const api = require("./api.js")
api.setApp(app, dbConnection);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const path = require("path");
if (process.env.NODE_ENV === "production") {
  // Have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, './frontend/build')));

  // All other GET requests not handled before will return our React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
  });
}
