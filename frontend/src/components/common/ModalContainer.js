import { Modal } from "antd";
import React from "react";

const ModalContainer = ({ children, ...props }) => {
  return <Modal {...props}>{children}</Modal>;
};

export default ModalContainer;
