import React from "react";
import Dashboard from "src/container/Dashboard";
import tw, { styled } from "twin.macro";

const DashboardContainer = styled.div`
  ${tw``}
`;

interface Dashboard {}

const DashboardPage: React.FC<Dashboard> = () => {
  return (
    <DashboardContainer>
      <Dashboard />
    </DashboardContainer>
  );
};

export default DashboardPage;
