import React from "react";

const PublicationsFilter = ({ filter, index }) => {
  return (
    <div>
      <div
        key={index}
        className="inner-card5 mt-3"
        onClick={() => window.open(filter?.link)}
      >
        <h6 className="position-relative inner-card5-text1">
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
            {filter?.category}
          </span>
          <br />
          {filter?.title}
          <br />
          <br />
          {typeof filter?.authors === "string" ? (
            <p className="badge rounded-pill bg-dark">{filter?.authors}</p>
          ) : (
            filter?.authors
              ?.filter((el) => el !== "...")
              ?.map((el) => <p className="badge rounded-pill bg-dark">{el}</p>)
          )}
          <br />
          <p className="badge bg-light text-dark">{filter?.publication_year}</p>
          &nbsp;&nbsp;&nbsp;
          <p className="badge bg-secondary">
            Cited By Count: {filter?.cited_by_count}
          </p>
        </h6>
      </div>
    </div>
  );
};

export default PublicationsFilter;
