// src/components/Login.js
import React, { useDebugValue } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { loginUser } from "../backend/controller/user.controller";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/reducer/userSlice";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
}));

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.user);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  // State to manage form inputs
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleLogin = (event) => {
    event.preventDefault();

    loginUser(
      formData,
      (data) => {
        dispatch(addUser(data));
      },
      setLoading,
      setError
    );

    setFormData({
      email: "",
      password: "",
    });
  };

  const handleSignUp = () => {
    // Redirect to the signup page or perform any other action
  };

  React.useEffect(() => {
    if (!loading && Object.keys(users).length) {
      navigate("/contact");
    }
  }, [loading]);

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Typography variant="h5" align="center">
        Login
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleLogin}>
        {error?.status == "CM400" ? (
          <ErrorMessage message={error?.message} />
        ) : null}
        <Box marginTop={2}>
          {error?.error?.email ? (
            <ErrorMessage message={"Email is required!"} />
          ) : null}
          <TextField
            variant="outlined"
            // margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
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
            // margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Box>
        <Box marginTop={2}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
        </Box>
      </form>
      <Link
        href="/sign-up"
        onClick={handleSignUp}
        variant="body2"
        style={{ marginTop: "16px" }}
      >
        Don't have an account? Sign Up
      </Link>
    </Container>
  );
}

export default Login;
