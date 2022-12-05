import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from "yup";

import {
  InputLabel,
  OutlinedInput,
  Box,
  Button,
  Grid,
  Container,
  Typography,

  TextField
} from "@mui/material";

import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../store/ActionCreators/";
import { useNavigate } from "react-router-dom";
import { buildPath } from "../../buildPath";


export default function CreateSurvey() {
    const initialValues = {
            title_survey: '',
            description_survey: '',
            participants_emails: [],
            start_survey: '',
            end_survey: '',
            questions_survey: [],
            type1_questions: [],
            type2_questions: []
    }

    const validationSchema = Yup.object().shape({
        title_survey: Yup.string()
            .required("Title required"),
        description_survey: Yup.string()
            .required("description required"),
        participants_emails: Yup.array().of(
            Yup.object().shape({
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required')
            })
        ),
        start_survey: Yup.date().required("Start date required"),
        end_survey: Yup.date().required("End date required"),
        questions_survey: Yup.array().of(
            Yup.object().shape({
                type1_questions: Yup.string()
                    .required("At least one question of this type is required"),
                type2_questions: Yup.string()
                    .required("At least one question of this type is required")
            })
        )
    })

    // const validationSchema = Yup.object().shape({
    //     title_survey: Yup.string()
    //         .required("Title required"),
    //     description_survey: Yup.string(),
    //         // .required("description required"),
    //     participants_emails: Yup.array().of(
    //         Yup.object().shape({
    //             participants_emails: Yup.string()
    //                 .email('Email is invalid')
    //                 // .required('Email is required')
    //         })
    //     ),
    //     start_survey: Yup.date().required("Start date required"),
    //     end_survey: Yup.date().required("End date required"),
    //     questions_survey: Yup.array().of(
    //         Yup.object().shape({
    //             type1_questions: Yup.string(),
    //                 // .required("At least one question of this type is required"),
    //             type2_questions: Yup.string()
    //                 // .required("At least one question of this type is required")
    //         })
    //     )
    // })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const doCreateSurvey = async (values, { setErrors, setStatus }) => {
        let js = JSON.stringify(values);
        try {
            // call login endpoint
            const response = await fetch(buildPath("/api/createSurvey"), {
              method: "POST",
              body: js,
              headers: { "Content-Type": "application/json" },
            });
      
            // get api response
            let res = JSON.parse(await response.text());
      
            // In case of error, we display it in the front-end
            // in case of success, we save the user data in local storage
            if (res.error !== "") {
              setStatus({ success: false });
              setErrors({ submit: res.error });
            } else {
              let user = {
                firstName: res.firstName,
                lastName: res.lastName,
                id: res.id,
                email: res.email,
              };
      
              localStorage.getItem("user_data", JSON.stringify(user));
              dispatch(updateCurrentUser(user));
      
              navigate("../");
            }
          } catch (e) {
            setStatus({ success: false });
            setErrors({ submit: e.toString() });
            return;
          }


        
    }

    function onChangeEmail(e, field, values, setValues) {
        const participants_emails = [...values.participants_emails];
        const numberOfParticipants = e.target.value || 0;
        const previousNumber = parseInt(field.value || '0');
        if (previousNumber < numberOfParticipants) {
            for (let i = previousNumber; i < numberOfParticipants; i++) {
                participants_emails.push({  participants_email: '' });
            }
        } else {
            for (let i = previousNumber; i >= numberOfParticipants; i--) {
                participants_emails.splice(i, 1);
            }
        }
        setValues({ ...values, participants_emails });

        // call formik onChange method
        field.onChange(e);
    }


    function onChangeQuestion(e, field, values, setValues) {
        const questions_survey = [...values.questions_survey];
        const numberOfQuestions = e.target.value || 0;
        const previousNumber = parseInt(field.value || '0');
        if (previousNumber < numberOfQuestions) {
            for (let i = previousNumber; i < numberOfQuestions; i++) {
                questions_survey.push({  questions_survey: '' });
            }
        } else {
            for (let i = previousNumber; i >= numberOfQuestions; i--) {
                questions_survey.splice(i, 1);
            }
        }
        setValues({ ...values, questions_survey });

        // call formik onChange method
        field.onChange(e);
    }

    function onSubmit(fields) {
        // display form field values on success
        console.log('submitting...');
        alert('returned:\n\n' + JSON.stringify(fields, null, 4));
    }


    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} 
                onSubmit={(values, {setSubmitting, setErrors, setStatus }) => {
                    console.log('submitting...');
                    setSubmitting(true);
                    doCreateSurvey(values, { setErrors, setStatus });
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setValues
                }) => (
                    <Container maxWidth='false'>
                        {/* Survey Title */}
                        <Box sx={{ width: 1, height: 100 }}>
                            <Typography variant='h2' align='left' color='text.secondary'>
                                Create a New Survey
                            </Typography>
                        </Box>
                        <Box sx={{ width: 1, height: 100 }}>
                            <InputLabel htmlFor='title_survey'>Title</InputLabel>
                            <OutlinedInput
                                id='title_survey'
                                name='title_survey'
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title_survey || ''}
                            />
                        </Box>
                        {/* Email of participants */}
                        <Box sx={{ width: 1, height: 'auto' }}>
                            <Typography variant='h5'>How many survey invitations would you like to send (max 10): </Typography>
                            <Field name="numberOfParticipants">
                                {({ field }) => (
                                    <select 
                                        {...field} 
                                        className={'form-control' + (errors.numberOfParticipants && touched.numberOfParticipants ? ' is-invalid' : '')} 
                                        onChange={e => onChangeEmail(e, field, values, setValues)}
                                    >
                                        <option value="" ></option>
                                        {[1,2,3,4,5,6,7,8,9,10].map(i => 
                                            <option key={i} value={i}>{i}</option>
                                        )}
                                    </select>
                                )}
                            </Field>
                            <ErrorMessage name="numberOfParticipants" component="Box" className="invalid-feedback" />
                            <FieldArray name="participants">
                                {() => (values.participants_emails.map((element, i) => {
                                    const ticketErrors = errors.participants_emails?.length && errors.participants_emails[i] || {};
                                    const ticketTouched = touched.participants_emails?.length && touched.participants_emails[i] || {};
                                    return (
                                        <Box key={i} className="list-group list-group-flush">
                                            <Box className="list-group-item">
                                                <Typography version='h5' className="card-title" >Email of Participant #{i + 1} </Typography>
                                                <Box className="form-row">
                                                    <Box className="form-group col-6">
                                                        <OutlinedInput 
                                                            name={`participants_emails.${i}.email`} 
                                                            type="text" 
                                                            className={'form-control' + (ticketErrors.email && ticketTouched.email ? ' is-invalid' : '' )}
                                                        />
                                                        <ErrorMessage name={`participants_emails.${i}.email`} component="Box" className="invalid-feedback" />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    );
                                }))}
                            </FieldArray>
                        </Box>
                        {/* Survey Description */}
                        <Box sx={{ width: 1, height: 'auto' }}>
                            <InputLabel htmlFor='description_survey'>Survey Description</InputLabel>
                            <TextField
                                id='description_survey'
                                name='description_survey'
                                type='text'
                                multiline
                                minRows={4}
                                maxRows={4}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description_survey || ''}
                            />
                        </Box>

                        {/* Start Date && End Date */}
                        <Box sx={{ width: 1, height: 'auto' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} noValidate>
                                <Grid item xs={2}>
                                    <InputLabel htmlFor='end_survey'>Start Date</InputLabel>
                                        <TextField
                                            id="end_survey"
                                            type="date"
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                            value={values.end_survey || ''}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <InputLabel htmlFor='end_survey'>End Date</InputLabel>
                                            <TextField
                                                id="end_survey"
                                                type="date"
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                                value={values.end_survey || ''}
                                            />                                
                                    </Grid>
                             </Grid>
                        </Box>

                            {/* Questionaire */}
                            <Box sx={{ width: 1, height: 'auto' }}>
                                <Typography version='h1'>Design Survey Questions</Typography>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} noValidate>
                                <Grid item xs={2}>
                                <Box sx={{ width: 1, height: 'auto' }}>
                                <Field name="numberOfQuestions">
                                    {({ field }) => (
                                        <select 
                                            {...field} 
                                            className={'form-control' + (errors.numberOfQuestions && touched.numberOfQuestions ? ' is-invalid' : '')} 
                                            onChange={e => onChangeQuestion(e, field, values, setValues)}
                                        >
                                            <option value="" ></option>
                                            {[1,2,3,4,5,6,7,8,9,10].map(i => 
                                                <option key={i} value={i}>{i}</option>
                                            )}
                                        </select>
                                    )}
                                </Field>
                                <ErrorMessage name="numberOfQuestions" component="Box" className="invalid-feedback" />
                                <FieldArray name="participants">
                                    {() => (values.questions_survey.map((element, i) => {
                                        const ticketErrors = errors.questions_survey?.length && errors.questions_survey[i] || {};
                                        const ticketTouched = touched.questions_survey?.length && touched.questions_survey[i] || {};
                                        return (
                                            <Box key={i} className="list-question list-question-flush">
                                                <Box className="list-question-item">
                                                    <Typography version='h5' className="card-title" >Questionaire #{i + 1} </Typography>
                                                    <Box className="form-row">
                                                        <Box className="form-question col-6">
                                                            <OutlinedInput 
                                                                name={`participants_emails.${i}.type1_question`} 
                                                                type="text" 
                                                                className={'form-control' + (ticketErrors.email && ticketTouched.email ? ' is-invalid' : '' )}
                                                            />
                                                            <ErrorMessage name={`participants_emails.${i}.type1_question`} component="Box" className="invalid-feedback" />
                                                        </Box>
                                                        <Box className="form-question col-6">
                                                            <OutlinedInput 
                                                                name={`participants_emails.${i}.type2_question`} 
                                                                type="text" 
                                                                className={'form-control' + (ticketErrors.email && ticketTouched.email ? ' is-invalid' : '' )}
                                                            />
                                                            <ErrorMessage name={`participants_emails.${i}.type2_question`} component="Box" className="invalid-feedback" />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        );
                                    }))}
                                </FieldArray>
                                </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={onSubmit(values)}
                            disabled={isSubmitting}
                            >
                            Create Survey
                        </Button>
                    </Container>
                )}

            </Formik>
        </div>
    );
}