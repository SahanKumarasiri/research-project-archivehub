import { Spin } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//private route logic
const PrivateRoute = ({ children, userType }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const data = useSelector((state) => state?.auth?.login?.data?.data || {});

  if (!Object.keys(data)?.length) {
    return (
      <>
        {loading ? (
          <center>
            <div style={{ marginTop: "200px" }}>
              <h2 style={{ color: "red" }}>Unauthorized Access Detected.</h2>
              <h2 style={{ color: "gray" }}>Rolling back to the Login...</h2>
              <Spin size="large" />
            </div>
          </center>
        ) : (
          <Navigate to="/login" />
        )}
      </>
    ); //if user not login or not authorized to the restricted routes, it may be navigated to the login
  } else if (userType === "ADMIN") {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default PrivateRoute;
