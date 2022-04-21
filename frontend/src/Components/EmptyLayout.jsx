import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

const EmptyLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default EmptyLayout;
