import ProductList from "@components/ProductList";
import React from "react";
import tw, { styled } from "twin.macro";

const ProductDetailContainer = styled.div`
  ${tw``}
`;

interface IProductDetail {}

const ProductListPage: React.FC<IProductDetail> = () => {
  return (
    <ProductDetailContainer>
      <ProductList />
    </ProductDetailContainer>
  );
};

export default ProductListPage;
