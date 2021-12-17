import isNullObject from "@common/function/isNullObject";
import { useAppSelector } from "@hook/redux";
import React, { Fragment } from "react";

import {
  Route,
  BrowserRouter,
  Navigate,
  Routes,
  useParams,
} from "react-router-dom";
import { AUTH_PREFIX_PATH } from "src/config/app";
import AppLayout from "src/layouts/AppLayout";
import AuthLayout from "src/layouts/AuthLayout";

import tw, { styled } from "twin.macro";

const PageContainer = styled.div`
  ${tw``}
`;

interface IPage {}

const Pages: React.FC<IPage> = () => {
  const { user } = useAppSelector((state) => state.userReducers);
  return (
    <PageContainer>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route
          path="/*"
          element={
            <RouteInterceptor isAuthenticated={!isNullObject(user)}>
              <AppLayout />
            </RouteInterceptor>
          }
        />
      </Routes>
    </PageContainer>
  );
};

export default Pages;

const RouteInterceptor: React.FC<any> = ({ children, isAuthenticated }) => {
  return isAuthenticated ? (
    children
  ) : (
    <Navigate replace to={`${AUTH_PREFIX_PATH}/login`} />
  );
};
