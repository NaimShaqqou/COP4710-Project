const express = require("express");
const bodyParser = require("body-parser"); // to parse json
const cors = require("cors"); // prevents cors errors
require("dotenv").config();

// const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.set('port', PORT)

const api = require("./api.js")
api.setApp(app);

// const url = process.env.MONGODB_URI;
// const mongoose = require("mongoose");
// mongoose.connect(url)
//   .then(() => console.log("Mongo DB connected"))
//   .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
  // Have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, './frontend/build')));

  // All other GET requests not handled before will return our React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
  });
}