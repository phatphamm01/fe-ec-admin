import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "@components/layout";

import tw, { styled } from "twin.macro";
import App from "@pages/app";
import Dashboard from "@pages/app/Dashboard";

const AppContainer = styled.div`
  ${tw``}
`;

const AppLayout = () => {
  return (
    <AppContainer>
      <Layout>
        <App />
      </Layout>
    </AppContainer>
  );
};

export default AppLayout;
