import { useEffect } from "react";
import "../../App.css";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../auth/authActions";
import { useNavigate } from "react-router-dom";

const Session = ({ visible, setVisible }) => {
  const [modal, contextHolder] = Modal.useModal();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (visible) {
      modal.warning({
        title: "Session Timeout",
        content: "Your session has been timeout. Please login again.",
        okText: "Login",
        className: "app-modal",
        open: true,
        onOk: () => {
          dispatch(logout());
          setVisible(false);
          navigation("/login");
        },
      });
    }
  }, [visible]);
  return contextHolder;
};

export default Session;
