import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const data = [
  {
    vendor: "82042949242394432",
    type: "Credit",
    amount: 100,
    points: 10,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  {
    vendor: "82042949242394432",
    type: "Redeem",
    amount: 20,
    points: 200,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  {
    vendor: "82042949242394432",
    type: "Credit",
    amount: 600,
    points: 60,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  {
    vendor: "82042949242394432",
    type: "Redeem",
    amount: 70,
    points: 700,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  {
    vendor: "82042949242394432",
    type: "Credit",
    amount: 300,
    points: 30,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  {
    vendor: "82042949242394432",
    type: "Credit",
    amount: 459,
    points: 45,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  {
    vendor: "82042949242394432",
    type: "Redeem",
    amount: 76,
    points: 768,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  {
    vendor: "82042949242394432",
    type: "Credit",
    amount: 1129,
    points: 112,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  {
    vendor: "82042949242394432",
    type: "Redeem",
    amount: 4,
    points: 45,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  {
    vendor: "82042949242394432",
    type: "Credit",
    amount: 379,
    points: 37,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  {
    vendor: "82042949242394432",
    type: "Credit",
    amount: 865,
    points: 86,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
];

const TransactionCard = ({ transactionData }) => {
  return (
    <Tooltip
      title={
        transactionData.type === "Credit"
          ? `${transactionData.points} Points Earned`
          : `${transactionData.amount} Rupees Redeemed`
      }
      placement="right"
      arrow
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          p: 2,
          backgroundImage: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
          borderRadius: 5,
          borderLeft:
            transactionData.type === "Credit"
              ? "10px solid #0ba360"
              : "10px solid #f09819",
          boxShadow:
            transactionData.type === "Credit"
              ? "1px 1px 40px 0px rgba(11, 163, 96, .18)"
              : "1px 1px 40px 0px rgba(240, 152, 25, .18)",
          width: { xs: "360px", md: "400px" },
          transform: "translateX(-200%)",
          animation: "slide-in 3s forwards ease-in-out",
          WebkitAnimation: "slide-in 3s forwards ease-in-out",
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
            transform: "translateX(150%)",
            animation: "slide-in 3s forwards 2s ease-in-out",
            WebkitAnimation: "slide-in 3s forwards 2s ease-in-out",
            "@keyframes slide-in": {
              "100%": {
                transform: "translateX(0%)",
              },
            },
          }}
        >
          <Avatar
            sx={{
              backgroundImage:
                transactionData.type === "Credit"
                  ? "linear-gradient(to top, #0ba360 0%, #3cba92 100%)"
                  : "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)",

              width: "50px",
              height: "50px",
              mb: 1,
            }}
          >
            {transactionData.type === "Credit"
              ? `${transactionData.points}`
              : `${transactionData.amount}`}
          </Avatar>
          <Typography variant="body2">
            {transactionData.type === "Credit" ? "🪙 Points" : "₹ Rupees"}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
            zIndex: 2,
          }}
        >
          <Typography variant="h5">{transactionData.vendor}</Typography>
          <Typography variant="h6">
            {transactionData.type === "Credit"
              ? `Purchased - ₹ ${transactionData.amount}`
              : `Redeemed -  🪙 ${transactionData.points}`}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" noWrap>
            {transactionData.date}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};

const AllTransactions = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: 10,
        minHeight: "70vh",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {data.map((transactionData, index) => (
          <Grid item xs={11} md={5} key={index}>
            <TransactionCard transactionData={transactionData} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllTransactions;
