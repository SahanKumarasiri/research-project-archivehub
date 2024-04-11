import React from "react";

const Category = ({ publicationsData }) => {
  return (
    <div>
      <h1 className="h1">{publicationsData?.[0]}</h1>
      {publicationsData?.[1]?.map((ele, index) => (
        <div
          key={index}
          className="inner-card5 mt-3"
          onClick={() => window.open(ele?.link)}
        >
          <h6 className="position-relative inner-card5-text1">
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              {publicationsData?.[0]}
            </span>
            <br />
            {ele?.title}
            <br />
            <br />
            {typeof ele?.authors === "string" ? (
              <p className="badge rounded-pill bg-dark">{ele?.authors}</p>
            ) : (
              ele?.authors
                ?.filter((el) => el !== "...")
                ?.map((el) => (
                  <p className="badge rounded-pill bg-dark">{el}</p>
                ))
            )}
            <br />
            <p className="badge bg-light text-dark">{ele?.publication_year}</p>
            &nbsp;&nbsp;&nbsp;
            <p className="badge bg-secondary">
              Cited By Count: {ele?.cited_by_count}
            </p>
          </h6>
        </div>
      ))}
    </div>
  );
};

export default Category;
