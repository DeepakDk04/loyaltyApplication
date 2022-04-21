import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SendIcon from "@mui/icons-material/Send";

import useLogout from "../../../Hooks/useLogout";

import trust from "../../../Images/trust.png";

const NavButton = ({ icon, text, isActive, to }) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(to)}
      sx={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "20px",
        width: "20vw",
        minWidth: "250px",
        mx: "1px",
        p: "10px 40px",
        color: isActive ? "rgba(99,88,238,1)" : "#434347",
        backgroundColor: isActive ? "white" : "inherit",
        borderRight: isActive
          ? "10px solid rgba(99,88,238,1)"
          : "10px solid #434347",
        borderLeft: isActive
          ? "10px solid rgba(99,88,238,1)"
          : "10px solid #434347",
        boxShadow: isActive ? "10px 10px 7px 1px #eee" : "none",
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
        transform: isActive ? "translateX(10%)" : "none",
        transition: "transform 0.3s ease-out",
      }}
    >
      <IconButton color="inherit">{icon}</IconButton>
      <Typography variant="h6" align="center" color="inherit">
        {text}
      </Typography>
    </Box>
  );
};

const SideBar = () => {
  const location = useLocation();
  const logout = useLogout();
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        minHeight: "100vh",
        width: "20vw",
        minWidth: "300px",
        backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <Box
        height={"100px"}
        width={"200px"}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <img
          // src="https://img.icons8.com/color-glass/96/000000/trust.png"
          src={trust}
          alt="brand trust"
        />

        <Typography variant="h4" align="center">
          Loyalty Points
        </Typography>
      </Box>

      <NavButton
        icon={<DashboardIcon />}
        text="Home"
        isActive={location.pathname === "/consumer/dashboard"}
        to="/consumer/dashboard"
      />
      <NavButton
        icon={<SendIcon />}
        text="Transactions"
        isActive={location.pathname === "/consumer/dashboard/transactions"}
        to="/consumer/dashboard/transactions"
      />
      <NavButton
        icon={<AccountCircleIcon />}
        text="Profile"
        isActive={location.pathname === "/consumer/dashboard/profile"}
        to="/consumer/dashboard/profile"
      />
      <NavButton
        icon={<ContactSupportIcon />}
        text="Help"
        isActive={location.pathname === "/consumer/dashboard/support"}
        to="/consumer/dashboard/support"
      />

      <Box width="200px">
        <Button
          variant="contained"
          fullWidth
          endIcon={<LogoutIcon />}
          sx={{
            mx: "1px",
            p: "15px 45px",
            color: "white",
            backgroundImage: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
            boxShadow: "0 0 20px #eee",
            borderRadius: 3,
          }}
          onClick={(e) => logout("/login")}
        >
          Log out
        </Button>
      </Box>
    </Box>
  );
};

export default SideBar;
