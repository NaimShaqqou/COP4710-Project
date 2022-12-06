import {
  Avatar,
  Button,
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

import { QuestionAnswer, ExpandMore } from "@mui/icons-material";

import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
} from "@react-pdf/renderer";

import { variance } from "mathjs";

function SurveyResults() {
  const MyDoc = ({ title, description, start, end, answers, questions }) => (
    <Document>
      <Page>
        <View style={{ fontSize: 24 }}>
          <Text>Survey title: {title}</Text>
        </View>
        <View style={{ fontSize: 14, marginTop: 2 }}>
          <Text>Survey description: {description}</Text>
        </View>
        <View style={{ fontSize: 10, marginTop: 2 }}>
          <Text>Start date: {new Date(start).toLocaleDateString()}</Text>
        </View>
        <View style={{ fontSize: 10 }}>
          <Text>End date: {new Date(end).toLocaleDateString()}</Text>
        </View>

        <View style={{ fontSize: 24, marginTop: 4 }}>
          <Text>Survey Questionnaire and Answers</Text>
        </View>

        {answers.map((answer, index) => {
          return (
            <View style={{ fontSize: 14, marginTop: 8 }}>
              <Text>
                {"[" +
                  (questions[index].type === "slider" ? "Type 1" : "Type 2") +
                  "] " +
                  questions[index].title}
              </Text>

              {answer.type === 1 && (
                <>
                  <View style={{ fontSize: 10 }}>
                    <Text>
                      {"Mean: " + pdfMeanAndVariance(answer.answers).mean}
                    </Text>
                  </View>
                  <View style={{ fontSize: 10 }}>
                    <Text>
                      {"Variance: " +
                        pdfMeanAndVariance(answer.answers).variance}
                    </Text>
                  </View>
                </>
              )}
              {answer.type === 2 &&
                answer.answers.map((ans, index) => {
                  return (
                    <View style={{ fontSize: 10 }}>
                      <Text>
                        {index + 1}. {ans}
                      </Text>
                    </View>
                  );
                })}
            </View>
          );
        })}
      </Page>
    </Document>
  );

  const pdfMeanAndVariance = (answers) => {
    const sum = answers.reduce((partialSum, a) => partialSum + a, 0);
    const mean = sum / answers.length;
    const varnc = variance(answers);

    return {
      mean: mean,
      variance: varnc,
    };
  };

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
      <Typography variant="h2" sx={{ mt: 4 }}>
        {location.state.title}
      </Typography>
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
      <PDFDownloadLink
        document={
          <MyDoc
            title={location.state.title}
            description={location.state.description}
            start={location.state.start}
            end={location.state.end}
            answers={surveyResults}
            questions={surveyQuestions}
          />
        }
        fileName={`${location.state.title}_report.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : (<Button>Download PDF</Button>)
        }
      </PDFDownloadLink>

      <Typography variant="body1" sx={{ mt: 4 }}>
        Description:
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {location.state.description}
      </Typography>

      <Typography variant="h4" sx={{ mt: 4 }}>
        Survey Questionnaire
      </Typography>
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
