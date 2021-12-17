import { ReactChild } from "react";
import {
  PieChartOutlined,
  ShoppingCartOutlined,
  AccountBookOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface INav {
  key: string;
  path: string;
  title: string;
  icon: any;
  submenu: INav[];
}

export const navList: INav[] = [
  {
    key: "dashboard",
    path: `dashboard`,
    title: "Dashboard",
    icon: PieChartOutlined,
    submenu: [],
  },
  {
    key: "product",
    path: `product`,
    title: "Product",
    icon: AccountBookOutlined,
    submenu: [
      {
        key: "product-list",
        path: `product-list`,
        title: "Product List",
        icon: "",
        submenu: [],
      },
      {
        key: "product-add",
        path: `product-add`,
        title: "Add Product",
        icon: "",
        submenu: [],
      },
    ],
  },
  {
    key: "order",
    path: `order`,
    title: "Order",
    icon: ShoppingCartOutlined,
    submenu: [],
  },
  {
    key: "user",
    path: `user`,
    title: "Users",
    icon: UserOutlined,
    submenu: [],
  },
];
