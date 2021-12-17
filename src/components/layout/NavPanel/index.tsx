import React, { Component, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Drawer, Menu } from "antd";

const NavPanel = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="panel" onClick={showDrawer}>
          <a href={void 0}>
            <SettingOutlined className="nav-icon mr-0" />
          </a>
        </Menu.Item>
      </Menu>
      <Drawer
        title="Theme Config"
        placement="left"
        width={350}
        onClose={onClose}
        visible={visible}
      ></Drawer>
    </>
  );
};

export default NavPanel;
