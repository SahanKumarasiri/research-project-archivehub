import React from "react";

const ProfileFeatures = ({ publicationsData }) => {
  return (
    <div>
      {Array.from(
        {
          length:
            Object.keys(publicationsData)?.length < 3
              ? Object.keys(publicationsData)?.length
              : 3,
        },
        (_, index) => (
          <div
            key={index}
            className="inner-card5 mt-3"
            onClick={() =>
              window.open(publicationsData?.[index]?.[1]?.[0]?.link)
            }
          >
            <h6 className="position-relative inner-card5-text1">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                {publicationsData?.[index]?.[0]}
              </span>
              <br />
              {publicationsData?.[index]?.[1]?.[0]?.title}
              <br />
              <br />
              {typeof publicationsData?.[index]?.[1]?.[0]?.authors ===
              "string" ? (
                <p className="badge rounded-pill bg-dark">
                  {publicationsData?.[index]?.[1]?.[0]?.authors}
                </p>
              ) : (
                publicationsData?.[index]?.[1]?.[0]?.authors
                  ?.filter((el) => el !== "...")
                  ?.map((el) => (
                    <p className="badge rounded-pill bg-dark">{el}</p>
                  ))
              )}
              <br />
              <p className="badge bg-light text-dark">
                {publicationsData?.[index]?.[1]?.[0]?.publication_year}
              </p>
              &nbsp;&nbsp;&nbsp;
              <p className="badge bg-secondary">
                Cited By Count:{" "}
                {publicationsData?.[index]?.[1]?.[0]?.cited_by_count}
              </p>
            </h6>
          </div>
        )
      )}
    </div>
  );
};

export default ProfileFeatures;
