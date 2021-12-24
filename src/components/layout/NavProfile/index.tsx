import {
  EditOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import randomImage from "@common/utils/image/randomImage";
import { useAppSelector } from "@hook/redux";
import { Avatar, Dropdown, Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const menuItem = [
  {
    title: "Edit Profile",
    icon: EditOutlined,
    path: "/",
  },

  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/",
  },
  {
    title: "Billing",
    icon: ShopOutlined,
    path: "/",
  },
  {
    title: "Help Center",
    icon: QuestionCircleOutlined,
    path: "/",
  },
];

export const NavProfile = () => {
  const { user } = useAppSelector((state) => state.userReducers);
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.clear();
    location.reload();
  };

  const profileImg = randomImage();
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
          <div className="pl-3">
            <h4 className="mb-0">{user.fullName}</h4>
            <span>Admin</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          <Menu.Item key={menuItem.length + 1} onClick={(e) => signOut()}>
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default NavProfile;
