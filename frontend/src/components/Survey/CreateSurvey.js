import React from "react";

import { Formik, FieldArray, Field, getIn } from "formik";
import * as Yup from "yup";

import { buildPath } from "../../buildPath";

import {
    FormControl,
    InputLabel,
    FormHelperText,
    OutlinedInput,
    Box,
    Link,
    Button,
    Grid,
    InputAdornment,
    IconButton,
    Container,
    Typography,
    Stack,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";

// calendar stuff
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateSurvey2() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const doCreateSurvey = async (values, { setErrors, setStatus }) => {
        let js = JSON.stringify(values);

        try {
            const response = await fetch(buildPath("api/createSurvey"), {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json" },
            })

            navigate("../")
        } catch (e) {
            setStatus({ success: false });
            setErrors({ submit: e.toString() });
            return;
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 3 }}>
            <Typography variant='h2' align='left' color='text.secondary'>
                Create a New Survey
            </Typography>
            <Formik
                initialValues={{
                    userId: user._id,
                    title_survey: '',
                    description_survey: '',
                    participants_emails: [
                        {
                            email: '',
                        },
                    ],
                    start_survey: null,
                    end_survey: null,
                    questions_survey: [
                        {
                            type: "",
                            title: "",
                            question_num: 0
                        }
                    ],
                }}
                validationSchema={Yup.object().shape({
                    title_survey: Yup.string()
                        .required("Survey title is required"),
                    email: Yup.string().email().max(255).required("Email is required"),
                    start_survey: Yup.string().required("Start date is required"),
                    end_survey: Yup.date().required("End date is required"),
                })}
                onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
                    console.log("submitting...");
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
                    setFieldValue,
                }) => (
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <Typography variant="h5">
                            Describe your survey
                        </Typography>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.title_survey && errors.title_survey)}
                            sx={{ mt: 2 }}
                        >
                            <InputLabel htmlFor="title_survey">Survey Title</InputLabel>
                            <OutlinedInput
                                id="title_survey"
                                name="title_survey"
                                label="Survey Title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title_survey}
                            />
                            {errors.title_survey && touched.title_survey && (
                                <FormHelperText error id="title_survey-helper-text">
                                    {errors.title_survey}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.description_survey && errors.description_survey)}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                id="description_survey"
                                name="description_survey"
                                label="Survey Description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description_survey}
                                multiline
                                minRows={4}
                            />
                            {errors.description_survey && touched.description_survey && (
                                <FormHelperText error id="description_survey-helper-text">
                                    {errors.description_survey}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Typography variant="h5" sx={{ mt: 4 }}>
                            Invite survey participants using email (max: 10)
                        </Typography>
                        <FieldArray name="participants_emails">
                            {({ insert, remove, push }) => (
                                <Stack maxWidth="sm">
                                    {values.participants_emails.length > 0 &&
                                        values.participants_emails.map((participant, index) => {

                                            const email = `participants_emails[${index}].email`;
                                            const touchedEmail = getIn(touched, email);
                                            const errorEmail = getIn(errors, email);

                                            return (
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touchedEmail && errorEmail)}
                                                    sx={{ mt: 2 }}
                                                    key={index}
                                                >
                                                    <Stack direction="row" spacing={2}>
                                                        <TextField
                                                            // component={OutlinedInput}
                                                            fullWidth
                                                            label={"Email"}
                                                            value={participant.email}
                                                            name={`participants_emails.${index}.email`}
                                                            type="email"
                                                            helperText={
                                                                touchedEmail && errorEmail
                                                                    ? errorEmail
                                                                    : ""
                                                            }
                                                            error={Boolean(touchedEmail && errorEmail)}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        <Button
                                                            type="button"
                                                            color="error"
                                                            variant="outlined"
                                                            onClick={() => remove(index)}
                                                        >
                                                            x
                                                        </Button>
                                                    </Stack>
                                                </FormControl>
                                            )
                                        })}
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        size="small"
                                        sx={{ mt: 2 }}
                                        onClick={() => push({ email: '' })}
                                        disabled={values.participants_emails.length >= 10}
                                    >
                                        Add Participant
                                    </Button>
                                </Stack>
                            )}
                        </FieldArray>

                        <Typography variant="h5" sx={{ mt: 4 }}>
                            Select the start and end dates for your survey
                        </Typography>
                        <Stack direction="row" maxWidth="sm" spacing={4} sx={{ mt: 2, alignItems: "center" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id="date-picker-dialog"
                                    label="Start Date"
                                    format="MM/DD/YYYY"
                                    value={values.start_survey}
                                    onChange={value => setFieldValue("start_survey", value)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <Typography variant="h6">
                                to
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id="date-picker-dialog"
                                    label="End Date"
                                    format="MM/DD/YYYY"
                                    value={values.end_survey}
                                    onChange={value => setFieldValue("end_survey", value)}

                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Stack>


                        <Typography variant="h5" sx={{ mt: 4 }}>
                            Add questions to your survey
                        </Typography>
                        <FieldArray name="questions_survey">
                            {({ insert, remove, push }) => (
                                <Stack maxWidth="sm">
                                    {values.questions_survey.length > 0 &&
                                        values.questions_survey.map((question, index) => {

                                            const type = `questions_survey[${index}].question`;
                                            const touchedType = getIn(touched, type);
                                            const errorType = getIn(errors, type);

                                            return (
                                                <div key={index}>
                                                    <Typography sx={{ mt: 2 }}>
                                                        Question #{index + 1}
                                                    </Typography>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touchedType && errorType)}
                                                        sx={{ mt: 2 }}
                                                        key={index}
                                                    >

                                                        <Stack direction="row" >
                                                            <InputLabel id={`questions_survey.${index}.type`}>Type</InputLabel>

                                                            <Select
                                                                labelId={`questions_survey.${index}.type`}
                                                                id="demo-simple-select"
                                                                name={`questions_survey.${index}.type`}
                                                                value={question.type}
                                                                label="Type"
                                                                onChange={handleChange}
                                                                fullWidth
                                                                sx={{ mr: 2 }}
                                                            >
                                                                <MenuItem value={"rating"}>Type 1</MenuItem>
                                                                <MenuItem value={"text"}>Type 2</MenuItem>
                                                            </Select>

                                                            <Button
                                                                type="button"
                                                                color="error"
                                                                variant="outlined"
                                                                onClick={() => remove(index)}
                                                            >
                                                                x
                                                            </Button>
                                                        </Stack>
                                                        <TextField
                                                            // component={OutlinedInput}
                                                            fullWidth
                                                            label={"Question"}
                                                            value={question.title}
                                                            name={`questions_survey.${index}.title`}
                                                            type="text"
                                                            helperText={
                                                                touchedType && errorType
                                                                    ? errorType
                                                                    : ""
                                                            }
                                                            error={Boolean(touchedType && errorType)}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            sx={{ mt: 2 }}
                                                        />
                                                    </FormControl>
                                                </div>
                                            )
                                        })}
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        size="small"
                                        sx={{ mt: 2 }}
                                        onClick={() => push({ type: '', title: '', question_num: values.questions_survey.length })}
                                    >
                                        Add Question
                                    </Button>
                                </Stack>
                            )}
                        </FieldArray>






                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            sx={{ mt: 3 }}
                            disabled={isSubmitting}
                        >
                            Create Survey
                        </Button>
                    </Box>
                )}
            </Formik>
        </Container >
    )
}

export default CreateSurvey2