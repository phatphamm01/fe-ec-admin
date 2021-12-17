import React, { useEffect } from "react";

import { Button, Form, Input, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StorageToken from "@common/utils/storage";
import fetchAuth from "@services/auth";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getUserSuccess } from "@redux/slices/user";
import isNullObject from "@common/function/isNullObject";

export const LoginForm = (props: any) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const initialCredential = {
    email: "minhphatdev@gmail.com",
    password: "12345678",
  };

  const onLogin = async (values: any) => {
    let result = await fetchAuth.login(values);

    if (typeof result === "string") {
      return;
    }

    StorageToken.setUser(result.token);
    dispatch(getUserSuccess(result.data));

    navigate("/");
  };

  useEffect(() => {
    if (!isNullObject(user)) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div> */}
      <Form
        layout="vertical"
        name="login-form"
        initialValues={initialCredential}
        onFinish={onLogin}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter a validate email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={<span>Password</span>}
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            // loading={loading}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
