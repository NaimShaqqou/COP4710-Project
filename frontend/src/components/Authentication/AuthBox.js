import React from "react";

import { Avatar, Card, Box, Grid, Typography, Stack } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { styled } from "@mui/material/styles";

const AuthWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: "100vh",
}));

function AuthBox({ header, subtitle, form }) {
  return (
    <AuthWrapper>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <Card
                sx={{
                  maxWidth: { xs: 400, lg: 475 },
                  margin: { xs: 2.5, md: 3 },
                  "& > *": {
                    flexGrow: 1,
                    flexBasis: "50%",
                  },
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
                  <Grid
                    item
                    xs={12}
                    container
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography gutterBottom variant={"h3"}>
                        {header}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontSize="16px"
                        textAlign={"center"}
                      >
                        {subtitle}
                      </Typography>
                    </Stack>
                    {form}
                  </Grid>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

export default AuthBox;
