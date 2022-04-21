import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

import BottomNav from "../../Components/Consumer/Dashboard/BottomNav";
import Header from "../../Components/Consumer/Dashboard/Header";
import SideBar from "../../Components/Consumer/Dashboard/SideBar";

const DashboardLayout = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "inline-flex" },
          }}
        >
          <SideBar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundImage:
              "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
            minHeight: "100%",
            borderRadius: "20px",
            mx: { xs: 0, md: 2 },
            overflow: "hidden",
          }}
        >
          <Header />
          <Outlet />
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <BottomNav />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
