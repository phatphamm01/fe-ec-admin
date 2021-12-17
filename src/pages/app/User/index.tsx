import User from "@components/Users";
import React from "react";
import tw, { styled } from "twin.macro";

const UserContainer = styled.div`
  ${tw``}
`;

interface IUser {}

const UserPage: React.FC<IUser> = () => {
  return (
    <UserContainer>
      <User />
    </UserContainer>
  );
};

export default UserPage;
