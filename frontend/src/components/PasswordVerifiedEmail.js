import React from "react";
import "./styles/PasswordVerifiedEmail.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const PasswordVerifiedEmail = () => {
  const navigation = useNavigate();
  return (
    <div className="container password-frame1">
      <div className="row justify-content-center">
        <div className="col-md-9 password-frame2">
          <h1 class="don-t-miss-it">Don’t Miss It...!</h1>
          <img
            src="/assets/verifyImg.svg"
            className="verifyImage "
            alt="verifyImage"
          />
          <div className="verify-password-text">
            Your generated password has been sent to your email.
          </div>
          <div className="actions">
            <Button
              type="submit"
              className="btn  submit col-sm-2"
              onClick={() => navigation("/login")}
            >
              <h5 className="submit-text">OK</h5>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordVerifiedEmail;
