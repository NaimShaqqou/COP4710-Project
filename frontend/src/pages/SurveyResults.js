import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

import { buildPath } from "../buildPath";
// import { createCipheriv } from 'crypto';

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

import { QuestionAnswer, ExpandMore } from "@mui/icons-material";

import { variance } from "mathjs";

function SurveyResults() {
  const location = useLocation();

  const [surveyQuestions, setSurveyQuestions] = React.useState([]);
  const [surveyResults, setSurveyResults] = React.useState([]);
  async function fetchQuestions() {
    let js = JSON.stringify({ surveyId: location.state.surveyId });

    try {
      const response = await fetch(buildPath("api/getQuestions"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      let res = JSON.parse(await response.text());
      console.log(res);

      setSurveyQuestions(res);
    } catch (e) {
      console.log(e);
    }
    console.log("get questions");
  }

  async function gatherResults() {
    let js = JSON.stringify({ surveyId: location.state.surveyId });

    try {
      const response = await fetch(buildPath("api/getAnswers"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      let res = JSON.parse(await response.text());
      console.log(res);

      setSurveyResults(res.answersList);
    } catch (e) {
      console.log(e);
    }
    console.log("gather results");
  }

  React.useEffect(() => {
    fetchQuestions();
    gatherResults();
  }, []);

  const MeanVariance = ({ answers }) => {
    const sum = answers.reduce((partialSum, a) => partialSum + a, 0);
    const mean = sum / answers.length;
    const varnc = variance(answers);

    return (
      <>
        <Typography>Mean: {mean}</Typography>
        <Typography>Variance: {varnc}</Typography>
      </>
    );
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" sx={{ mt: 4 }}>{location.state.title}</Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ wordWrap: "break-word" }}
      >
        Start Date: {new Date(location.state.start).toLocaleDateString()}
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ wordWrap: "break-word" }}
      >
        End Date: {new Date(location.state.end).toLocaleDateString()}
      </Typography>

      <Typography variant="body1" sx={{ mt: 4 }}>Description:</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>{location.state.description}</Typography>

      <Typography variant="h4" sx={{ mt: 4 }}>Survey Questionnaire</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {surveyQuestions.length > 0 &&
          surveyQuestions.map((question) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <QuestionAnswer />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={question.title}
                secondary={question.type === "slider" ? "Type 1" : "Type 2"}
              />
            </ListItem>
          ))}
      </List>

      <Typography variant="h4">Survey Answers</Typography>
      {surveyResults.length > 0 &&
        surveyResults.map((answer, index) => (
          // <ListItem>
          //     <ListItemAvatar>
          //         <Avatar>
          //             <QuestionAnswerIcon />
          //         </Avatar>
          //     </ListItemAvatar>
          //     <ListItemText
          //         primary={surveyQuestions[index].type === "slider" ? "[Type 1] " : "[Type 2] " + surveyQuestions[index].title}
          //         secondary={surveyQuestions[index].type === "slider" ? "Type 1" : "Type 2"}
          //     />
          // </ListItem>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {"Q" +
                  (index + 1) +
                  ". " +
                  (surveyQuestions[index].type === "slider"
                    ? "[Type 1] "
                    : "[Type 2] ") +
                  surveyQuestions[index].title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {answer.type === 1 && <MeanVariance answers={answer.answers} />}
              {answer.type === 2 &&
                answer.answers.map((ans, index) => (
                  <Typography>
                    {index + 1}. {ans}
                  </Typography>
                ))}
            </AccordionDetails>
          </Accordion>
        ))}
    </Container>
  );
}

export default SurveyResults;
