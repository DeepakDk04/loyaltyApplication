import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import CakeIcon from "@mui/icons-material/Cake";
import FemaleIcon from "@mui/icons-material/Female";
import InfoIcon from "@mui/icons-material/Info";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MaleIcon from "@mui/icons-material/Male";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import VerifiedIcon from "@mui/icons-material/Verified";

import { CrownCard } from "./DashboardMain";

import useAuth from "../../../Hooks/useAuth";

import maleDp from "../../../Images/profileMale.svg";
import femaleDp from "../../../Images/profileFemale.svg";
import crown from "../../../Images/crown.png";

const AccountProfile = () => {
  const { auth } = useAuth();
  const { userName, email, phoneNo, profile } = auth.userData;
  if (!auth?.userData) {
    console.log("err auth state has no user data");
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: { xs: 10, md: 4 },
        mx: { xs: 1, md: 7 },
        pb: 5,
        borderRadius: 5,
        backgroundImage:
          "linear-gradient( 68.3deg,  rgba(245,177,97,1) 0.4%, rgba(236,54,110,1) 100.2% )",
        boxShadow: "1px 1px 40px 0px rgba(236,54,110,.5)",
      }}
    >
      <Chip
        label={profile?.verify?.verifiedEmail ? "Verified" : "Not Verified"}
        variant="outlined"
        icon={profile?.verify?.verifiedEmail ? <VerifiedIcon /> : <InfoIcon />}
        sx={{
          mt: 1,
          mr: 1,
          color: "white",
          alignSelf: "flex-end",
          backgroundImage: profile?.verify?.verifiedEmail
            ? "radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,209,67,1) 0%, rgba(255,145,83,1) 90% )"
            : "linear-gradient( 83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% )",
          "& .MuiChip-iconColorDefault ": {
            color: "white",
          },
        }}
        onClick={(e) =>
          alert(
            `You're ${
              profile?.verify?.verifiedEmail
                ? "Verified"
                : "Not Verified, Please verify your Email..."
            }`
          )
        }
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={11} md={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: "translateX(-100%)",
              animation: "slide-in 3s forwards ease-in-out",
              WebkitAnimation: "slide-in 3s forwards ease-in-out",
              "@keyframes slide-in": {
                "100%": {
                  transform: "translateX(0%)",
                },
              },
            }}
          >
            <Tooltip title={userName} placement="top-end" arrow>
              <img
                src={profile?.meta?.sex === "male" ? maleDp : femaleDp}
                //   src={`https://avatars.dicebear.com/api/gridy/${profile?.meta?.firstName}.svg?mood[]=happy`}
                alt={userName || "Display Profile"}
              />
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={11} md={5}>
          <CrownCard
            crown={profile?.meta?.crown}
            // crownImg={"https://img.icons8.com/color-glass/48/000000/crown.png"}
            crownImg={crown}
            nextCrown={"gold"}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2px",
              color: "white",
            }}
          >
            <Typography variant="h3" color="inherit">
              @ {userName}
            </Typography>
            <Typography variant="h5" color="inherit">
              {profile?.meta?.firstName} {profile?.meta?.lastName || ""}
            </Typography>
            <Typography variant="body1" color="inherit">
              <BubbleChartIcon /> {profile?.meta?.bio || "no bio"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={11} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "2px",
              color: "white",
            }}
          >
            <Typography variant="h5" color="inherit" noWrap>
              <MarkEmailUnreadIcon
                sx={{
                  mx: 2,
                }}
              />{" "}
              {email}
            </Typography>
            <Typography variant="h5" color="inherit">
              <LocalPhoneIcon
                sx={{
                  mx: 2,
                }}
              />{" "}
              {phoneNo}
            </Typography>
            <Typography variant="h5" color="inherit">
              <CakeIcon
                sx={{
                  mx: 2,
                }}
              />{" "}
              {profile?.meta?.age} years old
            </Typography>
            <Typography variant="h5" color="inherit">
              {profile?.meta?.sex === "male" ? (
                <MaleIcon
                  sx={{
                    mx: 2,
                  }}
                />
              ) : (
                <FemaleIcon
                  sx={{
                    mx: 2,
                  }}
                />
              )}
              {profile?.meta?.sex}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountProfile;

/*
Data to display

{
    "_id": "61ed7f4f117de20f869e0f8e",
    "userType": "consumer",
    "userName": "DeepakDk123",
    "email": "deepak99pmk@gmail.com",
    "phoneNo": "9488320328",
    "profile": {
        "_id": "61ed7f4e117de20f869e0f8c",
        "meta": {
            "firstName": "Deepak",
            "lastName": "S",
            "age": 22,
            "sex": "male",
            "bio": "Feesgsgfs",
            "crown": "basic",
            "status": "registered",
            "lastActive": "2022-01-23T16:12:23.214Z"
        },
        "verify": {
            "emailCode": "xxlRvyFQi6owhunNfXpTt",
            "verifiedEmail": false,
            "verifiedPhone": false
        },
        "wallet": {
            "points": 0,
            "latestTransactions": []
        },
        "__v": 0
    },
    "onModel": "Consumer",
    "__v": 0

}
*/
