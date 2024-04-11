import React, { useState } from "react";
import "./styles/Home.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import ModalContainer from "./common/ModalContainer";
import { useSelector } from "react-redux";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigate();
  const data = useSelector((state) => state?.auth?.login?.data?.data || {});

  return (
    <div className="home-bg">
      <div className="bg-image ">
        <div className="container home-frame">
          <div className="row home">
            <div className="col-md-9">
              <h1 className="heading col-md-10">
                {" "}
                Empowering Academic Excellence and Collaboration
              </h1>
              <p className="home-p pt-3 col-md-10">
                ArchiveHub is a comprehensive web-based platform designed to
                empower academic excellence and foster collaboration among
                researchers. Our innovative platform provides a centralized hub
                for researchers to maintain and showcase their profiles, access
                funding and grant information, and connect with relevant
                conferences and journals. With intelligent algorithms and
                predictive analytics, ArchiveHub simplifies the process of
                summarizing funding data, predicting suitable publication venues
                based on research content, and establishing fair and transparent
                rating mechanisms for researchers. By automating the creation of
                personalized research profiles, ArchiveHub streamlines the
                visibility and impact of researchers' work, facilitating greater
                collaboration opportunities and advancing the research
                ecosystem. <br />
                <br />
                Join ArchiveHub today and unlock the potential of your
                research career.
              </p>
              <div className="row ">
                <div class="col-md-3 pt-3">
                  <Button
                    type="submit"
                    className="btn  get-strated-btn col-md-2"
                    onClick={() => {
                      if (Object.keys(data)?.length) {
                        setVisible(true);
                      } else navigation("/onboarding");
                    }}
                  >
                    <h5 className="get-strated-text">GET STARTED</h5>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalContainer
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        className="home-modal"
      >
        {" "}
        <center>
          You are already logged in. Please logout first and try again.
        </center>
      </ModalContainer>
    </div>
  );
};

export default Home;
