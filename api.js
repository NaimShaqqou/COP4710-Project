exports.setApp = function (app, db) {
  ObjectId = require("mongodb").ObjectId;
  // ADD API ENDPOINTS UNDER HERE

  //--------------------login/password API--------------------//
  app.post("/api/login", async (req, res, next) => {
    // incoming: email, password
    // outgoing: id, firstName, lastName, email, error
    let error = "";

    const { email, password } = req.body;

    try {
      // find the doc in the db that matches the email and password
      const result = await db
        .collection("User")
        .findOne({ email: email.toLowerCase(), password: password });

      let id = -1;
      let fn = "";
      let ln = "";

      if (result != null) {
        id = result._id.valueOf();
        fn = result.firstName;
        ln = result.lastName;
        // email = result.email;
      } else {
        res.status(200).json({ error: "The email or password did not match" });
        return;
      }

      let ret = { id: id, firstName: fn, lastName: ln, email: email, error: "" };
      res.status(200).json(ret);
    } catch (e) {
      res.status(200).json({ error: "An error has occured" });
      return;
    }
  });

  //--------------------Register API--------------------//
  app.post("/api/register", async (req, res, next) => {
    // incoming: email, password, firstName, lastName
    // outgoing: userId, error

    const { email, password, firstName, lastName } = req.body;
    let valid = true;

    // duplicate email
    if (valid) {
      await db
        .collection("User")
        .findOne({ email: email.toLowerCase() })
        .then((user) => {
          if (user != null) {
            valid = false;
            return res
              .status(200)
              .json({
                id: "-1",
                error: "Email already exists. Please enter a different email.",
              });
          }
        })
        .catch((err) => {
          return res.status(200).json({ id: "-1", error: err.message });
        });
    }

    if (valid) {
      const result = db.collection("User").insertOne(
        {
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email.toLowerCase(),
        },
        function (err, user) {
          if (err) {
            response = {
              id: "-1",
              error: err.message,
            };
          } else {
            console.log(user);
            response = {
              id: user.insertedId,
              error: "",
            };
          }
          res.status(200).json(response);
        }
      );
    }
  });

  //--------------------Get Surveys API--------------------//
  app.post("/api/getSurveys", async (req, res, next) => {
    // incoming: userId
    // outgoing: surveyList

    const { userId } = req.body;

    try {

      // gets all the documents from the collection
      let result = await db.collection("Survey").find().toArray()

      let surveyList = [];
      for (const item of result) {
        let surveyAttempt = await db.collection("Survey Attempts").findOne({ userId: ObjectId(userId), surveyId: item._id });

        if (surveyAttempt != null) {
          surveyList.push({ ...item, is_taken: true })
        } else {
          surveyList.push({ ...item, is_taken: false })
        }
      }

      res.status(200).json(surveyList);

    } catch (err) {
      res.status(200).json({ error: err.message });
    }
  });
};