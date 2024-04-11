import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "./common/TableContainer";
import {
  clearDeleteOrVerifyUser,
  clearPreviewProfile,
  clearPreviewPublications,
  clearPreviewUserFunding,
  clearPreviewUserRating,
  deleteOrVerifyUserDetails,
  previewConfirmationDetails,
  users,
} from "../auth/authActions";
import { Button, Image, Input, notification } from "antd";
import ModalContainer from "./common/ModalContainer";
import "./styles/Profile.css";
import { GetColumnSearchProps } from "./common/Search";
import ProfilePreview from "./common/ProfilePreview";
import { DECODED_TOKEN } from "./helpers/Helper";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [sorter, setSorter] = useState("");
  const [reload, setReload] = useState(false);
  const [id, setId] = useState(null);
  const [previewUser, setPreviewUser] = useState({});
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [modalOkContent, setModalOkContent] = useState({});
  const [query, setQuery] = useState(null);
  const [btnMethod, setBtnMethod] = useState(null);

  const usersData = useSelector(
    (state) => state?.auth?.users?.data?.data?.result || []
  );

  const usersDataSuccess = useSelector(
    (state) => state?.auth?.users?.success?.status || false
  );

  const deleteOrVerifyUser = useSelector(
    (state) => state?.auth?.deleteOrVerifyUser?.data?.data || null
  );

  const deleteOrVerifyUserFetching = useSelector(
    (state) => state?.auth?.deleteOrVerifyUser?.fetching || null
  );

  const authToken = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || null
  );

  const fetching = useSelector(
    (state) => state?.auth?.users?.fetching || false
  );

  const decodedToken = DECODED_TOKEN(authToken);

  useEffect(() => {
    dispatch(users({ type: "GET", profileData: null }));
    if (deleteOrVerifyUser) {
      notification.success({
        message: deleteOrVerifyUser,
        placement: "topRight",
      });
      dispatch(clearDeleteOrVerifyUser());
      setReload(true);
    }
  }, [deleteOrVerifyUser]);

  useEffect(() => {
    if (reload && usersDataSuccess) {
      setFilterData(
        usersData?.map((el) => ({
          ...el,
          userName: `${el?.firstName} ${el?.lastName}`,
        }))
      );
      setReload(false);
    }
  }, [usersDataSuccess]);

  useEffect(() => {
    if (usersData?.length) {
      setFilterData(
        usersData?.map((el) => ({
          ...el,
          userName: `${el?.firstName} ${el?.lastName}`,
        }))
      );
    }
  }, [usersData?.length]);

  const handleOnChange = (sorter) => {
    setSorter(sorter);
  };

  const onClick = (user, type) => {
    setId(user?.userId);
    setBtnMethod(type);
    setModalOkContent({ ...user, type });
    setVisibleConfirm(true);
  };

  const onOk = () => {
    dispatch(deleteOrVerifyUserDetails(modalOkContent));
  };

  const columns = [
    {
      title: " ",
      render: (_, record) => (
        <>
          <Image
            src={record?.imgURL}
            width={100}
            height={100}
            className="fit"
            preview={{
              visible: false,
              onVisibleChange: () => {
                setVisiblePreview(true);
                setPreviewUser({
                  ...record,
                  url: record.institutionWebAddress,
                });
                dispatch(
                  previewConfirmationDetails({
                    ...decodedToken,
                    type: "GET_CONFIRMATION",
                    msg: null,
                    connectedWith: record?.userId,
                    connectedUserInfo: {},
                  })
                );
              },
            }}
          />
        </>
      ),
    },
    {
      title: "USERNAME",
      dataIndex: "userName",
      ...GetColumnSearchProps("userName"),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      ...GetColumnSearchProps("email"),
    },
    {
      title: "STATUS",
      render: (_, { verified, deleted }) => (
        <div>
          {verified ? (
            <span className="badge bg-success">VERIFIED</span>
          ) : (
            <span className="badge bg-secondary">BOT ACCOUNT</span>
          )}
          {deleted ? (
            <>
              {" "}
              <span className="badge bg-danger">DELETED</span>
            </>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      title: "ACTIONS",
      render: (_, record) => (
        <div>
          {!record?.verified && (
            <Button
              className="badge bg-warning "
              onClick={() => onClick(record, "VERIFY")}
              loading={
                deleteOrVerifyUserFetching &&
                id === record?.userId &&
                btnMethod === "VERIFY"
              }
            >
              <span className="button-text">VERIFY</span>
            </Button>
          )}
          {!record?.deleted && (
            <Button
              className="badge bg-danger"
              onClick={() => onClick(record, "DELETE")}
              loading={
                deleteOrVerifyUserFetching &&
                id === record?.userId &&
                btnMethod === "DELETE"
              }
            >
              <span className="button-text">DELETE</span>
            </Button>
          )}
          {record?.deleted && (
            <Button
              className="badge bg-secondary"
              onClick={() => onClick(record, "RESTORE")}
              loading={
                deleteOrVerifyUserFetching &&
                id === record?.userId &&
                btnMethod === "RESTORE"
              }
            >
              <span className="button-text">RESTORE</span>
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="container mt-5">
      <br />
      <br />
      <Button onClick={() => setVisible(true)}>VIEW SUBMISSIONS</Button>
      <br /> <br />
      <TableContainer
        columns={columns}
        dataSource={filterData}
        scroll={{
          x: 500,
          y: 800,
        }}
        loading={fetching}
        onChange={(pagination, filters, sorter, extra) =>
          handleOnChange(sorter)
        }
      />
      <ModalContainer
        title={"VERIFICATION SUBMISSIONS"}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={false}
        bodyStyle={{
          // overflowY: "scroll",
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
        }}
        width={1250}
        destroyOnClose={true}
        className="profile-modal"
      >
        <iframe
          src={process.env.REACT_APP_ADMIN_FORM}
          className="container"
          height={500}
        />
      </ModalContainer>
      <ModalContainer
        title={`Preview of ${previewUser?.firstName} ${previewUser?.lastName}`}
        open={visiblePreview}
        onCancel={() => {
          setVisiblePreview(false);
          setPreviewUser({});
          dispatch(clearPreviewProfile());
          dispatch(clearPreviewPublications());
          dispatch(clearPreviewUserRating());
          dispatch(clearPreviewUserFunding());
        }}
        className="profile-modal"
        footer={false}
        bodyStyle={{
          // overflowY: "scroll",
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
        }}
        width={1500}
        destroyOnClose={true}
      >
        <ProfilePreview previewUser={previewUser} />
      </ModalContainer>
      <ModalContainer
        title="CONFIRMATION"
        className="profile-modal"
        open={visibleConfirm}
        footer={false}
        destroyOnClose={true}
        onCancel={() => {
          setVisibleConfirm(false);
          setModalOkContent({});
        }}
      >
        <div className="mt-2 text-center">
          {" "}
          Are you sure, you want to {modalOkContent?.type?.toLowerCase()} "
          {modalOkContent?.userName}" ?
          <br />
          <br />
          <Input
            placeholder="type CONFIRM to proceed"
            onChange={(e) => setQuery(e.target.value)}
          />
          <br />
          <br />
          <Button
            className="badge bg-danger button-text"
            disabled={!(query === "CONFIRM")}
            onClick={() => {
              onOk();
              setVisibleConfirm(false);
            }}
          >
            CONFIRM
          </Button>
        </div>
      </ModalContainer>
    </div>
  );
};

export default AdminDashboard;
