import React from "react";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";

import { buildPath } from "../../buildPath";

import { useNavigate } from "react-router-dom";

function SurveyCard({
  id,
  title,
  participants,
  description,
  start,
  end,
  is_taken,
  my_survey,
}) {
  const navigate = useNavigate();

  const doDelete = async () => {
    const js = JSON.stringify({ surveyId: id });

    try {
      try {
        const response = await fetch(buildPath("api/deleteSurvey"), {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        });

        window.location.reload(false);
      } catch (e) {
        console.log(e);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const WhichButton = () => {
    if (my_survey) {
      return (
        <Stack direction="row">
          <Button color="error" onClick={() => doDelete()}>
            Delete
          </Button>
          <Button
            onClick={() =>
              navigate("/surveyResults", {
                state: {
                  surveyId: id,
                  title: title,
                  description: description,
                  start: start,
                  end: end,
                },
              })
            }
          >
            View Results
          </Button>
        </Stack>
      );
    } else if (is_taken) {
      return <Button color="success">Completed</Button>;
    }

    return (
      <Button
        onClick={() =>
          navigate("/takeSurvey", { state: { surveyId: id, title: title } })
        }
      >
        Take Survey
      </Button>
    );
  };

  return (
    <Grid sx={{ mt: 5 }}>
      <Paper elevation={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="column" sx={{ width: "100%", height: "100%" }}>
              <Box
                sx={{ px: 3, display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ fontWeight: "bold" }}
                  component="div"
                >
                  {/* {service.Title} */}
                  {title}
                </Typography>
                <WhichButton />
              </Box>

              <Box
                sx={{
                  px: 3,
                  pb: 3,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ wordWrap: "break-word" }}
                  component="container"
                >
                  {description}
                </Typography>
                <Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ wordWrap: "break-word" }}
                    component="container"
                  >
                    Start: {new Date(start).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ wordWrap: "break-word" }}
                    component="container"
                  >
                    End: &nbsp;&nbsp;{new Date(end).toLocaleDateString()}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default SurveyCard;
