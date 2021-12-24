import { LockOutlined, MailOutlined } from "@ant-design/icons";
import isNullObject from "@common/function/isNullObject";
import StorageToken from "@common/utils/storage";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getAuthSuccess } from "@redux/slices/auth";
import fetchAuth from "@services/auth";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = (props: any) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducers);
  const [loading, setLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  const initialCredential = {
    email: "minhphatdev@gmail.com",
    password: ".Phat2001",
  };

  const onLogin = async (values: any) => {
    try {
      setLoading(true);
      let result = await fetchAuth.login(values);

      if (typeof result === "string") {
        return;
      }

      await StorageToken.setUser(result.accessToken);

      let user = await fetchAuth.getUser();

      dispatch(getAuthSuccess(user));

      navigate("/");
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
