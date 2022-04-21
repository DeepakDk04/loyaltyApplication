import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import axios from "../../Utils/axios";
import GlowingText from "../../Components/GlowingText";
import PopupAlert from "../../Components/PopupAlert";

import wavyLinesBg from "../../Images/wavyLinesBackground.svg";

import { VERIFY_BASE_URL } from "../../Utils/urls";

const VerifyConsumer = () => {
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const token = params.token;
  const emailId = searchParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !emailId) {
      setError("Invalid Url");
      return;
    }
    const VERIFY_URL = `${VERIFY_BASE_URL}/${token}?email=${emailId}`;
    const credentials = {
      password: password,
    };
    setLoading(true);
    try {
      const { data, status, statusText } = await axios.post(
        VERIFY_URL,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(data);
      console.log(status);
      console.log(statusText);
      // notif: user is verified
      setSuccess("You are Verified");
      setLoading(false);
      setVerified(true);
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
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                py: 8,
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
                  <Box>
                    {" "}
                    <b>Verify </b> Your{" "}
                  </Box>
                  <GlowingText text="Loyalty Points" /> Account
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
              sx={{ mb: { xs: 3 }, pb: { xs: 3 } }}
            >
              <Paper
                sx={{
                  my: { xs: 3, md: 6 },
                  p: { xs: 2, md: 3 },
                  borderRadius: 5,
                }}
                elevation={10}
              >
                {verified ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      mt: 3,
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h5"
                      align="center"
                      color="secondary"
                    >
                      Verified Successfuly
                    </Typography>
                    <Button
                      href="/login"
                      size="small"
                      sx={{
                        m: 3,
                      }}
                    >
                      Go to Login
                    </Button>

                    <PopupAlert
                      message={success}
                      clearMessage={setSuccess}
                      alertType="success"
                    />
                  </Box>
                ) : (
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
                      Verify Your Email
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
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={password.length >= 5 ? false : true}
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Verify Me
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 3,
                      }}
                    >
                      <Button href="/forget-password" size="small">
                        Forgot password?
                      </Button>
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
                        aria-describedby="loading for Verification Request"
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
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VerifyConsumer;
