const express = require("express");

const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();

// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb url";
// const client = new MongoClient(url);
// client.connect();

app.set('port', PORT)

app.get("", (req, res) => {
    res.json({ message: "Hello from server!" });
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// ADD API ENDPOINTS UNDER HERE
// EXAMPLE:
app.post("/api/example", async (req, res, next) => {
    console.log("called example api");
    res.render("index", {apires: "Called example api"})
});