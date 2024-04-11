import { Button } from "antd";
import React from "react";

const NetworkError = () => {
  return (
    <div>
      <center>
        <img src="/assets/network-error.png" className="img-fluid" />
        <br />
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </center>
    </div>
  );
};

export default NetworkError;
