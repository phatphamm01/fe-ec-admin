/* eslint-disable no-unused-vars */
import {
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import checkNullObject from "@common/function/checkNullObject";
import EllipsisDropdown from "@components/shared-components/EllipsisDropdown";
import Flex from "@components/shared-components/Flex";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getAllOption, getOptionsByTime } from "@redux/slices/option";
import fetchOption from "@services/option/index";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  Menu,
  message,
  Modal,
  Row,
  Table,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import utils from "src/utils";
import { IOption } from "../../redux/types/option/index";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { allOption, allOptionByTime } = useAppSelector(
    (state) => state.optionReducers
  );

  const [list, setList] = useState<any>();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [idOption, setIdOption] = useState<string>("");
  const [optionInput, setOptionInput] = useState<string>("");
  const [valueInput, setValueInput] = useState<string>("");

  const [date, setDate] = useState<any>();

  useEffect(() => {
    getAllUserApi();
  }, []);

  useEffect(() => {
    setList(allOption);
  }, [allOption]);

  useEffect(() => {
    if (date) {
      getOptionsByTimeApi();
    }
  }, [date]);

  useEffect(() => {
    if (allOptionByTime.length > 0) {
      setList(allOptionByTime);
    } else {
      setList(allOption);
    }
  }, [allOption, allOptionByTime]);

  const getAllUserApi = () => {
    dispatch(getAllOption());
  };

  const getOptionsByTimeApi = () => {
    if (date) {
      dispatch(getOptionsByTime(date));
    }
  };

  const onSearch = (e: any) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : allOption;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  const tableColumns = [
    {
      title: "Kì hạn",
      dataIndex: "option",
      render: (option: any) => <span>{option} Tháng</span>,
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "option"),
    },
    {
      title: "Lãi suất",
      dataIndex: "value",
      render: (value: any) => <span>{value} %</span>,
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "value"),
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      width: "120px",
      render: (_: any, elm: any) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const dropdownMenu = (row: IOption) => {
    return (
      <Menu>
        <Menu.Item onClick={() => editOption(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">Sửa</span>
          </Flex>
        </Menu.Item>
      </Menu>
    );
  };

  const editOption = async (row: IOption) => {
    setVisible(true);
    setIsEdit(true);
    setIdOption(row._id!);
    setOptionInput(row.option + ""!);
    setValueInput(row.value + ""!);
  };

  const handleCreate = () => {
    setVisible(true);

    setOptionInput("");
    setValueInput("");
  };

  const handleOk = async () => {
    let payload: any = {
      option: Number(optionInput),
      value: Number(valueInput),
    };

    try {
      if (isEdit) {
        payload.id = idOption;

        await fetchOption.editOption(payload);
        message.success("Sửa thành công");

        getAllUserApi();
        setVisible(false);

        setIsEdit(false);
        return;
      }
      debugger;
      await fetchOption.addOption(payload);
      message.success("Thêm thành công");

      getAllUserApi();
      setVisible(false);
    } catch (error: any) {
      message.error(error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleShowDate = (value: any) => {
    let date = moment(value);
    const payload = {
      date: date.get("date"),
      month: date.get("month"),
      year: date.get("year"),
    };

    setDate(payload);
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
          <div className="mb-3">
            <DatePicker onChange={handleShowDate} />
          </div>
        </Flex>
        <div>
          <Button
            onClick={handleCreate}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Thêm option
          </Button>
        </div>
      </Flex>

      <div className="table-responsive">
        <Table
          loading={checkNullObject(list)}
          columns={tableColumns}
          dataSource={list}
          rowKey="_id"
        />
      </div>
      <Modal
        title={isEdit ? "Chỉnh sửa" : "Thêm mới"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[0, 16]}>
          {!isEdit && (
            <Col span={24}>
              <span tw="pb-1 pl-2 font-medium">Thời hạn</span>
              <Input
                tw="w-full"
                title="Thời hạn"
                value={optionInput}
                onChange={(e) => {
                  setOptionInput(e.target.value);
                }}
                placeholder="Nhập thời hạn"
              />
            </Col>
          )}
          <Col span={24}>
            <span tw="pb-1 pl-2 font-medium">Lãi suất</span>
            <Input
              tw="w-full"
              title="Lãi suất"
              value={valueInput}
              onChange={(e) => {
                setValueInput(e.target.value);
              }}
              placeholder="Nhập lãi suất"
            />
          </Col>
        </Row>
      </Modal>
    </Card>
  );
};

export default User;
