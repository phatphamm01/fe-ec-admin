import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import EllipsisDropdown from "@components/shared-components/EllipsisDropdown";
import Flex from "@components/shared-components/Flex";
import { IPassbook } from "@redux/types/passbook/index";
import fetchPassbook from "@services/passbook";
import { Card, Input, Menu, message, Modal, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import utils from "src/utils";
import TableDetail from "./Table";

interface IPassbookList {
  dataList: any;
  keyId: string;
  titleId: string;
}

const Passbook: React.FC<IPassbookList> = ({ dataList, keyId, titleId }) => {
  const [list, setList] = useState<IPassbook[]>();

  useEffect(() => {
    if (dataList) {
      setList(dataList);
    }
  }, [dataList]);

  const getDetailPassbookApi = async (passbookid: string) => {
    const data = await fetchPassbook.checkInformationpassbook({
      passbookid,
    });
    return data;
  };

  const onSearch = (e: any) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : dataList;
    const data = utils.wildCardSearch(searchArray!, value);
    setList(data);
  };

  const viewDetails = async (row: IPassbook) => {
    try {
      const result = await getDetailPassbookApi(row._id!);

      if (result.success === false) {
        message.error(result.message);
        return;
      }

      Modal.info({
        width: "500px",
        title: "Chi tiết sổ tiết kiệm",

        content: <TableDetail data={result} />,
        onOk() {},
      });
    } catch (error) {}
  };

  const tableColumns = [
    {
      title: titleId,
      dataIndex: keyId,
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, keyId),
    },
    {
      title: "Thời hạn",
      dataIndex: "option",
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "option"),
    },
    {
      title: "Ngày gửi",
      dataIndex: "createAt",
      render: (_: any, record: any) => (
        <span>{moment(record.createAt).format("LL")}</span>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "option"),
    },
    {
      title: "Ngày đáo hạn",
      dataIndex: "endAt",
      render: (_: any, record: any) => (
        <span>{moment(record.endAt).format("LL")}</span>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "option"),
    },
    {
      title: "Tiền gửi (VND)",
      dataIndex: "deposits",
      render: (deposits: any) => (
        <div>
          <NumberFormat
            displayType={"text"}
            value={Math.round(deposits * 100) / 100}
            thousandSeparator={true}
          />
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "deposits"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_: any, record: any) => (
        <div>
          {!record.status ? (
            <p tw="text-green-600">Hoạt động</p>
          ) : (
            <p tw="text-red-600">Đã rút</p>
          )}
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "status"),
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

  const dropdownMenu = (row: IPassbook) => {
    return (
      <Menu>
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">Xem chi tiết</span>
          </Flex>
        </Menu.Item>
      </Menu>
    );
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
          loading={list?.length === 0}
          columns={tableColumns}
          dataSource={list}
          rowKey="_id"
        />
      </div>
    </Card>
  );
};

export default Passbook;
