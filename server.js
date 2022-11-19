const express = require("express");

const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();

// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb url";
// const client = new MongoClient(url);
// client.connect();

app.set('port', PORT)

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './frontend/build')));

// ADD API ENDPOINTS UNDER HERE
// EXAMPLES:
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
})

app.post("/api/example", async (req, res, next) => {
    console.log("called example api");
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});