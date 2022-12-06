const { ObjectId } = require("mongodb");

exports.setApp = function (app, db) {
  let ObjectId = require("mongodb").ObjectId;
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

  //--------------------Get Questions API--------------------//
  app.post("/api/getQuestions", async (req, res, next) => {
    // incoming: surveyId
    // outgoing: questionsList

    const { surveyId } = req.body;

    try {

      // gets all the documents from the collection
      let result = await db.collection("Questions")
        .find({ surveyId: ObjectId(surveyId) })
        .sort({ question_num: 1 })
        .toArray();

      let questionsList = [];
      for (const item of result) {
        if (item.type === "rating") {
          questionsList.push({
            ...item,
            type: "slider",
            min: 1,
            max: 5,
            step: 1,
            name: `${item.question_num}`
          })
        } else {
          questionsList.push({
            ...item,
            type: "multiline-text",
            name: `${item.question_num}`,
            validators: [{
              type: "text",
              maxLength: 200,
              text: "Maximum Length Exceeded!"
            }]
          })
        }
      }

      res.status(200).json(questionsList);

    } catch (err) {
      res.status(200).json({ error: err.message });
    }
  });

  //--------------------Submit Survey API--------------------//
  app.post("/api/submitSurvey", async (req, res, next) => {
    // incoming: userId, surveyId, answersList
    // outgoing: error

    const { userId, surveyId, answersList } = req.body;

    try {
      // create a new survey submission for the user
      const result = db.collection("Survey Attempts").insertOne(
        {
          userId: ObjectId(userId),
          surveyId: ObjectId(surveyId),
          answers: Object.values(answersList),
        },
        function (err, submission) {
          if (err) {
            response = {
              id: "-1",
              error: err.message,
            };
          } else {
            console.log(submission);
            response = {
              id: submission.insertedId,
              error: "",
            };
          }
          res.status(200).json(response);
        }
      );

    } catch (err) {
      res.status(200).json({ error: err.message });
    }
  });

  //--------------------Create Survey API--------------------//
  app.post("/api/createSurvey", async (req, res, next) => {
    // incoming: title_survey, description_survey, participants_emails, start_survey, end_survey, questions_survey,
    // outgoing: id, error

    const {
      userId,
      title_survey,
      description_survey,
      participants_emails,
      start_survey,
      end_survey,
      questions_survey,
    } = req.body;
    let valid = true;


    try {
      const result = db.collection("Survey").insertOne(
        {
          userId: ObjectId(userId),
          title_survey: title_survey,
          description_survey: description_survey,
          participants_emails: participants_emails,
          start_survey: start_survey,
          end_survey: end_survey,
        },
        function (err, submission) {
          if (err) {
            response = {
              id: "-1",
              error: err.message,
            };
          } else {
            console.log(submission);
            for (question of questions_survey) {
              question["surveyId"] = ObjectId(submission.insertedId)
            }

            let res = db.collection("Questions").insertMany(questions_survey)
            response = {
              id: submission.insertedId,
              error: "",
            };
          }
          res.status(200).json(response);
        }
      );
    } catch (err) {
      res.status(200).json({ error: err.message });
    }
  });
};