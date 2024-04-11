import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Home from "../components/Home";
import Login from "../components/Login";
import OnBoardingPage from "../components/OnBoardingPage";
import ResetPassword from "../components/ResetPassword";
import PasswordVerifiedEmail from "../components/PasswordVerifiedEmail";
import ForgotPassword from "../components/ForgotPassword";
import Grants from "../components/Grants";
import PrivateRoute from "./PrivateRoute";
import Profile from "../components/Profile";
import Recommendations from "../components/Recommendations";
import Navbar from "../components/Navbar";
import AdminDashboard from "../components/AdminDashboard";
import { useSelector } from "react-redux";
import { DECODED_TOKEN, SESSION_TIMEOUT } from "../components/helpers/Helper";
import AdminPrivateRoute from "./AdminPrivateRoute";

const AppRouter = () => {
  const authToken = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || null
  );
  const userType = DECODED_TOKEN(authToken)?.type;

  const navigation = useNavigate();

  useEffect(() => {
    if (authToken && window.location.pathname === "/") {
      if (userType) navigation("/admin");
      else navigation("/profile");
    }
  }, [authToken]);

  return (
    <>
      {!SESSION_TIMEOUT(authToken) && <Navbar userType={userType} />}
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/onboarding" element={<OnBoardingPage />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        ></Route>
        <Route
          path="/password-verify"
          element={<PasswordVerifiedEmail />}
        ></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>

        {/* Authorized Routes */}

        <Route
          path="/grants"
          element={
            <PrivateRoute userType={userType}>
              <Grants />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute userType={userType}>
              <Profile />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/recommendations"
          element={
            <PrivateRoute userType={userType}>
              <Recommendations />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute userType={userType}>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default AppRouter;
