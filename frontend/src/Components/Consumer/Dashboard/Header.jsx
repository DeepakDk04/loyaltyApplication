import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import Logout from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Settings from "@mui/icons-material/Settings";

import useAuth from "../../../Hooks/useAuth";
import useLogout from "../../../Hooks/useLogout";

import popeye from "../../../Images/popeye.png";

const Header = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const [notifMsg, setNotifMsg] = useState("");
  const [assignNotifMsg, setAssignNotifMsg] = useState(false);
  if (!auth?.userData?.profile?.verify?.verifiedEmail && !assignNotifMsg) {
    setNotifMsg("Your Email address is not verified");
    setAssignNotifMsg(true);
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAccountMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      enableColorOnDark
      color="transparent"
      sx={{
        mb: 2,
        p: 2,
        width: "100%",
      }}
      elevation={0}
    >
      <Toolbar disableGutters>
        <Box
          sx={{
            flexGrow: 2,
            ml: 5,
            display: { xs: "none", md: "inline-block" },
          }}
        >
          <Typography variant="h6" color="text.primary" noWrap>
            Dashboard Overview
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" noWrap>
            {new Date().toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        </Box>

        <Box
          sx={{
            mx: 2,
            flexGrow: 1,
          }}
        >
          <Typography variant="h6" color="text.primary" noWrap>
            Good{" "}
            {new Date().getHours() < 12
              ? "Morning"
              : new Date().getHours() < 15
              ? "Afternoon"
              : "Evening"}
            ,
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" noWrap>
            {auth?.userData?.userName || "Guest"}
          </Typography>
        </Box>
        <Box
          sx={{
            mx: 2,
          }}
        >
          <Tooltip title="Notification">
            <IconButton
              aria-label="notification"
              sx={{
                bgcolor: "#e3e3e3",
                borderRadius: "50%",
                p: 2,
              }}
              onClick={(e) =>
                alert(
                  notifMsg.length === 0 ? "You have no notifications" : notifMsg
                )
              }
            >
              <Badge
                color="secondary"
                variant="dot"
                invisible={notifMsg.length === 0}
              >
                <NotificationsIcon
                  color="primary"
                  sx={{
                    animation:
                      notifMsg.length !== 0
                        ? "shake 3s linear infinite alternate"
                        : "none",
                    WebkitAnimation:
                      notifMsg.length !== 0
                        ? "shake 1s linear infinite alternate"
                        : "none",
                    "@keyframes shake": {
                      "0%": {
                        transform: "rotate(10deg)",
                      },
                      "100%": {
                        transform: "rotate(-10deg)",
                      },
                    },
                  }}
                />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            mx: 2,
          }}
        >
          <Tooltip title={auth?.userData?.userName}>
            <IconButton
              sx={{
                bgcolor: "#e3e3e3",
                // border: "3px solid #d9d9d9",
                borderRadius: "50%",
              }}
              onClick={handleAccountMenuClick}
              aria-label="profile"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                alt={auth?.userData?.userName || "Display Profile"}
                // src="https://img.icons8.com/color-glass/48/000000/popeye.png"
                src={popeye}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleAccountMenuClose}
          onClick={handleAccountMenuClose}
          PaperProps={{
            elevation: 5,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={(e) => logout("/login")}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
