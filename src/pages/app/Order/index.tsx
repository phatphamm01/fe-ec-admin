import Order from "@components/Orders";
import React from "react";
import tw, { styled } from "twin.macro";

const OrderContainer = styled.div`
  ${tw``}
`;

interface IOrder {}

const OrderPage: React.FC<IOrder> = () => {
  return (
    <OrderContainer>
      <Order />
    </OrderContainer>
  );
};

export default OrderPage;
