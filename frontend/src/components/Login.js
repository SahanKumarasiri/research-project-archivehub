import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import "./styles/Navbar.css";
import { Button, Checkbox, Form, Input, notification } from "antd";
import {
  DECODED_TOKEN,
  EMAIL_VALIDATION,
  EMPTY_FIELD_VALIDATION,
} from "./helpers/Helper";
import { useDispatch, useSelector } from "react-redux";
import {
  activateOrDeactivateDetails,
  clearActivation,
  loginUser,
  resetUserEmail,
} from "../auth/authActions";
import { Link, useNavigate } from "react-router-dom";
import ModalContainer from "./common/ModalContainer";

const Login = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [visible, setVisible] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const verifyMsg = useSelector(
    (state) => state?.auth?.login?.error?.message?.message || null
  );

  const exceptionOccured = useSelector(
    (state) => state?.auth?.login?.error?.status || false
  );

  const fetching = useSelector(
    (state) => state?.auth?.login?.fetching || false
  );

  const success = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || null
  );

  const activation = useSelector(
    (state) => state?.auth?.activation?.data?.data?.message || null
  );

  const activationFetching = useSelector(
    (state) => state?.auth?.activation?.fetching || false
  );

  const authToken = useSelector(
    (state) => state?.auth?.login?.error?.message?.token || null
  );

  useEffect(() => {
    if (verifyMsg && exceptionOccured && btnClicked) {
      if (verifyMsg === "Invalid credentials")
        notification.error({ message: verifyMsg, placement: "topRight" });
      else setVisible(true);
    } else if (success) {
      if (DECODED_TOKEN(success)?.type === "ADMIN") navigation("/admin");
      else navigation("/profile");
    }
  }, [verifyMsg, success]);

  const onSubmit = (e) => {
    // e.preventDefault();
    if (form.validateFields()) {
      dispatch(loginUser({ email, password }));
      setBtnClicked(true);
    }
  };

  useEffect(() => {
    if (activation) {
      notification.success({ message: activation, placement: "topRight" });
      dispatch(clearActivation());
      setVisible(false);
    }
  }, [activation]);

  return (
    <div>
      <div className="container frame1">
        <div className="row  justify-content-center ">
          <div className="col-md-9  login ">
            <div className="text-frame col-md-12 ">
              <img
                src="/assets/verify.gif"
                alt=""
                width="30"
                height="24"
                className="me-3 logo"
              />
              <h1 className="sing-text ">Verification</h1>
            </div>
            <Form form={form} onFinish={onSubmit}>
              <Form.Item name={"lbl-email"}>
                <label for="email" className="form-label label1">
                  Email
                </label>
              </Form.Item>
              <Form.Item
                className="mb-3"
                rules={[EMPTY_FIELD_VALIDATION, EMAIL_VALIDATION]}
                name={"email"}
              >
                <Input
                  type="email"
                  className="form-control input1"
                  id="email"
                  placeholder="✉️ Enter your email"
                  value={email}
                  onChange={(e) => {
                    if (form.validateFields(["email"]))
                      setEmail(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item name={"lbl-pwd"}>
                <label for="password" className="form-label label1">
                  Password
                </label>
              </Form.Item>
              <Form.Item
                className="mb-3"
                rules={[EMPTY_FIELD_VALIDATION]}
                name={"password"}
              >
                <Input
                  type={!passwordVisible && "password"}
                  className="form-control input1"
                  id="password"
                  placeholder="🔑 Enter your password"
                  value={password}
                  onChange={(e) => {
                    if (form.validateFields(["password"]))
                      setPassword(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item name={"check"}>
                <Checkbox
                  onClick={() => setPasswordVisible((prevState) => !prevState)}
                >
                  <span className="check-box-text">Show</span>
                </Checkbox>
              </Form.Item>
              <Form.Item name={"btn"}>
                <center>
                  <Button
                    loading={fetching}
                    type="primary"
                    htmlType="submit"
                    className="btn  submit col-md-3"
                  >
                    <h5 className="submit-text">
                      {fetching ? "Verifying..." : "SUBMIT"}
                    </h5>
                  </Button>
                </center>
              </Form.Item>
              <Form.Item name={"link"} className="d-flex justify-content-center flex-wrap">
                <Link to="/forgot-password" className="check-box-text">
                  Forgot password ?
                </Link>&nbsp;&nbsp;&nbsp;
                <Link to="/onboarding" className="check-box-text">
                  Want to onboard ?
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <ModalContainer
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        className="login-modal"
        footer={
          <Button
            className="submit col-md-5"
            onClick={() => {
              if (verifyMsg === "Your account is deactivated") {
                dispatch(
                  activateOrDeactivateDetails({
                    type: "ACTIVATE",
                    users: DECODED_TOKEN(authToken)?.network,
                    token: authToken,
                  })
                );
              } else {
                dispatch(resetUserEmail({ email }));
                navigation("/reset-password");
              }
            }}
            loading={activationFetching}
          >
            {verifyMsg === "Your account is deactivated"
              ? "ACTIVATE ACCOUNT"
              : "OK"}
          </Button>
        }
      >
        <center>{verifyMsg}</center>
      </ModalContainer>
    </div>
  );
};

export default Login;
