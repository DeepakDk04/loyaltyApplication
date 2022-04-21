import { useLocation, Outlet, Navigate } from "react-router-dom";

import Box from "@mui/material/Box";

import useAuth from "../../Hooks/useAuth";

const ConsumerLayout = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth ? (
    <Box>
      <Outlet />
    </Box>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ConsumerLayout;
