import React from "react";

import { Formik } from "formik";
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
} from "@mui/material";

// visibility icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../store/ActionCreators/";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logic for button to show/hide password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const doLogin = async (values, { setErrors, setStatus }) => {
    // contains email and password
    let js = JSON.stringify(values);

    try {
      // call login endpoint
      const response = await fetch(buildPath("api/login"), {
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

        localStorage.setItem("user_data", JSON.stringify(user));
        dispatch(updateCurrentUser(user));

        navigate("../");
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
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          console.log("submitting...");
          setSubmitting(true);
          doLogin(values, { setErrors, setStatus });
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
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ mt: 1 }}
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
