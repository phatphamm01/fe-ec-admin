import Passbook from "@components/PassbookList";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getAllPassbooks } from "@redux/slices/passbook";
import React, { useEffect } from "react";
import tw, { styled } from "twin.macro";

const PassbookListContainer = styled.div`
  ${tw``}
`;

interface IPassbookList {}

const PassbookList: React.FC<IPassbookList> = () => {
  let dispatch = useAppDispatch();
  let { allPassbook } = useAppSelector((state) => state.passbookReducers);

  useEffect(() => {
    getAllPassbooksApi();
  }, []);

  const getAllPassbooksApi = () => {
    dispatch(getAllPassbooks());
  };

  return (
    <PassbookListContainer>
      <Passbook dataList={allPassbook} keyId="userId" titleId="Id User" />
    </PassbookListContainer>
  );
};

export default PassbookList;
