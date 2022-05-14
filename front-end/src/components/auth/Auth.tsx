import React, { useState, useContext, useRef, ChangeEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ExploreIcon from "@mui/icons-material/Explore";
import Alert from "@mui/material/Alert";

import authImage from "../../static/images/elephant.jpg";
import AuthContext from "../../store/auth-context";
import { validateInputs } from "../../util/helpers";

const theme = createTheme();

const Auth = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailInputRef = useRef<{ value: string }>();
  const passwordInputRef = useRef<{ value: string }>();
  const nameInputRef = useRef<{ value: string }>();

  const [isLogin, setIsLogin] = useState(true);
  const [validInputs, setValidInputs] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let name;
    if (!isLogin) name = nameInputRef.current?.value.trim();
    const email = emailInputRef.current?.value.trim();
    const password = passwordInputRef.current?.value.trim();

    const url = `${process.env.REACT_APP_API_URL}/api/auth/${
      isLogin ? "login" : "signup"
    }`;
    const body = {
      ...(!isLogin && { name }),
      email,
      password,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.token) {
          const error = new Error(data.message);
          switch (data.field) {
            case "name":
              setIsNameError(true);
              break;
            case "email":
              setIsEmailError(true);
              break;
            case "password":
              setIsPasswordError(true);
          }
          throw error;
        }

        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.token, expirationTime.toISOString());
        navigate(`/habits`);
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  const onChangeHandler: ChangeEventHandler = () => {
    if (errorMsg) {
      setErrorMsg("");
      setIsNameError(false);
      setIsEmailError(false);
      setIsPasswordError(false);
    }

    const isValid = validateInputs(
      isLogin,
      emailInputRef.current!.value,
      passwordInputRef.current!.value,
      nameInputRef.current ? nameInputRef.current!.value : ""
    );

    setValidInputs(isValid);
  };

  const exploreHandler = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/horton`;
    fetch(url, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.token) throw new Error(data.message);
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.token, expirationTime.toISOString());
        navigate(`/habits`);
      })
      .catch((err) => alert(err.message));
  };

  const switchModeHandler = () => {
    setIsLogin((prevMode) => !prevMode);
    const isValid = validateInputs(
      !isLogin,
      emailInputRef.current!.value,
      passwordInputRef.current!.value,
      nameInputRef.current ? nameInputRef.current!.value : ""
    );

    setValidInputs(isValid);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${authImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h1"
              sx={{ color: "#ff7f02", fontWeight: "bold" }}
            >
              nudge
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={submitHandler}
              sx={{ mt: 1 }}
            >
              {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
              {!isLogin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  error={isNameError}
                  autoFocus
                  inputProps={{ ref: nameInputRef }}
                  onChange={onChangeHandler}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={isEmailError}
                autoFocus
                inputProps={{ ref: emailInputRef }}
                onChange={onChangeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={isPasswordError && true}
                autoComplete="current-password"
                inputProps={{ ref: passwordInputRef }}
                onChange={onChangeHandler}
              />
              <Button
                type="submit"
                disabled={!validInputs}
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#ff7f02",
                  ":hover": { backgroundColor: "#ec5304" },
                }}
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
              <hr style={{ border: "1px solid #dadde1" }} />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#983104",
                  ":hover": { backgroundColor: "#ec5304" },
                }}
                onClick={switchModeHandler}
              >
                {isLogin ? "Switch to Sign Up" : "Switch to Sign In"}
              </Button>
            </Box>
            <Button
              type="button"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                border: "white",
                backgroundColor: "#ff7f02",
                ":hover": {
                  backgroundColor: "#ec5304",
                },
              }}
              onClick={exploreHandler}
              title="Click to explore as Horton"
            >
              <ExploreIcon sx={{ mr: 1 }} />
              EXPLORE
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Auth;
