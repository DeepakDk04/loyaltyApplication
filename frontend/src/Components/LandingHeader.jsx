import { useState } from "react";
import { useNavigate, useMatch, useResolvedPath } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TryIcon from "@mui/icons-material/Try";

import logo from "../Images/logoCircle.png";

const IsActivePage = (url) => {
  const resolved = useResolvedPath(url);
  const match = useMatch({ path: resolved.pathname, end: true });
  return match;
};

const NavItems = ({ onClickHandler, isActive, icon, text }) => {
  return (
    <MenuItem
      onClick={onClickHandler}
      sx={{
        borderRadius: 2,
        m: 1,
        background: isActive
          ? "linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)"
          : "",
      }}
    >
      <ListItemIcon
        sx={{
          color: isActive ? "white" : "primary",
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        sx={{
          color: isActive ? "white" : "#1976d2",
        }}
      >
        {text}
      </ListItemText>
    </MenuItem>
  );
};

const LandingHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  let navigate = useNavigate();
  const moreIconOpen = Boolean(anchorEl);

  const moreIconHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const moreIconHandleClose = (url) => {
    setAnchorEl(null);
    navigate(url);
  };

  return (
    <AppBar
      position="sticky"
      enableColorOnDark
      sx={{
        py: 2,
        boxShadow: "none",
        backdropFilter: "blur(7px)",
        borderStyle: "solid",
        borderColor: "#E7EBF0",
        borderWidth: "0",
        background: "rgba(255,255,255,0.7)",
        color: "#2D384",
      }}
      elevation={0}
    >
      <Toolbar disableGutters>
        <Box
          sx={{
            mr: { xs: 4, md: 4 },
            ml: { xs: 4, md: 8 },
            animation: "rotate 8s linear infinite alternate",
            WebkitAnimation: "rotate 8s linear infinite alternate",
            "@keyframes rotate": {
              "0%": {
                transform: "rotate(0deg)",
              },
              "100%": {
                transform: "rotate(360deg)",
              },
            },
          }}
        >
          <img src={logo} alt="logo" width={48} height={48} />
        </Box>
        <Typography
          variant="h6"
          color="primary"
          noWrap
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Loyalty Point Management System
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          noWrap
          sx={{ display: { xs: "block", md: "none" } }}
        >
          Loyalty Point System
        </Typography>
        <IconButton
          aria-label="settings"
          onClick={moreIconHandleClick}
          sx={{ display: { xs: "inline", md: "none" }, ml: 2 }}
        >
          <MoreVertIcon color="primary" />
        </IconButton>
        <Menu
          id="more icon for nav links"
          anchorEl={anchorEl}
          open={moreIconOpen}
          onClose={moreIconHandleClose}
          MenuListProps={{
            "aria-labelledby": "more icon for nav links ",
          }}
        >
          <NavItems
            onClickHandler={() => moreIconHandleClose("/")}
            isActive={IsActivePage("/")}
            icon={
              <HomeIcon
                fontSize="small"
                color={IsActivePage("/") ? "white" : "primary"}
              />
            }
            text="Home"
          />
          <NavItems
            onClickHandler={() => moreIconHandleClose("/about")}
            isActive={IsActivePage("/about")}
            icon={
              <InfoIcon
                fontSize="small"
                color={IsActivePage("/about") ? "white" : "primary"}
              />
            }
            text="About"
          />
          <NavItems
            onClickHandler={() => moreIconHandleClose("/contact")}
            isActive={IsActivePage("/contact")}
            icon={
              <SupportAgentIcon
                fontSize="small"
                color={IsActivePage("/contact") ? "white" : "primary"}
              />
            }
            text="Contact"
          />
          <NavItems
            onClickHandler={() => moreIconHandleClose("/feautures")}
            isActive={IsActivePage("/feautures")}
            icon={
              <TryIcon
                fontSize="small"
                color={IsActivePage("/feautures") ? "white" : "primary"}
              />
            }
            text="Feautures"
          />
          <NavItems
            onClickHandler={() => moreIconHandleClose("/login")}
            isActive={IsActivePage("/login")}
            icon={
              <LoginIcon
                fontSize="small"
                color={IsActivePage("/login") ? "white" : "primary"}
              />
            }
            text="Login"
          />
        </Menu>

        {/* <MenuItem
            onClick={(e) => moreIconHandleClose("/login")}
            sx={{
              borderRadius: 2,
              background: IsActivePage("/login")
                ? "linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)"
                : "",
            }}
          >
            <ListItemIcon
              sx={{
                color: IsActivePage("/login") ? "white" : "primary",
              }}
            >
              <LoginIcon
                fontSize="small"
                color={IsActivePage("/login") ? "white" : "primary"}
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: IsActivePage("/login") ? "white" : "#1976d2",
              }}
            >
              Login
            </ListItemText>
          </MenuItem> */}

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            color={IsActivePage("/") ? "secondary" : "primary"}
            sx={{
              mx: 2,
            }}
            startIcon={<HomeIcon />}
            href={IsActivePage("/") ? "" : "/"}
          >
            Home
          </Button>
          <Button
            variant="outlined"
            color={IsActivePage("/about") ? "secondary" : "primary"}
            sx={{ mx: 2 }}
            startIcon={<InfoIcon />}
            href={IsActivePage("/about") ? "" : "/about"}
          >
            About
          </Button>
          <Button
            variant="outlined"
            color={IsActivePage("/feautures") ? "secondary" : "primary"}
            sx={{ mx: 2 }}
            startIcon={<TryIcon />}
            href={IsActivePage("/feautures") ? "" : "/feautures"}
          >
            Features
          </Button>
          <Button
            variant="outlined"
            color={IsActivePage("/contact") ? "secondary" : "primary"}
            sx={{ mx: 2 }}
            startIcon={<SupportAgentIcon />}
            href={IsActivePage("/contact") ? "" : "/contact"}
          >
            Contact
          </Button>
          <Button
            variant="contained"
            sx={{ mx: 2, color: "white" }}
            color={IsActivePage("/login") ? "secondary" : "primary"}
            onClick={(e) => navigate("/login")}
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LandingHeader;
