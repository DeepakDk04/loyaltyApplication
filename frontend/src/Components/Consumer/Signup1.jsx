import { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const sexOptions = [{ value: "male" }, { value: "female" }, { value: "othes" }];

const Signup1 = ({ userData, handleChange, handleNext }) => {
  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [errAge, setErrAge] = useState("");
  const [errBio, setErrBio] = useState("");

  const isAllFilled = () => {
    if (userData.firstName && userData.age && userData.sex) {
      return false;
    }
    return true;
  };

  const validations = () => {
    // check firstname
    if (userData.firstName.length < 3) {
      setErrFirstName("Must be Atleast 3 Letters");
      return false;
    }
    if (userData.firstName.length > 15) {
      setErrFirstName("Must be Atmost 15 Letters");

      return false;
    }
    // check lastname
    if (userData.lastName.length > 15) {
      setErrLastName("must be atmost 15 letters");
      return false;
    }
    // check age
    if (userData.age < 10 || userData.age > 100) {
      setErrAge("must be valid age");
      return false;
    }

    // check bio
    if (userData.bio.length > 50) {
      setErrBio("must be atmost 50 letters");
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
      setErrFirstName("");
      setErrLastName("");
      setErrAge("");
      setErrBio("");
    };
    const errTimeout = setTimeout(() => clearErrors(), 4000);
    return () => clearTimeout(errTimeout);
  }, [errFirstName, errLastName, errAge, errBio]);

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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PrivacyTipIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter Personal Details
        </Typography>
        <Box component="div" sx={{ mt: 1 }}>
          <TextField
            error={errFirstName.length !== 0}
            margin="normal"
            required
            fullWidth
            label="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            autoFocus
            helperText={errFirstName}
          />
          <TextField
            error={errLastName.length !== 0}
            margin="normal"
            fullWidth
            label="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            helperText={errLastName}
          />
          <TextField
            error={errAge.length !== 0}
            margin="normal"
            required
            xs={12}
            md={6}
            label="Age"
            name="age"
            type="number"
            value={userData.age || ""}
            onChange={handleChange}
            helperText={errAge}
          />
          <TextField
            margin="normal"
            select
            required
            xs={12}
            md={6}
            label="Sex"
            name="sex"
            value={userData.sex}
            onChange={handleChange}
            helperText="choose your gender"
            sx={{ ml: 3 }}
          >
            {sexOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={errBio.length !== 0}
            margin="normal"
            fullWidth
            label="Bio"
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            helperText={
              errBio.length !== 0
                ? errBio
                : "give your short intro in 50 Characters"
            }
          />
        </Box>
        <Link
          href="/login"
          variant="body2"
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Have an Account? Sign IN
        </Link>
        <Button
          variant="contained"
          onClick={moveNext}
          fullWidth
          sx={{
            mt: 2,
          }}
          disabled={isAllFilled()}
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
    </Box>
  );
};

export default Signup1;

// "profile":{
//   "firstName":"newdeepak",
//   "lastName":"dk",//nr
//   "age":25,
//   "sex":"male",
//   "bio":"i'm new so cool" //nr
// }
