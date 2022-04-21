import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import theme from "./Utils/theme";

import ConsumerLayout from "./Components/Consumer/ConsumerLayout";
import DashboardLayout from "./Pages/Consumer/DashboardLayout";
import EmptyLayout from "./Components/EmptyLayout";
import Layout from "./Components/Layout";

import About from "./Pages/Landing/About";
import Contact from "./Pages/Landing/Contact";
import Feautures from "./Pages/Landing/Feautures";
import Landing from "./Pages/Landing/Landing";

import ForgetPassword from "./Pages/Common/ForgetPassword";
import Login from "./Pages/Common/Login";
import Page404 from "./Pages/Common/Page404";
import ResetPassword from "./Pages/Common/ResetPassword";

import Signup from "./Pages/Consumer/Signup";
import VerifyConsumer from "./Pages/Consumer/VerifyConsumer";

import AccountProfile from "./Components/Consumer/Dashboard/AccountProfile";
import AllTransactions from "./Components/Consumer/Dashboard/AllTransactions";
import DashboardMain from "./Components/Consumer/Dashboard/DashboardMain";
import Support from "./Components/Consumer/Dashboard/Support";

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="about" element={<About />} />
            <Route path="feautures" element={<Feautures />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />

            <Route path="consumer" element={<EmptyLayout />}>
              <Route path="signup" element={<Signup />} />
              <Route path="verify/:token" element={<VerifyConsumer />} />
            </Route>
          </Route>

          {/* private routes : Consumer */}
          <Route path="consumer" element={<ConsumerLayout />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardMain />} />
              <Route path="profile" element={<AccountProfile />} />
              <Route path="transactions" element={<AllTransactions />} />
              <Route path="support" element={<Support />} />
            </Route>
          </Route>

          {/* catch all routes for 404 */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default Home;
