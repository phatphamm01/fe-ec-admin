import { Menu } from "antd";
import React from "react";
import tw, { styled } from "twin.macro";

import {
  PieChartOutlined,
  ShoppingCartOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { navList } from "src/config/theme";
import Icon from "@components/util-components/Icon";

const MenuContentContainer = styled.div`
  ${tw``}
`;

interface IMenuContent {}

const MenuContent: React.FC<IMenuContent> = () => {
  const params = useParams();

  return (
    <MenuContentContainer>
      <Menu
        style={{ fontWeight: 500 }}
        theme="light"
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[params?.["*"] || ""]}
        mode="inline"
      >
        {navList.map((navlv1) =>
          navlv1.submenu.length > 0 ? (
            <SubMenu
              key={navlv1.key}
              icon={navlv1.icon ? <Icon type={navlv1?.icon} /> : null}
              title={navlv1.title}
            >
              {navlv1.submenu.map((navlv2) => (
                <Menu.Item key={navlv2.key}>
                  <Link to={navlv2.path}>{navlv2.title}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item
              key={navlv1.key}
              icon={navlv1.icon ? <Icon type={navlv1?.icon} /> : null}
            >
              <Link to={navlv1.path}>{navlv1.title}</Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </MenuContentContainer>
  );
};

export default MenuContent;
