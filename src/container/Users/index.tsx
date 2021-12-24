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
import { Avatar, Card, Input, Menu, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import utils from "src/utils";
import { IUser } from "../../redux/types/user/index";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { allUser, user } = useAppSelector((state) => state.userReducers);

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

  const handleRole = async (id: string, status: "ADMIN" | "USER") => {
    if (id === user._id) {
      message.error(`You can't change your own role`);
      return;
    }
    try {
      let newList = list?.map((value: any) =>
        value._id === id ? { ...value, role: status } : value
      );

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
      title: "Họ và tên",
      dataIndex: "fullName",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "lname"),
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "email"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "phoneNumber"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "address"),
    },
    {
      title: "Tiền (VND)",
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
          {record.role === "ADMIN" ? (
            <StarFilled
              onClick={() => handleRole(record._id, "USER")}
              style={{ fontSize: "20px", color: "red" }}
            />
          ) : (
            <StarOutlined
              onClick={() => handleRole(record._id, "ADMIN")}
              style={{ fontSize: "20px" }}
            />
          )}
        </Flex>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "isFeatured"),
    },
    {
      title: "Hành động",
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
            <span className="ml-2">DS sổ tiết kiệm</span>
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
