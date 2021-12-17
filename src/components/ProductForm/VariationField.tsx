import React, { useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputNumber,
  TreeSelect,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getSizes } from "@redux/slices/common";

const { TreeNode } = TreeSelect;

const VariationField = (props: any) => {
  const dispatch = useAppDispatch();
  const { sizes } = useAppSelector((state) => state.commonReducers);

  useEffect(() => {
    dispatch(dispatch(getSizes()));
  }, []);

  return (
    <Card title="Variants">
      <p>
        Add a custome variat options for your product, like different sizes or
        colors.
      </p>
      <Form.List name="variants">
        {(fields, { add, remove }) => {
          return (
            <div className="mt-3">
              {fields.map((field, index) => (
                <Row key={field.key} gutter={16}>
                  <Col sm={24} md={7}>
                    <Form.Item
                      {...field}
                      label="Size"
                      name={[field.name, "size"]}
                      fieldKey={[field.fieldKey, "sizeId"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter variant name",
                        },
                      ]}
                      className="w-100"
                    >
                      <TreeSelect
                        showSearch
                        className="w-100"
                        placeholder="Sizes"
                      >
                        {sizes.map((elmLv1) =>
                          elmLv1.id === "000008" ? (
                            <TreeNode
                              key={`${elmLv1.id}/${elmLv1.name}`}
                              value={`${elmLv1.id}/${elmLv1.name}`}
                              title={`${elmLv1.name}`}
                            />
                          ) : (
                            <TreeNode
                              key={`${elmLv1.id}`}
                              value={`${elmLv1.id}`}
                              title={`${elmLv1.name}`}
                              selectable={false}
                            >
                              {elmLv1.children?.map((elmLv2) => (
                                <TreeNode
                                  key={`${elmLv2.id}/${elmLv2.name}`}
                                  value={`${elmLv2.id}/${elmLv2.name}`}
                                  title={`${elmLv2.name}`}
                                />
                              ))}
                            </TreeNode>
                          )
                        )}
                      </TreeSelect>
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={7}>
                    <Form.Item
                      {...field}
                      label="Price"
                      name={[field.name, "price"]}
                      fieldKey={[field.fieldKey, "price"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter variant price",
                        },
                      ]}
                      className="w-100"
                    >
                      <InputNumber
                        className="w-100"
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value: any) =>
                          value.replace(/\$\s?|(,*)/g, "")
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={7}>
                    <Form.Item
                      {...field}
                      label="Discount Price"
                      name={[field.name, "discountPrice"]}
                      fieldKey={[field.fieldKey, "discountPrice"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter variant price",
                        },
                      ]}
                      className="w-100"
                    >
                      <InputNumber
                        className="w-100"
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value: any) =>
                          value.replace(/\$\s?|(,*)/g, "")
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col sm={24} md={2}>
                    <MinusCircleOutlined
                      className="mt-md-4 pt-md-3"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Col>
                  <Col span={24}>
                    <hr className="mt-2" />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  className="w-100"
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Card>
  );
};

export default VariationField;
