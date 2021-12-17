import React, { Component } from "react";

const Icon: React.FC<any> = (props) => {
  const { type, className } = props;

  return <>{React.createElement(type, { className: className })}</>;
};

export default Icon;
