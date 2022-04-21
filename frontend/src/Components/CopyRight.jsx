import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const CopyRight = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      Copyright ©
      <Link color="inherit" href="#">
        Loyalty Point System
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default CopyRight;
