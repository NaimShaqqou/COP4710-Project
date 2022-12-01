// import { SurveyCreatorWidget } from '../components/SurveyCreator'

// function CreateSurvey() {
//   return (
//     <div className="App">
//       <SurveyCreatorWidget></SurveyCreatorWidget>
//     </div>
//   );
// }

// export default CreateSurvey;

import React from "react";
import { StylesManager } from "survey-core";
import "survey-core/defaultV2.css";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Fab } from "@mui/material"
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import AddQuestion from './AddQuestion'
StylesManager.applyTheme("defaultV2");


function CreateSurvey() {

  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
      <Typography variant="body1" component="h1" gutterBottom>Select a question type to add</Typography>
      <Typography variant="body2" component="h1" gutterBottom>
        Type 1: Rating from 1-5 (5 being the best)
        <Fab onClick={() => new AddQuestion()} className="addRow" size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Typography>
      <Typography variant="body2" component="h1" gutterBottom>
        Type 2: Free response answer up to 200 words
        <Fab onClick={() => new AddQuestion()} size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Typography>


      </Box>
    </Container>

  );
}
export default CreateSurvey;


    // <div className="questionType-container">
    // <><><><h3>Select a question type to add</h3>
    //   <h4> Type 1: Rating from 1-5 (5 being the best)</h4></>
    //   <h4> Type 2: Free response answer up to 200 words</h4></>
    //   <button></button></>
    // </div>