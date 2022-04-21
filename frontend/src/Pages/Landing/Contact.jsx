import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import GlowingText from "../../Components/GlowingText";

import Hero from "../../Images/chatting.svg";
import Wave from "../../Images/wave-bg.svg";

const Contact = () => {
  return (
    <Box
      component="main"
      sx={{
        position: "relative",
        overflowY: "hidden",
      }}
    >
      {/* Hero unit */}
      <Box sx={{ flexGrow: 1, mb: { xs: 1, md: 3 }, mt: { xs: -3, md: -9 } }}>
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
                pt: { xs: 5, md: 5 },
                pb: { xs: 1, md: 12 },
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
                  <GlowingText text="Contact" /> Our Team
                </Typography>
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  sx={{ display: { xs: "inline-block", md: "none" } }}
                >
                  <GlowingText text="Contact" /> Our Team
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Our team will available 24 X 7 for your queries. Our team wil
                  provide a good solution in a quickest way that best suits for
                  your issues.
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    endIcon={<SupportAgentIcon />}
                    href="#"
                    sx={{
                      zIndex: 10,
                    }}
                  >
                    Contact
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
                transform: "translateX(-100%)",
                animation: "slide-in 3s forwards ease-in-out",
                WebkitAnimation: "slide-in 3s forwards ease-in-out",
                "@keyframes slide-in": {
                  "100%": {
                    transform: "translateX(0%)",
                  },
                },
                height: { xs: "380px", md: "700px" },
                width: { xs: "380px", md: "700px" },
                pt: { xs: 5, md: 10 },
              }}
            >
              <img src={Hero} alt="Contact Us" />
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

export default Contact;
