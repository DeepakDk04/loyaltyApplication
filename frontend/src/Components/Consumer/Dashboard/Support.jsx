import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import SendIcon from "@mui/icons-material/Send";

import helpIllustration from "../../../Images/help_chat.svg";

const Support = () => {
  return (
    <Box>
      <Grid
        container
        direction="row-reverse"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              py: 5,
              px: { xs: 2, md: 4 },
              borderRadius: 5,
              backgroundImage:
                "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
              boxShadow: "1px 1px 40px 0px rgba(126, 132, 247, .2)",
              mr: { xs: 1, md: 5 },
            }}
          >
            <Typography variant="h5" gutterBottom align="center">
              Write Your Query
            </Typography>
            <Typography
              textAlign="center"
              variant="subtitle2"
              gutterBottom
              sx={{ my: 2 }}
            >
              Don't worry, we are always here to help you!
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                mt: 3,
              }}
            >
              <TextField
                label="Describe your problem, We will contact you shortly"
                name="query"
                autoFocus
                multiline
                rows={4}
                variant="outlined"
                fullWidth
              />

              <IconButton
                aria-label="submit query"
                size="large"
                color="primary"
                sx={{
                  backgroundImage:
                    "linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)",
                  m: 2,
                  transform: "scale(1.5)",
                }}
              >
                <SendIcon
                  sx={{
                    transform: "translateX(4px)",
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: { xs: "390px", md: "600px" },
              width: { xs: "390px", md: "600px" },
              transform: "translateX(-70%)",
              animation: "slide-in 2s forwards ease-in-out",
              WebkitAnimation: "slide-in 2s forwards ease-in-out",
              "@keyframes slide-in": {
                "100%": {
                  transform: "translateX(0%)",
                },
              },
            }}
          >
            <img src={helpIllustration} alt="support illustration" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Support;
