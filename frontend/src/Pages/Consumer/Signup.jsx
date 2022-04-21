import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import useAuth from "../../Hooks/useAuth";

import GlowingText from "../../Components/GlowingText";
import Signup1 from "../../Components/Consumer/Signup1";
import Signup2 from "../../Components/Consumer/Signup2";
import Signup3 from "../../Components/Consumer/Signup3";

import wavyLinesBg from "../../Images/wavyLinesBackground.svg";

const steps = ["Personal Details", "Account Details", "Review your Account"];

const getStepContent = (userData, handleChange, handleNext, handleBack) => {
  switch (userData.step) {
    case 0:
      return (
        <Signup1
          userData={userData}
          handleChange={handleChange}
          handleNext={handleNext}
        />
      );
    case 1:
      return (
        <Signup2
          userData={userData}
          handleChange={handleChange}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      );
    case 2:
      return <Signup3 userData={userData} handleBack={handleBack} />;
    default:
      throw new Error("Unknown step");
  }
};

const Signup = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/consumer/dashboard";

  useEffect(() => {
    if (auth) {
      navigate(from, { replace: true });
    }
  }, [auth, navigate, from]);

  const smallDevice = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const [userData, setUserData] = useState({
    step: 0,
    firstName: "",
    lastName: "",
    age: 0,
    sex: "",
    bio: "",
    userName: "",
    email: "",
    password: "",
    phoneNo: "",
  });

  const handleNext = () => {
    setUserData((prevData) => ({
      ...prevData,
      step: prevData.step + 1,
    }));
  };

  const handleBack = () => {
    setUserData((prevData) => ({
      ...prevData,
      step: prevData.step - 1,
    }));
  };

  // Handle fields change
  const handleChange = (e) => {
    let value;
    if (e.target.name === "age") {
      value = parseInt(e.target.value) || e.target.value;
    } else {
      value = e.target.value;
    }

    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: value,
    }));
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
          py: { xs: 0, md: 5 },
          mt: { xs: 0, md: -5 },
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="start"
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", md: "inline-grid" } }}
          >
            <Container
              maxWidth="sm"
              sx={{
                pt: { xs: 5, md: 0 },
                pb: { xs: 0, md: 0 },
                mt: 15,
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
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                <b>Create</b> Your <GlowingText text="Loyalty Points" /> Account
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
            <Container component="main" maxWidth="sm" sx={{ mt: { xs: 2 } }}>
              <Box
                sx={{
                  bgcolor: "white",
                  p: 3,
                  borderRadius: 5,
                  boxShadow: 10,
                  mb: 4,
                  borderLeft: "10px solid #1976d2",
                  borderLeftStyle: "inset",
                  transform: "translateY(-100%)",
                  animation: "slide-in 2s forwards ease-out",
                  WebkitAnimation: "slide-in 2s forwards ease-out",
                  "@keyframes slide-in": {
                    "100%": {
                      transform: "translateY(0%)",
                    },
                  },
                }}
              >
                <Stepper
                  activeStep={userData.step}
                  sx={{ ml: { xs: 2, md: 0 } }}
                  orientation={smallDevice ? "vertical" : "horizontal"}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <Paper
                sx={{
                  my: { xs: 3, md: 1 },
                  px: { xs: 2, md: 2 },
                  py: { xs: 2, md: 0 },
                  borderRadius: 5,
                }}
                elevation={10}
              >
                {getStepContent(userData, handleChange, handleNext, handleBack)}
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Signup;

/*
http://localhost:5000/api/signup

{
	"account":{
		"userName":"deepakdk",
		"email":"deepak@gmail.com",
		"password":"neasdf1234",
		"phoneNo":"9876543211"
	},
	"profile":{
		"firstName":"newdeepak",
		"lastName":"dk",//nr
		"age":25,
		"sex":"male",
		"bio":"i'm new so cool" //nr
	}
}
*/
