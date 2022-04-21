import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import CopyRight from "./CopyRight";

import car from "../Images/car_running.gif";
import cycle from "../Images/cyclist.gif";
import footerBg from "../Images/footer_bg.png";

const Footer = () => {
  return (
    <Box component="footer">
      {/* nav links */}
      <Box
        sx={{
          bgcolor: "#fbfbfd",
          px: { xs: 3, sm: 10 },
          pt: { xs: 5, sm: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} borderColor="#412be9" sx={{ mb: "20px" }}>
                <Typography variant="h6">Get In Touch</Typography>
              </Box>
              <Box sx={{ mb: "20px" }}>
                <Typography color={"text.secondary"}>
                  Don't miss any updates of our new feautures and services.!
                </Typography>
              </Box>
              <Box
                sx={{
                  my: "10px",
                }}
              >
                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  size="small"
                  placeholder="Enter Email Address"
                />
              </Box>
              <Box
                sx={{
                  my: "10px",
                }}
              >
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ThumbUpIcon />}
                >
                  Subscribe
                </Button>{" "}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} borderColor="#412be9" sx={{ mb: "20px" }}>
                <Typography variant="h6">Help</Typography>
              </Box>
              <Box
                sx={{
                  my: "10px",
                }}
              >
                <Link href="#" underline="none" color="text.secondary">
                  FAQ
                </Link>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Link href="#" underline="none" color="text.secondary">
                  Terms & Conditions
                </Link>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Link href="#" underline="none" color="text.secondary">
                  Reporting
                </Link>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Link href="#" underline="none" color="text.secondary">
                  Documentaion
                </Link>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Link href="#" underline="none" color="text.secondary">
                  Support Policy
                </Link>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Link href="#" underline="none" color="text.secondary">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} borderColor="#412be9" sx={{ mb: "20px" }}>
                <Typography variant="h6">Company</Typography>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Link href="#" underline="none" color="text.secondary">
                  Downloads
                </Link>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Link href="#" underline="none" color="text.secondary">
                  Android App
                </Link>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Link href="#" underline="none" color="text.secondary">
                  ios App
                </Link>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Link href="#" underline="none" color="text.secondary">
                  Desktop
                </Link>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Link href="#" underline="none" color="text.secondary">
                  Projects
                </Link>
              </Box>
              <Box sx={{ my: "10px" }}>
                <Link href="#" underline="none" color="text.secondary">
                  Credit Policy
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* animation */}
      <Box
        sx={{
          bgcolor: "#fbfbfd",
          py: "5px 50px",
        }}
      >
        <Box
          sx={{
            p: "120px 0px 270px",
            position: "relative",
            overflowX: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              background: `url(${footerBg}) no-repeat scroll center 0`,
              width: "100%",
              height: "266px",
              animation: "move 3s linear infinite alternate",
              WebkitAnimation: "move 3s linear infinite alternate",
              "@keyframes move": {
                "0%": {
                  transform: "translatey(-10px)",
                },
                "100%": {
                  transform: "translatey(0px)",
                },
              },
            }}
          >
            <Box
              sx={{
                background: `url(${car}) no-repeat center center`,
                width: "330px",
                height: "105px",
                backgroundSize: "100%",
                position: "absolute",
                bottom: 0,
                left: "30%",
                animation: "carMove 22s linear infinite",
                WebkitAnimation: "carMove 22s linear infinite",
                "@keyframes carMove": {
                  "0%": {
                    left: "-25%",
                  },
                  "100%": {
                    left: "100%",
                  },
                },
              }}
            ></Box>
            <Box
              sx={{
                background: `url(${cycle}) no-repeat center center`,
                width: "88px",
                height: "100px",
                backgroundSize: "100%",
                position: "absolute",
                bottom: 0,
                left: "38%",
                animation: "cycleMove 30s linear infinite",
                WebkitAnimation: "cycleMove 30s linear infinite",
                "@keyframes cycleMove": {
                  "0%": {
                    left: "-25%",
                  },
                  "100%": {
                    left: "100%",
                  },
                },
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
      {/* credits */}
      <Box
        sx={{
          p: 6,
        }}
        component="div"
      >
        <Typography variant="h6" align="center" gutterBottom>
          Designed & Developed -{" "}
          <Box
            component="span"
            sx={{
              background: "rgba(220,18,107,1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Deepak Dk
          </Box>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          All Rights Reserved !
        </Typography>
        <CopyRight />
      </Box>
    </Box>
  );
};

export default Footer;
