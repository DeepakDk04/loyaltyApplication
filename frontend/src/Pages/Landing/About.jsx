import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import GlowingText from "../../Components/GlowingText";

import Hero from "../../Images/transfer-money.svg";
import Wave from "../../Images/wave-bg.svg";

const About = () => {
  return (
    <Box
      component="main"
      sx={{
        position: "relative",
        overflowY: "hidden",
      }}
    >
      {/* Hero unit */}
      <Box sx={{ flexGrow: 1, mb: { xs: 2, md: 6 }, mt: { xs: 0, md: -9 } }}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: { xs: 5, md: 11 },
                pb: { xs: 0, md: 12 },
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  So, <b>What</b> are <GlowingText text="Loyalty Points" />
                </Typography>
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  sx={{ display: { xs: "inline-block", md: "none" } }}
                >
                  So, <b>What</b> are <GlowingText text="Loyalty Points" />
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
                    sx={{
                      zIndex: 2,
                    }}
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
              animation: "float 3s linear infinite alternate",
              WebkitAnimation: "float 3s linear infinite alternate",
              animationDelay: "4s",
              WebkitAnimationDelay: "4s",
              "@keyframes float": {
                "0%": {
                  transform: "translatey(-6px)",
                },
                "50%": {
                  transform: "translatey(6px)",
                },
                "100%": {
                  transform: "translatey(0px)",
                },
              },
              zIndex: -1,
            }}
          >
            {/* Hero Image */}
            <Box
              sx={{
                pt: { xs: 5, md: 12 },
                transform: "translateX(-100%)",
                animation: "slide-in 3s forwards ease-in-out",
                WebkitAnimation: "slide-in 3s forwards ease-in-out",
                "@keyframes slide-in": {
                  "100%": {
                    transform: "translateX(0%)",
                  },
                },
                width: { xs: "380px", md: "700px" },
                height: { xs: "380px", md: "700px" },
              }}
            >
              <img src={Hero} alt="What are Loyalty Points" />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* wave */}
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          animation: "pulse 3s linear infinite alternate",
          "@keyframes pulse": {
            "0%": {
              opacity: 0.6,
              transform: "translatey(-3px)",
            },
            "50%": {
              opacity: 0.8,
              transform: "translatey(3px)",
            },
            "100%": {
              opacity: 1,
              transform: "translatey(0px)",
            },
          },
        }}
      >
        <img src={Wave} alt="wave" />
      </Box>
    </Box>
  );
};

export default About;
