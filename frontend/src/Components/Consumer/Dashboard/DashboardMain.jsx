import { useState } from "react";
import Chart from "react-apexcharts";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ApiIcon from "@mui/icons-material/Api";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import PopupAlert from "../../PopupAlert";

import useAuth from "../../../Hooks/useAuth";

import coins from "../../../Images/coins.png";
import crown from "../../../Images/crown.png";

const ChartDisplay = () => {
  const [data, setData] = useState({
    options: {
      chart: {
        id: "point chart",
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    },
    series: [
      {
        name: "Earned Points",
        data: [2, 4, 1, 2, 6, 8, 3],
        // data: [],
      },
    ],
    stroke: {
      curve: "smooth",
    },
    type: "area",
    noData: {
      text: "Loading...",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined,
      },
    },
  });
  const bigDevice = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Box
      sx={{
        boxShadow: "1px 1px 40px 0px rgba(215, 215, 215, 1)",
      }}
    >
      <Chart
        options={data.options}
        series={data.series}
        stroke={data.stroke}
        type={data.type}
        width={bigDevice ? "600" : "350"}
        nodata={data.noData}
      />
    </Box>
  );
};

const WalletCard = ({ points }) => {
  return (
    <Tooltip title={`${points} points earned`} placement="top" arrow>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          py: 2,
        }}
      >
        <Card
          sx={{
            width: "220px",
            height: "220px",
            backgroundImage:
              "linear-gradient( 83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% )",
            borderRadius: 5,
            color: "white",
            boxShadow: "1px 1px 40px 0px rgba(150,93,233,1)",
            transform: "translateY(-100%)",
            animation: "slide-in 3s forwards ease-in-out",
            WebkitAnimation: "slide-in 3s forwards ease-in-out",
            "@keyframes slide-in": {
              "100%": {
                transform: "translateY(0%)",
              },
            },
          }}
        >
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <AccountBalanceWalletIcon />
            <TrendingUpIcon />
            <Typography variant="subtitle1" color="white">
              16,24 %
            </Typography>
          </CardActions>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="white" gutterBottom>
              Total Points Earned
            </Typography>

            <Box
              sx={{
                my: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img
                // src="https://img.icons8.com/color-glass/48/000000/coins.png"
                src={coins}
                alt="coins"
              />

              <Typography variant="h4" color="white">
                {points}
              </Typography>
            </Box>

            <Typography variant="body2" color="white">
              Worth of Coins
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Tooltip>
  );
};

export const CrownCard = ({ crown, crownImg, nextCrown }) => {
  return (
    <Tooltip title={`${crown} crown`} arrow>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "350px",
            height: "220px",
            backgroundImage:
              "radial-gradient( circle farthest-corner at 10% 20%,  rgba(37,145,251,0.98) 0.1%, rgba(0,7,128,1) 99.8% )",
            borderRadius: 5,
            color: "white",
            boxShadow: "1px 1px 40px 0px rgba(37,145,251,0.78)",
            transform: "translateX(100%)",
            animation: "slide-in 3s forwards ease-in-out",
            WebkitAnimation: "slide-in 3s forwards ease-in-out",
            "@keyframes slide-in": {
              "100%": {
                transform: "translateX(0%)",
              },
            },
          }}
        >
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 4,
            }}
          >
            <Typography variant="subtitle1" color="white">
              Your Progress
            </Typography>
            <IconButton
              sx={{
                color: "white",
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          </CardActions>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              ml: 2,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <ApiIcon />
              <Typography variant="h5" color="white">
                Crown
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                mb: 2,
              }}
            >
              <img src={crownImg} alt="Level" />
              <Typography variant="h3" color="white">
                {crown}
              </Typography>
            </Box>

            <Typography variant="body2" color="white" align="center">
              Few points more for {nextCrown} crown
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Tooltip>
  );
};

const Transaction = ({
  earnedPoints,
  vendorName,
  purchasedAmount,
  timeStamp,
}) => {
  return (
    <Tooltip title={`${earnedPoints} points earned`} placement="left" arrow>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          p: 2,
          backgroundImage: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
          borderRadius: 5,
          borderLeft: "10px solid #0ba360",
          width: "300px",
          transform: "translateX(120%)",
          animation: "slide-in 2s forwards 2s ease-in-out",
          animationDelay: "2s",
          WebkitAnimationDelay: "2s",
          WebkitAnimation: "slide-in 2s forwards 2s ease-in-out",
          "@keyframes slide-in": {
            "100%": {
              transform: "translateX(0%)",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              backgroundImage:
                "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
              width: "50px",
              height: "50px",
            }}
          >
            {earnedPoints}
          </Avatar>
          <Typography variant="h6">Points</Typography>
        </Box>
        <Box>
          <Typography variant="h5">{vendorName}</Typography>
          <Typography variant="h6">Purchased - ₹ {purchasedAmount}</Typography>
          <Typography variant="subtitle1" color="text.secondary" noWrap>
            {timeStamp}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};

const RecentTransactions = ({ data }) => {
  let transactionData = [
    {
      earnedPoints: 24,
      vendorName: "Raj Stores",
      purchasedAmount: 240,
      timeStamp: new Date().toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    },
    {
      earnedPoints: 12,
      vendorName: "Kumar Stores",
      purchasedAmount: 120,
      timeStamp: new Date().toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    },
    {
      earnedPoints: 3,
      vendorName: "Sai Stores",
      purchasedAmount: 30,
      timeStamp: new Date().toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    },
  ];

  if (data.length !== 0) {
    transactionData = [...data];
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        // background: "#6BCB77",
        backgroundImage: "linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)",
        borderRadius: 5,
        width: "350px",
        p: 2,
        boxShadow: "1px 1px 40px 0px 	rgba(40, 199, 111,1)",
        transform: "translateY(100%)",
        animation: "slide-in 2s forwards ease-in-out",
        WebkitAnimation: "slide-in 2s forwards ease-in-out",
        "@keyframes slide-in": {
          "100%": {
            transform: "translateY(0%)",
          },
        },
      }}
    >
      <Typography variant="h6" color="text.primary">
        Recent Transaction
      </Typography>
      {transactionData.map((transaction, index) => (
        <Transaction
          key={index}
          earnedPoints={transaction.earnedPoints}
          vendorName={transaction.vendorName}
          purchasedAmount={transaction.purchasedAmount}
          timeStamp={transaction.timeStamp}
        />
      ))}
    </Box>
  );
};

const DashboardMain = () => {
  const { auth } = useAuth();
  const [verifyNotif, setVerifyNotif] = useState("");
  const [assignVerfMsg, setAssignVerfMsg] = useState(false);

  if (!auth?.userData?.profile?.verify.verifiedEmail && !assignVerfMsg) {
    setAssignVerfMsg(true);
    console.log("user is not verified");
    setVerifyNotif("Please Check Your Inbox And Verify Your Email Id...");
  }

  console.log("verified : ", auth?.userData?.profile?.verify.verifiedEmail);
  console.log("crown level : ", auth?.userData?.profile?.meta?.crown);
  console.log("wallet points : ", auth?.userData?.profile?.wallet?.points);
  console.log(
    "latest transactions : ",
    auth?.userData?.profile?.wallet?.latestTransactions
  );

  return (
    <Box
      sx={{
        mb: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <WalletCard
            points={
              auth?.userData?.profile?.wallet?.points === 0
                ? "123"
                : auth?.userData?.profile?.wallet?.points
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CrownCard
            crown={auth?.userData?.profile?.meta?.crown}
            // crownImg={"https://img.icons8.com/color-glass/48/000000/crown.png"}
            crownImg={crown}
            nextCrown={"gold"}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              mt: 5,
            }}
          >
            <ChartDisplay />
            <Typography variant="subtitle2" align="center">
              Points Earnings in a Week
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: { xs: 4, md: 0 },
            }}
          >
            <RecentTransactions
              data={auth?.userData?.profile?.wallet?.latestTransactions}
            />
          </Box>
        </Grid>
      </Grid>
      <PopupAlert
        message={verifyNotif}
        clearMessage={setVerifyNotif}
        alertType="warning"
      />
    </Box>
  );
};

export default DashboardMain;
// {
//   "_id": "624955d912efd3b8f6c9a26d",
//   "userType": "consumer",
//   "userName": "Deepak4",
//   "email": "deepak99pmk@gmail.com",
//   "phoneNo": "9488320328",
//   "profile": {
//       "_id": "624955d912efd3b8f6c9a26b",
//       "meta": {
//           "firstName": "Deepak",
//           "lastName": "S",
//           "age": 22,
//           "sex": "male",
//           "crown": "basic",
//           "status": "active",
//           "lastActive": "2022-04-08T07:52:57.072Z"
//       },
//       "verify": {
//           "emailCode": "SmmtqztNDG5Z77Z6MXfNg",
//           "verifiedEmail": true,
//           "verifiedPhone": false
//       },
//       "wallet": {
//           "points": 0,
//           "latestTransactions": []
//       },
//       "__v": 0
//   },
//   "onModel": "Consumer",
//   "__v": 0,
//   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDk1NWQ5MTJlZmQzYjhmNmM5YTI2ZCIsImlhdCI6MTY0OTQwMDMxMywiZXhwIjoxNjQ5NDg2NzEzfQ.xqHl8e2Ly4G3sHspfuXqpkLgjM7-rk_ztE6XNIrsmXw"
// }
