exports.setApp = function (app, db) {
    // ADD API ENDPOINTS UNDER HERE

    //////////////////STILL NEEDS WORK//////////////////////////
    //--------------------login/password API--------------------//
    app.post('/api/login', async (req, res, next) => {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
        let error = '';
        const { login, password } = req.body;
        try {
            const results = await db.collection('User').find({login: login}).toArray();

            let id = -1;
            let fn = '';
            let ln = '';
            if (results.length > 0)
            {
                id = results[0]._id;
                fn = results[0].FirstName;
                ln = results[0].LastName;
            }
            else {
                res.status(400).json({error: 'The username or password did not match'});
            }

            console.log(id)
            let ret = { id: id, firstName: fn, lastName: ln, error: ''};
            res.status(200).json(ret);
        } catch(e) {
            res.status(400).json({error: 'An error occured'});
        }
    });

    app.post("/api/register", async (req, res, next) => {
        // incoming: email, password, firstName, lastName, login
        // outgoing: userId, error

        const { email, password, firstName, lastName, login } = req.body;
        let valid = true;

        // duplicate username/email
        await db.collection('User').findOne({login : login.toLowerCase()}).then((user)=>{
            if (user != null)
            {
                valid = false;
                return res.status(200).json({ id: "-1", error: "Username already exists. Please enter a different username." });
            }
        }).catch(err=>{
            return res.status(200).json({ id: "-1", error: err.message});
        }) 

        if (valid){
            await db.collection('User').findOne({email : email.toLowerCase()}).then((user)=>{
            if (user != null)
            {
                valid = false;
                return res.status(200).json({ id: "-1", error: "Email already exists. Please enter a different email." });
            }
            }).catch(err=>{
                return res.status(200).json({ id: "-1", error: err.message});
            }) 
        }
    
        if (valid)
        {
            const result = db.collection('User').insertOne(
            {
                firstName: firstName, 
                lastName: lastName, 
                login: login.toLowerCase(), 
                password: password, 
                email: email.toLowerCase(),
            },
            function (err, user) {
                if (err) {
                    response = {
                        id: "-1",
                        error: err.message
                    };
                } else {
                    console.log(user)
                    response = {
                        id: user.insertedId,
                        error: ""
                    };
                }
                res.status(200).json(response);
            }
            );
        } 
    });
}

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