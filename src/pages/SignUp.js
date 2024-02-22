// src/components/Signup.js
import React from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { registrationUser } from "../backend/controller/user.controller";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
}));

function Signup() {
  const classes = useStyles();
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigateTo = useNavigate();
  const [formData, setFormData] = React.useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSignUp = (event) => {
    event.preventDefault();

    registrationUser(formData, setIsRegistered, setError);
  };

  React.useEffect(() => {
    if (isRegistered) {
      setFormData({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigateTo("/");
    }
  }, [isRegistered]);

  return (
    <Container
      textAlign={"center"}
      component="main"
      maxWidth="xs"
      className={classes.container}
    >
      <Typography variant="h5" textAlign={"center"}>
        Sign Up
      </Typography>

      {error?.status == "CM400" || error?.status == "CM422" ? (
        <ErrorMessage message={error?.message} />
      ) : null}
      <form className={classes.form} noValidate onSubmit={handleSignUp}>
        <Box marginTop={2}>
          {error?.error?.userName ? (
            <ErrorMessage message={"User name is required!"} />
          ) : null}
          <TextField
            variant="outlined"
            // margin="normal"
            required
            fullWidth
            id="userName"
            label="userName"
            name="userName"
            autoComplete="userName"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </Box>

        <Box marginTop={2}>
          {error?.error?.email ? (
            <ErrorMessage message={"Email is required!"} />
          ) : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Box>
        <Box marginTop={2}>
          {error?.error?.password ? (
            <ErrorMessage message={"Password is required!"} />
          ) : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Box>
        <Box marginTop={2}>
          {error?.error?.confirmPassword ? (
            <ErrorMessage message={"Confirm Password is required!"} />
          ) : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </Box>
        <Box marginTop={2}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </form>
      <Link href="/" variant="body2" style={{ marginTop: "16px" }}>
        Already have an account? Sign In
      </Link>
    </Container>
  );
}

export default Signup;
