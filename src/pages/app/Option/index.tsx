import React from "react";
import Option from "src/container/Option";
import tw, { styled } from "twin.macro";

const OptionContainer = styled.div`
  ${tw``}
`;

interface IOptionDetail {}

const OptionPage: React.FC<IOptionDetail> = () => {
  return (
    <OptionContainer>
      <Option />
    </OptionContainer>
  );
};

export default OptionPage;
