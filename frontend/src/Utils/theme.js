import createTheme from "@mui/material/styles/createTheme";
import purple from "@mui/material/colors/purple";
import pink from "@mui/material/colors/pink";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ff6987",
      light: purple[500],
      dark: pink[500],
      contrastText: "#000",
    },
  },
});

export default theme;
