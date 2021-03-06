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
    console.log(date);

    if (date) {
      getOptionsByTimeApi();
    }
  }, [date]);

  useEffect(() => {
    if (date) {
      setList(allOptionByTime);
    } else {
      setList(allOption);
    }
  }, [date]);

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
      title: "K?? h???n",
      dataIndex: "option",
      render: (option: any) => <span>{option} Th??ng</span>,
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "option"),
    },
    {
      title: "L??i su???t",
      dataIndex: "value",
      render: (value: any) => <span>{value} %</span>,
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "value"),
    },
    {
      title: "H??nh ?????ng",
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
            <span className="ml-2">S???a</span>
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
        message.success("S???a th??nh c??ng");

        getAllUserApi();
        setVisible(false);

        setIsEdit(false);
        return;
      }

      await fetchOption.addOption(payload);
      message.success("Th??m th??nh c??ng");

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
    if (!value) {
      setDate(null);
      return;
    }

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
            Th??m option
          </Button>
        </div>
      </Flex>

      <div className="table-responsive">
        <Table
          loading={checkNullObject(allOption)}
          columns={tableColumns}
          dataSource={list}
          rowKey="_id"
        />
      </div>
      <Modal
        title={isEdit ? "Ch???nh s???a" : "Th??m m???i"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[0, 16]}>
          {!isEdit && (
            <Col span={24}>
              <span tw="pb-1 pl-2 font-medium">Th???i h???n</span>
              <Input
                tw="w-full"
                title="Th???i h???n"
                value={optionInput}
                onChange={(e) => {
                  setOptionInput(e.target.value);
                }}
                placeholder="Nh???p th???i h???n"
              />
            </Col>
          )}
          <Col span={24}>
            <span tw="pb-1 pl-2 font-medium">L??i su???t</span>
            <Input
              tw="w-full"
              title="L??i su???t"
              value={valueInput}
              onChange={(e) => {
                setValueInput(e.target.value);
              }}
              placeholder="Nh???p l??i su???t"
            />
          </Col>
        </Row>
      </Modal>
    </Card>
  );
};

export default User;
