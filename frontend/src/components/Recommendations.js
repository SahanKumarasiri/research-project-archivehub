import React, { useEffect, useState } from "react";
import "./styles/Recommendations.css";
import "./styles/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearRecommendation,
  recommendation,
  upcomings,
} from "../auth/authActions";
import {
  DECODED_TOKEN,
  RECOMMENDATION_OPTIONS,
  SOMETHING_WENT_WRONG,
} from "./helpers/Helper";
import PersonalizedCard from "./common/PersonalizedCard";
import Search from "antd/es/input/Search";
import { Button, Select, Spin, notification } from "antd";
import NetworkError from "./common/NetworkError";
import ModalContainer from "./common/ModalContainer";
import TableContainer from "./common/TableContainer";
import { GetColumnSearchProps } from "./common/Search";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Recommendations = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState(null);
  const [options, setOptions] = useState(1);
  const [setsearchClicked, setSetsearchClicked] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [check, setCheck] = useState(null);
  const [openUpcomings, setOpenUpcomings] = useState(false);

  const authToken = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || null
  );

  const personalizedRecommendation = useSelector(
    (state) => state?.auth?.personalizedRecommendation?.data?.data || {}
  );

  const personalizedRecommendationFetching = useSelector(
    (state) => state?.auth?.personalizedRecommendation?.fetching || true
  );

  const Recommendations = useSelector(
    (state) => state?.auth?.recommendation?.data?.data || {}
  );

  const RecommendationsFetching = useSelector(
    (state) => state?.auth?.recommendation?.fetching || false
  );

  const recommendationError = useSelector(
    (state) => state?.auth?.recommendation?.error?.status || false
  );

  const checkProfileData = useSelector(
    (state) => state?.auth?.checkProfile?.data?.data || []
  );

  const upcomingsTxt = useSelector(
    (state) => state?.auth?.upcomings?.data?.data?.candidates?.[0]?.output || ""
  );

  const upcomingsTxtFetching = useSelector(
    (state) => state?.auth?.upcomings?.fetching || false
  );

  const decodedToken = DECODED_TOKEN(authToken);

  useEffect(() => {
    dispatch(
      recommendation({
        ...decodedToken,
        query: null,
        type: "PERSONALIZED",
        interests: decodedToken?.interests,
      })
    );
    return () => dispatch(clearRecommendation());
  }, []);

  useEffect(() => {
    if (setsearchClicked && query) {
      dispatch(
        recommendation({
          ...decodedToken,
          query,
          type: options === 1 ? "TITLE" : "ABSTRACT",
        })
      );
      setSetsearchClicked(false);
    }
  }, [setsearchClicked]);

  useEffect(() => {
    if (!query) {
      dispatch(clearRecommendation());
      setSetsearchClicked(false);
      setInitialLoad(false);
    }
  }, [!query]);

  useEffect(() => {
    if (Object.keys(Recommendations)?.length) {
      setInitialLoad(false);
    }
  }, [Object.keys(Recommendations)?.length]);

  useEffect(() => {
    if (recommendationError) notification.error(SOMETHING_WENT_WRONG);
  }, [recommendationError]);

  const onSearch = () => {
    setSetsearchClicked(true);
    setInitialLoad(true);
  };

  window.onbeforeunload = () => dispatch(clearRecommendation());

  if (recommendationError) return <NetworkError />;

  const markdown = upcomingsTxt;

  return (
    <div className="container profile-frame1">
      <div className="row">
        <h2 className="rec-title">
          Personalized results based on research interests
        </h2>
        <Button
          className="submit  text-white"
          onClick={() => {
            dispatch(
              upcomings({
                date: moment().add(1, "months").format("MMMM"),
                interests: decodedToken.interests,
              })
            );
            setOpenUpcomings(true);
          }}
        >
          <span className="text-dark">
            <CalendarOutlined /> View Upcoming Conferences
          </span>
        </Button>
        <div className="col-md-6 p-column mt-2  ">
          <div className="rec-outer-card rec-outer1">
            <div className="row rec-row1 ">
              <h5 className="rec-con-text"> 🌟 Personalized Conferences</h5>
            </div>
            <PersonalizedCard
              arr={personalizedRecommendation?.topConferences}
              type={"Conferences"}
              isR={false}
            />
          </div>
          <div className="rec-outer-card rec-outer1 mt-3">
            <div className="row rec-row1 ">
              <h5 className="rec-con-text"> 🌟 Personalized Journals</h5>
            </div>
            <PersonalizedCard
              arr={personalizedRecommendation?.topJournals}
              type={"Journals"}
              isR={false}
            />
          </div>
        </div>
        <div className="col-md-6 p-column mt-2">
          <div className="row rec-outer2">
            <div className="col-9">
              <Search
                placeholder={`Search by ${
                  options === 1
                    ? "Title"
                    : options === 2
                    ? "Abstract"
                    : "Keywords"
                }`}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onSearch={() => onSearch()}
                allowClear
                className=" search-box mt-1"
              />
            </div>
            <div className="col-3">
              <Select
                options={RECOMMENDATION_OPTIONS}
                defaultValue={"1"}
                onSelect={(e) => setOptions(parseInt(e))}
              />
            </div>
          </div>

          {RecommendationsFetching && initialLoad ? (
            <center>
              <br />
              <br />
              <Spin />
            </center>
          ) : !Object.keys(Recommendations)?.length ? (
            <>
              <br />
              <br />
              <div className="row rec-outer2">
                <div className="col-5">
                  <img src="/assets/tips.png" className="img-fluid" />
                </div>
                <div className="col-7">
                  <i>
                    <span style={{ color: "white" }}>
                      You can find your recommended conferences or journals to
                      publish your research papers. You can find those by title,
                      abstract or keywords. Enter your desired way and find your
                      results. Good luck.{" "}
                    </span>
                  </i>
                </div>
              </div>
              <div className="row rec-outer2">
                <div className="col-5">
                  <i>
                    <span style={{ color: "white" }}>
                      Certainly! I can help you find recommended conferences or
                      journals to publish your research papers. Please provide
                      me with the title, abstract, or keywords related to your
                      research, and I will do my best to find suitable venues
                      for publication.
                    </span>
                  </i>
                </div>
                <div className="col-7">
                  <img src="/assets/bot.gif" className="img-fluid" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="search-result-action">
                <h5 className="search-result-text ">Search Results</h5>
              </div>
              <h5 className="rec-con-text"> 🌟 Recommended Conferences</h5>
              <PersonalizedCard
                arr={Recommendations?.topConferences}
                type={"Conferences"}
                isR={true}
                visible={visible}
                setVisible={setVisible}
                setCheck={setCheck}
              />
              <h5 className="rec-con-text"> 🌟 Recommended Journals</h5>
              <PersonalizedCard
                arr={Recommendations?.topJournals}
                type={"Journals"}
                isR={true}
                visible={visible}
                setVisible={setVisible}
                setCheck={setCheck}
              />
            </>
          )}
        </div>
        <ModalContainer
          title={
            check === "Conferences" ? "Conferences History" : "Journal History"
          }
          open={visible}
          onCancel={() => setVisible(false)}
          destroyOnClose={true}
          className="recommendation-modal"
          footer={false}
          bodyStyle={{
            // overflowY: "scroll",
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)",
          }}
          width={1250}
        >
          <TableContainer
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                ...GetColumnSearchProps("name", visible),
              },
              { title: "Publisher", dataIndex: "publisher" },
              { title: "Year", dataIndex: "year" },
            ]}
            dataSource={
              check === "Conferences"
                ? Recommendations?.ConferenceSuggestions?.map((el) => {
                    return {
                      ...el,
                      name: el?.title,
                      year: el?.year?.["date-parts"]?.[0]?.[0]
                        ? el?.year?.["date-parts"]?.[0]?.[0]
                        : "N/A",
                    };
                  })
                : Recommendations?.JournalSuggestions?.map((el) => {
                    return {
                      ...el,
                      name: el?.title,
                      year: el?.year?.["date-parts"]?.[0]?.[0]
                        ? el?.year?.["date-parts"]?.[0]?.[0]
                        : "N/A",
                    };
                  })
            }
          />
        </ModalContainer>
        <ModalContainer
          title="Upcoming Conferences - Based on your interests"
          open={openUpcomings}
          onCancel={() => setOpenUpcomings(false)}
          className="recommendation-modal"
          footer={false}
          width={1000}
        >
          <div className="badge rounded-pill">
            ⚠️ <u>Note:</u>{" "}
            <i>May produce inaccurate information about conferences.</i>{" "}
            <u
              style={{ color: "yellow" }}
              className="cursor"
              onClick={() =>
                dispatch(upcomings({ interests: decodedToken.interests }))
              }
            >
              Retry
            </u>
          </div>
          <br />
          <br />
          {upcomingsTxtFetching ? (
            <center>
              <Spin />
            </center>
          ) : (
            <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
          )}
        </ModalContainer>
      </div>
    </div>
  );
};

export default Recommendations;
