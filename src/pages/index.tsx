import isNullObject from "@common/function/isNullObject";
import { useAppSelector } from "@hook/redux";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AUTH_PREFIX_PATH } from "src/config/app";
import AppLayout from "src/layouts/AppLayout";
import AuthLayout from "src/layouts/AuthLayout";
import tw, { styled } from "twin.macro";

const PageContainer = styled.div`
  ${tw``}
`;

interface IPage {}

const Pages: React.FC<IPage> = () => {
  const { auth } = useAppSelector((state) => state.authReducers);
  return (
    <PageContainer>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route
          path="/*"
          element={
            <RouteInterceptor isAuthenticated={!isNullObject(auth)}>
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
