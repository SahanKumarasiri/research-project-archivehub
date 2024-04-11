const { ET_04 } = require("./templates/ET_04");
const { dbHelper, nodeMailerHelper } = require("./utils/helper");
const { sendResponseHelper } = require("./utils/responseHelper");
const jwt = require("jsonwebtoken");
exports.handle = async (event) => {
  const { userName, userEmail, attachments, users, para, subject } = JSON.parse(
    event.body
  );
  const authToken = event.headers.Authorization;

  const email = userEmail;

  if (!authToken) return sendResponseHelper(401, "Invalid Token");
  else if (!(await jwt.decode(authToken.split("Bearer ")[1])?.authorized))
    return sendResponseHelper(401, "Not Authorized!!!");
  try {
    const to = (
      await dbHelper().scan({ TableName: "usersTable" }).promise()
    )?.Items?.filter((el) => users?.includes(el?.userId))?.map(
      (el) => el?.email
    );

    await nodeMailerHelper({
      to,
      subject: `Message from ${userName}`,
      text: ET_04(userName, attachments, para, subject, "receiver", to, email),
    });

    await nodeMailerHelper({
      to: userEmail,
      subject: "Preview Copy",
      text: ET_04(userName, attachments, para, subject, "sender", to, email),
    });

    return sendResponseHelper(200, {
      msg: "SENT",
    });
  } catch (error) {
    return sendResponseHelper(500, {
      error,
    });
  }
};
