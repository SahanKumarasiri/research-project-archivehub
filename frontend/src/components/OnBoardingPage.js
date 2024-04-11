import React, { useEffect, useState } from "react";
import "./styles/OnBoardingPage.css";
import { Button, Form, Input, Radio, Select, notification } from "antd";
import {
  ALREADY_EXISTS,
  ALREADY_VERIFIED_ACCOUNT,
  EMAIL_VALIDATION,
  EMPTY_FIELD_VALIDATION,
  POSITIONS,
  RADIO,
  VERIFICATION_FORM,
  WARNING_PROFILE,
} from "./helpers/Helper";
import { useDispatch, useSelector } from "react-redux";
import {
  checkProfile,
  clearOnboarding,
  clearProfile,
  clearVerifyAccount,
  onboardingUser,
  verifyAccount,
} from "../auth/authActions";
import { useNavigate } from "react-router-dom";
import ModalContainer from "./common/ModalContainer";
import VerifyAccountModal from "./common/VerifyAccountModal";

function OnBoardingPage() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [url, setUrl] = useState(null);
  const [position, setPosition] = useState(null);
  const [undergradSupervision, setUndergradSupervision] = useState(null);
  const [mscSupervision, setMscSupervision] = useState(null);
  const [phdSupervision, setPhdSupervision] = useState(null);
  const [chairInConferences, setChairInConferences] = useState(null);
  const [editorInJournals, setEditorInJournals] = useState(null);
  const [reviewerInJournals, setReviewerInJournals] = useState(null);
  const [reviewerInConferences, setReviewerInConferences] = useState(null);
  const [visible, setVisible] = useState(false);
  const [valid, setValid] = useState(false);
  const [visibleAccept, setVisibleAccept] = useState(false);
  const [verifyVisible, setVerifyVisible] = useState(false);
  const [alreadyVerifiedVisible, setAlreadyVerifiedVisible] = useState(false);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const verifyMsg = useSelector(
    (state) => state?.auth?.onboarding?.error?.message?.message || null
  );

  const exceptionOccured = useSelector(
    (state) => state?.auth?.onboarding?.error?.status || false
  );

  const fetching = useSelector(
    (state) => state?.auth?.onboarding?.fetching || false
  );

  const verifyAccountMsg = useSelector(
    (state) => state?.auth?.verifyAccount?.data?.data?.message || false
  );

  const onboardingMsg = useSelector(
    (state) => state?.auth?.onboarding?.data?.data?.message || null
  );

  const onboardingSuccess = useSelector(
    (state) => state?.auth?.onboarding?.success?.status || false
  );

  const checkProfileData = useSelector(
    (state) => state?.auth?.checkProfile?.data?.data || []
  );

  const checkProfileDataFetching = useSelector(
    (state) => state?.auth?.checkProfile?.fetching || false
  );

  useEffect(() => {
    if (valid) {
      if (verifyMsg && exceptionOccured) {
        notification.error({ message: verifyMsg, placement: "topRight" });
        setValid(false);
        dispatch(clearOnboarding());
        if (verifyMsg === ALREADY_EXISTS) setVerifyVisible(true);
        else if (verifyMsg === ALREADY_VERIFIED_ACCOUNT)
          setAlreadyVerifiedVisible(true);
      } else if (onboardingMsg && onboardingSuccess) {
        notification.success({ message: onboardingMsg, placement: "topRight" });
        navigation("/password-verify");
      }
    }
    return () => {
      dispatch(clearOnboarding());
      dispatch(clearProfile());
      dispatch(clearVerifyAccount());
    };
  }, [verifyMsg, onboardingSuccess]);

  useEffect(() => {
    if (checkProfileData?.title === WARNING_PROFILE) {
      setVisible(true);
      setValid(false);
    } else if (Object.keys(checkProfileData)?.length) {
      setVisible(false);
      setValid(true);
      dispatch(clearProfile());
      const name = checkProfileData?.name?.split(" ");
      dispatch(
        onboardingUser({
          userId: checkProfileData?.user_id,
          firstName: name?.[0],
          lastName: name?.slice(1)?.join(" "),
          email,
          needToReset: 1,
          institutionWebAddress: removeUrlPrefix(url),
          position,
          undergraduateSupervision: undergradSupervision,
          mscSupervision,
          mphilOrPhdSupervision: phdSupervision,
          chairInConferences,
          editorInJournals,
          reviewerInConferences,
          reviewerInJournals,
          interests: checkProfileData?.interests,
          imgURL: checkProfileData?.imgURL?.includes(
            "https://scholar.googleusercontent.com"
          )
            ? checkProfileData?.imgURL
            : `https://scholar.google.com${checkProfileData?.imgURL}`,
          affiliations: checkProfileData?.affiliations,
          citations: checkProfileData?.cited_by_count,
          verified: false,
        })
      );
    }
  }, [Object.keys(checkProfileData)?.length]);

  useEffect(() => {
    setVisibleAccept(true);
  }, []);

  useEffect(() => {
    if (verifyAccountMsg) {
      notification.success({
        message: verifyAccountMsg,
        placement: "topRight",
      });
      dispatch(clearVerifyAccount());
      setVerifyVisible(false);
      navigation("/");
      window.open(VERIFICATION_FORM);
    }
  }, [verifyAccountMsg]);

  const onSubmit = () => {
    if (form.validateFields()) {
      dispatch(
        checkProfile({ firstName, lastName, url: removeUrlPrefix(url) })
      );
    }
  };

  const verify = () => {
    dispatch(verifyAccount({ emailBy: email }));
  };

  const removeUrlPrefix = (string) => {
    const prefixes = ["https://", "http://", "www."];

    for (const prefix of prefixes) {
      if (string?.startsWith(prefix)) {
        string = string?.slice(prefix.length);
      }
    }
    return string?.toLowerCase();
  };

  return (
    <div className="container onboard-frame1">
      <div className="row justify-content-center ">
        <div className="col-md-9 onboaard-frame2">
          <h1 className="onboarding-process-text">
            <img
              src="/assets/onboarding.gif"
              width="30"
              height="30"
              className="me-1 logo"
              style={{ width: 70, height: 70 }}
            />
            <br />
            Onboarding Process
          </h1>

          <Form form={form} onFinish={onSubmit}>
            <div className="form-group row">
              <Form.Item className="col-sm-4">
                <label for="inputName" className="onboard-text-lable">
                  Your Name
                </label>
              </Form.Item>
              <Form.Item
                className="col-sm-4"
                name={"firstName"}
                rules={[EMPTY_FIELD_VALIDATION]}
              >
                <Input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                className="col-sm-4"
                name={"lastName"}
                rules={[EMPTY_FIELD_VALIDATION]}
              >
                <Input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="divider"></div>
            <div className="form-group row">
              <Form.Item className="col-sm-4">
                <label for="inputEmail" className="onboard-text-lable">
                  Email
                </label>
              </Form.Item>
              <Form.Item
                className="col-sm-8"
                name={"email"}
                rules={[EMPTY_FIELD_VALIDATION, EMAIL_VALIDATION]}
              >
                <Input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="divider"></div>
            <div className="form-group row">
              <Form.Item className="col-sm-4">
                <label for="inputWebAddress" className="onboard-text-lable">
                  Institutional Web Address - (Google Scholar Verified Email)
                </label>
              </Form.Item>
              <Form.Item
                className="col-sm-8"
                name={"url"}
                rules={[EMPTY_FIELD_VALIDATION]}
              >
                <Input
                  type="text"
                  className="form-control onboard-input"
                  id="inputWebAddress"
                  placeholder="Enter Web Address"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="divider"></div>
            <div className="form-group row">
              <Form.Item className="col-sm-4">
                <label
                  for="inputSelecPosition"
                  className="col-sm-4 onboard-text-lable"
                >
                  Position
                </label>
              </Form.Item>
              <Form.Item
                className="col-sm-8"
                name={"position"}
                rules={[EMPTY_FIELD_VALIDATION]}
              >
                <Select
                  id="exampleFormControlSelect2"
                  placeholder="Select Position"
                  onSelect={(e) => setPosition(e)}
                  options={POSITIONS}
                />
              </Form.Item>
            </div>
            <div className="divider"></div>
            <div className="form-group row">
              <Form.Item className="col-sm-4">
                <label for="inputSupervision" className="onboard-text-lable">
                  Undergraduate Supervision
                </label>
              </Form.Item>
              <div className="col-sm-8 check-input">
                <div className="form-check form-check-inline">
                  <Form.Item
                    name={"undergrad"}
                    rules={[EMPTY_FIELD_VALIDATION]}
                  >
                    <Radio.Group
                      options={RADIO}
                      onChange={(e) => setUndergradSupervision(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="form-group row">
              <Form.Item className="col-sm-4">
                <label for="inputMscSupervision" class="onboard-text-lable">
                  Msc Supervision
                </label>
              </Form.Item>
              <div className="col-sm-8 check-input">
                <div className="form-check form-check-inline">
                  <Form.Item name={"msc"} rules={[EMPTY_FIELD_VALIDATION]}>
                    <Radio.Group
                      options={RADIO}
                      onChange={(e) => setMscSupervision(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="form-group row">
              <Form.Item className="col-sm-4">
                <label for="inputSupervision" className="onboard-text-lable">
                  Mphil / PHD Supervision
                </label>
              </Form.Item>
              <div className="col-sm-8 check-input">
                <div className="form-check form-check-inline">
                  <Form.Item name={"phd"} rules={[EMPTY_FIELD_VALIDATION]}>
                    <Radio.Group
                      options={RADIO}
                      onChange={(e) => setPhdSupervision(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="form-group row">
              <Form.Item className="col-sm-4">
                <label for="inputSupervision" className="onboard-text-lable">
                  Chair in Conferences
                </label>
              </Form.Item>
              <div className="col-sm-8 check-input">
                <div className="form-check form-check-inline">
                  <Form.Item name={"chair"} rules={[EMPTY_FIELD_VALIDATION]}>
                    <Radio.Group
                      options={RADIO}
                      onChange={(e) => setChairInConferences(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="form-group row">
              <Form.Item className="col-sm-4">
                <label for="inputJournel" class=" onboard-text-lable">
                  Editor in Journals
                </label>
              </Form.Item>
              <div className="col-sm-8 check-input">
                <div className="form-check form-check-inline">
                  <Form.Item
                    name={"editor-journal"}
                    rules={[EMPTY_FIELD_VALIDATION]}
                  >
                    <Radio.Group
                      options={RADIO}
                      onChange={(e) => setEditorInJournals(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="form-group row">
              <Form.Item className="col-sm-4">
                <label for="inputReviewerCon" class=" onboard-text-lable">
                  Reviewer in Conferences
                </label>
              </Form.Item>
              <div className="col-sm-8 check-input">
                <div className="form-check form-check-inline">
                  <Form.Item
                    name={"reviewer-conf"}
                    rules={[EMPTY_FIELD_VALIDATION]}
                  >
                    <Radio.Group
                      options={RADIO}
                      onChange={(e) => setReviewerInConferences(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="form-group row">
              <Form.Item className="col-sm-4">
                <label for="inputReviewerCon" class=" onboard-text-lable">
                  Reviewer in Journals
                </label>
              </Form.Item>
              <div className="col-sm-8 check-input">
                <div className="form-check form-check-inline">
                  <Form.Item
                    name={"reviewer-journal"}
                    rules={[EMPTY_FIELD_VALIDATION]}
                  >
                    <Radio.Group
                      options={RADIO}
                      onChange={(e) => setReviewerInJournals(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="badge rounded-pill">
                  ⚠️ <u>Note:</u>{" "}
                  <i>
                    All fields are required.
                  </i>
                </div>
            <div className="actions">
              <Button
                className=" btn submit col-md-3"
                onClick={() => form.submit()}
                loading={fetching || checkProfileDataFetching}
              >
                <h5 className="submit-text">
                  {fetching || checkProfileDataFetching
                    ? "Verifying..."
                    : "SUBMIT"}
                </h5>
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <ModalContainer
        open={visible}
        onCancel={() => {
          setVisible(false);
          dispatch(clearProfile());
        }}
        footer={false}
        className="onboarding-modal"
      >
        <div>
          {checkProfileData?.title}
          <p>{checkProfileData?.message}</p>
        </div>
      </ModalContainer>
      <ModalContainer
        title={"ATTENTION"}
        open={visibleAccept}
        onCancel={() => {
          setVisibleAccept(false);
          navigation("/");
        }}
        bodyStyle={{
          // overflowY: "scroll",
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
        }}
        className="guidelines"
        footer={
          <Button
            className="submit col-md-3"
            onClick={() => {
              setVisibleAccept(false);
            }}
          >
            ACCEPT
          </Button>
        }
      >
        <div>
          <p>
            Welcome to Archivehub! Before you can start utilizing our platform,
            we require you to provide some essential details and familiarize
            yourself with the guidelines outlined below. Please review the
            information carefully and proceed accordingly.
          </p>
          <ul>
            <li>
              Publicly Available Data{" "}
              <p>
                Archivehub relies solely on publicly available data for its
                research ratings and maintenance. Please note that the accuracy
                and completeness of the information presented on the platform
                depend on the data sources and their reliability. As a user, you
                should be aware that there may be inherent risks associated with
                using publicly available data, such as potential inaccuracies or
                outdated information. It is essential to exercise critical
                thinking and cross-reference data whenever possible.
              </p>
            </li>
            <li>
              Acceptance of Risks
              <p>
                By proceeding with the onboarding process, you acknowledge and
                accept the risks associated with utilizing publicly available
                data on Archivehub. While we strive to provide a reliable and
                accurate platform, we cannot guarantee the absolute integrity or
                validity of the information presented. As a user, it is your
                responsibility to evaluate the data and exercise caution when
                making decisions based on the provided ratings and research
                information.
              </p>
            </li>
          </ul>
          <p>
            Please note that any misuse or inappropriate use of Archivehub's
            platform may result in penalties or account termination. We
            encourage all users to adhere to ethical research practices and
            maintain the highest standards of professional conduct.
          </p>
          <p>
            Thank you for joining Archivehub. By completing the onboarding
            process, you confirm that you have read and understood the
            information provided above.
          </p>
        </div>
      </ModalContainer>
      <VerifyAccountModal
        visible={verifyVisible}
        setVisible={setVerifyVisible}
        onOk={verify}
      />
      <ModalContainer
        open={alreadyVerifiedVisible}
        onCancel={() => setAlreadyVerifiedVisible(false)}
        className="guidelines"
        footer={false}
      >
        <center>
          <br />
          This account is already verified by ArchiveHub domain. You cannot
          create it anymore.{" "}
          <p>Any inquiry please email. (researcharchivehub@gmail.com)</p>
        </center>
      </ModalContainer>
    </div>
  );
}

export default OnBoardingPage;
