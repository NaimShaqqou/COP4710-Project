import React from 'react';
import './App.css';
import LoginPage from './pages/Authentication/LoginPage';

// import {
//   createTheme,
//   ThemeProvider,
// } from "@mui/material";

function App() 
{

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
      <LoginPage />
    // </ThemeProvider>
  );
}
export default App;