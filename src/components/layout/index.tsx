import { Layout as LayoutAntd } from "antd";
import React from "react";
import tw, { styled } from "twin.macro";
import Footer from "./Footer";
import Header from "./Header";
import Sider from "./Sider";

const { Content } = LayoutAntd;
const LayoutContainer = styled.div`
  ${tw``}
`;
const Main = styled.div`
  ${tw`px-4  `}
`;
const ContentBox = styled(Content)`
  ${tw`p-4`}
`;

interface ILayout {}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <LayoutAntd style={{ minHeight: "100vh" }}>
        <Sider />
        <LayoutAntd className="site-layout">
          <ContentBox>
            <Main>
              {/* <Breadcrumb /> */}
              {/* <ProductList /> */}
              {children}
            </Main>
          </ContentBox>
          <Footer />
        </LayoutAntd>
      </LayoutAntd>
    </LayoutContainer>
  );
};

export default Layout;
