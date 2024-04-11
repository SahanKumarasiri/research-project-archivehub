import { addDays, differenceInCalendarDays } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Grants.css";
import { Modal } from "antd";

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

export default ({ dates }) => {
  const [modal, contextHolder] = Modal.useModal();
  function tileClassName({ date, view }) {
    if (
      view === "month" &&
      dates.find(({ closedate }) => isSameDay(closedate, date))
    ) {
      return "highlight";
    }
  }

  const content = (el) => (
    <div className="row">
      <a
        className="text-white ps-4 position-relative"
        onClick={() => window.open(el?.additionalinformationurl)}
      >
        {el?.opportunitytitle}
      </a>
      <br /> <br />
      <p className="badge bg-light text-dark">Agency: {el?.agencyname}</p>
      <p className="badge bg-info text-dark">
        Award amount:{" "}
        {el?.awardfloor === 0 ||
        el?.awardfloor === 1 ||
        el?.awardfloor === "N/A"
          ? " To be discussed"
          : ` $${el?.awardfloor}`}
      </p>
    </div>
  );

  const onClickDay = (e) => {
    dates?.filter((el) => {
      if (isSameDay(el?.closedate, e)) {
        modal.info({
          title: "EVENT",
          content: content(el),
          okText: "OK",
          className: "app-modal",
          open: true,
          onOk: () => {},
        });
      }
    });
  };

  return (
    <>
      <Calendar
        className={"react-calendar"}
        tileClassName={tileClassName}
        //   tileContent={tileContent}
        onClickDay={onClickDay}
      />
      {contextHolder}
    </>
  );
};
