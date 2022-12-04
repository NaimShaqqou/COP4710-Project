import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { buildPath } from '../buildPath';

import SurveyCard from "../components/Survey/SurveyCard"

function ViewSurveys() {
    const [surveyList, setSurveyList] = useState([]);
    const user = useSelector((state) => state.user);

    useEffect(() => {

        // call the get surveys api endpoint
        console.log("call get surveys")
        async function fetchSurveys() {
            let js = JSON.stringify({ userId: user.id });
    
            try {
                const response = await fetch(buildPath("api/getSurveys"), {
                    method: "POST",
                    body: js,
                    headers: { "Content-Type": "application/json" },
                });

                let res = JSON.parse(await response.text());
                console.log(res)

                setSurveyList(res)
            } catch (e) {
                console.log(e)
            }

        }
        
        fetchSurveys();
    }, [])

    return (
        <div>
            <Box
                sx={{
                    bgcolor: "background.paper",
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h2">
                        Available Surveys
                    </Typography>

                    {surveyList.length > 0 && surveyList.map((survey) => (
                        <SurveyCard
                            key={survey._id}
                            id={survey._id}
                            title={survey.title_survey}
                            participants={survey.participants_emails}
                            description={survey.description_survey}
                            start={survey.start_survey}
                            end={survey.end_survey}
                        />
                    ))}
                </Container>
            </Box>
        </div>
    )
}

export default ViewSurveys