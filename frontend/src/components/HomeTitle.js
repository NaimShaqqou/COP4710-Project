import React from "react";

import { Box, Container, Typography } from "@mui/material";
import HomeButtons from "./HomeButtons";

function HomeTitle() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Group 9 Survey Application
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Our software gives you the tools to ask the right questions, listen to
          what people need, and respond with the right actions, every time. We
          call it empathy at scale — others just call it good business.
        </Typography>
        <HomeButtons />
      </Container>
    </Box>
  );
}

export default HomeTitle;
