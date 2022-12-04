import { Grid } from "@mui/material";
import React from "react";

import { useSelector } from "react-redux";

import HomeTitle from "../components/HomeTitle";

function Home() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
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
