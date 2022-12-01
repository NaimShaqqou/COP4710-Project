import { Grid, Typography } from "@mui/material";
import React from "react";

import { useSelector } from "react-redux";

import HomeTitle from "../components/HomeTitle";
import HomeButtons from "../components/HomeButtons";

function Home() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    // <Grid>
    //   <Typography variant="h1">This is the home page.</Typography>
    //   <Typography variant="h1">userID: {user.id}</Typography>
    // </Grid>
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      sx={{ minHeight: "calc(100vh - 68px)" }}
    >
      <HomeTitle />
    </Grid>
  );
}

export default Home;
