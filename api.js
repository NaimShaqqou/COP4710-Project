exports.setApp = function (app, db) {
  // ADD API ENDPOINTS UNDER HERE

  //--------------------login/password API--------------------//
  app.post("/api/login", async (req, res, next) => {
    // incoming: email, password
    // outgoing: id, firstName, lastName, error
    let error = "";

    const { email, password } = req.body;

    try {
        // find the doc in the db that matches the email and password
      const result = await db
        .collection("User")
        .findOne({ email: email, password: password });

      let id = -1;
      let fn = "";
      let ln = "";

      if (result != null) {
        id = result._id;
        fn = result.firstName;
        ln = result.lastName;
      } else {
        res.status(200).json({ error: "The email or password did not match" });
        return;
      }

      let ret = { id: id, firstName: fn, lastName: ln, error: "" };
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
};

// const validatePassword = (password, passwordVerify) => {
//     let symbol = /[!@#$%&?]/.test(password);
//     let upperCase = /[A-Z]/.test(password);
//     let length = password.length >= 8;
//     let match = password === passwordVerify && password && passwordVerify;
//     return symbol && upperCase && length && match;
//   };

// const validateEmail = (email) => {
//   return String(email)
//   .toLowerCase()
//   .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   );
// };
