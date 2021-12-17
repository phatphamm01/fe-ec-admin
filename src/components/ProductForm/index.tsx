import React, { useState, useEffect } from "react";
import { Tabs, Form, Button, message } from "antd";
import Flex from "@components/shared-components/Flex";
import GeneralField from "./GeneralField";
import VariationField from "./VariationField";
import ProductListData from "@assets/data/product-list.data.json";
import PageHeaderAlt from "@components/layout/PageHeaderAlt";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getProductDetail } from "@redux/slices/product";
import fetchProduct from "@services/products";
import Resizer from "react-image-file-resizer";

const { TabPane } = Tabs;

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const _getBase64 = (file: any) => {
  let src = file.url;

  if (!src) {
    src = new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }

  return src;

  // Resizer.imageFileResizer(
  //   file,
  //   500,
  //   500,
  //   "JPEG",
  //   100,
  //   0,
  //   (uri) => {
  //     resolve(uri);
  //   },
  //   "base64"
  // );
};

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props: any) => {
  const { mode = ADD, param } = props;

  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector((state) => state.productReducers);

  const [form] = Form.useForm();
  const [categoriesSelected, setCategoriesSelected] = useState<any>([]);
  const [uploadedImg, setUploadedImg] = useState<any>([]);
  const [uploadedImgCover, setUploadedImgCover] = useState<any>([]);

  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (mode === EDIT) {
      console.log("is edit");
      console.log("props", props);
      const { id } = param;
      console.log(id);

      dispatch(getProductDetail({ id: id }));
    }
  }, [form, mode, param, props]);

  useEffect(() => {
    console.log(productDetail);

    if (mode === EDIT) {
      form.setFieldsValue({
        longDescription: productDetail.longDescription,
        shortDescription: productDetail.shortDescription,
        categories: productDetail.categories,
        name: productDetail.name,
        filters: productDetail.filters,
        price: productDetail.price,
        discountPrice: productDetail.discountPrice,
        variants: productDetail.variants,
        brand: productDetail.brandId + "/" + productDetail.brand,
        color: productDetail.color,
      });

      setCategoriesSelected(productDetail.categories);

      let image = productDetail.images?.map((value) => ({
        uid: uuidv4(),
        url: value,
      }));

      if (image && image.length > 0) {
        setUploadedImg(image);
      }

      let imageCover = productDetail.imageCovers?.map((value) => ({
        uid: uuidv4(),
        url: value,
      }));

      if (image && image.length > 0) {
        setUploadedImgCover(imageCover);
      }
    }
  }, [productDetail]);

  const handleUploadChangeImg = async (e: any) => {
    let imageBase64 = await getBase64(e.file);

    setUploadedImg((value: any) => [
      ...value,
      {
        uid: uuidv4(),
        url: imageBase64,
      },
    ]);
    // setUploadedImg(newFileList);
  };

  const handleRemoveImg = (id: string) => {
    let newList = uploadedImg.reduce(
      (result: any, value: any) =>
        value.uid !== id ? [...result, value] : [...result],
      []
    );

    setUploadedImg(newList);
  };

  const handleUploadChangeImgCover = async (e: any) => {
    let imageBase64 = await getBase64(e.file);

    setUploadedImgCover((value: any) => [
      ...value,
      {
        uid: uuidv4(),
        url: imageBase64,
      },
    ]);
  };

  const onFinish = () => {
    // setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        // setSubmitLoading(false);
        let { brand, price, discountPrice, variants } = values;

        let dataBrand = brand.split("/");
        console.log(variants);

        if (variants && (variants as Array<any>).length > 0) {
          variants = variants.map((value: any) => {
            let { size } = value;
            let dataSize = size.split("/");
            if (dataSize.length > 1) {
              return {
                ...value,
                sizeId: dataSize[0],
                size: dataSize[1],
              };
            }
            return {
              ...value,
            };
          });
        }

        console.log(variants);

        let data = {
          ...productDetail,
          ...values,
          brand: dataBrand[1],
          brandId: dataBrand[0],
          discountPrice: Number(discountPrice),
          price: Number(price),
          variants: variants,
          images: uploadedImg.map((value: any) => value.url || value.thumbUrl),
          imageCovers: uploadedImgCover.map(
            (value: any) => value.url || value.thumbUrl
          ),
        };

        console.log(data);

        delete data._id;

        if (mode === ADD) {
          message.success(`Created ${values.name} to product list`);
          await fetchProduct.addProduct({
            data: data,
          });
          message.success(`Product saved`);
        }
        if (mode === EDIT) {
          await fetchProduct.editProduct({
            id: productDetail.id,
            data: data,
          });
          message.success(`Product saved`);
        }
      })
      .catch((info) => {
        // setSubmitLoading(false);

        console.log("info", info);
        message.error("Please enter all required field ");
      });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === "ADD" ? "Add New Product" : `Edit Product`}{" "}
              </h2>
              <div className="mb-3">
                <Button
                  onClick={() => {
                    location.reload();
                  }}
                  className="mr-2"
                >
                  Reload
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === "ADD" ? "Add" : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
                uploadedImg={uploadedImg}
                handleUploadChangeImg={handleUploadChangeImg}
                handleRemoveImg={handleRemoveImg}
                handleUploadChangeImgCover={handleUploadChangeImgCover}
                uploadedImgCover={uploadedImgCover}
              />
            </TabPane>
            <TabPane tab="Variation" key="2">
              <VariationField />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
