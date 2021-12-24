import React from "react";
import { useParams } from "react-router-dom";
import UserPassbookList from "src/container/UserPassbookList";
import tw, { styled } from "twin.macro";

const UserPassbookListContainer = styled.div`
  ${tw``}
`;

interface IUserPassbookListDetail {}

const UserPassbookListPage: React.FC<IUserPassbookListDetail> = () => {
  const params = useParams();

  return (
    <UserPassbookListContainer>
      <UserPassbookList _id={params.id!} />
    </UserPassbookListContainer>
  );
};

export default UserPassbookListPage;
