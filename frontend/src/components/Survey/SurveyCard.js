import React from 'react'
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material"

function SurveyCard({ id, title, participants, description, start, end }) {
    return (
        <Grid sx={{ mt: 5 }}>
            <Paper elevation={5}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Stack direction="column" sx={{ width: '100%', height: '100%' }}>

                            <Box sx={{ px: 3, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }} component="div">
                                    {/* {service.Title} */}
                                    {title}
                                </Typography>
                                <Button>
                                    Take Survey
                                </Button>
                            </Box>

                            <Box sx={{ px: 3, pb: 3, display: "flex", justifyContent: "space-between" }}>
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
    )
}

export default SurveyCard