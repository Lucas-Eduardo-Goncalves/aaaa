import React, { useState } from "react";
import { Form, Input, Button } from "antd";

import { Checkbox } from "../../components/checkbox/checkbox";
import Heading from "../../components/heading/heading";

import { AuthWrapper } from "./styles";
import AuthLayout from "../../container/profile/authentication/Index";
import { useAuth } from "../../hooks/useAuth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkboxState, setCheckBoxState] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // const history = useHistory();
  const [form] = Form.useForm();

  const { signIn } = useAuth();

  async function handleSubmit() {
    setIsLoading(true);

    const data = { email, password };
    try {
      await signIn(data);
    } catch(err) {
      console.log(err)
    }
    setIsLoading(false);
  }

  function handleClickCheckbox() {
    setCheckBoxState(e => !e)
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Acessar Painel <span className="color-secondary"></span>
          </Heading>

          <Form.Item
            name="username"
            rules={[{ message: "Adicione um email!", required: true }]}
            initialValue=""
            label="Email"
          >
            <Input value={email} onChange={e => setEmail(e.target.value)}/>
          </Form.Item>

          <Form.Item name="password" initialValue="" label="Password">
            <Input.Password placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Item>

          <div className="auth-form-action">
            <Checkbox 
              checked={checkboxState} 
              onChange={handleClickCheckbox}
            >
              Manter Logado
            </Checkbox>
          </div>

          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default AuthLayout(SignIn);
