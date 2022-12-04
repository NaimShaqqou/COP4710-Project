import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import SurveyCard from "../components/Survey/SurveyCard"

function ViewSurveys() {
    const [surveyList, setSurveyList] = useState([]);

    useEffect(() => {

        // call the get surveys api endpoint
        console.log("call get surveys")
        setSurveyList([
            {
                survey_id: "638bcac7c4cde779b1937183",
                title_survey: "Naim Test Survey",
                participants_emails: ["naeemshaqqou@gmail.com"],
                description_survey: "This is a test survey made by Naim",
                start_survey: new Date("2022-12-01T05:00:00.000+00:00"),
                end_survey: new Date("2022-12-16T05:00:00.000+00:00"),
            },
            {
                survey_id: "638bdbb1f0fbe4ffedd7575b",
                title_survey: "title survey",
                participants_emails: ["participants emails"],
                description_survey: "description survey",
                start_survey: new Date("2022-12-01T05:00:00.000+00:00"),
                end_survey: new Date("2022-12-16T05:00:00.000+00:00"),
            }
        ])
        console.log(surveyList)
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
                            key={survey.id}
                            id={survey.id}
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