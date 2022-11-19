const express = require("express");

const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();

app.set('port', PORT)

// Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

app.get("", (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
})

// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb url";
// const client = new MongoClient(url);
// client.connect();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// ADD API ENDPOINTS UNDER HERE
// EXAMPLE:
app.get("/api/example", async (req, res, next) => {
    console.log("called example api");
});

// For Heroku deployment
// Server static assets if in production
// if (process.env.NODE_ENV === 'production') 
// {
//     // Set static folder
//     app.use(express.static('frontend/build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     });
// }