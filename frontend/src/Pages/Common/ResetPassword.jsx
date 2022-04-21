import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import UpdateIcon from "@mui/icons-material/Update";

import axios from "../../Utils/axios";
import GlowingText from "../../Components/GlowingText";
import PopupAlert from "../../Components/PopupAlert";

import wavyLinesBg from "../../Images/wavyLinesBackground.svg";

import { RESET_PASSWORD_URL } from "../../Utils/urls";

//password strength check
import { zxcvbn, ZxcvbnOptions } from "@zxcvbn-ts/core";
import zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import zxcvbnEnPackage from "@zxcvbn-ts/language-en";

// options for password checker
const options = {
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
  translations: zxcvbnEnPackage.translations,
};
ZxcvbnOptions.setOptions(options);

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken");

  //password strengh score
  const { score, feedback } = zxcvbn(password);

  const getPassStrentgh = (score) => {
    switch (score) {
      case 0:
        return 1;
      case 1:
        return 10;
      case 2:
        return 40;
      case 3:
        return 80;
      case 4:
        return 100;

      default:
        return 1;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resetToken) {
      setError("Invalid Url");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password doesn't match with Confirm password");
      return;
    }
    const resetPasswordUrl = `${RESET_PASSWORD_URL}?resetToken=${resetToken}`;
    const credentials = {
      password,
    };
    setLoading(true);
    try {
      const { data, status, statusText } = await axios.post(
        resetPasswordUrl,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(data);
      console.log(status);
      console.log(statusText);
      setLoading(false);
      setRequested(true);
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
        height: "110vh",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          mb: { xs: 2, md: 5 },
          mt: { xs: 2, md: -7 },
          pt: { xs: 0, md: 3 },
          pb: { xs: 0, md: 8 },
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
                  my: { xs: 2, md: 6 },
                  p: { xs: 2, md: 3 },
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
                    gap: 1,
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
                        Password Updated
                      </Typography>
                      <Box component="div" sx={{ mt: 2 }}>
                        <Typography
                          textAlign="center"
                          variant="subtitle2"
                          gutterBottom
                        >
                          Now You can use your new password to login
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 3,
                        }}
                      >
                        <Button href="/login" size="small">
                          Go to Sign IN
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <Typography
                        component="h1"
                        variant="h5"
                        align="center"
                        gutterBottom
                      >
                        Reset Password
                      </Typography>
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Tooltip
                          title={`Password Strength is ${
                            score <= 1
                              ? "Weak"
                              : score === 2
                              ? "Average"
                              : score === 3
                              ? "Good"
                              : "Strong"
                          }`}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={getPassStrentgh(score)}
                            color={
                              score <= 1
                                ? "error"
                                : score === 2
                                ? "warning"
                                : "success"
                            }
                            sx={{
                              borderRadius: 5,
                              p: 1,
                              m: 1,
                            }}
                          />
                        </Tooltip>
                      </Box>
                      <Box sx={{ mt: 1 }}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          label="Password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="New Password"
                          autoFocus
                        />
                        {password.length > 4 && (
                          <Box
                            sx={{
                              width: "100%",
                            }}
                          >
                            {/* Password Strength Display */}

                            {feedback.warning.length > 1 && (
                              <Tooltip title="Warning">
                                <Typography
                                  variant="subtitle1"
                                  color="white"
                                  align="center"
                                  sx={{
                                    borderRadius: 2,
                                    m: 1,
                                    p: 1,
                                    background:
                                      "linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)",
                                  }}
                                >
                                  {feedback.warning}
                                </Typography>
                              </Tooltip>
                            )}
                          </Box>
                        )}
                        {feedback.suggestions.length > 1 && (
                          <Tooltip title="Tip">
                            <Typography
                              variant="subtitle2"
                              color="#7177a8"
                              align="center"
                            >
                              Tip : {feedback.suggestions}
                            </Typography>
                          </Tooltip>
                        )}
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          label="Confirm Password"
                          name="confirm password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                          placeholder="Re-Type New Password"
                        />

                        <Button
                          onClick={(e) => handleSubmit()}
                          fullWidth
                          variant="contained"
                          disabled={
                            password.length >= 5 && confirmPassword.length >= 5
                              ? false
                              : true
                          }
                          sx={{
                            my: 2,
                          }}
                          endIcon={<UpdateIcon />}
                        >
                          Update Password
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
                          aria-describedby="loading for Password Reset Request"
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

export default ResetPassword;
