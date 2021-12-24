import Auth from "@pages/auth";
import React from "react";
import { Route, Routes } from "react-router-dom";
import tw, { styled } from "twin.macro";

const AuthContainer = styled.div`
  ${tw``}
`;

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
