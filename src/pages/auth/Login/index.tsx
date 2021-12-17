import React from "react";
import LoginForm from "./components/LoginForm";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";

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
        <Col xs={0} sm={0} md={0} lg={8}>
          <div className="h-100" style={backgroundStyle}>
            <img
              tw="w-full h-full block object-cover"
              src="https://cdn.dribbble.com/users/59947/screenshots/15874343/media/afe65895379ec561bbdd25a79e7102ec.jpg?compress=1&resize=700x900"
              alt=""
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginTwo;
