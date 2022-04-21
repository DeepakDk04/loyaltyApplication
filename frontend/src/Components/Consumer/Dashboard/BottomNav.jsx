import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpIcon from "@mui/icons-material/Help";
import SendIcon from "@mui/icons-material/Send";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let initialState = "Home";

  const getActiveNav = () => {
    switch (location.pathname) {
      case "/consumer/dashboard":
        return "Home";
      case "/consumer/dashboard/transactions":
        return "Transactions";
      case "/consumer/dashboard/profile":
        return "Profile";
      case "/consumer/dashboard/support":
        return "Support";
      default:
        return "Home";
    }
  };

  initialState = getActiveNav();
  const [value, setValue] = useState(initialState);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "Home":
        navigate("/consumer/dashboard");
        break;
      case "Transactions":
        navigate("/consumer/dashboard/transactions");
        break;
      case "Profile":
        navigate("/consumer/dashboard/profile");
        break;
      case "Support":
        navigate("/consumer/dashboard/support");
        break;
      default:
        navigate("/consumer/dashboard");
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      sx={{
        width: "100%",
        "& .Mui-selected": {
          background:
            "linear-gradient(83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3%)",
          borderRadius: "50px",
          transform: "translateY(-20%)",
          transition: "transform 0.3s ease-out",
        },
        "& 	.Mui-selected .MuiSvgIcon-root": {
          color: "white",
        },
        "& 	.Mui-selected .MuiBottomNavigationAction-label": {
          color: "white",
        },
        "& .MuiBottomNavigationAction-iconOnly": {
          color: "#434347",
        },
      }}
    >
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={<DashboardIcon />}
      />
      <BottomNavigationAction
        label="Transactions"
        value="Transactions"
        icon={<SendIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="Profile"
        icon={<AccountCircleIcon />}
      />

      <BottomNavigationAction
        label="Support"
        value="Support"
        icon={<HelpIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
