import { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

//password strength check
import { zxcvbn, ZxcvbnOptions } from "@zxcvbn-ts/core";
import zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import zxcvbnEnPackage from "@zxcvbn-ts/language-en";

// options for password checker
const options = {
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
  translations: zxcvbnEnPackage.translations,
};
ZxcvbnOptions.setOptions(options);

const Signup2 = ({ userData, handleChange, handleNext, handleBack }) => {
  const [errUserName, setErrUserName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(userData.password);
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [errPhoneNo, setErrPhoneNo] = useState("");
  //password strengh score
  const { score, feedback } = zxcvbn(userData.password);

  const getPassStrentgh = (score) => {
    switch (score) {
      case 0:
        return 1;
      case 1:
        return 10;
      case 2:
        return 40;
      case 3:
        return 80;
      case 4:
        return 100;

      default:
        break;
    }
  };
  const isAllFilled = () => {
    if (
      userData.userName &&
      userData.email &&
      userData.password &&
      confirmPassword &&
      userData.phoneNo
    ) {
      return false;
    }
    return true;
  };

  const validations = () => {
    // check userName
    const usernameRegex = new RegExp("^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$");
    if (!usernameRegex.test(userData.userName)) {
      setErrUserName(
        "Must be at least 1 letter, at least 5 alphanumerics and the underscore _  allowed, , "
      );
      return false;
    }

    if (userData.userName.length <= 5 || userData.userName.length >= 15) {
      setErrUserName("Minimum 6 to Maximum 14 characters allowed ");
      return false;
    }
    // check email
    const emailRegex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    if (!emailRegex.test(userData.email)) {
      setErrEmail("must be a valid email");
      return false;
    }
    // check password
    const passwordRegex = new RegExp(
      "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
    );
    if (!passwordRegex.test(userData.password)) {
      setErrPassword(
        "must be valid password, at least 1 number,\nat least 1 special character !@#$%^&* "
      );
      return false;
    }
    // check confirm password

    if (userData.password !== confirmPassword) {
      setErrConfirmPassword("Password doesn't match with confirm password");
      return false;
    }

    // check phoneNo
    const phoneRegex = new RegExp("^[6-9][0-9]{9}$");
    if (!phoneRegex.test(userData.phoneNo)) {
      setErrPhoneNo("must be valid phone number, ie. 9876543210");
      return false;
    }
    // if all values are valid then return true
    return true;
  };

  const moveNext = () => {
    //validation
    if (validations()) {
      console.log("ok");
      handleNext();
    } else {
      console.log("err");
    }
  };

  useEffect(() => {
    // //  clear the errors after 4 sec
    const clearErrors = () => {
      console.log("clear err");
      setErrUserName("");
      setErrEmail("");
      setErrPassword("");
      setErrConfirmPassword("");
      setErrPhoneNo("");
    };
    const errTimeout = setTimeout(() => clearErrors(), 4000);
    return () => clearTimeout(errTimeout);
  }, [errUserName, errEmail, errPassword, errPhoneNo, errConfirmPassword]);

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Enter Account Details
        </Typography>

        <TextField
          error={errUserName.length !== 0}
          margin="normal"
          required
          fullWidth
          label="Username"
          name="userName"
          value={userData.userName}
          onChange={handleChange}
          autoFocus
          helperText={errUserName}
          autoComplete="name"
        />
        <TextField
          error={errEmail.length !== 0}
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          value={userData.email}
          onChange={handleChange}
          helperText={errEmail}
        />
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Tooltip
            title={`Password Strength is ${
              score <= 1
                ? "Weak"
                : score === 2
                ? "Average"
                : score === 3
                ? "Good"
                : "Strong"
            }`}
          >
            <LinearProgress
              variant="determinate"
              value={getPassStrentgh(score)}
              color={score <= 1 ? "error" : score === 2 ? "warning" : "success"}
              sx={{
                borderRadius: 5,
                p: 1,
                m: 1,
              }}
            />
          </Tooltip>
        </Box>
        <TextField
          error={errPassword.length !== 0}
          margin="normal"
          fullWidth
          required
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          helperText={errPassword}
          autoComplete="new-password"
        />
        {userData.password.length > 4 && (
          <Box
            sx={{
              width: "100%",
            }}
          >
            {/* Password Strength Display */}

            {feedback.warning.length > 1 && (
              <Tooltip title="Warning">
                <Typography
                  variant="subtitle1"
                  color="white"
                  align="center"
                  sx={{
                    borderRadius: 2,
                    m: 1,
                    p: 1,
                    background:
                      "linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)",
                  }}
                >
                  {feedback.warning}
                </Typography>
              </Tooltip>
            )}
          </Box>
        )}
        {feedback.suggestions.length > 1 && (
          <Tooltip title="Tip">
            <Typography variant="subtitle2" color="#7177a8" align="center">
              Tip : {feedback.suggestions}
            </Typography>
          </Tooltip>
        )}
        <TextField
          error={errConfirmPassword.length !== 0}
          margin="normal"
          fullWidth
          required
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          helperText={errConfirmPassword}
          autoComplete="new-password"
        />
        <TextField
          error={errPhoneNo.length !== 0}
          margin="normal"
          required
          fullWidth
          label="Phone Number"
          name="phoneNo"
          value={userData.phoneNo}
          onChange={handleChange}
          helperText={errPhoneNo}
        />

        <Button
          onClick={handleBack}
          fullWidth
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          sx={{
            mt: 2,
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={moveNext}
          disabled={isAllFilled()}
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Signup2;

// "account":{
//   "userName":"deepakdk",
//   "email":"deepak@gmail.com",
//   "password":"neasdf1234",
//   "phoneNo":"9876543211"
// },
