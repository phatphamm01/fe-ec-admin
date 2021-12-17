/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Avatar, message } from "antd";
import { FileExcelOutlined, SearchOutlined } from "@ant-design/icons";
import Flex from "@components/shared-components/Flex";
import moment from "moment";
import utils from "src/utils";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getAllUser } from "@redux/slices/user";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import fetchUser from "@services/user";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { allUser, user } = useAppSelector((state) => state.userReducers);

  const [list, setList] = useState<any>();

  useEffect(() => {
    getBillApi();
  }, []);

  useEffect(() => {
    setList(allUser);
  }, [allUser]);

  const getBillApi = () => {
    dispatch(getAllUser());
  };

  const handleRole = async (id: string, status: "ADMIN" | "USER") => {
    if (id === user._id) {
      message.error(`You can't change your own role`);
      return;
    }
    try {
      let payload = { id: id, data: { role: status } };
      let newList = list?.map((value: any) =>
        value._id === id ? { ...value, role: status } : value
      );

      setList(newList);

      let response = await fetchUser.updateRole(payload);
      console.log(response);

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
          <Avatar size={30} src={record.photo} />
        </div>
      ),
    },
    {
      title: "Last name",
      dataIndex: "lname",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "lname"),
    },
    {
      title: "Fist name",
      dataIndex: "fname",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "fname"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "email"),
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
  ];

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
        <Table columns={tableColumns} dataSource={list} rowKey="email" />
      </div>
    </Card>
  );
};

export default Orders;
