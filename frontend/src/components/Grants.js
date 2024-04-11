import React, { useEffect, useState } from "react";
import "./styles/Grants.css";
import "./styles/Navbar.css";
import WordCloudComponent from "./common/WordCloud";
import Calendar from "./common/Calendar";
import {
  Button,
  Empty,
  Input,
  Spin,
  Switch,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fundingDetails,
  grantsDetails,
  grantsSaveOrUpdateDetails,
  shareGrants,
} from "../auth/authActions";
import {
  DECODED_TOKEN,
  FUNDING_CARD,
  SOMETHING_WENT_WRONG,
  selelectedGrantsColumns,
} from "./helpers/Helper";
import {
  DeleteFilled,
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import ModalContainer from "./common/ModalContainer";
import TableContainer from "./common/TableContainer";
import NetworkError from "./common/NetworkError";
import ColorGenerator from "random-color-array-generator/ColorGenerator.min";
import { Link } from "react-router-dom";
import moment from "moment";
import { GetColumnSearchProps } from "./common/Search";

const Grants = () => {
  const [toggle, setToggle] = useState(false);
  const [Filter, setFilter] = useState(false);
  const [fundingRemakeData, setFundingRemakeData] = useState({});
  const [visible, setVisible] = useState(false);
  const [grantsForTable, setGrantsForTable] = useState([]);
  const [btnClickedChoise, setBtnClickedChoise] = useState(null);
  const [visibleNetwork, setVisibleNetwork] = useState(false);
  const [networkUserFilter, setNetworkUserFilter] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [networkUsersInterests, setNetworkUsersInterests] = useState([]);
  const [selectedUserIdsNetwork, setSelectedUserIdsNetwork] = useState([]);
  const [isShared, setIsShared] = useState(false);
  const [customEmail, setCustomEmail] = useState("@");
  const [customEmailArr, setCustomEmailArr] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    const selectedInterests = [];
    const selectedIds = [];
    confirmationData
      ?.filter(
        (el) =>
          el?.status === "ACCEPTED" &&
          (el?.userId === decodedToken?.userId ||
            el?.connectedWith === decodedToken?.userId) &&
          !el?.deactivated &&
          !el?.deleted
      )
      ?.map((el, index) => {
        return {
          ...el,
          key: index,
        };
      })
      ?.filter((el) => newSelectedRowKeys.includes(el?.key))
      ?.map((el) => {
        if (el?.userId !== decodedToken?.userId) {
          selectedIds.push(el?.connectedUserInfo?.userId);
          el?.connectedUserInfo?.interests?.map((item) => {
            selectedInterests.push(item);
          });
        } else {
          selectedIds.push(el?.connectedWith);
          el?.interests?.map((item) => {
            selectedInterests.push(item);
          });
        }
      });
    if (newSelectedRowKeys.length) {
      setNetworkUsersInterests([
        ...DECODED_TOKEN(localStorage.getItem("authToken"))?.interests,
        ...selectedInterests,
      ]);
      setSelectedUserIdsNetwork(selectedIds);
    } else {
      setNetworkUsersInterests([]);
      setSelectedUserIdsNetwork([]);
    }
    if (!newSelectedRowKeys.length)
      if (!Filter)
        dispatch(fundingDetails({ ...decodedToken, type: "PERSONALIZED" }));
    setSelectedRowKeys(newSelectedRowKeys);
  };

  let g1 = null;
  let g2 = null;
  let g3 = null;

  const dispatch = useDispatch();

  const authToken = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || null
  );

  const grantsData = useSelector(
    (state) => state?.auth?.grants?.data?.data?.grants || {}
  );

  const grantsError = useSelector(
    (state) => state?.auth?.grants?.error?.status || false
  );

  const fundingError = useSelector(
    (state) => state?.auth?.funding?.error?.status || false
  );

  const grantsFetching = useSelector(
    (state) => state?.auth?.grants?.fetching || false
  );

  const checkProfileData = useSelector(
    (state) => state?.auth?.checkProfile?.data?.data || []
  );

  const fundingData = useSelector(
    (state) => state?.auth?.funding?.data?.data || null
  );

  const fundingFetching = useSelector(
    (state) => state?.auth?.funding?.fetching || false
  );

  const shareGrantsFetching = useSelector(
    (state) => state?.auth?.shareGrants?.fetching || false
  );
  const shareGrantsSuccess = useSelector(
    (state) => state?.auth?.shareGrants?.success?.status || false
  );

  const confirmationData = useSelector(
    (state) => state?.auth?.confirmation?.data?.data?.users || []
  );

  const notified = useSelector(
    (state) =>
      state?.auth?.grantsSaveOrUpdate?.data?.data?.user?.notified || false
  );

  const decodedToken = DECODED_TOKEN(authToken);

  const notifiedError = useSelector(
    (state) => state?.auth?.grantsSaveOrUpdate?.error?.status || false
  );

  const onToggleChange = (checked) => {
    if (checked) {
      setToggle(checked);
    } else {
      setToggle(checked);
    }
    dispatch(
      grantsSaveOrUpdateDetails({
        userId: decodedToken?.userId,
        type: "UPDATE",
        notified: checked,
        grantsData: null,
      })
    );
  };

  const remakeInterests = () => {
    const separateArrays = [];
    for (const element of checkProfileData?.interests?.length
      ? checkProfileData?.interests
      : []) {
      const words = element?.split(" ");
      const filteredWords = words?.filter(
        (word) => word.length > 1 && !word.match(/^[a-zA-Z]$/)
      );
      separateArrays.push(...filteredWords);
    }
    return separateArrays;
  };

  const moveToFirst = (arr, index) => {
    const element = arr[index]; // Retrieve the element at the given index
    for (let i = index; i > 0; i--) {
      arr[i] = arr[i - 1]; // Shift elements to the right
    }
    arr[0] = element; // Assign the chosen element to the first position
    return arr;
  };

  useEffect(() => {
    dispatch(
      grantsDetails({
        userId: decodedToken?.userId,
        keywords: remakeInterests(),
      })
    );
  }, []);

  useEffect(() => {
    if (Object.keys(grantsData)?.length) {
      const groupedObjects = {};
      for (const [column, objects] of Object.entries(grantsData)) {
        if (selelectedGrantsColumns(column))
          for (const obj of Object.entries(objects).map(([key, value]) => ({
            [key]: value,
          }))) {
            const columnId = Object.keys(obj)[0]; // Extract the column ID
            if (columnId in groupedObjects) {
              groupedObjects[columnId][column] = obj[columnId];
            } else {
              groupedObjects[columnId] = { [column]: obj[columnId] };
            }
          }
      }
      setGrantsForTable(
        Object.entries(groupedObjects).map(([key, value]) => {
          return { ...value, key, closedate: remakeDate(value.closedate) };
        })
      );
    }
  }, [Filter, Object.keys(grantsData)?.length]);

  useEffect(() => {
    dispatch(fundingDetails({ ...decodedToken, type: "PERSONALIZED" }));
  }, []);

  useEffect(() => {
    if (networkUserFilter) {
      dispatch(
        fundingDetails({
          userId: decodedToken?.userId,
          type: "CUSTOMIZED",
          interests: networkUsersInterests,
        })
      );
      setNetworkUserFilter(false);
      setVisibleNetwork(false);
    }
  }, [networkUserFilter]);

  useEffect(() => {
    if (fundingData?.length)
      setFundingRemakeData(JSON.parse(fundingData.replace(/NaN/g, null)));
  }, [fundingData?.length]);

  useEffect(() => {
    if (grantsError || fundingError || notifiedError)
      notification.error(SOMETHING_WENT_WRONG);
  }, [grantsError, fundingError, notifiedError]);

  const getRandomItem = (obj, el) => {
    const keys = Object.keys(obj ? obj : {});
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    switch (el) {
      case 1:
        g1 = randomKey;
        break;
      case 2:
        g2 = randomKey;
        break;
      default:
        g3 = randomKey;
        break;
    }
    return { key: randomKey, name: obj ? obj[randomKey] : null };
  };

  const remakeDate = (dateString) => {
    if (dateString === "N/A") return dateString;
    const year = dateString?.toString().slice(-4);
    const day = dateString?.toString().slice(-6, -4);
    const month = dateString?.toString().slice(0, -6);
    const separatedString = `${day}-${month}-${year}`;
    return separatedString;
  };

  const convertDate = (dateString) => {
    const [day, month, year] = dateString?.split("-");
    return new Date(year, month - 1, day);
  };

  const compareLargestDate = (curDate, grantDate) => {
    if (curDate <= grantDate) {
      return true;
    }
    return false;
  };

  const NETWORK_COLUMNS = Object.freeze([
    {
      title: " ",
      render: (record) => (
        <img
          width={50}
          src={
            record?.userId !== decodedToken?.userId
              ? record?.connectedUserInfo?.imgURL
              : record?.actionUserImgURL
          }
          className="img-fluid"
        />
      ),
    },
    {
      title: "USER",
      dataIndex: "userName",
      ...GetColumnSearchProps("userName", visibleNetwork),
    },
    {
      title: "INTERESTS",
      render: (_, record) => {
        return (
          <>
            {record?.userId !== decodedToken?.userId
              ? record?.connectedUserInfo?.interests?.map((tag, index) => {
                  let color = new ColorGenerator(10);
                  return (
                    <Tag color={color.generateRGB()[index]} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })
              : record?.interests?.map((tag, index) => {
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
  ]);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          onSelectChange(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          onSelectChange(newSelectedRowKeys);
        },
      },
    ],
  };

  const grantsDates = [];
  const date = moment(new Date(), "DD-MM-YYYY");
  const openGrants = grantsForTable
    ?.filter(
      (el) =>
        el?.closedate !== "N/A" &&
        moment(el?.closedate, "DD-MM-YYYY").diff(date, "days") >= 0
    )
    ?.map((el) => {
      grantsDates.push({
        ...el,
        closedate: moment(el?.closedate, "DD-MM-YYYY").toDate(),
      });
      return el;
    });

  console.log("checkProfileData", checkProfileData);

  useEffect(() => {
    if (isShared) {
      dispatch(
        shareGrants({
          ids: selectedUserIdsNetwork,
          userName: `${decodedToken?.firstName} ${decodedToken?.lastName}`,
          affliations: checkProfileData?.affiliations,
          grants: openGrants.slice(0, 3),
          customEmailArr,
        })
      );
      setIsShared(false);
      setVisibleNetwork(false);
    }
  }, [isShared]);

  useEffect(() => {
    if (shareGrantsSuccess) {
      setVisibleNetwork(false);
      setNetworkUsersInterests([]);
      setNetworkUserFilter(false);
      setFilter(false);
      setSelectedRowKeys([]);
      setCustomEmailArr([]);
    }
  }, [shareGrantsSuccess]);

  useEffect(() => {
    if (grantsDates?.length) {
      dispatch(
        grantsSaveOrUpdateDetails({
          userId: decodedToken?.userId,
          type: "SAVE",
          notified: false,
          grantsData: grantsDates,
        })
      );
    }
  }, [grantsDates?.length]);

  const addCustomEmails = () => {
    if (
      !customEmailArr.find(
        (el) => el.toLocaleLowerCase() === customEmail.toLocaleLowerCase()
      ) ||
      !customEmailArr.length
    ) {
      customEmailArr.push(customEmail);
    }
    setCustomEmailArr([...customEmailArr]);
  };

  const deleteCustomEmails = (index) => {
    setCustomEmailArr(customEmailArr.filter((_, idx) => idx !== index));
  };

  const fundingColoumns = Object.freeze([
    {
      title: "Title",
      dataIndex: "Title",
      ...GetColumnSearchProps("Title", visible),
    },
    {
      title: "Type",
      dataIndex: "Type",
    },
    {
      title: "Award Type",
      dataIndex: "Award Type",
    },
    {
      title: "Next due date (Y-m-d)",
      dataIndex: "Next due date (Y-m-d)",
    },
    {
      title: "Posted date (Y-m-d)",
      dataIndex: "Posted date (Y-m-d)",
    },
  ]);

  const grantsColumns = Object.freeze([
    {
      title: "OPPORTUNITY TITLE",
      dataIndex: "opportunitytitle",
      ...GetColumnSearchProps("opportunitytitle", visible),
    },
    {
      title: "ADDITIONAL INFORMATION ELIGIBILITY",
      dataIndex: "additionalinformationoneligibility",
      render: (_, record) => (
        <>
          {record?.additionalinformationoneligibility === "N/A"
            ? "N/A"
            : record?.additionalinformationoneligibility?.substring(0, 50) +
              "..."}{" "}
        </>
      ),
    },
    {
      title: "ADDITIONAL INFORMATION URL",
      dataIndex: "additionalinformationurl",
    },
    {
      title: "AGENCY NAME",
      dataIndex: "agencyname",
      ...GetColumnSearchProps("agencyname"),
    },
    {
      title: "AWARD AMOUNT $",
      dataIndex: "awardfloor",
    },
  ]);

  return (
    <div>
      <br />
      <br />
      <div className="container mt-5">
        <div className="row mt-5 mb-2 col-sm">
          <div className="col-md-8">
            <div className="outer-card p-4 mb-3">
              <h3 className="grants-text">
                The Grants, Funding Are Based On Your Research Interests.
              </h3>

              <WordCloudComponent />
            </div>
          </div>

          <div className="col-md-4">
            <div className="outer-card p-4">
              <Calendar dates={grantsDates} />
              <div className="row">
                <div className="col-md-6">
                  <h6 className="text-white mt-3">
                    <img
                      src="/assets/notify.gif"
                      width="30"
                      height="30"
                      className="me-1 logo"
                    />{" "}
                    Get Notified
                  </h6>
                </div>
                <div className="col-md-4 mt-3">
                  <Switch onChange={onToggleChange} checked={notified} />{" "}
                  <span
                    className={`text-${
                      toggle || notified ? "success" : "warning"
                    }`}
                  >
                    {toggle || notified ? "ON" : "OFF"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-6">
            <div className="outer-card p-4 mb-3 mt-4">
              <h3 className="sub-headings">
                <img
                  src="/assets/grants.gif"
                  width="30"
                  height="30"
                  className="me-1 logo"
                />{" "}
                <span className="position-relative">
                  <span className="position-relative top-0 start-60 translate-middle badge bg-danger rounded-pill">
                    <span>{openGrants?.length ? openGrants?.length : 0}</span>
                  </span>
                  Grants Opportunities{" "}
                  <span
                    className="float-end pe-auto cursor"
                    onClick={() => {
                      setFilter(true);
                    }}
                  >
                    <Tooltip title="Share with your connections">
                      <ShareAltOutlined />
                    </Tooltip>
                  </span>
                </span>
              </h3>
              <h4 className="text-white text-center">Recommended</h4>

              {grantsFetching ? (
                <>
                  <center>
                    <Spin />
                  </center>
                </>
              ) : grantsError ? (
                <NetworkError />
              ) : !Object.keys(grantsData)?.length ? (
                <>
                  <center>
                    <Empty />
                  </center>
                </>
              ) : (
                <>
                  {Array.from(
                    {
                      length:
                        Object.keys(openGrants)?.length < 3
                          ? Object.keys(openGrants)?.length
                          : 3,
                    },
                    (_, index) => (
                      <div
                        className="inner-card p-3 mt-3"
                        onClick={() =>
                          window.open(
                            openGrants?.[index]?.additionalinformationurl
                          )
                        }
                        key={index}
                      >
                        <div className="row">
                          <p className="text-white ps-4 position-relative">
                            {openGrants?.[index]?.opportunitytitle}
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                              OPEN
                            </span>
                          </p>
                        </div>
                        <p className="badge bg-light text-dark">
                          Agency: {openGrants?.[index]?.agencyname}
                        </p>
                        <br />
                        <p className="badge bg-warning text-dark">
                          Closing: {openGrants?.[index]?.closedate}
                        </p>
                        &nbsp;&nbsp;
                        <p className="badge bg-info text-dark">
                          Award amount:
                          {openGrants?.[index]?.awardfloor === 0 ||
                          openGrants?.[index]?.awardfloor === 1 ||
                          openGrants?.[index]?.awardfloor === "N/A"
                            ? " To be discussed"
                            : ` $${openGrants?.[index]?.awardfloor}`}
                        </p>
                      </div>
                    )
                  )}
                  <br />
                  <center>
                    <button
                      className="submit  btn position-relative"
                      onClick={() => {
                        setBtnClickedChoise("grants");
                        setVisible(true);
                      }}
                    >
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        <span>
                          {openGrants?.length ? openGrants?.length - 3 : 0}
                        </span>
                      </span>
                      SEE MORE
                    </button>{" "}
                  </center>
                </>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="outer-card p-4 mb-3 mt-4">
              <h3 className="sub-headings">
                <img
                  src="/assets/funding.gif"
                  width="30"
                  height="30"
                  className="me-1 logo"
                />{" "}
                <span className="position-relative top-0 start-60 translate-middle badge bg-danger rounded-pill">
                  <span>
                    {fundingRemakeData?.matches
                      ? fundingRemakeData?.matches
                      : 0}
                  </span>
                </span>
                Funding Opportunities{" "}
                <span
                  className="float-end pe-auto cursor"
                  onClick={() => setVisibleNetwork(true)}
                >
                  <Tooltip title="Need more funding ?. Check whether your archivehub connections. You can use those to get more funding opportunities.">
                    <SettingOutlined />
                  </Tooltip>
                </span>
              </h3>
              <h4 className="text-white text-center">
                Matched out of {fundingRemakeData?.total}
              </h4>
              {fundingFetching ? (
                <>
                  <center>
                    <Spin />
                  </center>
                </>
              ) : !Object.keys(fundingRemakeData)?.length ? (
                <>
                  <center>
                    <Empty />
                  </center>
                </>
              ) : (
                <>
                  {Array.from(
                    {
                      length:
                        Object.keys(fundingRemakeData?.fundings)?.length < 3
                          ? Object.keys(fundingRemakeData?.fundings)?.length
                          : 3,
                    },
                    (_, index) => FUNDING_CARD(fundingRemakeData, index)
                  )}
                  <br />
                  <center>
                    {Object.keys(fundingRemakeData?.fundings)?.length > 3 ? (
                      <button
                        className="submit  btn position-relative"
                        onClick={() => {
                          setBtnClickedChoise("funding");
                          setVisible(true);
                        }}
                      >
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          <span>
                            {fundingRemakeData?.matches
                              ? fundingRemakeData?.matches - 3
                              : 0}
                          </span>
                        </span>
                        SEE MORE
                      </button>
                    ) : (
                      <></>
                    )}
                  </center>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalContainer
        open={visible}
        onCancel={() => {
          setVisible(false);
          setBtnClickedChoise(null);
        }}
        title={btnClickedChoise === "grants" ? "GRANTS 🏆" : "FUNDING 🎖️"}
        footer={false}
        className="grants-modal"
        width={1250}
        destroyOnClose={true}
      >
        <div className="row">
          <TableContainer
            columns={
              btnClickedChoise === "grants"
                ? grantsColumns
                : fundingColoumns.map((ele, index) => {
                    return {
                      ...ele,
                      key: index,
                    };
                  })
            }
            dataSource={
              btnClickedChoise === "grants"
                ? openGrants?.slice(3)
                : fundingRemakeData?.fundings?.slice(3)?.map((ele) => {
                    return {
                      ...ele,
                      ["Next due date (Y-m-d)"]: ele["Next due date (Y-m-d)"]
                        ? ele["Next due date (Y-m-d)"]
                        : "N/A",
                      ["Award Type"]: ele["Award Type"]
                        ? ele["Award Type"]
                        : "N/A",
                    };
                  })
            }
            scroll={{
              x: 1500,
              y: 300,
            }}
            onRow={(record, index) => {
              return {
                onClick: (event) => {
                  window.open(
                    record[
                      btnClickedChoise === "grants"
                        ? "additionalinformationurl"
                        : "URL"
                    ]
                  );
                }, // click row
              };
            }}
          />
        </div>
      </ModalContainer>
      <ModalContainer
        title={
          Filter
            ? "Share Recommended Grants With Your ArchiveHub Connections"
            : "Your connections on ArchiveHub"
        }
        open={visibleNetwork || Filter}
        onCancel={() => {
          setVisibleNetwork(false);
          setNetworkUsersInterests([]);
          setNetworkUserFilter(false);
          setFilter(false);
          setSelectedRowKeys([]);
          setCustomEmailArr([]);
        }}
        className="grants-modal"
        destroyOnClose={true}
        footer={false}
        bodyStyle={{
          // overflowY: "scroll",
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
        }}
        width={750}
      >
        {confirmationData?.filter(
          (el) =>
            el?.status === "ACCEPTED" &&
            (el?.userId === decodedToken?.userId ||
              el?.connectedWith === decodedToken?.userId) &&
            !el?.deactivated &&
            !el?.deleted
        )?.length ? (
          <>
            <TableContainer
              columns={NETWORK_COLUMNS}
              dataSource={confirmationData
                ?.filter(
                  (el) =>
                    el?.status === "ACCEPTED" &&
                    (el?.userId === decodedToken?.userId ||
                      el?.connectedWith === decodedToken?.userId) &&
                    !el?.deactivated &&
                    !el?.deleted
                )
                ?.map((el, index) => {
                  return {
                    ...el,
                    key: index,
                    userName: `${
                      el?.userId !== decodedToken?.userId
                        ? el?.connectedUserInfo?.firstName
                        : el?.firstName
                    } ${
                      el?.userId !== decodedToken?.userId
                        ? el?.connectedUserInfo?.lastName
                        : el?.lastName
                    }`,
                  };
                })}
              rowSelection={rowSelection}
            />
            {Filter && (
              <>
                Add custom users to send (Optional) <br />
                <div>
                  <Input
                    style={{ width: "50%" }}
                    type="email"
                    placeholder="type your custom email and press + to add"
                    onChange={(e) => {
                      if (!e.target.value) setCustomEmail("@");
                      else setCustomEmail(e.target.value);
                    }}
                  />{" "}
                  &nbsp;{" "}
                  <PlusOutlined
                    className="cursor"
                    onClick={() => addCustomEmails()}
                  />
                </div>
                <ul>
                  {customEmailArr.map((el, index) => (
                    <table>
                      <tr>
                        <td>
                          <li key={el}>{el} </li>
                        </td>
                        <td>
                          <DeleteOutlined
                            style={{ color: "red" }}
                            className="cursor"
                            onClick={() => deleteCustomEmails(index)}
                          />
                        </td>
                      </tr>
                    </table>
                  ))}
                </ul>
                <br />
                <br />
                <br />
                <br />
                <br />
              </>
            )}
            <center>
              <Tooltip
                open={!selectedRowKeys.length || !customEmail.includes("@")}
                title={
                  !selectedRowKeys.length
                    ? "You need to select at least 1."
                    : "Invalid email provided."
                }
              ></Tooltip>
              <Button
                className="submit col-md-3 text-white"
                disabled={!selectedRowKeys.length}
                onClick={() => {
                  if (Filter) setIsShared(true);
                  else setNetworkUserFilter(true);
                }}
                loading={fundingFetching || shareGrantsFetching}
              >
                {Filter ? "SEND" : "FILTER"}
              </Button>
            </center>
          </>
        ) : (
          <center>
            <Empty />
            <br />{" "}
            <span>
              Oops... You don't have ArchiveHub connections. Go to{" "}
              <Link to="/profile">profile</Link> and make connections.
            </span>
          </center>
        )}
      </ModalContainer>
    </div>
  );
};

export default Grants;
