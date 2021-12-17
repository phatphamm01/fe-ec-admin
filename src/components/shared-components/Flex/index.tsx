import React from "react";

interface IFlex {
  className?: string;
  alignItems?: string;
  flexDirection?: string;
  justifyContent?: string;
  mobileFlex?: boolean;
}

const Flex: React.FC<IFlex> = (props) => {
  const {
    mobileFlex = true,
    flexDirection = "row",
    className = "",
    children,
    alignItems,
    justifyContent,
  } = props;
  const getFlexResponsive = () => (mobileFlex ? "d-flex" : "d-md-flex");
  return (
    <div
      className={`${getFlexResponsive()} ${className} ${
        flexDirection ? "flex-" + flexDirection : ""
      } ${alignItems ? "align-items-" + alignItems : ""} ${
        justifyContent ? "justify-content-" + justifyContent : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Flex;
