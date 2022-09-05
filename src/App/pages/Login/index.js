import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { updateUser } from "../../store/features/auth/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { triggerLogin } = useLogin();

  const onChangeEmailHandler = (e) => {
    setUser((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const onChangePasswordHandler = (e) => {
    setUser((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const triggerLoginHandler = async () => {
    try {
      await triggerLogin({
        email: user.email,
        password: user.password,
      })
        .unwrap()
        .then((response) => {
          dispatch(
            updateUser({
              email: response.email,
              access_token: response.access_token,
              refresh_token: response.refresh_token,
            })
          );
          navigate("/dashboard");
        });
    } catch {
      //handle err
    }
  };

  return (
    <Row className="full-height" align="middle" justify="center">
      <Col xxl={6} xl={9} lg={12} md={12} sm={18} xs={22}>
        <Card>
          <Card.Grid className="full-width rounded">
            <Row>
              <Col span={24}>
                <Typography.Text className="medium fs-28px dark-green">
                  Login
                </Typography.Text>
              </Col>
            </Row>
            <Row className="m-t-10">
              <Col span={24}>
                <Form layout="vertical" requiredMark={false}>
                  <Form.Item
                    label={<span className="muli semi-bold">Username</span>}
                    name="username"
                  >
                    <Input onChange={onChangeEmailHandler} value={user.email} />
                  </Form.Item>
                  <Form.Item
                    label={<span className="muli semi-bold">Password</span>}
                    name="password"
                  >
                    <Input.Password
                      onChange={onChangePasswordHandler}
                      value={user.password}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="right-align-text"
                    onClick={triggerLoginHandler}
                  >
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card.Grid>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
