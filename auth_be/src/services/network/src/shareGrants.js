const jwt = require("jsonwebtoken");
const { sendResponseHelper } = require("./utils/responseHelper");
const { dbHelper, nodeMailerHelper } = require("./utils/helper");
const { ET_07 } = require("../../../templates/ET_07");

exports.handle = async (event) => {
  const authToken = event.headers.Authorization;
  const {
    ids,
    userName,
    affliations,
    grants,
    customEmailArr = [],
  } = JSON.parse(event.body);

  let decodedToken = null;
  if (authToken) {
    decodedToken = jwt.decode(authToken?.split("Bearer ")[1]);
  } else {
    decodedToken = jwt.decode(token);
  }

  if (!decodedToken?.authorized && type === "DEACTIVATE")
    return sendResponseHelper(401, "Not Authorized!!!");

  try {
    let to = (
      await dbHelper().scan({ TableName: "usersTable" }).promise()
    )?.Items?.filter((el) => ids?.includes(el?.userId))?.map((el) => el?.email);
    to = [...to, ...customEmailArr];
    await nodeMailerHelper({
      to,
      subject: `Share Grants from ${userName}`,
      text: ET_07(userName, affliations, grants),
    });
    return sendResponseHelper(200, {
      msg: "SENT",
    });
  } catch (error) {
    return sendResponseHelper(500, `Something went wrong... ${error}`);
  }
};
