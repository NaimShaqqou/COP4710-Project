import { Typography } from '@mui/material'
import { createCipheriv } from 'crypto';
import React from 'react'

// const fs = require('fs');
// getDocuments(db, function(docs) {
//     console.log('Closing connection.');
//     client.close();

//     // write to file
//     try{
//         fs.writeFileSync('out_file.json', JSON.stringify(docs));
//         console.log('Finished writing');
//     }catch(err) {
//         console.log('Error writing', err);
//     }
// });

function SurveyResults({ }) {
    const [surveyQuestions, setSurveyQuestions] = React.useState([]);

    async function fetchQuestions() {
        // let js = JSON.stringify({ surveyId: location.state.surveyId });

        // try {
        //     const response = await fetch(buildPath("api/getQuestions"), {
        //         method: "POST",
        //         body: js,
        //         headers: { "Content-Type": "application/json" },
        //     });

        //     let res = JSON.parse(await response.text());
        //     console.log(res)

        //     setSurveyQuestions(res)
        // } catch (e) {
        //     console.log(e)
        // }
        console.log("get questions")
    }

    async function gatherResults() {
        // let js = JSON.stringify({ surveyId: location.state.surveyId });

        // try {
        //     const response = await fetch(buildPath("api/getQuestions"), {
        //         method: "POST",
        //         body: js,
        //         headers: { "Content-Type": "application/json" },
        //     });

        //     let res = JSON.parse(await response.text());
        //     console.log(res)

        //     setSurveyQuestions(res)
        // } catch (e) {
        //     console.log(e)
        // }
        console.log("gather results")
    }
    
    React.useEffect(() => {
        fetchQuestions();
    }, [])
    return (
        <div>

            <Typography variant='h2'>
                title
            </Typography>
            <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ wordWrap: "break-word" }}
                component="container"
            >
                start date - End date
                {/* Start: {new Date(start).toLocaleDateString()} */}
                {/* End: &nbsp;&nbsp;{new Date(end).toLocaleDateString()} */}
            </Typography>
            
            <Typography variant="body1">
                Survey Description
            </Typography>

            <Typography variant='h4'>
                Questionnaire
            </Typography>
        </div>
    )
}

export default SurveyResults