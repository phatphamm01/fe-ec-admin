import React from "react";
import ProductForm from "../ProductForm";

const EditProduct = (props: any) => {
  return <ProductForm mode="EDIT" param={props.params} />;
};

export default EditProduct;
