import React from "react";

import { Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomeButtons() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return (
    <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
      {user.id === "" ? (
        <>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Sign in
          </Button>
          <Button variant="outlined" onClick={() => navigate("/register")}>
            Create an Account
          </Button>
        </>
      ) : (
        <>
          <Button variant="contained" onClick={() => navigate("/createSurvey")}>Create a Survey</Button>
          <Button variant="outlined" onClick={() => navigate("/viewSurveys")}>Take a Survey</Button>
        </>
      )}
    </Stack>
  );
}

export default HomeButtons;
