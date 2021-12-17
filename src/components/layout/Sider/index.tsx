import React, { useState } from "react";
import { Menu, Layout } from "antd";

import { useAppDispatch, useAppSelector } from "@hook/redux";
import { setStateNav } from "@redux/slices/theme";
import MenuContent from "../MenuContent";

const { Sider, Header } = Layout;
const { SubMenu } = Menu;

interface ISlider {}

const Slider: React.FC<ISlider> = () => {
  const dispatch = useAppDispatch();
  const { navCollapsed } = useAppSelector((state) => state.themeReducers);

  const onCollapse = () => {
    dispatch(setStateNav(!navCollapsed));
  };

  return (
    <Sider
      style={{ background: "white" }}
      collapsible
      collapsed={navCollapsed}
      onCollapse={onCollapse}
      width={240}
    >
      <MenuContent />
    </Sider>
  );
};

export default Slider;
