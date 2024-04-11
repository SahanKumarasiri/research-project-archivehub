import React from "react";
import ModalContainer from "./ModalContainer";

const VerifyAccountModal = ({ visible, setVisible, onOk }) => {
  return (
    <div>
      <ModalContainer
        title={"VERIFY ACCOUNT"}
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => onOk()}
        className="guidelines"
      >
        Since ArchiveHub is based on the publicly available data, we cannot
        verify everyone who creating the profile, Because of that this account
        is already created by someone else, If you want You can proof your self
        and verify from our domain. You have to fill the form by accepting this
        regualations.
        <br /> <br />
        <p>
          If your provided details are correct, the contact support team will
          look back to you soon.
        </p>
        (Note: By clicking 'OK' you can go to the form.)<p></p>
      </ModalContainer>
    </div>
  );
};

export default VerifyAccountModal;
