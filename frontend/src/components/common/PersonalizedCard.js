import { Empty, Spin } from "antd";
import React from "react";

const PersonalizedCard = ({ arr, type, isR, setCheck, setVisible }) => {
  if (!arr?.slice(0, 3)?.length && isR)
    return (
      <center>
        <Empty />
      </center>
    );
  return (
    <div>
      {!arr?.length ? (
        <>
          <center>
            <Spin />
          </center>
        </>
      ) : (
        <>
          {arr?.slice(0, 3)?.map((el, index) => (
            <div className="row rec-inner-card mb-3 mt-3" key={index}>
              <div className="col-9 rec-inner-card1 ">
                <h5 className="rec-inner-card-text1 ">{el?.[0]}</h5>
              </div>
              <div className="col-3 rec-con position-relative">
                {/* <div className={" rec-inner-card2"}>
                  <h5 className={"rec-inner-card-text2"}>{el?.[1]}</h5>
                </div> */}
                <span className="position-absolute top-50 start-100 translate-middle badge rounded-pill h1">
                  {/* {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"} */}
                </span>
              </div>
            </div>
          ))}
          {!isR && (
            <div className="row  ">
              <div className="col-md-12 p-column mt-3">
                <div className="rec-inner-card4 rec-outer1 p-3">
                  <h5 className="other-con-text">Other {type}</h5>
                  {arr?.slice(3, 6).map((el, index) => (
                    <div className="row mb-3" key={index}>
                      <div className="col-8 inner-text">{el?.[0]}</div>
                      {/* <div className="col-2 inner-text">:</div>
                      <div className="col-2 inner-text">{el?.[1]}</div> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {isR && (
        <div className="search-result-action">
          <button
            type="submit"
            class="show-pub-button col-5"
            onClick={() => {
              setVisible(true);
              setCheck(type);
            }}
          >
            <span className="search-result-text ">
              Show Publication History
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalizedCard;
