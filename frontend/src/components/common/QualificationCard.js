import React from "react";
import { DECODED_TOKEN } from "../helpers/Helper";

const QualificationCard = ({ token, previewUser }) => {
  const {
    undergraduateSupervision,
    mscSupervision,
    mphilOrPhdSupervision,
    chairInConferences,
    editorInJournals,
    reviewerInConferences,
    reviewerInJournals,
  } = token ? DECODED_TOKEN(token) : previewUser;

  return (
    <div className="qualification-card">
      {undergraduateSupervision ? (
        <h5 className="qualification-text text-start">
          Undergraduate Supervision{" "}
          <span className="position-relative top-0 start-60 translate-middle badge  rounded-pill">
            {" "}
            ⭐
          </span>{" "}
        </h5>
      ) : (
        <></>
      )}
      {mscSupervision ? (
        <h5 className="qualification-text text-start">
          Msc. Supervision{" "}
          <span className="position-relative top-0 start-60 translate-middle badge  rounded-pill">
            {" "}
            ⭐
          </span>{" "}
        </h5>
      ) : (
        <></>
      )}

      {mphilOrPhdSupervision ? (
        <h5 className="qualification-text text-start">
          Mphil or Phd Supervision{" "}
          <span className="position-relative top-0 start-60 translate-middle badge  rounded-pill">
            {" "}
            ⭐
          </span>{" "}
        </h5>
      ) : (
        <></>
      )}
      {chairInConferences ? (
        <h5 className="qualification-text text-start">
          Chair in Conferences{" "}
          <span className="position-relative top-0 start-60 translate-middle badge  rounded-pill">
            {" "}
            ⭐
          </span>{" "}
        </h5>
      ) : (
        <></>
      )}
      {editorInJournals ? (
        <h5 className="qualification-text text-start">
          Editor in Journals{" "}
          <span className="position-relative top-0 start-60 translate-middle badge  rounded-pill">
            {" "}
            ⭐
          </span>{" "}
        </h5>
      ) : (
        <></>
      )}
      {reviewerInConferences ? (
        <h5 className="qualification-text text-start">
          Reviewer in Conferences{" "}
          <span className="position-relative top-0 start-60 translate-middle badge  rounded-pill">
            {" "}
            ⭐
          </span>{" "}
        </h5>
      ) : (
        <></>
      )}
      {reviewerInJournals ? (
        <h5 className="qualification-text text-start">
          Reviewer in Journals{" "}
          <span className="position-relative top-0 start-60 translate-middle badge  rounded-pill">
            {" "}
            ⭐
          </span>{" "}
        </h5>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QualificationCard;
