import React, { useEffect, useState } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  TreeSelect,
} from "antd";
import ImgCrop from "antd-img-crop";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import {
  getBrands,
  getCategories,
  getColors,
  getTags,
} from "@redux/slices/common";

const { TreeNode } = TreeSelect;

const rules = {
  name: [
    {
      required: true,
      message: "Please enter product name",
    },
  ],
  description: [
    {
      required: true,
      message: "Please enter product description",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter product price",
    },
  ],
  discountPrice: [
    {
      required: true,
      message: "Please enter product price",
    },
  ],
};

const imageUploadProps = {
  name: "file",
  multiple: true,
  listType: "picture-card",
  showUploadList: false,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
};

interface IGeneralField {
  uploadedImg: any;
  handleUploadChangeImg: any;
  uploadedImgCover: any;
  handleUploadChangeImgCover: any;
  handleRemoveImg: (id: string) => void;
}

const GeneralField: React.FC<IGeneralField> = ({
  handleUploadChangeImg,
  handleUploadChangeImgCover,
  uploadedImg,
  uploadedImgCover,
  handleRemoveImg,
}) => {
  const dispatch = useAppDispatch();
  const { categories, tags, brands, colors } = useAppSelector(
    (state) => state.commonReducers
  );

  useEffect(() => {
    dispatch(getTags());
    dispatch(getBrands());
    dispatch(getColors());
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      return;
    }

    dispatch(getCategories());
  }, [categories]);

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;

    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Product name" rules={rules.name}>
            <Input placeholder="Product Name" />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="brand" label="Brand" rules={rules.name}>
                <TreeSelect showSearch className="w-100" placeholder="Brand">
                  {brands.map((elmLv1) => (
                    <TreeNode
                      key={`${elmLv1.id}/${elmLv1.name}`}
                      value={`${elmLv1.id}/${elmLv1.name}`}
                      title={`${elmLv1.name}`}
                    />
                  ))}
                </TreeSelect>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="color" label="Color" rules={rules.name}>
                <TreeSelect showSearch className="w-100" placeholder="Color">
                  {colors.map((elmLv1) => (
                    <TreeNode
                      key={`${elmLv1.id}`}
                      value={`${elmLv1.id}`}
                      title={`${elmLv1.name}`}
                    />
                  ))}
                </TreeSelect>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="shortDescription"
            label="Short Description"
            rules={rules.description}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="longDescription"
            label="Long Description"
            rules={rules.description}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Card>
        <Card title="Organization">
          <Form.Item name="categories" label="Categories">
            <TreeSelect
              showSearch
              multiple
              className="w-100"
              placeholder="Categories"
            >
              {categories.map((elmLv1) => (
                <TreeNode
                  key={`${elmLv1._id}`}
                  value={`${elmLv1._id}`}
                  title={elmLv1.name}
                  selectable={false}
                >
                  {elmLv1.children?.map((elmLv2) => (
                    <TreeNode
                      key={`${elmLv2._id}`}
                      value={`${elmLv2._id}`}
                      title={elmLv2.name}
                      selectable={false}
                    >
                      {elmLv2.children?.map((elmLv3) => (
                        <TreeNode
                          key={`${elmLv3._id}`}
                          value={`${elmLv3._id}`}
                          title={`${elmLv1.name} / ${elmLv2.name} / ${elmLv3.name}`}
                        ></TreeNode>
                      ))}
                    </TreeNode>
                  ))}
                </TreeNode>
              ))}
            </TreeSelect>
          </Form.Item>
          <Form.Item name="filters" label="Filters">
            <TreeSelect
              showSearch
              multiple
              className="w-100"
              placeholder="Filters"
            >
              {tags.map((elmLv1) => (
                <TreeNode
                  key={`${elmLv1.id}`}
                  value={`${elmLv1.id}`}
                  title={`${elmLv1.name}`}
                  selectable={false}
                >
                  {elmLv1.children?.map((elmLv2) => (
                    <TreeNode
                      key={`${elmLv2.id}`}
                      value={`${elmLv2.id}`}
                      title={`${elmLv1.name} / ${elmLv2.name}`}
                    />
                  ))}
                </TreeNode>
              ))}
            </TreeSelect>
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Pricing">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="price" label="Price" rules={rules.price}>
                <InputNumber
                  className="w-100"
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="discountPrice"
                label="Discount Price"
                rules={rules.discountPrice}
                className="text-inline"
              >
                <InputNumber
                  className="w-100"
                  value={0}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Media">
          <Upload
            accept=".png, .jpg, .jpeg"
            listType="picture-card"
            fileList={uploadedImg}
            beforeUpload={() => false}
            onChange={(e) => handleUploadChangeImg(e)}
            onPreview={(e) => onPreview(e)}
            onRemove={(e) => {
              handleRemoveImg?.(e.uid);
              return false;
            }}
          >
            {"+ Upload"}
          </Upload>
        </Card>
        <Card title="Media">
          <Upload
            accept=".png, .jpg, .jpeg"
            listType="picture-card"
            fileList={uploadedImgCover}
            beforeUpload={() => false}
            onChange={(e) => handleUploadChangeImgCover(e)}
          >
            {"+ Upload"}
          </Upload>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
