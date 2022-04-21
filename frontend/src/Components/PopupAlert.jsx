import { forwardRef } from "react";

import IconButton from "@mui/material/IconButton";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import CloseIcon from "@mui/icons-material/Close";

const PopupAlert = ({ message, clearMessage, alertType }) => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleErrClose = (event, reason) => {
    // `reason === 'escapeKeyDown'` if `Escape` was pressed
    if (reason === "clickaway") {
      return;
    }
    clearMessage("");
  };

  const closeErrPopupAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleErrClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      key={message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={message?.length ? true : false}
      autoHideDuration={5000}
      onClose={handleErrClose}
      action={closeErrPopupAction}
    >
      <Alert onClose={handleErrClose} severity={alertType}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default PopupAlert;
