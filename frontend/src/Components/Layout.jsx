import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

import CokkieConsentBar from "./CokkieConsentBar";
import LandingFooter from "./LandingFooter";
import LandingHeader from "./LandingHeader";

const Layout = () => {
  return (
    <Box>
      <LandingHeader />
      <Outlet />
      <CokkieConsentBar />
      <LandingFooter />
    </Box>
  );
};

export default Layout;
