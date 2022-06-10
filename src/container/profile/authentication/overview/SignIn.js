import React, { useState } from "react";
import {  NavLink, useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AuthWrapper } from "./style";
import { login } from "../../../../redux/authentication/actionCreator";
import { Checkbox } from "../../../../components/checkbox/checkbox";
import Heading from "../../../../components/heading/heading";

const SignIn = () => {
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = () => {
    dispatch(login());
    history.push("/admin");
  };

  const onChange = checked => {
    setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      <p className="auth-notice">
      {/*   Don&rsquo;t have an account? <NavLink to="/register">Sign up now</NavLink> */}
      </p>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Entrar no <span className="color-secondary"></span>
          </Heading>
          <Form.Item
            name="username"
            rules={[{ message: "Adicione um email!", required: true }]}
            initialValue=""
            label="Email"
          >
            <Input value={emailState} onChange={e => setEmailState(e.target.value)}/>
          </Form.Item>
          <Form.Item name="password" initialValue="" label="Password">
            <Input.Password placeholder="Password" value={passwordState} onChange={e => setPasswordState(e.target.value)} />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange}>Manter Logado</Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Esqueceu a senha?
            </NavLink>
          </div>
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
