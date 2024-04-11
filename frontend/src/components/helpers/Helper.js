import jwt_decode from "jwt-decode";
import { GetColumnSearchProps } from "../common/Search";
import { UsergroupAddOutlined } from "@ant-design/icons";

export const EMPTY_FIELD_VALIDATION = Object.freeze({
  required: true,
  message: "Please fill the required fields",
});

export const EMAIL_VALIDATION = Object.freeze({
  //   required: true,
  type: "email",
  message: "The input is not valid E-mail!",
});

export const PATHS = Object.freeze({
  profile: "/profile",
  grants: "/grants",
  recommendations: "/recommendations",
});

export const POSITIONS = Object.freeze([
  { label: "Instructor", value: 1 },
  { label: "Assistant Lecturer", value: 2 },
  { label: "Lecturer", value: 3 },
  { label: "Senior Lecturer", value: 4 },
  { label: "Assistant Professor", value: 5 },
  { label: "Professor", value: 6 },
  { label: "Department Chair", value: 7 },
  { label: "Associate Dean", value: 8 },
  { label: "Dean", value: 9 },
  { label: "Provost", value: 10 },
]);

export const RADIO = Object.freeze([
  {
    label: "Yes",
    value: 1,
  },
  { label: "No", value: 0 },
]);

export const WARNING_PROFILE =
  "Oops! We could not create the profile. Please provide differrent names instead. Thank You.";

export const SESSION_TIMEOUT = (authToken) => {
  if (!authToken) return false;
  const decodedToken = jwt_decode(authToken);
  const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds

  return decodedToken.exp <= currentTimestamp;
};

export const VERIFICATION_FORM = "https://forms.gle/266mghN6FVwnzhsr9";

export const DECODED_TOKEN = (authToken) => {
  if (!authToken) return false;
  return jwt_decode(authToken);
};

export const ALREADY_EXISTS = "Account already exists";

export const ALREADY_VERIFIED_ACCOUNT =
  "Already have a verified account. You cannot create this account anymore.";

export const renameGrantsColumns = (column) => {
  switch (column) {
    case "opportunitytitle":
      return "Opporunity Title";
    case "additionalinformationoneligibility":
      return "Additional Information Eligibility";
    case "additionalinformationurl":
      return "Additional Information URL";
    case "agencyname":
      return "Agency Name";
    case "awardfloor":
      return "Award Amount";
    case "closedate":
      return "Closing Date";
    case "opportunitynumber":
      return "Opportunity Number";
    default:
      return;
  }
};

export const selelectedGrantsColumns = (column) =>
  column === "opportunitytitle" ||
  column === "additionalinformationoneligibility" ||
  column === "additionalinformationurl" ||
  column === "agencyname" ||
  column === "awardfloor" ||
  column === "closedate" ||
  column === "opportunitynumber";

export const FUNDING_CARD = (fundingRemakeData, index) => (
  <div
    key={index}
    className="inner-card p-3 mt-3"
    onClick={() => window.open(fundingRemakeData?.fundings?.[index]?.URL)}
  >
    <div className="row">
      <p className="text-white ps-4 position-relative">
        {fundingRemakeData?.fundings?.[index]?.Title}
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill h1">
          {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
        </span>
      </p>
    </div>
    <p className="badge bg-light text-dark">
      Award Type:{" "}
      {fundingRemakeData?.fundings?.[index]?.["Award Type"]
        ? fundingRemakeData?.fundings?.[index]?.["Award Type"]
        : "N/A"}
    </p>
    <br />
    <p className="badge bg-warning text-dark">
      Next due date:{" "}
      {fundingRemakeData?.fundings?.[index]?.["Next due date (Y-m-d)"]
        ? fundingRemakeData?.fundings?.[index]?.["Next due date (Y-m-d)"]
            ?.split(",")[0]
            .trim()
        : "N/A"}
    </p>
    &nbsp;&nbsp;
    <p className="badge bg-info text-dark">
      Posted date:{" "}
      {fundingRemakeData?.fundings?.[index]?.["Posted date (Y-m-d)"]
        ? fundingRemakeData?.fundings?.[index]?.["Posted date (Y-m-d)"]
            ?.split(",")[0]
            .trim()
        : "N/A"}
    </p>
  </div>
);

export const SEARCH_OPTIONS = Object.freeze([
  { label: "Title", value: "1" },
  { label: "Authors", value: "2" },
  { label: "Year", value: "3" },
]);

export const RECOMMENDATION_OPTIONS = Object.freeze([
  { label: "Title", value: "1" },
  { label: "Abstract", value: "2" },
  { label: "Keywords", value: "3" },
]);

export const removeDuplicates = (array, property) => {
  let seen = new Set();
  return array.filter((item) => {
    let propertyValue = item[property];
    if (!seen.has(propertyValue)) {
      seen.add(propertyValue);
      return true;
    }
    return false;
  });
};

export const SOMETHING_WENT_WRONG = {
  message: "Something went wrong.",
  placement: "topRight",
};

export const getUsers = (savedUserArray) => {
  return (
    <>
      {!savedUserArray?.length ? (
        <></>
      ) : (
        <>
          [
          {savedUserArray?.map((el) => (
            <span> {el.name} ,</span>
          ))}
          ]
        </>
      )}
    </>
  );
};

const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};

export const getYearsOfExperience = (publicationsData) => {
  let arr = [];
  for (const [outerIndex, cat] of publicationsData?.entries()) {
    for (const [innerIndex, article] of cat?.[1]?.entries())
      if (article?.publication_year !== "N/A") {
        arr.push(article?.publication_year);
      }
  }
  if (!arr.length) return 0;
  arr = arr.filter(onlyUnique);
  return new Date().getFullYear() - Math.min(...arr);
};

export const RATING_PAYLOAD = (
  user,
  publications,
  funding,
  profile,
  connection,
  collaborators
) =>
  Object.freeze({
    researcherData: {
      name: user?.firstName,
      position: user?.position,
      years_experience: getYearsOfExperience(publications?.articles),
      h_index: publications?.hIndex,
      publications: publications?.total,
      coauthors:
        publications?.["co-authors"]?.length || 0 + collaborators?.length,
      citations: profile?.cited_by_count ? profile?.cited_by_count : 0,
      industry_collaborations:
        publications?.["co-authors"]?.length +
        connection?.filter(
          (el) =>
            el?.status === "ACCEPTED" &&
            (el?.userId === user?.userId ||
              el?.connectedWith === user?.userId) &&
            !el?.deactivated &&
            !el?.deleted
        )?.length,
      funding_grants: funding?.matches ? funding?.matches : 0,
      undergraduate_supervisions: user?.undergraduateSupervision,
      msc_supervisions: user?.mscSupervision,
      phd_supervisions: user?.mphilOrPhdSupervision,
      chair_conferences: user?.chairInConferences,
      editor_journals: user?.editorInJournals,
      reviewer_conferences: user?.reviewerInConferences,
      reviewer_journals: user?.reviewerInJournals,
    },
  });

export const actionBtn = (
  connectionData,
  confirmation,
  decodedToken,
  record,
  remakeConnection,
  fromDisable = false
) => {
  let connectArr = [];
  let connectedArr = [];
  for (const x of connectionData) {
    if (x.msg.includes(`${decodedToken.firstName} ${decodedToken.lastName}`)) {
      connectArr.push(x);
    }
  }

  for (const x of confirmation) {
    if (x.msg.includes(`${decodedToken.firstName} ${decodedToken.lastName}`)) {
      connectedArr.push(x);
    }
  }
  let rowUser = [];
  for (const y of connectArr) {
    if (y.connectedWith === record.userId) {
      rowUser.push(y);
    }
  }
  for (const z of connectedArr) {
    if (z.connectedWith === record?.userId) {
      rowUser.push(z);
    }
  }
  return rowUser?.[0]?.status ? (
    rowUser?.[0]?.status
  ) : remakeConnection?.filter(
      (el) =>
        !el?.markedAsRead &&
        !el?.deactivated &&
        !el?.deleted &&
        record?.userId === el?.userId &&
        el?.connectedWith === decodedToken?.userId &&
        !(el?.msg?.includes("accepted") || el?.msg?.includes("rejected"))
    )?.length ? (
    remakeConnection?.find(
      (el) =>
        !el?.markedAsRead &&
        !el?.deactivated &&
        !el?.deleted &&
        record?.userId === el?.userId &&
        el?.connectedWith === decodedToken?.userId &&
        !(el?.msg?.includes("accepted") || el?.msg?.includes("rejected"))
    )?.status
  ) : fromDisable ? (
    false
  ) : (
    <>
      <UsergroupAddOutlined /> CONNECT
    </>
  );
};

export const networkColabCount = (resultArray, pName) => {
  return (
    resultArray?.find(({ name }) => name.includes(pName.split(" ").pop()))
      ?.count || 0
  );
};

export const STATIC_NO_1 = 1000023521;
export const STATIC_NO_2 = 2000023521;
