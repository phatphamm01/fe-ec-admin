import React from "react";
import { Route, Routes, Outlet, useParams } from "react-router-dom";
import tw, { styled } from "twin.macro";
import Auth from "@pages/auth";
import LoginTwo from "@pages/auth/Login";

const AuthContainer = styled.div`
  ${tw``}
`;

const Auths = () => {
  return (
    <AuthContainer>
      12332
      <Outlet />
    </AuthContainer>
  );
};

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <Routes>
        <Route path="/*" element={<Auth />}></Route>
      </Routes>
    </div>
  );
};

export default AuthLayout;
