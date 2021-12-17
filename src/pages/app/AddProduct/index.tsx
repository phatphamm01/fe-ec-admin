import AddProduct from "@components/add-product";
import React from "react";
import tw, { styled } from "twin.macro";

const AddProductContainer = styled.div`
  ${tw``}
`;

interface IAddProduct {}

const AddProductPage: React.FC<IAddProduct> = () => {
  return (
    <AddProductContainer>
      <AddProduct />
    </AddProductContainer>
  );
};

export default AddProductPage;
