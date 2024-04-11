import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { DECODED_TOKEN, EMPTY_FIELD_VALIDATION } from "./helpers/Helper";
import { useDispatch, useSelector } from "react-redux";
import {
  clearResetPassword,
  clearResetUserEmail,
  logout,
  resetPassword,
} from "../auth/authActions";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = ({ nav = false, setModalVisible, admin = false }) => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState(null);
  const { token } = useParams();
  const navigation = useNavigate();

  const resetUserEmail = useSelector(
    (state) => state?.auth?.resetUserEmail?.email || null
  );

  const exceptionOccured = useSelector(
    (state) => state?.auth?.resetPassword?.error?.message?.message || null
  );

  const success = useSelector(
    (state) => state?.auth?.resetPassword?.data?.data?.message || null
  );

  const fetching = useSelector(
    (state) => state?.auth?.resetPassword?.fetching || false
  );

  const authToken = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || null
  );

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (form.validateFields()) {
      dispatch(
        resetPassword({
          resetToken: token ? token : null,
          type: token ? "EMAIL_WAY" : admin ? "ADMIN" : "NEED_TO_RESET",
          email: token
            ? null
            : nav
            ? DECODED_TOKEN(authToken)?.email
            : resetUserEmail,
          newPassword: password,
        })
      );
    }
  };

  useEffect(() => {
    if (exceptionOccured)
      notification.error({ message: exceptionOccured, placement: "topRight" });
    else if (success) {
      notification.success({ message: success, placement: "topRight" });
      if (nav) {
        dispatch(logout());
        setModalVisible(false);
      }
      dispatch(logout());
      navigation("/login");
    }
    return () => {
      dispatch(clearResetPassword());
      dispatch(clearResetUserEmail());
    };
  }, [exceptionOccured, success]);

  return (
    <div>
      <div className="container">
        <div className="row  justify-content-center frame1">
          <div className="col-md-10  login ">
            {!nav && (
              <div className="text-frame col-md-12 te">
                <img
                  src="/assets/reset.gif"
                  alt=""
                  width="30"
                  height="24"
                  className="me-3 logo"
                  style={{ width: 100, height: 70 }}
                />
                <h1 className="sing-text "> Reset Password</h1>
              </div>
            )}
            <Form form={form} onFinish={onSubmit}>
              <div class="mb-3">
                <Form.Item>
                  <label for="password" class="form-label label1">
                    Password
                  </label>
                </Form.Item>
                <Form.Item name={"pwd"} rules={[EMPTY_FIELD_VALIDATION]}>
                  <Input
                    type={!passwordVisible && "password"}
                    className="form-control input1"
                    id="password"
                    placeholder="🔑 Enter your new password"
                    value={password}
                    onChange={(e) => {
                      if (form.validateFields(["password"]))
                        setPassword(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  <Checkbox
                    onClick={() =>
                      setPasswordVisible((prevState) => !prevState)
                    }
                  >
                    <span className="check-box-text">Show</span>
                  </Checkbox>
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
                      {fetching
                        ? `${nav ? "Processing" : "Resetting"}...`
                        : `${nav ? "CHANGE" : "RESET"}`}
                    </h5>
                  </Button>
                </center>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
