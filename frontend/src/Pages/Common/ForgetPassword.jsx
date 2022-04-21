import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockResetIcon from "@mui/icons-material/LockReset";
import LoginIcon from "@mui/icons-material/Login";

import axios from "../../Utils/axios";
import GlowingText from "../../Components/GlowingText";
import PopupAlert from "../../Components/PopupAlert";

import wavyLinesBg from "../../Images/wavyLinesBackground.svg";

import { FORGET_PASSWORD_URL } from "../../Utils/urls";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email,
    };
    setLoading(true);
    try {
      const { data, status, statusText } = await axios.post(
        FORGET_PASSWORD_URL,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(data);
      console.log(status);
      console.log(statusText);
      setRequested(true);
      setLoading(false);
    } catch (err) {
      // notif: user is not verified
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
        height: "100vh",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          mb: { xs: 2, md: 0 },
          mt: { xs: 2, md: -7 },
          py: { xs: 0, md: 8 },
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                pt: { xs: 3, md: 8 },
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
                  <b>Recover</b> Your <GlowingText text="Loyalty Points" />{" "}
                  Account
                </Typography>
                <Box sx={{ display: { xs: "none", md: "inline-grid" } }}>
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
                </Box>
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
              sx={{ mt: { xs: 2 }, pt: { xs: 3 } }}
            >
              <Paper
                sx={{
                  my: { xs: 3, md: 6 },
                  p: { xs: 2, md: 1 },
                  borderRadius: 5,
                }}
                elevation={10}
              >
                <Box
                  sx={{
                    my: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ mb: 2, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  {requested ? (
                    <Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        align="center"
                        color="secondary.light"
                      >
                        Kindly, Check Your Email
                      </Typography>
                      <Typography
                        textAlign="center"
                        variant="subtitle2"
                        gutterBottom
                        sx={{ mt: 2 }}
                      >
                        Password Reset Link in sent to your email , You can
                        reset your password there.
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography component="h1" variant="h5" align="center">
                        Forget Password
                      </Typography>
                      <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                      >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          label="Email Address"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          autoFocus
                          helperText="we will send the reset link to your email"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Box
                          sx={{
                            my: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={email.length >= 5 ? false : true}
                            endIcon={<LockResetIcon />}
                          >
                            Reset Password
                          </Button>
                          <Button
                            href="/login"
                            size="small"
                            sx={{
                              mt: 2,
                            }}
                            endIcon={<LoginIcon />}
                          >
                            Go Sign IN
                          </Button>
                        </Box>
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
                          aria-describedby="loading for ForgetPassword Request"
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
                  )}
                </Box>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
