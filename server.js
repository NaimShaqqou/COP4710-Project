const express = require("express");
const bodyParser = require("body-parser"); // to parse json
const cors = require("cors"); // prevents cors errors

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI
const client = new MongoClient(url);
client.connect()


// const validateEmail = (email) => {
//   return String(email)
//   .toLowerCase()
//   .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   );
// };

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// const validatePassword = (password, passwordVerify) => {
//     let symbol = /[!@#$%&?]/.test(password);
//     let upperCase = /[A-Z]/.test(password);
//     let length = password.length >= 8;
//     let match = password === passwordVerify && password && passwordVerify;
//     return symbol && upperCase && length && match;
//   };

require("dotenv").config();
const path = require("path");

// const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();
app.use(cors());
app.use(bodyParser.json());


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

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);    
      }

      dbConnection = db.db("LargeProject");
      console.log("Successfully connected to MongoDB.");
      print("Successfully connected to MongoDB.")

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};

//////////////////STILL NEEDS WORK//////////////////////////
//--------------------login/password API--------------------//
app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
  let error = '';
  const { login, password } = req.body;
  try{
    const db = client.db("LargeProject");
    const results = await db.collection('User').find({login:login}).toArray();

    let id = -1;
    let fn = '';
    let ln = '';
    if( results.length > 0 )
    {
      id = results[0]._id;
      fn = results[0].FirstName;
      ln = results[0].LastName;
    }
    else {
      res.status(400).json({error: 'The username or password did not match'});
    }
  }
  catch(e) {
    res.status(400).json({error: 'An error occured'});
  }
  let ret = { id:id, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);
});
