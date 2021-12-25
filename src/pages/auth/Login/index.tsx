import { Col, Row } from "antd";
import React from "react";
import LoginForm from "./components/LoginForm";

const backgroundURL = "/img/others/img-17.jpg";
const backgroundStyle = {
  backgroundImage: `url(${backgroundURL})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const LoginTwo = (props: any) => {
  return (
    <div className={`h-100 ${true ? "bg-white" : ""}`}>
      <Row justify="center" className="align-items-stretch h-100">
        <Col xs={0} sm={0} md={0} lg={8}>
          <div className="h-100" style={backgroundStyle}>
            <img
              tw="w-full h-full block object-cover"
              src="https://cdn.dribbble.com/users/949981/screenshots/16123153/media/1063bc72b4c7d1b694aeb93e5a300a2f.png?compress=1&resize=700x900"
              alt=""
            />
          </div>
        </Col>
        <Col xs={20} sm={20} md={24} lg={16}>
          <div className="container d-flex flex-column justify-content-center h-100">
            <Row justify="center">
              <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                <h1>Sign In</h1>
                <div className="mt-2">
                  <LoginForm {...props} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginTwo;
