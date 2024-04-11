import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import WordCloudComponent from "../common/WordCloud";
import { Button, Rate, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getPreviewCollaborators,
  previewProfile,
  previewPublications,
  previewUserFundingDetails,
  previewUserRatingDetails,
} from "../../auth/authActions";
import { DECODED_TOKEN, POSITIONS, RATING_PAYLOAD } from "../helpers/Helper";
import ProfileFeatures from "../common/ProfileFeatures";
import NetworkGraph from "../common/NetworkGraph";
import QualificationCard from "../common/QualificationCard";
import Typewriter from "typewriter-effect";

const ProfilePreview = ({ previewUser }) => {
  const dispatch = useDispatch();
  const [fundingRemakeData, setFundingRemakeData] = useState([]);
  const [filterationData, setFilterationData] = useState([]);

  const authToken = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || null
  );

  const previewProfileData = useSelector(
    (state) => state?.auth?.previewProfile?.data?.data || []
  );

  const previewProfileDataSuccess = useSelector(
    (state) => state?.auth?.previewProfile?.success?.status || false
  );

  const previewPublicationsData = useSelector(
    (state) => state?.auth?.previewPublications?.data?.data || {}
  );

  const previewUserFundingData = useSelector(
    (state) => state?.auth?.previewUserFunding?.data?.data || null
  );

  const previewUserRatingScore = useSelector(
    (state) => state?.auth?.previewUserRating?.data?.data || null
  );

  const connectionData = useSelector(
    (state) => state?.auth?.connection?.data?.data?.users || []
  );

  const collaboratorsPreviewData = useSelector(
    (state) => state?.auth?.getPreviewCollaborators?.data?.data || []
  );

  useEffect(() => {
    if (Object.keys(previewUser)?.length) {
      dispatch(previewProfile(previewUser));
      dispatch(getPreviewCollaborators({ userId: previewUser.userId }));
    }
  }, [Object.keys(previewUser)?.length]);

  useEffect(() => {
    if (previewProfileDataSuccess)
      dispatch(previewPublications({ ...previewUser, token: authToken }));
    dispatch(
      previewUserFundingDetails({ ...previewUser, type: "PERSONALIZED" })
    );
  }, [previewProfileDataSuccess]);

  useEffect(() => {
    if (previewUserFundingData?.length)
      setFundingRemakeData(
        JSON.parse(previewUserFundingData?.replace(/NaN/g, null))
      );
  }, [previewUserFundingData?.length]);

  useEffect(() => {
    if (
      (fundingRemakeData?.fundings?.length ||
        Array.isArray(fundingRemakeData)) &&
      Object.keys(previewPublicationsData)?.length
    )
      dispatch(
        previewUserRatingDetails(
          RATING_PAYLOAD(
            previewUser,
            previewPublicationsData,
            fundingRemakeData,
            previewProfileData,
            connectionData,
            collaboratorsPreviewData
          )
        )
      );
  }, [
    fundingRemakeData?.fundings?.length || Array.isArray(fundingRemakeData),
    Object.keys(previewPublicationsData)?.length,
  ]);

  useEffect(() => {
    if (Object.keys(previewPublicationsData)?.length) {
      const arr = [];
      for (const article of previewPublicationsData?.articles) {
        arr.push(...article?.[1]);
      }
      setFilterationData(arr);
    }
  }, [Object.keys(previewPublicationsData)?.length]);

  let names = [];
  filterationData.map(({ authors }) => names.push(...authors));

  const nameCount = {};

  names.forEach((name) => {
    nameCount[name] = (nameCount[name] || 0) + 1;
  });

  const resultArray = Object.keys(nameCount).map((name) => {
    return { name: name, count: nameCount[name] };
  });

  return (
    <div className="container">
      <div className="row profile-row ">
        <div className="col-md-4 p-column">
          <div className="profile-outer-card p-3">
            <div className="content">
              <img
                src={`${
                  previewProfileData?.imgURL
                    ? previewProfileData?.imgURL
                    : "/assets/user.png"
                }`}
                alt=""
                className="profile-photo mt-3 rounded-circle"
              />
              <h3 className="p-name position-relative mt-2">
                {previewProfileData?.name ? previewProfileData?.name : "User"}
                {DECODED_TOKEN(authToken)?.verified && (
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
                        (el) => el?.value === previewUser?.position
                      )?.label,
                      previewProfileData?.affiliations,
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
                {previewProfileData?.cited_by_count
                  ? previewProfileData?.cited_by_count
                  : 0}
              </h5>
            </div>
            <div className="inner-card1 inner-card2 row">
              <h5 className="col-8 inner-card1-text1">h-index</h5>
              <h5 className="col-4 inner-card1-text1 inner-card1-text2">
                {previewPublicationsData?.hIndex}
              </h5>
            </div>

            <h5 className="interest-text ">Research Interests</h5>
            <div className="interest-card">
              <WordCloudComponent from={"preview"} />
            </div>
            <h5 className="interest-text">Qualifications</h5>
            <QualificationCard previewUser={previewUser} />
          </div>
        </div>
        <div className="col-md-8 p-column">
          <div className="profile-outer-card card2 p-4">
            <div className="inner-card3 mt-2">
              <h6 className="col-12 inner-card3-text1">
                Rating score :{" "}
                <span>
                  {previewUserRatingScore ? previewUserRatingScore : 0} / 10
                </span>{" "}
                <Rate
                  disabled
                  value={previewUserRatingScore ? previewUserRatingScore : 0}
                  count={10}
                  allowHalf={true}
                />
              </h6>
            </div>
            <div className="inner-card4 mt-4 position-relative">
              <h3 className="inner-card4-text1 mt-3">
                Industry Collaboration Network{" "}
              </h3>

              <div>
                <NetworkGraph
                  data={previewPublicationsData}
                  profileURL={
                    previewProfileData?.imgURL?.includes(
                      "https://scholar.googleusercontent.com"
                    )
                      ? previewProfileData?.imgURL
                      : `https://scholar.google.com${previewProfileData?.imgURL}`
                  }
                  profile={"preview"}
                  previewUser={previewUser}
                  resultArray={resultArray}
                />
              </div>
            </div>
            <div className="inner-card3 mt-3">
              <h6 className="col-9 inner-card3-text1 published-paper">
                Published Research Papers:{" "}
                {previewPublicationsData?.total
                  ? previewPublicationsData?.total
                  : 0}
              </h6>
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
              </div>
              Featured{" "}
            </div>
            {Object.keys(previewPublicationsData)?.length ? (
              <ProfileFeatures
                publicationsData={previewPublicationsData?.articles}
              />
            ) : (
              <center>
                <Spin />
              </center>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
