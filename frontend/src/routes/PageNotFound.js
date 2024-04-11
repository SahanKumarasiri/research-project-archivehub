import React from "react";
import "./404.css";

const PageNotFound = () => {
  return (
    <>
      <center>
        <br />
        <div class="text mt-5">
          <h1 className="h1">404 Error</h1>
          <h2 style={{ color: "cyan" }}>Couldn't launch :(</h2>
          <h3 style={{ color: "lightgreen" }}>
            Page Not Found - lets take you{" "}
            <a className="a" href="/">
              BACK
            </a>
          </h3>
        </div>
      </center>
    </>
  );
};

export default PageNotFound;
