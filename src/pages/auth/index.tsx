import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./Login";

interface IApp {}
const Auth: React.FC<IApp> = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default Auth;
