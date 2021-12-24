import Passbook from "@components/PassbookList";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getAllOfUser } from "@redux/slices/passbook";
import React, { useEffect } from "react";
import tw, { styled } from "twin.macro";

const UserPassbookListContainer = styled.div`
  ${tw``}
`;

interface UserIPassbookList {
  _id: string;
}

const UserPassbookList: React.FC<UserIPassbookList> = ({ _id }) => {
  let dispatch = useAppDispatch();
  let { passbookUser } = useAppSelector((state) => state.passbookReducers);

  useEffect(() => {
    getAllOfUserApi(_id);
  }, []);

  const getAllOfUserApi = (_id: string) => {
    dispatch(getAllOfUser({ _id }));
  };

  return (
    <UserPassbookListContainer>
      <Passbook dataList={passbookUser} keyId="_id" titleId="Id" />
    </UserPassbookListContainer>
  );
};

export default UserPassbookList;
