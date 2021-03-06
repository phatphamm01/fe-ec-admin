/* eslint-disable no-unused-vars */
import {
  EyeOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import checkNullObject from "@common/function/checkNullObject";
import randomImage from "@common/utils/image/randomImage";
import EllipsisDropdown from "@components/shared-components/EllipsisDropdown";
import Flex from "@components/shared-components/Flex";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getAllUser } from "@redux/slices/user";
import fetchUser from "@services/user";
import { Avatar, Card, Input, Menu, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import utils from "src/utils";
import { IUser } from "../../redux/types/user/index";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { allUser } = useAppSelector((state) => state.userReducers);
  const { auth } = useAppSelector((state) => state.authReducers);

  const [list, setList] = useState<any>();

  useEffect(() => {
    getAllUserApi();
  }, []);

  useEffect(() => {
    setList(allUser);
  }, [allUser]);

  const getAllUserApi = () => {
    dispatch(getAllUser());
  };

  const handleRole = async (id: string, status: "user" | "admin") => {
    if (id === auth._id) {
      message.error(`You can't change your own role`);
      return;
    }

    try {
      let newList = list?.map((value: any) =>
        value._id === id ? { ...value, role: status } : value
      );

      let payload = { userId: id, isAdmin: "user" ? false : true };
      await fetchUser.updateRole(payload);

      setList(newList);

      message.success(`Change success`);
    } catch (error) {
      message.error(`Change fail`);
    }
  };

  const tableColumns = [
    {
      title: "Image",
      dataIndex: "photo",
      render: (text: any, record: any) => (
        <div className="d-flex align-items-center">
          <Avatar size={30} src={randomImage()} />
        </div>
      ),
    },
    {
      title: "H??? v?? t??n",
      dataIndex: "fullName",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "lname"),
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "email"),
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "phoneNumber",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "phoneNumber"),
    },
    {
      title: "?????a ch???",
      dataIndex: "address",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "address"),
    },
    {
      title: "Ti???n (VND)",
      dataIndex: "currentMoney",
      render: (deposits: any) => (
        <div>
          <NumberFormat
            displayType={"text"}
            value={Math.round(deposits * 100) / 100}
            thousandSeparator={true}
          />
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "currentMoney"),
    },
    {
      title: "Admin",
      dataIndex: "role",
      render: (_: any, record: any) => (
        <Flex alignItems="center">
          {record.role === "admin" ? (
            <StarFilled
              onClick={() => handleRole(record._id, "user")}
              style={{ fontSize: "20px", color: "red" }}
            />
          ) : (
            <StarOutlined
              onClick={() => handleRole(record._id, "admin")}
              style={{ fontSize: "20px" }}
            />
          )}
        </Flex>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "isFeatured"),
    },
    {
      title: "H??nh ?????ng",
      dataIndex: "actions",
      render: (_: any, elm: any) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const dropdownMenu = (row: IUser) => {
    return (
      <Menu>
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">DS s??? ti???t ki???m</span>
          </Flex>
        </Menu.Item>
      </Menu>
    );
  };

  const viewDetails = async (row: IUser) => {
    navigate("/user/passbook/" + row._id);
  };

  const onSearch = (e: any) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : allUser;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
        </Flex>
      </Flex>
      <div className="table-responsive">
        <Table
          loading={checkNullObject(list)}
          columns={tableColumns}
          dataSource={list}
          rowKey="email"
        />
      </div>
    </Card>
  );
};

export default User;
