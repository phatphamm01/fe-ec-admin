/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Badge, Menu, Tag } from "antd";

import {
  EyeOutlined,
  FileExcelOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AvatarStatus from "@components/shared-components/AvatarStatus";
import EllipsisDropdown from "@components/shared-components/EllipsisDropdown";
import Flex from "@components/shared-components/Flex";
import NumberFormat from "react-number-format";
import moment from "moment";

import utils from "src/utils";
import { DATE_FORMAT_DD_MM_YYYY } from "@common/constants/DateConstant";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getBills } from "@redux/slices/bill";

const { Option } = Select;

const getPaymentStatus = (status: any) => {
  if (status === "Paid") {
    return "success";
  }
  if (status === "Pending") {
    return "warning";
  }
  if (status === "Expired") {
    return "error";
  }
  return "";
};

const getShippingStatus = (status: any) => {
  if (status === "Ready") {
    return "blue";
  }
  if (status === "Shipped") {
    return "cyan";
  }
  return "";
};

const paymentStatusList = ["Paid", "Pending", "Expired"];

const Orders = () => {
  const dispatch = useAppDispatch();
  const { bill } = useAppSelector((state) => state.billReducers);

  const [list, setList] = useState<any>();

  useEffect(() => {
    getBillApi();
  }, []);

  useEffect(() => {
    setList(bill);
  }, [bill]);

  const getBillApi = () => {
    dispatch(getBills());
  };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Date",
      dataIndex: "createAt",
      render: (_: any, record: any) => (
        <span>{moment(record.createAt).format("MMMM Do YYYY, h:mm:ss a")}</span>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "date"),
    },
    {
      title: "Total",
      dataIndex: "amount",
      render: (_: any, record: any) => (
        <span className="font-weight-semibold">
          <NumberFormat
            displayType={"text"}
            value={(Math.round(record.amount * 100) / 100).toFixed(2)}
            prefix={"$"}
            thousandSeparator={true}
          />
        </span>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "amount"),
    },
  ];

  const onSearch = (e: any) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : bill;
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
        <Table columns={tableColumns} dataSource={list} rowKey="_id" />
      </div>
    </Card>
  );
};

export default Orders;
