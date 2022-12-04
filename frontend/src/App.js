import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

// import {
//   createTheme,
//   ThemeProvider,
// } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar />
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
export default App;
