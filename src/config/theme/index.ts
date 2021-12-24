import {
  BookOutlined,
  PieChartOutlined,
  TagOutlined,
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
    key: "user",
    path: `user`,
    title: "Users",
    icon: UserOutlined,
    submenu: [],
  },
  {
    key: "passbook",
    path: `passbook`,
    title: "Passbook",
    icon: BookOutlined,
    submenu: [],
  },
  {
    key: "option",
    path: `option`,
    title: "Option",
    icon: TagOutlined,
    submenu: [],
  },
];
