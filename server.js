const express = require("express");

const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();

// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb url";
// const client = new MongoClient(url);
// client.connect();

app.set('port', PORT)

// Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

app.set("views", "./pages")
app.set("view engine", "ejs");

app.get("", (req, res) => {
    res.render("index", { apires: ""});
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