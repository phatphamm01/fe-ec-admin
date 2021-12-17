import { Breadcrumb as BreadcrumbAntd } from "antd";
import React from "react";

interface IBreadcrumb {}

const Breadcrumb: React.FC<IBreadcrumb> = () => {
  return (
    <BreadcrumbAntd tw="py-4">
      <BreadcrumbAntd.Item>con</BreadcrumbAntd.Item>
      <BreadcrumbAntd.Item>heo</BreadcrumbAntd.Item>
    </BreadcrumbAntd>
  );
};

export default Breadcrumb;
