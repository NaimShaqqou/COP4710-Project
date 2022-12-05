import React from "react";

import Survey from "material-survey/components/Survey";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";

import { buildPath } from "../buildPath";
import { useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";

function TakeSurvey() {
    const navigate = useNavigate();
    const location = useLocation();
    let user = useSelector((state) => state.user);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        navigate("/viewSurveys");
    };

    const [surveyQuestions, setSurveyQuestions] = React.useState([]);

    React.useEffect(() => {
        async function fetchQuestions() {
            let js = JSON.stringify({ surveyId: location.state.surveyId });

            try {
                const response = await fetch(buildPath("api/getQuestions"), {
                    method: "POST",
                    body: js,
                    headers: { "Content-Type": "application/json" },
                });

                let res = JSON.parse(await response.text());
                console.log(res)

                setSurveyQuestions(res)
            } catch (e) {
                console.log(e)
            }
        }

        fetchQuestions();
    }, [])

    const handleSurveySubmission = async (answers, userId, surveyId) => {
        let js = JSON.stringify({ userId: userId, surveyId: surveyId, answersList: answers });

        try {
            const response = await fetch(buildPath("api/submitSurvey"), {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json" },
            });

            let res = JSON.parse(await response.text());

            if (res.error === "") handleClickOpen();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container maxWidth="lg">
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Survey Complete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Thank you for completing the survey. Your response has been anonymously
                        recorded. Feel free to take any of our other surveys.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Box
                sx={{
                    bgcolor: "background.paper",
                    pt: 8,
                    pb: 6,
                }}
            >

                <Typography variant="h2">
                    {location.state.title}
                </Typography>
                {surveyQuestions.length > 0 && (
                    <Survey
                        onFinish={answers => {
                            handleSurveySubmission(answers, user.id, location.state.surveyId)
                            console.log(answers)
                        }}
                        form={{
                            questions: surveyQuestions
                        }}
                    />
                )}
            </Box>
        </Container>
    )
}

export default TakeSurvey;