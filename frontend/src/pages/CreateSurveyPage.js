import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import CreateSurvey from '../components/Survey/CreateSurvey'
import CreateCalendar from '../components/Calendar/CreateCalendar'
import AddQuestion from '../components/Survey/AddQuestion'
import render from 'react-dom'

export default function CreateSurveyPage() {

  return (
    <CreateSurvey />
  );
}