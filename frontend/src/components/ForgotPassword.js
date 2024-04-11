import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import { Button, Form, Input, notification } from "antd";
import { EMAIL_VALIDATION, EMPTY_FIELD_VALIDATION } from "./helpers/Helper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword, clearForgotPassword } from "../auth/authActions";
import ModalContainer from "./common/ModalContainer";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState(null);
  const [visible, setVisible] = useState(null);
  const navigation = useNavigate();

  const dispatch = useDispatch();

  const exceptionOccured = useSelector(
    (state) => state?.auth?.forgotPassword?.error?.message?.message || null
  );

  const fetching = useSelector(
    (state) => state?.auth?.forgotPassword?.fetching || false
  );

  const success = useSelector(
    (state) => state?.auth?.forgotPassword?.data?.data?.message || null
  );

  const onSubmit = () => {
    if (form.validateFields()) {
      dispatch(forgotPassword({ email }));
    }
  };

  useEffect(() => {
    if (exceptionOccured)
      notification.error({ message: exceptionOccured, placement: "topRight" });
    else if (success) {
      notification.success({ message: success, placement: "topRight" });
      setVisible(true);
    }
    return () => dispatch(clearForgotPassword());
  }, [exceptionOccured, success]);

  return (
    <div>
      <div className="container">
        <div className="row  justify-content-center frame1">
          <div className="col-md-10  login ">
            <div className="text-frame col-md-12 te">
              <img
                src="assets/forgot.gif"
                alt=""
                width="30"
                height="24"
                className="me-3 logo"
                style={{ width: 100, height: 70 }}
              />
              <h1 className="sing-text "> Forgot Password</h1>
            </div>
            <Form form={form} onFinish={onSubmit}>
              <div class="mb-3">
                <Form.Item>
                  <label for="password" class="form-label label1">
                    Email
                  </label>
                </Form.Item>
                <Form.Item
                  name={"email"}
                  rules={[EMPTY_FIELD_VALIDATION, EMAIL_VALIDATION]}
                >
                  <Input
                    type={"email"}
                    className="form-control input1"
                    placeholder="✉️ Enter your email"
                    value={email}
                    onChange={(e) => {
                      if (form.validateFields(["email"]))
                        setEmail(e.target.value);
                    }}
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <center>
                  <Button
                    type="submit"
                    className="btn submit col-md-3"
                    onClick={() => form.submit()}
                    loading={fetching}
                  >
                    <h5 className="submit-text">
                      {fetching ? "Sending..." : "SEND"}
                    </h5>
                  </Button>
                </center>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <ModalContainer
        open={visible}
        className="login-modal"
        onCancel={() => {
          setVisible(false);
          dispatch(clearForgotPassword());
          navigation("/login");
        }}
        footer={null}
      >
        <center>
          <br />
          Please check your email and click the URL. Then you can reset your
          password. The URL will be available until 10min. <br />
          <br />
          After resetting you can login. <br />
          <br />
          If there is no email, please kindly check your SPAM or THRASH. Thank
          you.
        </center>
      </ModalContainer>
    </div>
  );
};

export default ForgotPassword;
