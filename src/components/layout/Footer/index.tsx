import { Layout } from "antd";
import React from "react";

const { Footer: FooterAntd } = Layout;

interface IFooter {}

const Footer: React.FC<IFooter> = () => {
  return (
    <FooterAntd tw="text-center">
      Ant Design ©2021 Created by Ant UED
    </FooterAntd>
  );
};

export default Footer;
