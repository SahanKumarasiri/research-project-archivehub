import React, { useEffect, useState } from "react";
import "./styles/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DECODED_TOKEN, PATHS, getUsers } from "./helpers/Helper";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Empty, Input, Popover, notification } from "antd";
import {
  activateOrDeactivateDetails,
  btnAcceptOrReject,
  clearResetPassword,
  clearResetUserEmail,
  confirmationDetails,
  logout,
  notificationDetails,
  setUserArrayDetails,
  storeRemakeConnection,
} from "../auth/authActions";
import { BellOutlined, SettingFilled, WarningFilled } from "@ant-design/icons";
import ModalContainer from "./common/ModalContainer";
import ResetPassword from "./ResetPassword";

const Navbar = ({ userType }) => {
  const [path, setPath] = useState(null);
  const history = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deactivateVisible, setDeactivateVisible] = useState(false);
  const [query, setQuery] = useState(null);
  const [userArray, setUserArray] = useState([]);
  const [remakeConnection, setRemakeConnection] = useState([]);
  const [remakeNotifications, setRemakeNotifications] = useState([]);
  const [userName, setUserName] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [action, setAction] = useState(null);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleOpenSettingsChange = (newOpen) => {
    setSettingsOpen(newOpen);
  };

  const getActiveTab = (tab) => {
    if (PATHS[tab] === path) return "active";
    return "";
  };

  const data = useSelector((state) => state?.auth?.login?.data?.data || {});

  const notifications = useSelector(
    (state) => state?.auth?.notifications?.data?.data?.users || []
  );

  const confirmation = useSelector(
    (state) => state?.auth?.confirmation?.data?.data?.users || []
  );

  const savedUserArray = useSelector((state) => state?.auth?.userArray || []);

  const authToken = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || {}
  );

  const activation = useSelector(
    (state) => state?.auth?.activation?.data?.data?.message || null
  );

  const activationFetching = useSelector(
    (state) => state?.auth?.activation?.fetching || false
  );

  useEffect(() => {
    setPath(window.location.pathname);
  }, [history]);

  const onClick = (type, el) => {
    setAction(type);
    if (type === "MARK") {
      dispatch(
        confirmationDetails({
          ...decodedToken,
          userId: el?.userId,
          type: "MARK",
          msg: null,
          connectedWith: decodedToken?.userId,
          connectedUserInfo: {},
        })
      );
    } else
      dispatch(
        notificationDetails({
          ...el,
          confirmUserId: el?.connectedWith,
          confirmNotifyUser: el?.userId,
          action: type,
          msg: `${el?.connectedUserInfo?.firstName} ${
            el?.connectedUserInfo?.lastName
          } is ${type === "ACCEPTED" ? "accepted" : "rejected"} your request.`,
          type: "UPDATE",
          imgURL: el?.requestedUserImgURL,
          userInterests: el?.userInterests,
        })
      );
  };

  useEffect(() => {
    if (Object.keys(authToken)?.length) {
      setDecodedToken(DECODED_TOKEN(authToken));
    }
  }, [Object.keys(authToken)?.length]);

  useEffect(() => {
    if (decodedToken || Object.keys(confirmation)?.length) {
      const userArray = confirmation
        ?.filter(
          (el) =>
            el?.status === "ACCEPTED" &&
            (el?.userId === decodedToken?.userId ||
              el?.connectedWith === decodedToken?.userId) &&
            !el?.deactivated &&
            !el?.deleted
        )
        ?.map((el) => ({
          userId: !el?.msg?.includes(
            `${decodedToken?.firstName} ${decodedToken?.lastName} `
          )
            ? el?.userId
            : el?.connectedWith,
          name: el?.msg?.includes(
            `${decodedToken?.firstName} ${decodedToken?.lastName} `
          )
            ? `${el?.firstName} ${el?.lastName}`
            : `${el?.connectedUserInfo?.firstName} ${el?.connectedUserInfo?.lastName}`,
        }));
      setUserArray(userArray);
      dispatch(setUserArrayDetails(userArray));

      const remakeConnection = confirmation?.filter(
        (el) =>
          !el?.msg?.includes(
            `${decodedToken?.firstName} ${decodedToken?.lastName} `
          ) &&
          el?.connectedWith === decodedToken?.userId &&
          !el?.deactivated &&
          !el?.deleted
      );
      setRemakeConnection(remakeConnection);
      dispatch(storeRemakeConnection(remakeConnection));
      setUserName(decodedToken?.firstName);
      const remakeNotifications = notifications?.filter(
        (el) =>
          el?.connectedWith === decodedToken?.userId &&
          !el?.deactivated &&
          !el?.deleted
      );
      setRemakeNotifications(remakeNotifications);
    }
  }, [decodedToken, Object.keys(confirmation)?.length]);

  useEffect(() => {
    if (activation) {
      setDeactivateVisible(false);
      notification.success({ message: activation, placement: "topRight" });
      dispatch(logout());
      navigation("/login");
    }
  }, [activation]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg  fixed-top mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="/assets/books.gif"
              alt=""
              width="30"
              height="24"
              className="me-3 logo"
            />
            <img
              src="/assets/logo.gif"
              alt=""
              width="30"
              height="24"
              className="me-3 logo"
            />
            <span className="navbarName">ArchiveHub</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!userType && (
              <>
                <ul className="nav nav-pills ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${getActiveTab("profile")}`}
                      aria-current="page"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${getActiveTab("grants")}`}
                      to="/grants"
                    >
                      Grants
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${getActiveTab("recommendations")}`}
                      to="/recommendations"
                    >
                      Recommendations
                    </Link>
                  </li>
                </ul>
                {Object.keys(authToken)?.length ? (
                  <div className="text-white bg position-relative cursor cursor1">
                    <Popover
                      content={
                        ![...notifications, ...remakeConnection]?.filter(
                          (el) =>
                            !el?.markedAsRead && !el?.deactivated && !el?.deleted
                        )?.length || action === "MARK" ? (
                          <Empty />
                        ) : (
                          [...notifications, ...remakeConnection]
                            ?.filter(
                              (el) =>
                                !el?.markedAsRead &&
                                !el?.deactivated &&
                                !el?.deleted
                            )
                            ?.map((el) => (
                              <>
                                <div className="row">
                                  <div className="col-2">
                                    <img
                                      src={
                                        el?.requestedUserImgURL
                                          ? el?.requestedUserImgURL
                                          : el?.connectedUserInfo?.imgURL
                                      }
                                      alt=""
                                      width="30"
                                      height="24"
                                      className=" logo"
                                    />
                                  </div>
                                  <div className="col-10 ">
                                    <span>{el?.msg}</span>
                                  </div>
                                </div>

                                {!el?.actionUserImgURL ? (
                                  <>
                                    <div className="row ">
                                      <div className="col-6">
                                        <Button
                                          className="badge rounded-pill bg-success accept-btn"
                                          onClick={() => {
                                            onClick("ACCEPTED", el);
                                            setBtnLoading(true);
                                            setTimeout(() => {
                                              dispatch(btnAcceptOrReject(true));
                                              setBtnLoading(false);
                                            }, 2000);
                                          }}
                                          loading={
                                            btnLoading && action === "ACCEPTED"
                                          }
                                        >
                                          ACCEPT
                                        </Button>{" "}
                                      </div>
                                      <div className="col-6">
                                        <Button
                                          className="badge rounded-pill bg-danger reject-btn"
                                          onClick={() => {
                                            onClick("REJECTED", el);
                                            setBtnLoading(true);
                                            setTimeout(() => {
                                              dispatch(btnAcceptOrReject(true));
                                              setBtnLoading(false);
                                            }, 2000);
                                          }}
                                          loading={
                                            btnLoading && action === "REJECTED"
                                          }
                                        >
                                          REJECT
                                        </Button>
                                      </div>
                                    </div>
                                    <Divider />
                                  </>
                                ) : (
                                  <div className="col markas-read">
                                    <button
                                      className="badge rounded-pill bg-primary"
                                      onClick={() => {
                                        onClick("MARK", el);
                                        setBtnLoading(true);
                                        setTimeout(() => {
                                          dispatch(btnAcceptOrReject(true));
                                          setBtnLoading(false);
                                        }, 2000);
                                      }}
                                      loading={btnLoading && action === "MARK"}
                                    >
                                      MARK AS READ
                                    </button>{" "}
                                    <Divider />
                                  </div>
                                )}
                              </>
                            ))
                        )
                      }
                      title={"NOTIFICATIONS"}
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {[...remakeNotifications, ...remakeConnection]?.filter(
                          (el) =>
                            !el?.markedAsRead &&
                            !el?.deactivated &&
                            !el?.deleted
                        ).length && action !== "MARK"
                          ? [...notifications, ...remakeConnection]?.filter(
                              (el) =>
                                !el?.markedAsRead &&
                                !el?.deactivated &&
                                !el?.deleted
                            ).length
                          : 0}
                      </span>
                      <BellOutlined />
                    </Popover>
                  </div>
                ) : (
                  <></>
                )}
                {Object.keys(authToken)?.length ? (
                  <div className="text-white cursor">
                    <Popover
                      title="ACCOUNT SETTINGS"
                      trigger="click"
                      open={settingsOpen}
                      onOpenChange={handleOpenSettingsChange}
                      content={
                        <div>
                          <Button
                            className="badge bg-success"
                            onClick={() => {
                              setModalVisible(true);
                              setSettingsOpen(false);
                            }}
                          >
                            CHANGE PASSWORD
                          </Button>
                          <br />
                          <br />
                          <Button
                            className="badge bg-danger"
                            onClick={() => {
                              setDeactivateVisible(true);
                              setSettingsOpen(false);
                            }}
                            icon={<WarningFilled />}
                          >
                            DEACTIVATE ACCOUNT
                          </Button>
                        </div>
                      }
                    >
                      <SettingFilled />
                    </Popover>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
            {userType && (
              <ul className="nav nav-pills ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${getActiveTab("recommendations")}`}
                    to="/admin"
                  >
                    Admin Dashboard
                  </Link>
                </li>
              </ul>
            )}
            {userType && (
              <Button
                className="badge bg-success"
                onClick={() => {
                  setModalVisible(true);
                  setSettingsOpen(false);
                }}
              >
                <span className="">CHANGE PASSWORD</span>
              </Button>
            )}
            <div className="logout">
              <Button
                className=" logoutbtn"
                onClick={() => {
                  if (!Object.keys(data)?.length) navigation("/login");
                  else dispatch(logout());
                }}
              >
                <span className="logoutText">
                  {!Object.keys(data)?.length ? "Login" : "Logout"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <ModalContainer
        title="CHANGE PASSWORD"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        className="nav-modal"
        destroyOnClose={true}
        footer={false}
        bodyStyle={{
          // overflowY: "scroll",
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
        }}
        width={1200}
      >
        <ResetPassword
          nav={true}
          setModalVisible={setModalVisible}
          admin={decodedToken?.type}
        />
      </ModalContainer>
      <ModalContainer
        title="CONFIRMATION"
        open={deactivateVisible}
        onCancel={() => setDeactivateVisible(false)}
        className="nav-modal"
        destroyOnClose={true}
        footer={false}
        bodyStyle={{
          // overflowY: "scroll",
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
        }}
        // width={1200}
      >
        <div>
          <center>
            <h4>Hi, {userName}</h4>
          </center>
          <p>
            If you are deactivating your account, all the connections between
            ArchiveHub and you will be temporary unavailable for other users.
            <br /> (They can't see you in the ArchiveHub network)
            <br /> <br /> <br />
            <p>
              Fortunately, the system will be sent the email regarding this to
              your connected users.
              <br />
              {getUsers(savedUserArray)}
            </p>
            <Input
              placeholder="type CONFIRM to deactivate"
              onChange={(e) => setQuery(e.target.value)}
            />
          </p>
          <center>
            <Button
              className="badge bg-danger"
              icon={<WarningFilled />}
              disabled={query?.trim() !== "CONFIRM"}
              onClick={() =>
                dispatch(
                  activateOrDeactivateDetails({
                    type: "DEACTIVATE",
                    users: userArray?.map((el) => el?.userId),
                  })
                )
              }
              loading={activationFetching}
            >
              FORCE DEACTIVATE
            </Button>
          </center>
        </div>
      </ModalContainer>
    </div>
  );
};

export default Navbar;
