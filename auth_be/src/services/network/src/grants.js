const { dbHelper } = require("./utils/helper");
const { sendResponseHelper } = require("./utils/responseHelper");
const jwt = require("jsonwebtoken");

exports.handle = async (event) => {
  const authToken = event.headers.Authorization;
  const {
    userId,
    grantsData,
    type = null,
    notified = false,
  } = JSON.parse(event.body);
  if (!authToken) return sendResponseHelper(401, "Invalid Token");
  else if (!(await jwt.decode(authToken.split("Bearer ")[1])?.authorized))
    return sendResponseHelper(401, "Not Authorized!!!");

  const params = {
    TableName: "grantsTable",
    Item: {
      userId,
      grantsData,
      deleted: false,
    },
  };

  const updateParams = {
    TableName: "grantsTable",
    Key: {
      userId,
    },
    UpdateExpression: "SET notified = :notified",
    ExpressionAttributeValues: {
      ":notified": notified,
    },
    ReturnValues: "ALL_NEW", // Change to 'NONE' if you don't need the updated item
  };
  const queryParams = {
    TableName: "grantsTable",
    IndexName: "userIdIndex",
    KeyConditionExpression: "#userId = :userId",
    ExpressionAttributeNames: {
      "#userId": "userId",
    },
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };
  try {
    if (type === "UPDATE") {
      await dbHelper().update(updateParams).promise();
    } else if (
      type === "SAVE" &&
      !(await dbHelper().query(queryParams).promise()).Items[0]?.notified
    ) {
      await dbHelper().put(params).promise();
    } else {
    }
    const user = await dbHelper().query(queryParams).promise();
    return sendResponseHelper(200, {
      user: user.Items[0],
    });
  } catch (error) {
    return sendResponseHelper(500, {
      error,
    });
  }
};
