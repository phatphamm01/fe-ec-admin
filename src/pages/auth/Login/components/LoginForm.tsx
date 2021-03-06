import { LockOutlined, MailOutlined } from "@ant-design/icons";
import isNullObject from "@common/function/isNullObject";
import StorageToken from "@common/utils/storage";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getAuthSuccess } from "@redux/slices/auth";
import fetchAuth from "@services/auth";
import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = (props: any) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducers);
  const [loading, setLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  const initialCredential = {
    email: "",
    password: "",
  };

  const onLogin = async (values: any) => {
    try {
      setLoading(true);
      let result = await fetchAuth.login(values);

      if (typeof result === "string") {
        message.error(result);
        return;
      }

      await StorageToken.setUser(result.accessToken);

      let user = await fetchAuth.getUser();

      dispatch(getAuthSuccess(user));

      navigate("/");
    } catch (error: any) {
      message.error(error?.message);
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
              message: "Vui lòng nhập email",
            },
            {
              type: "email",
              message: "Vui lòng nhập đúng email",
            },
          ]}
        >
          <Input
            placeholder="Email"
            prefix={<MailOutlined className="text-primary" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={<span>Password</span>}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
          ]}
        >
          <Input.Password
            placeholder="Mật khẩu"
            prefix={<LockOutlined className="text-primary" />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
