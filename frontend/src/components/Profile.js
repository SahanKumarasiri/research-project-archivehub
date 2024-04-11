import React, { useEffect, useState } from "react";
import "./styles/Profile.css";
import WordCloudComponent from "./common/WordCloud";
import {
  Button,
  Empty,
  Image,
  Rate,
  Select,
  Spin,
  Tag,
  Tooltip,
  notification,
  Form,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  checkProfile,
  clearBtnAcceptOrReject,
  clearPreviewProfile,
  clearPreviewPublications,
  clearPreviewUserFunding,
  clearPreviewUserRating,
  confirmationDetails,
  createCollaborator,
  disconnectConnection,
  fundingDetails,
  getCollaborators,
  notificationDetails,
  performConnection,
  previewConfirmationDetails,
  publications,
  ratingDetails,
  users,
  verifyAccount,
} from "../auth/authActions";
import {
  DECODED_TOKEN,
  EMPTY_FIELD_VALIDATION,
  POSITIONS,
  RATING_PAYLOAD,
  SEARCH_OPTIONS,
  SOMETHING_WENT_WRONG,
  VERIFICATION_FORM,
  actionBtn,
  handleDisable,
} from "./helpers/Helper";
import ProfileFeatures from "./common/ProfileFeatures";
import NetworkGraph from "./common/NetworkGraph";
import ModalContainer from "./common/ModalContainer";
import TableContainer from "./common/TableContainer";
import { Input } from "antd";
import QualificationCard from "./common/QualificationCard";
import { DisconnectOutlined, SettingOutlined } from "@ant-design/icons";
import PublicationCategories from "./common/PublicationCategories";
import PublicationsFilter from "./common/PublicationsFilter";
import ColorGenerator from "random-color-array-generator/ColorGenerator.min.js";
import ProfilePreview from "./common/ProfilePreview";
import { GetColumnSearchProps } from "./common/Search";
import Typewriter from "typewriter-effect";
import FileUpload from "./common/FileUpload";
const { Search } = Input;

const Profile = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [filterationData, setFilterationData] = useState([]);
  const [query, setQuery] = useState(null);
  const [searchOption, setsearchOption] = useState(1);
  const [visibleNetwork, setVisibleNetwork] = useState(false);
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [previewUser, setPreviewUser] = useState({});
  const [fundingRemakeData, setFundingRemakeData] = useState([]);
  const [id, setId] = useState(null);
  const [disconnect, setDisconnect] = useState(false);
  const [visibleCollab, setVisibleCollab] = useState(false);
  const [warn, setWarn] = useState(false);
  const [name, setName] = useState(null);
  const [count, setCount] = useState(null);
  const [url, setUrl] = useState(null);
  const [Attachments, setAttachments] = useState([]);

  const [form] = Form.useForm();

  const authToken = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || null
  );

  const checkProfileData = useSelector(
    (state) => state?.auth?.checkProfile?.data?.data || {}
  );

  const checkProfileDataSuccess = useSelector(
    (state) => state?.auth?.checkProfile?.success?.status || false
  );

  const checkProfileDataFail = useSelector(
    (state) => state?.auth?.checkProfile?.error?.status || false
  );

  const publicationsData = useSelector(
    (state) => state?.auth?.publications?.data?.data || {}
  );

  const publicationsDataFail = useSelector(
    (state) => state?.auth?.publications?.error?.status || false
  );

  const usersData = useSelector(
    (state) => state?.auth?.users?.data?.data?.result || []
  );

  const usersDataFetching = useSelector(
    (state) => state?.auth?.users?.fetching || false
  );

  const usersDataFail = useSelector(
    (state) => state?.auth?.users?.error?.status || false
  );

  const connectionData = useSelector(
    (state) => state?.auth?.connection?.data?.data?.users || []
  );

  const confirmation = useSelector(
    (state) => state?.auth?.confirmation?.data?.data?.users || []
  );

  const connectionDataFail = useSelector(
    (state) => state?.auth?.connection?.error?.status || false
  );

  const connectionFetching = useSelector(
    (state) => state?.auth?.connection?.fetching || false
  );

  const btnAcceptOrReject = useSelector(
    (state) => state?.auth?.btnAcceptOrReject || false
  );

  const remakeConnection = useSelector(
    (state) => state?.auth?.remakeConnection || []
  );

  const notifications = useSelector(
    (state) => state?.auth?.notifications?.data?.data?.users || []
  );

  const fundingData = useSelector(
    (state) => state?.auth?.funding?.data?.data || null
  );

  const ratingScore = useSelector(
    (state) => state?.auth?.rating?.data?.data || null
  );

  const fetching = useSelector(
    (state) => state?.auth?.files?.fetching || false
  );

  const collaborateData = useSelector(
    (state) => state?.auth?.collaborator?.data?.data || null
  );

  const collaborateDataFetching = useSelector(
    (state) => state?.auth?.collaborator?.fetching || false
  );

  const collaboratorsData = useSelector(
    (state) => state?.auth?.getCollaborators?.data?.data || []
  );

  const decodedToken = DECODED_TOKEN(authToken);

  useEffect(() => {
    dispatch(
      checkProfile({
        ...decodedToken,
        url: decodedToken.institutionWebAddress,
      })
    );
    dispatch(
      performConnection({
        ...decodedToken,
        type: "GET",
        msg: null,
        connectedWith: null,
        connectedUserInfo: {},
      })
    );
    dispatch(
      notificationDetails({
        ...decodedToken,
        type: "NOTIFICATIONS",
        msg: null,
        connectedWith: decodedToken?.userId,
        connectedUserInfo: {},
      })
    );
    dispatch(
      confirmationDetails({
        ...decodedToken,
        type: "GET_CONFIRMATION",
        msg: null,
        connectedWith: decodedToken?.userId,
        connectedUserInfo: {},
      })
    );
    dispatch(getCollaborators({ userId: decodedToken.userId }));
    dispatch(fundingDetails({ ...decodedToken, type: "PERSONALIZED" }));
    dispatch(clearBtnAcceptOrReject(null));
  }, [btnAcceptOrReject, disconnect]);

  useEffect(() => {
    if (fundingData?.length)
      setFundingRemakeData(JSON.parse(fundingData?.replace(/NaN/g, null)));
  }, [fundingData?.length]);

  useEffect(() => {
    if (
      (fundingRemakeData?.fundings?.length ||
        Array.isArray(fundingRemakeData)) &&
      Object.keys(publicationsData)?.length
    )
      dispatch(
        ratingDetails(
          RATING_PAYLOAD(
            decodedToken,
            publicationsData,
            fundingRemakeData,
            checkProfileData,
            connectionData,
            collaboratorsData
          )
        )
      );
  }, [
    fundingRemakeData?.fundings?.length || Array.isArray(fundingRemakeData),
    Object.keys(publicationsData)?.length,
  ]);

  useEffect(() => {
    if (Object.keys(publicationsData)?.length) {
      const arr = [];
      for (const article of publicationsData?.articles) {
        arr.push(...article?.[1]);
      }
      setFilterationData(arr);
    }
  }, [Object.keys(publicationsData)?.length]);

  useEffect(() => {
    if (checkProfileDataSuccess) dispatch(publications({ ...decodedToken }));
  }, [checkProfileDataSuccess]);

  useEffect(() => {
    if (visibleNetwork) {
      dispatch(users({ type: "UPDATE", profileData: checkProfileData }));
      dispatch(users({ type: "GET", profileData: null }));
    }
  }, [visibleNetwork]);

  useEffect(() => {
    if (
      checkProfileDataFail ||
      publicationsDataFail ||
      usersDataFail ||
      connectionDataFail
    )
      notification.error(SOMETHING_WENT_WRONG);
  }, [
    checkProfileDataFail,
    publicationsDataFail,
    usersDataFail,
    connectionDataFail,
  ]);

  const filter = filterationData.filter(
    (ele) =>
      (ele?.title?.toLowerCase()?.includes(query?.toLowerCase()) &&
        searchOption === 1) ||
      (ele?.authors
        ?.toString()
        ?.toLowerCase()
        ?.includes(query?.toLowerCase()) &&
        searchOption === 2) ||
      (ele?.publication_year?.toString()?.includes(query) && searchOption === 3)
  );

  let names = [];
  filterationData.map(({ authors }) => {
    if (Array.isArray(authors)) names.push(...authors);
    else names.push(authors);
  });

  const nameCount = {};

  names.forEach((name) => {
    nameCount[name] = (nameCount[name] || 0) + 1;
  });

  const resultArray = Object.keys(nameCount).map((name) => {
    return { name: name, count: nameCount[name] };
  });

  const USERS_COLUMNS = Object.freeze([
    {
      title: " ",
      dataIndex: "imgURL",
      render: (_, record) => (
        <>
          {/* <img
          src={imgURL}
          className="img-fluid rounded-circle"
        /> */}
          <Image
            width={100}
            height={100}
            className="fit"
            src={record.imgURL}
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
      ...GetColumnSearchProps("userName", visibleNetwork),
    },
    { title: "AFFLIATIONS", dataIndex: "affiliations" },
    {
      title: "INTERESTS",
      render: (_, { interests }) => {
        return (
          <>
            {interests?.map((tag, index) => {
              let color = new ColorGenerator(10);
              return (
                <Tag color={color.generateRGB()[index]} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "CITATIONS",
      dataIndex: "citations",
    },
    {
      title: " ",
      render: (_, record) => (
        <div>
          {DECODED_TOKEN(localStorage.getItem("authToken"))?.userId ===
          record?.userId ? (
            "You"
          ) : (
            <>
              <Button
                onClick={() => {
                  setId(record?.userId);
                  dispatch(
                    performConnection({
                      ...decodedToken,
                      type: "CONNECT",
                      msg: `${checkProfileData?.name} wants to connect with you.`,
                      connectedWith: record?.userId,
                      connectedUserInfo: record,
                      userInterests: checkProfileData?.interests,
                    })
                  );
                }}
                loading={connectionFetching && record?.userId === id}
                disabled={actionBtn(
                  connectionData,
                  confirmation,
                  decodedToken,
                  record,
                  [...remakeConnection].concat(notifications),
                  true
                )}
              >
                {actionBtn(
                  connectionData,
                  confirmation,
                  decodedToken,
                  record,
                  [...remakeConnection].concat(notifications)
                )}
              </Button>
              <br />
              <br />
              {actionBtn(
                connectionData,
                confirmation,
                decodedToken,
                record,
                [...remakeConnection].concat(notifications)
              ) === "ACCEPTED" && (
                <Button
                  onClick={() => {
                    dispatch(
                      disconnectConnection({
                        userId: decodedToken.userId,
                        connectedWith: record.userId,
                      })
                    );
                    setDisconnect(true);
                    setVisibleNetwork(false);
                  }}
                >
                  <DisconnectOutlined /> DISCONNECT
                </Button>
              )}
            </>
          )}
        </div>
      ),
    },
  ]);

  useEffect(() => {
    if (collaborateData) {
      dispatch(getCollaborators({ userId: decodedToken.userId }));
      setAttachments([]);
      setVisibleCollab(false);
      setName(null);
      setCount(null);
      setUrl(null);
      form.resetFields();
    }
  }, [collaborateData]);

  const onSubmitCollab = async () => {
    if (parseInt(count) < 3) {
      notification.warning({
        message: "Count should be at least 3",
        placement: "topRight",
      });
      return;
    }
    try {
      dispatch(
        createCollaborator({
          userId: decodedToken.userId,
          collaboratorName: name,
          count: parseInt(count),
          url: url || "https://scholar.google.com/",
          photo: Attachments?.[0]?.path,
          type: "create",
        })
      );
    } catch (error) {
      notification.error({
        message: "Something went wrong.",
        placement: "topRight",
      });
    }
  };

  return (
    <div className="container profile-frame1">
      <div className="row profile-row ">
        <div className="col-md-4 p-column">
          <div className="profile-outer-card p-3">
            <div className="content">
              <img
                src={`${
                  decodedToken?.imgURL
                    ? decodedToken?.imgURL
                    : "/assets/user.png"
                }`}
                alt=""
                className="profile-photo mt-3 rounded-circle"
              />
              <h3 className="p-name position-relative mt-2">
                {checkProfileData?.name ? checkProfileData?.name : "User"}
                {decodedToken?.verified && (
                  <span className="position-absolute top-0 start-30 translate-middle">
                    <img
                      src="/assets/verified.gif"
                      alt=""
                      width="30"
                      height="24"
                      title="Verified by ArchiveHub"
                    />
                  </span>
                )}
              </h3>
              <h3 className="p-email">
                <Typewriter
                  options={{
                    strings: [
                      POSITIONS.find(
                        (el) => el?.value === decodedToken?.position
                      )?.label,
                      checkProfileData?.affiliations,
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 0,
                  }}
                />
              </h3>
            </div>
            <div className="inner-card1 row">
              <h5 className="col-8 inner-card1-text1">Citations</h5>
              <h5 className="col-4 inner-card1-text1 inner-card1-text2">
                {checkProfileData?.cited_by_count
                  ? checkProfileData?.cited_by_count
                  : 0}
              </h5>
            </div>
            <div className="inner-card1 inner-card2 row">
              <h5 className="col-8 inner-card1-text1">h-index</h5>
              <h5 className="col-4 inner-card1-text1 inner-card1-text2">
                {publicationsData?.hIndex}
              </h5>
            </div>

            <h5 className="interest-text ">Research Interests</h5>
            <div className="interest-card">
              <WordCloudComponent from={"profile"} />
            </div>
            <h5 className="interest-text">Qualifications</h5>
            <QualificationCard token={authToken} />
            {!decodedToken?.verified && (
              <Button
                className="link-text"
                onClick={() => {
                  dispatch(verifyAccount({ emailBy: decodedToken.email }));
                  window.open(VERIFICATION_FORM);
                }}
              >
                {" "}
                <SettingOutlined />
                Verify Account
              </Button>
            )}
          </div>
        </div>
        <div className="col-md-8 p-column">
          <div className="profile-outer-card card2 p-4">
            <div className="inner-card3 mt-2">
              <h6 className="col-12 inner-card3-text1">
                Rating score : <span>{ratingScore ? ratingScore : 0} / 10</span>{" "}
                <Rate
                  disabled
                  value={ratingScore ? ratingScore : 0}
                  count={10}
                  allowHalf={true}
                />
              </h6>
            </div>
            <div className="inner-card4 mt-4 position-relative">
              <Tooltip
                title={
                  !decodedToken?.verified &&
                  "You are not a verfied user. Please verify your account by clicking verify button bellow."
                }
              >
                <button
                  onClick={() => {
                    if (decodedToken?.verified) setVisibleNetwork(true);
                  }}
                  className={`position-absolute top-0 start-50 translate-middle badge rounded-pill ${
                    decodedToken?.verified && "bg-danger disabled"
                  } ${!decodedToken?.verified && "text-black"}`}
                >
                  VIEW ARCHIVEHUB NETWORK
                </button>
              </Tooltip>
              <h3 className="inner-card4-text1 mt-3">
                Industry Collaboration Network{" "}
              </h3>

              <div>
                <NetworkGraph
                  data={publicationsData}
                  profileURL={decodedToken?.imgURL}
                  profile={null}
                  previewUser={null}
                  resultArray={resultArray}
                />
                <Tooltip
                  title={
                    !decodedToken?.verified &&
                    "You are not a verfied user. Please verify your account by clicking verify button bellow."
                  }
                >
                  <span
                    style={{ float: "right" }}
                    className={`badge rounded-pill bg-${
                      !decodedToken?.verified ? "secondary disabled" : "info"
                    } text-dark cursor`}
                    onClick={() => {
                      if (decodedToken?.verified) setWarn(true);
                    }}
                  >
                    ➕ Add Collaborator
                  </span>
                </Tooltip>

                <br />
                <br />
                <div className="badge rounded-pill">
                  ⚠️ <u>Note:</u>{" "}
                  <i>
                    The collaboration network only includes researchers who has
                    published at least 3.
                  </i>
                </div>
              </div>
            </div>
            <div className="inner-card3 mt-3">
              <h6 className="col-9 inner-card3-text1 published-paper">
                Published Research Papers
              </h6>
              <button
                className="submit  btn position-relative"
                onClick={() => setVisible(true)}
              >
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  <span>
                    {publicationsData?.total ? publicationsData?.total : 0}
                  </span>
                </span>
                VIEW ALL
              </button>
            </div>
            <div className="featured-text mt-4 row mx-auto">
              {" "}
              <div style={{ width: 100, height: 80 }}>
                <img
                  src="/assets/star.gif"
                  alt=""
                  width="30"
                  height="24"
                  className="me-3 logo"
                />
                Featured{" "}
              </div>
            </div>
            {Object.keys(publicationsData)?.length ? (
              <ProfileFeatures publicationsData={publicationsData?.articles} />
            ) : (
              <center>
                <Spin />
              </center>
            )}
          </div>
        </div>
      </div>
      <ModalContainer
        title={""}
        open={visible}
        onCancel={() => {
          setVisible(false);
          setsearchOption(1);
          setQuery(null);
        }}
        className="profile-modal"
        footer={false}
        bodyStyle={{
          // overflowY: "scroll",
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
        }}
        width={1250}
        destroyOnClose={true}
      >
        <div className="row">
          <div className="col-md-5 mt-3">
            <div className="publication-outer">
              <h6 className=" inner-card3-text1 ">
                Published Research Papers :{" "}
                <span>
                  {" "}
                  {publicationsData?.total ? publicationsData?.total : 0}
                </span>
              </h6>
            </div>
          </div>
          <div className="col-md-2 mt-3">
            <div>
              <Select
                defaultValue={"1"}
                className=" search-box mt-1"
                onSelect={(e) => setsearchOption(parseInt(e))}
                options={SEARCH_OPTIONS}
              />
            </div>
          </div>
          <div className="col-md-5 mt-3">
            <div>
              <Search
                placeholder={`Search by ${
                  searchOption === 1
                    ? "Title"
                    : searchOption === 2
                    ? "Authors"
                    : "Year"
                }`}
                allowClear
                className="search-box mt-1"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          {query ? (
            <div className="row">
              <div className="col">
                {!filter?.length ? (
                  <center>
                    <Empty />
                  </center>
                ) : (
                  filter?.map((ele, index) => (
                    <PublicationsFilter filter={ele} key={index} />
                  ))
                )}
              </div>
            </div>
          ) : (
            <>
              {Object.keys(publicationsData)?.length ? (
                <>
                  {publicationsData?.articles?.map((ele) => (
                    <div className="col-md-6 mt-3">
                      <div className="publication-card">
                        <PublicationCategories publicationsData={ele} />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <center>
                  <Spin />
                </center>
              )}
            </>
          )}
        </div>
      </ModalContainer>
      <ModalContainer
        title="ARCHIVEHUB NETWORK"
        open={visibleNetwork}
        onCancel={() => setVisibleNetwork(false)}
        className="profile-modal"
        footer={false}
        bodyStyle={{
          // overflowY: "scroll",
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
        }}
        width={1250}
        destroyOnClose={true}
      >
        <TableContainer
          columns={USERS_COLUMNS}
          dataSource={usersData
            ?.filter((el) => el?.verified && !el?.deactivated && !el?.deleted)
            ?.map((el) => ({
              ...el,
              userName: `${el?.firstName} ${el?.lastName}`,
            }))}
          scroll={{
            x: 1500,
            y: 300,
          }}
          loading={usersDataFetching}
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
          dispatch(clearPreviewUserFunding());
          dispatch(clearPreviewUserRating());
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
        title={"ADD COLLABORATOR"}
        open={visibleCollab}
        onCancel={() => {
          setVisibleCollab(false);
          form.resetFields();
        }}
        className="profile-modal"
        footer={null}
        destroyOnClose={true}
      >
        <Form form={form} onFinish={onSubmitCollab}>
          <Form.Item rules={[EMPTY_FIELD_VALIDATION]} name="name">
            <Input
              type="text"
              placeholder="Name of the collaborator"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="text"
              placeholder="Profile url ex: Google Scholar (optional)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Item>
          <Form.Item rules={[EMPTY_FIELD_VALIDATION]} name={"count"}>
            <Input
              type="number"
              placeholder="Publications count"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <span className="text-white"> Profile Photo (optional)</span>{" "}
            <FileUpload setAttachments={setAttachments} />
          </Form.Item>
          <Form.Item>
            <center>
              <Button
                className="chat-button"
                type="primary"
                onClick={() => form.submit()}
                disabled={fetching}
                loading={collaborateDataFetching}
              >
                <span className="chat-button-text">SUBMIT</span>
              </Button>
            </center>
          </Form.Item>
        </Form>
      </ModalContainer>
      <ModalContainer
        title="ATTENTION"
        className="profile-modal"
        footer={null}
        open={warn}
        onCancel={() => setWarn(false)}
      >
        ArchiveHub Platform uses the collaboration network for the rating of
        you. If you are adding a collaborator for the network, it affects your
        rating. Please make sure to add the real details.
        <br />
        <br />
        When pressing the "ACCEPT" button, you are accepting our policies.
        <br />
        <br />
        <center>
          <Button
            className="chat-button"
            onClick={() => {
              setWarn(false);
              setVisibleCollab(true);
            }}
          >
            <span className="chat-button-text">ACCEPT</span>
          </Button>
        </center>
      </ModalContainer>
    </div>
  );
};

export default Profile;
