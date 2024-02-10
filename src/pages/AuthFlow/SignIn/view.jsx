import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import AIIMAGE from "../../../assets/images/aiteacher.jpg";
import Logo from "../../../assets/images/logo.png";

import {
  CircularProgress,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
  Grid,
  CssBaseline,
  Paper,
  Button,
  TextField,
  Box,
} from "@mui/material";
import {
  AccountCircle,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const defaultTheme = createTheme();

const useStyles = makeStyles({
  main: {
    backgroundImage: `url(${AIIMAGE})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  rightGrid: {
    display: "flex",
    justifyContent: "center",
  },
  rightMainBox: {
    my: 8,
    mx: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    mt: 2,
    mb: 2,
    height: "3rem",
    background: "#0055FF",
    color: "#FFF",
    fontFamily: "Outfit",
    textTransform: "capitalize",
  },
  textField: {
    backgroundColor: "#FFFFFF",
    mt: 1,
    fontFamily: "Outfit",
    "& label.Mui-focused": {
      color: "#0055FF",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#0055FF",
      },
    },
  },
});

const SignInView = ({
  isLoading,
  password,
  isPasswordDirty,
  passwordIsValid,
  setIsPasswordDirty,
  showPassword,
  emaiIsValid,
  isEmailDirty,
  setIsEmailDirty,
  email,
  handleClickShowPassword,
  handleEmailOnchange,
  handleMouseDownPassword,
  handlePasswordOnChange,
  handleSubmit,
}) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.main} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className={classes.rightGrid}
        >
          <Box className={classes.rightMainBox}>
            <Box component="img" sx={{ m: 1 }} src={Logo} height={60} />
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontSize: 20,
              }}
            >
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                mx: 4,
              }}
            >
              <InputLabel
                sx={{
                  color: "#312E49",
                  fontWeight: 500,
                  fontFamily: "Outfit",
                }}
              >
                Email
              </InputLabel>
              <TextField
                className={classes.textField}
                margin="normal"
                placeholder="Your email"
                required
                autoComplete="off"
                fullWidth
                error={!emaiIsValid && isEmailDirty ? true : false}
                value={email}
                onChange={(e) => handleEmailOnchange(e)}
                id="email"
                // label='Email'
                FormHelperTextProps={{
                  style: {
                    backgroundColor: "#fff",
                    marginLeft: "0rem",
                    marginRight: "0rem",
                    marginTop: "0rem",
                  },
                }}
                inputProps={{
                  onBlur: () => {
                    setIsEmailDirty(true);
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                size="large"
                helperText={
                  !emaiIsValid && isEmailDirty
                    ? email == ""
                      ? "Please enter email"
                      : "Please enter valid email"
                    : ""
                }
              />
              <InputLabel
                sx={{
                  color: "#312E49",
                  fontWeight: 500,
                  fontFamily: "Outfit",
                }}
              >
                Password
              </InputLabel>
              <TextField
                className={classes.textField}
                id="password"
                error={!passwordIsValid && isPasswordDirty ? true : false}
                value={password}
                fullWidth
                placeholder="Your password"
                onInput={() => setIsPasswordDirty(true)}
                onChange={(e) => handlePasswordOnChange(e)}
                onBlur={() => setIsPasswordDirty(true)}
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {!passwordIsValid && isPasswordDirty ? (
                <FormHelperText sx={{ color: "red" }}>
                  Password must be greater than 7 characters
                </FormHelperText>
              ) : (
                ""
              )}
              <p
                style={{
                  fontSize: "16px",
                  marginTop: "40px",
                  fontWeight: 300,
                  color: "#6A717F",
                  fontFamily: "Outfit",
                }}
              >
                By signing in, you’re agree to our{" "}
                <strong>Terms & Condition</strong> and{" "}
                <strong>Privacy Policy</strong>.
              </p>
              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                variant="contained"
                className={classes.button}
              >
                {isLoading ? (
                  <CircularProgress
                    color="inherit"
                    size="1rem"
                    sx={{ mr: 2 }}
                  />
                ) : (
                  ""
                )}
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignInView;
