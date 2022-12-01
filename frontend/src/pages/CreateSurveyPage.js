import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import CreateSurvey from '../components/Survey/CreateSurvey.js'
import CreateCalendar from '../components/Calendar/CreateCalendar'
/* <label for="startDate">Start Date:</label>
<input type="date" id="startDate" name="startDate"></input>
<input type='submit' value='Submit'></input> */
import AddQuestion from '../components/Survey/AddQuestion'

function CreateSurveyPage() {

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="body1" component="h1" gutterBottom>
          Survey Title
        <Input id="outlined-basic" label="Outlined" variant="outlined" defaultValue={'\tTitle'} />
        </Typography>
        <Typography variant="body1" component="h1" gutterBottom >
          Survey Participants
          <Input id="outlined-basic" label="Outlined" variant="outlined" defaultValue={'\texample@email.com'}/>
        </Typography>
        <Typography variant="body1" component="h1" gutterBottom >
          Survey Description
          <Input id="outlined-basic" label="Outlined" variant="outlined" defaultValue={'\tA good survey'}/>
        </Typography>
        <CreateCalendar></CreateCalendar>
        <CreateSurvey></CreateSurvey>
        <AddQuestion></AddQuestion>
      </Box>
    </Container>
  );
}


export default CreateSurveyPage;