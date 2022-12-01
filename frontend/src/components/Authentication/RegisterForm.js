import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";

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
} from "@mui/material";

// visibility icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// password strength bar
import PasswordStrengthBar from "react-password-strength-bar";
import { buildPath } from "../../buildPath";

function RegisterForm() {
  // Logic for button to show/hide password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const doRegister = async (values, { setErrors, setStatus }) => {
    console.log("doRegister");

    let js = JSON.stringify(values);

    try {
      const response = await fetch(buildPath("api/register"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      let res = JSON.parse(await response.text());

      if (res.error === "") {
      setStatus({ success: true });
      alert("success");
      } else {
        setStatus({ success: false });
        setErrors({ submit: res.error });
      }
    } catch (e) {
      setStatus({ success: false });
      setErrors({ submit: e.toString() });
      return;
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
          firstName: Yup.string().required("First name is required"),
          lastName: Yup.string().required("Last name is required"),
        })}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          console.log("submitting...");
          setSubmitting(true);
          doRegister(values, { setErrors, setStatus });
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
        }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.firstName && errors.firstName)}
                  sx={{ mt: 1 }}
                >
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <OutlinedInput
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName && (
                    <FormHelperText error id="firstname-helper-text">
                      {errors.firstName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.lastName && errors.lastName)}
                  sx={{ mt: 1 }}
                >
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <OutlinedInput
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName && (
                    <FormHelperText error id="lastname-helper-text">
                      {errors.lastName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ mt: 3 }}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <FormHelperText error id="email-helper-text">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ mt: 3 }}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <PasswordStrengthBar password={values.password} />
              {errors.password && touched.password && (
                <FormHelperText error id="password-helper-text">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
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
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
