import Box from "@mui/material/Box";

const GlowingText = ({ text }) => {
  return (
    <Box
      component="span"
      sx={{
        textTransform: "uppercase",
        fontWeight: "bold",
        backgroundImage:
          "linear-gradient(-225deg, #231557 0%, #44107a 29%, #ff1361 67%, #fff800 100%)",
        backgroundSize: "200% auto",
        backgroundClip: "text",
        fill: "transparent",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "textclip 5s linear infinite",
        "@keyframes textclip": {
          to: {
            backgroundPosition: "200% center",
          },
        },
      }}
    >
      {text}
    </Box>
  );
};

export default GlowingText;
