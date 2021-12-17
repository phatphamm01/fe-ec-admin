import EditProduct from "@components/edit-product";
import React from "react";
import tw, { styled } from "twin.macro";
import { useParams } from "react-router-dom";
const ProductDetailContainer = styled.div`
  ${tw``}
`;

interface ProductDetail {}

const ProductDetailPage: React.FC<ProductDetail> = () => {
  let params = useParams();

  return (
    <ProductDetailContainer>
      <EditProduct params={{ ...params }} />
    </ProductDetailContainer>
  );
};

export default ProductDetailPage;
