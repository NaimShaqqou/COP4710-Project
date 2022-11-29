exports.setApp = function (app, db) {
    // import mongoDB schemas and models

    // ADD API ENDPOINTS UNDER HERE
    // EXAMPLES:
    app.get("/api", (req, res) => {
        res.json({ message: "Hello from server! (This is from an api call)" });
    })
    
    app.post("/api/example", async (req, res, next) => {
        console.log("called example api");
    });

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
        finally{
            await client.close();
        }
    });

    app.post('/api/createSurvey', async (req, res, next) => {
        /* incoming: 
                    1) title of survey 
                    2) list of email addresses of survey participants
                    3) description of the survey
                    4) survey start date
                    5) survey end date
                    6) survey questionnaire
                        ➢Type-1 (default) question receives a number between 1 and 5 as the answer, with 1 being most 
                                negative and 5 most positive
                        ➢ Type-2 question receives a text answer up to 200 words
        */
        let error = '';
        const { survey_title, email_list, survey_description, survey_start, survey_end, survey_questions } = req.body;
        try{
            const doc = {
                survey_title: "", 
                email_list: "", 
                survey_description: "", 
                survey_start: "", 
                survey_end: "", 
                survey_questions: ""
            }
            const results = await db.collection('Survey').insertOne(doc);
            console.log(`A document was inserted with the _id: ${results.insertedId}`);        }
        catch(e){
            res.status(400).json({error: 'An error occured'});

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