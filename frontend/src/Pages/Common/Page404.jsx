import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import thinkingMan from "../../Images/not-found.svg";
import hangingShapes from "../../Images/hangingShapes.svg";

const Page404 = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        backgroundImage: `url(${hangingShapes})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: 300, md: -200 },
          right: { xs: -50, md: 200 },
          transform: "translateY(100%)",
          animation: "slide-in 2s forwards ease-in-out",
          WebkitAnimation: "slide-in 2s forwards ease-in-out",
          "@keyframes slide-in": {
            "100%": {
              transform: "translateY(0%)",
            },
          },

          height: { xs: "650px", md: "1200px" },
          width: { xs: "500px", md: "1200px" },
        }}
      >
        <img src={thinkingMan} alt="hero img" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          transform: "translateY(-100%)",
          animation: "slide-in 2s forwards ease-in-out",
          WebkitAnimation: "slide-in 2s forwards ease-in-out",
          "@keyframes slide-in": {
            "100%": {
              transform: "translateY(0%)",
            },
          },
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: 20, md: -40 },
            width: { xs: "60%", md: "18%" },
            height: { xs: "50%", md: "18%" },
            zIndex: -20,
          }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#0F62FE"
              d="M48.2,-69.7C61.8,-66.2,71.8,-51.8,78,-36.2C84.2,-20.6,86.6,-3.9,79.6,8.1C72.7,20.1,56.3,27.4,45.5,39C34.7,50.6,29.5,66.5,18.8,74.5C8,82.6,-8.1,82.6,-21.7,77.2C-35.3,71.7,-46.3,60.7,-54.9,48.7C-63.6,36.7,-69.9,23.8,-70.2,11.1C-70.5,-1.7,-64.9,-14.4,-61.1,-30C-57.2,-45.6,-55.1,-64.1,-45.3,-69.3C-35.4,-74.5,-17.7,-66.4,-0.2,-66C17.3,-65.7,34.6,-73.2,48.2,-69.7Z"
              transform="translate(100 100)"
            />
          </svg>
        </Box>
        <Typography variant="h1" gutterBottom align="center" color="white">
          404
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ color: "#ff6584", mt: 2 }}
        >
          OOPS! Page Not Found
        </Typography>
        <Typography textAlign="center" variant="subtitle2" gutterBottom>
          The Page that you are trying to visit not found.
        </Typography>
        <Button
          href="/"
          size="small"
          variant="outlined"
          sx={{
            my: 2,
          }}
        >
          Go To Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default Page404;
