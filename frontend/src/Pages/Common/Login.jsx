import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";

import axios from "../../Utils/axios";
import GlowingText from "../../Components/GlowingText";
import PopupAlert from "../../Components/PopupAlert";

import useAuth from "../../Hooks/useAuth";
import useLocalStorage from "../../Hooks/useLocalStorage";

import wavyLinesBg from "../../Images/wavyLinesBackground.svg";

import { SIGNIN_URL } from "../../Utils/urls";

const Login = () => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const { auth, setAuth } = useAuth();
  const [, setUser] = useLocalStorage("user", {});
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/consumer/dashboard";

  useEffect(() => {
    if (auth) {
      navigate(from, { replace: true });
    }
  }, [auth, navigate, from]);

  const loginAccount = async () => {
    const credentials = {
      password: password,
      email: emailOrPhone,
    };
    console.log("account login for ", credentials);
    setLoading(true);
    try {
      const { data, status, statusText } = await axios.post(
        SIGNIN_URL,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(data);
      console.log(status);
      console.log(statusText);

      // save userdata and redirect
      const { accessToken, userData } = data;
      setUser((prev) => {
        console.log(JSON.stringify(prev));
        return { ...prev, accessToken, userData };
      });

      setEmailOrPhone("");
      setPassword("");
      setLoading(false);
      setAuth({ userData, accessToken });
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 500) {
        setError("Server is Busy, Try AfterSometime");
      } else if (err?.response) {
        setError(err.response?.data?.error);
      } else {
        setError("Could Not Reach Server");
      }
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#2fb1ff",
        backgroundImage: `url(${wavyLinesBg})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        height: {
          xs: "85vh",
          md: "100vh",
        },
      }}
    >
      <Box sx={{ flexGrow: 1, mb: { xs: 2, md: 3 }, mt: { xs: 2, md: -9 } }}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", md: "inline-grid" } }}
          >
            <Box
              sx={{
                pt: { xs: 5, md: 8 },
                pb: { xs: 0, md: 8 },
                transform: "translateX(-100%)",
                animation: "slide-in 3s forwards ease-in-out",
                WebkitAnimation: "slide-in 3s forwards ease-in-out",
                "@keyframes slide-in": {
                  "100%": {
                    transform: "translateX(0%)",
                  },
                },
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  <b>Sign In</b> to Your <GlowingText text="Loyalty Points" />{" "}
                  Account
                </Typography>

                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Rewards to the customers for their purchases. Redeem their
                  points on their next purchase.
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    href="/consumer/signup"
                    endIcon={<ArrowRightAltIcon />}
                  >
                    Get Started
                  </Button>
                </Stack>
              </Container>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Container
              component="main"
              maxWidth="xs"
              sx={{ mt: { xs: 3 }, pt: { xs: 3 } }}
            >
              <Paper
                sx={{
                  my: { xs: 3, md: 6 },
                  p: { xs: 2, md: 3 },
                  borderRadius: 5,
                }}
                elevation={10}
              >
                <Box
                  sx={{
                    mt: 2,
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box sx={{ mt: 1 }} component="form">
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Email Address or Phone No (curently email only)"
                      name="emailOrPhone"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onClick={(e) => setChecked(!checked)}
                          name="checked"
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />

                    <Button
                      onClick={(e) => loginAccount()}
                      fullWidth
                      variant="contained"
                      disabled={
                        emailOrPhone.length > 5 && password.length > 5
                          ? false
                          : true
                      }
                      sx={{ mt: 5, mb: 4 }}
                      endIcon={<LoginIcon />}
                    >
                      Sign In
                    </Button>
                    <Grid container sx={{ mt: 2 }}>
                      <Grid item xs>
                        <Link href="/forget-password" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="/consumer/signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loading}
                  >
                    <CircularProgress
                      color="primary"
                      aria-describedby="loading for login"
                      aria-busy={loading}
                      thickness={5}
                      size={80}
                      sx={{
                        background: "rgba( 255, 255, 255, 0.05 )",
                        border: "1px solid rgba( 255, 255, 255, 0.18 )",
                        borderRadius: "50%",
                        p: 1.5,
                        backdropFilter: "blur( 3px )",
                        WebkitBackdropFilter: "blur( 3px )",
                      }}
                    />
                  </Backdrop>
                  <PopupAlert
                    message={error}
                    clearMessage={setError}
                    alertType="error"
                  />
                </Box>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
