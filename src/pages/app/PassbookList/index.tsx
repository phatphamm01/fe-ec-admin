import React from "react";
import PassbookList from "src/container/PassbookList";
import tw, { styled } from "twin.macro";

const PassbookListContainer = styled.div`
  ${tw``}
`;

interface IPassbookListDetail {}

const PassbookListPage: React.FC<IPassbookListDetail> = () => {
  return (
    <PassbookListContainer>
      <PassbookList />
    </PassbookListContainer>
  );
};

export default PassbookListPage;
