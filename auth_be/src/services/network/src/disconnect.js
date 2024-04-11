const jwt = require("jsonwebtoken");
const { sendResponseHelper } = require("./utils/responseHelper");
const { dbHelper } = require("./utils/helper");

exports.handle = async (event) => {
  const authToken = event.headers.Authorization;
  const { userId, connectedWith } = JSON.parse(event.body);

  let decodedToken = null;
  if (authToken) {
    decodedToken = jwt.decode(authToken?.split("Bearer ")[1]);
  } else {
    decodedToken = jwt.decode(token);
  }

  if (!decodedToken?.authorized && type === "DEACTIVATE")
    return sendResponseHelper(401, "Not Authorized!!!");

  try {
    const connectedQParams = {
      TableName: "connectionsTable",
      Key: {
        userId,
        connectedWith,
      },
    };
    const connectedRParams = {
      TableName: "connectionsTable",
      Key: {
        userId: connectedWith,
        connectedWith: userId,
      },
    };

    await dbHelper().delete(connectedQParams).promise();
    await dbHelper().delete(connectedRParams).promise();

    const confrimationQParams = {
      TableName: "confirmationTable",
      Key: {
        userId,
        connectedWith,
      },
    };
    const confrimationRParams = {
      TableName: "confirmationTable",
      Key: {
        userId: connectedWith,
        connectedWith: userId,
      },
    };

    await dbHelper().delete(confrimationQParams).promise();
    await dbHelper().delete(confrimationRParams).promise();

    return sendResponseHelper(200, "Successfully disconnected.");
  } catch (error) {
    return sendResponseHelper(500, `Something went wrong... ${error}`);
  }
};