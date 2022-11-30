import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";

import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

// import {
//   createTheme,
//   ThemeProvider,
// } from "@mui/material";

function App() {
  // const theme = createTheme({
  //   typography: {
  //     fontFamily: [
  //       'Comfortaa',
  //       'Roboto',
  //       '"Helvetica"',
  //       'Arial',
  //       'sans-serif'
  //     ].join(','),
  //   },
  // });

  return (
    // <ThemeProvider theme={theme}>
    // </ThemeProvider>
    <div>
      <BrowserRouter>
        <NavBar />
        <Router />
      </BrowserRouter>
    </div>
  );
}
export default App;
