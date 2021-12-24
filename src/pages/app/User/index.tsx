import React from "react";
import User from "src/container/Users";
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
