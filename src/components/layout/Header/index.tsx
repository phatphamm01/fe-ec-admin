import React from "react";
import { Layout } from "antd";
import NavSearch from "@designs/NavSearch";
import tw, { css, styled } from "twin.macro";
import { useAppSelector } from "@hook/redux";
import NavProfile from "../NavProfile";
import NavPanel from "../NavPanel";
import NavNotification from "../NavNotification";
const { Header: HeaderAntd } = Layout;

const Logo = styled.div<{ width: number }>`
  ${tw``}
  transition: all 0.2s;
  ${({ width }) => css`
    flex: 0 0 ${width}px;
    max-width: ${width}px;
    min-width: ${width}px;
    width: ${width}px;
  `}
`;

const HeaderMain = styled.div`
  ${tw`flex items-center justify-between w-full px-4`}
`;

const AuthBox = styled.div`
  ${tw`flex items-center`}
`;

const SearchBox = styled.div`
  ${tw`ml-4`}
`;
const Image = styled.img`
  ${tw`h-full w-full block object-cover xl:px-6 `}
`;
interface IHeader {}

const Header: React.FC<IHeader> = () => {
  const { navCollapsed } = useAppSelector((state) => state.themeReducers);

  return (
    <HeaderAntd tw="bg-white p-0 flex items-center">
      <Logo width={!navCollapsed ? 240 : 80}>
        <Image
          src="https://f002.backblazeb2.com/file/summonshop/logo.png"
          alt="logo"
        />
      </Logo>
      <HeaderMain>
        <SearchBox>{/* <NavSearch /> */}</SearchBox>
        <AuthBox>
          <NavProfile />
        </AuthBox>
      </HeaderMain>
    </HeaderAntd>
  );
};

export default Header;
