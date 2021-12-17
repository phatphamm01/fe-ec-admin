import React, { useEffect, useState } from "react";
import { Card, Table, TreeSelect, Input, Button, Menu, message } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AvatarStatus from "@components/shared-components/AvatarStatus";
import EllipsisDropdown from "@components/shared-components/EllipsisDropdown";
import Flex from "@components/shared-components/Flex";
import NumberFormat from "react-number-format";

import utils from "src/utils";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getCategories } from "@redux/slices/common";
import { getProductsByType } from "@redux/slices/product";
import { IAllProducts, IProduct } from "@redux/types/product";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import fetchProduct from "@services/products";

const { TreeNode } = TreeSelect;

const ProductList = () => {
  let navigate = useNavigate();
  let dispatch = useAppDispatch();
  let { categories } = useAppSelector((state) => state.commonReducers);
  let { productsByType } = useAppSelector((state) => state.productReducers);

  const [list, setList] = useState<IAllProducts>();
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    dispatch(getCategories());
    handleShowCategory("999999/all");
  }, []);

  useEffect(() => {
    if (productsByType) {
      setList(productsByType);
    }
  }, [productsByType]);

  const handleShowCategory = (value: string) => {
    let id = value.split("/").at(0) + "";

    handleGetProductApi(id);
    setList(productsByType);
  };

  const handleGetProductApi = (id: string) => {
    const payload = {
      id: id,
    };
    dispatch(getProductsByType(payload));
  };

  const deleteProductApi = async (id: string) => {
    try {
      await fetchProduct.deleteProduct({
        id: id,
      });
      message.success(`Delete Success`);
      location.reload();
    } catch (error) {
      console.log(error);
      message.error(`Delete Success`);
    }
  };

  const onSearch = (e: any) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : productsByType;
    const data = utils.wildCardSearch(searchArray!, value);
    setList(data);
  };

  const addProduct = () => {
    navigate(`/product-add`);
  };

  const viewDetails = (row: IProduct) => {
    navigate(`/product-edit/${row?.id}`);
  };

  const handleFeature = async (id: string, status: boolean) => {
    try {
      let payload = { id: id, data: { isFeatured: status } };
      let newList = list?.map((value) =>
        value.id === id ? { ...value, isFeatured: status } : value
      );

      setList(newList);

      let response = await fetchProduct.uploadFetuere(payload);
      console.log(response);

      message.success(`Change success`);
    } catch (error) {
      message.success(`Change fail`);
    }
  };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Product",
      dataIndex: "name",
      render: (_: any, record: IProduct) => (
        <div className="d-flex">
          <AvatarStatus
            size={60}
            type="square"
            src={record.imageCovers[0]}
            name={record.name}
          />
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: any) => (
        <div>
          <NumberFormat
            displayType={"text"}
            value={(Math.round(price * 100) / 100).toFixed(2)}
            prefix={"$"}
            thousandSeparator={true}
          />
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "price"),
    },

    {
      title: "Special",
      dataIndex: "isFeatured",
      render: (_: any, record: IProduct) => (
        <Flex alignItems="center">
          {record.isFeatured ? (
            <StarFilled
              onClick={() => handleFeature(record.id, false)}
              style={{ fontSize: "20px", color: "red" }}
            />
          ) : (
            <StarOutlined
              onClick={() => handleFeature(record.id, true)}
              style={{ fontSize: "20px" }}
            />
          )}
        </Flex>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, "isFeatured"),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_: any, elm: any) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const dropdownMenu = (row: IProduct) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => deleteProductApi(row.id)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : "Delete"}
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

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
            <TreeSelect
              defaultValue="All"
              showSearch
              className="w-100"
              style={{ minWidth: 240 }}
              onChange={handleShowCategory}
              placeholder="Category"
            >
              <TreeNode title="All" value="999999/all">
                All
              </TreeNode>
              {categories.map((elmLv1) => (
                <TreeNode
                  key={`${elmLv1._id}/${elmLv1.name}`}
                  value={`${elmLv1._id}/${elmLv1.name}`}
                  title={elmLv1.name}
                >
                  {elmLv1.children?.map((elmLv2) => (
                    <TreeNode
                      key={`${elmLv2._id}/${elmLv2.name}`}
                      value={`${elmLv2._id}/${elmLv2.name}`}
                      title={elmLv2.name}
                    >
                      {elmLv2.children?.map((elmLv3) => (
                        <TreeNode
                          key={`${elmLv3._id}/${elmLv3.name}`}
                          value={`${elmLv3._id}/${elmLv3.name}`}
                          title={elmLv3.name}
                        ></TreeNode>
                      ))}
                    </TreeNode>
                  ))}
                </TreeNode>
              ))}
            </TreeSelect>
          </div>
        </Flex>
        <div>
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add product
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          rowKey="_id"
          // rowSelection={{
          //   selectedRowKeys: selectedRowKeys,
          //   // type: "checkbox",
          //   preserveSelectedRowKeys: false,
          //   ...rowSelection,
          // }}
        />
      </div>
    </Card>
  );
};

export default ProductList;
