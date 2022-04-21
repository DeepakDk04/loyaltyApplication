import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import GlowingText from "../../Components/GlowingText";

import businessDeal from "../../Images/businessDeal.svg";
import customerSupport from "../../Images/startup.svg";
import happyCustomer from "../../Images/dancing.svg";
import Hero from "../../Images/healthy.svg";
import secondHero from "../../Images/money.svg";
import hangingShapes from "../../Images/hangingShapes.svg";

const Feautured = ({ image, title, subtitle1, subtitle2, content }) => {
  return (
    <Box
      sx={{
        "& :hover": {
          transition: "transform 0.3s ease",
          transform: "scale(1.1)",
        },
      }}
    >
      <Card
        sx={{
          width: { xs: 250, md: 280 },
          height: { xs: 320, md: 350 },
          m: "15px 0px",
          borderRadius: "5%",
          boxShadow: "17px 16px 48px -11px rgba(0,0,0,0.75)",
          color: "#fff",
          background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
          "& :hover": {
            transform: "none",
            transition: "none",
          },
        }}
      >
        <CardMedia
          component="img"
          height="150px"
          width="150px"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom align="center">
            {title}
          </Typography>
          <Typography variant="h5" component="div" align="center">
            {subtitle1}
          </Typography>
          <Typography sx={{ mb: 1.5 }} align="center">
            {subtitle2}
          </Typography>
          <Typography variant="body2" align="center">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const Landing = () => {
  return (
    <Box component="main">
      {/* Hero unit */}
      <Box sx={{ flexGrow: 1, mt: { xs: 1, md: "-30px" } }}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                py: { xs: 0, md: 8 },
                bgcolor: "background.paper",
                backgroundImage: `url(${hangingShapes})`,
                backgroundSize: { xs: "390px 800px", md: "700px 550px" },
                backgroundAttachment: "fixed",
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
                  <GlowingText text="Loyalty" /> Points System
                </Typography>
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  sx={{ display: { xs: "inline-block", md: "none" } }}
                >
                  <GlowingText text="Loyalty  Points" /> System
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Create a points-based loyalty program with various earning
                  rules. <b>Reward Customers </b> for their purchases, behavior,
                  or specific interactions.
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
                height: { xs: "300px", md: "600px" },
                width: { xs: "300px", md: "600px" },
              }}
            >
              <img src={Hero} alt="Landing Hero" />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* section 2 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "10px",
          m: "50px 20px",
          mt: { xs: 0, md: "-3px" },
          p: "50px 20px",
          background: "linear-gradient(45deg, #fc466b 0%, #1976d2fc 100%)",
          borderRadius: "20px",
        }}
      >
        <Feautured
          image={happyCustomer}
          title="Happy Customer"
          subtitle1="Earn Money"
          subtitle2="Happy Shopping"
          content="Offers points for your purchases"
        />
        <Feautured
          image={customerSupport}
          title="Customer Support"
          subtitle1="Clear Queries"
          subtitle2="24 X 7 available"
          content="Quick support to your queries"
        />
        <Feautured
          image={businessDeal}
          title="Improve Business"
          subtitle1="Customer Reach"
          subtitle2="Increase the sales"
          content="offer a great service to improve business"
        />
      </Box>

      {/* section 3  */}
      <Box
        sx={{
          flexGrow: 1,
          mt: 1,
          background: "linear-gradient(90deg, #eeaeca 0%, #94bbe9 100%)",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {/* Second Hero Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              animation: "float 3s linear infinite alternate",
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
              height: { xs: "300px", md: "600px" },
              width: { xs: "300px", md: "600px" },
            }}
          >
            <img src={secondHero} alt="Money Bag" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                py: 8,
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
                  <GlowingText text="Save Money" /> Through Points
                </Typography>
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  sx={{ display: { xs: "inline-block", md: "none" } }}
                >
                  <GlowingText text="Save Money" /> Through Points
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.primary"
                  paragraph
                >
                  Create a points-based loyalty program with various earning
                  rules. <b>Reward Customers </b> for their purchases, behavior,
                  or specific interactions.
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    href="/about"
                    endIcon={<KeyboardArrowRightIcon />}
                    color="primary"
                  >
                    Read More
                  </Button>
                </Stack>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Landing;
