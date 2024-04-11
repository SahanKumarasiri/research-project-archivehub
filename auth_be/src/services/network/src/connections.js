const { dbHelper } = require("./utils/helper");
const { sendResponseHelper } = require("./utils/responseHelper");
const jwt = require("jsonwebtoken");

exports.handle = async (event) => {
  const {
    userId,
    connectedWith,
    msg,
    type,
    firstName,
    lastName,
    imgURL,
    connectedUserInfo,
    action = false,
    confirmUserId = null,
    confirmNotifyUser = null,
    userInterests = null,
  } = JSON.parse(event.body);
  const authToken = event.headers.Authorization;

  if (!authToken) return sendResponseHelper(401, "Invalid Token");
  else if (!(await jwt.decode(authToken.split("Bearer ")[1])?.authorized))
    return sendResponseHelper(401, "Not Authorized!!!");

  const queryPa = {
    TableName: "connectionsTable",
    IndexName: "userIdIndex",
    KeyConditionExpression: "#userId = :userId",
    ExpressionAttributeNames: {
      "#userId": "userId",
    },
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };

  const queryPaSecondaryIndex = {
    TableName: "connectionsTable",
    IndexName: "connectedWithIndex",
    KeyConditionExpression: "#connectedWith = :connectedWith",
    ExpressionAttributeNames: {
      "#connectedWith": "connectedWith",
    },
    ExpressionAttributeValues: {
      ":connectedWith": connectedWith,
    },
  };

  const params = {
    TableName: "connectionsTable",
    Item: {
      userId,
      connectedWith,
      msg,
      firstName,
      lastName,
      requestedUserImgURL: imgURL,
      connectedUserInfo,
      userInterests,
    },
  };

  const updateParams = {
    TableName: "connectionsTable",
    Key: {
      userId,
      connectedWith,
    },
    UpdateExpression: "SET #status = :status, markedAsRead = :markedAsRead",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":status": action,
      ":markedAsRead": true,
    },
    ReturnValues: "ALL_NEW", // Change to 'NONE' if you don't need the updated item
  };

  if (type === "CONNECT") {
    try {
      await dbHelper()
        .put({
          ...params,
          Item: {
            ...params.Item,
            status: "PENDING",
            markedAsRead: false,
            deleted: false,
          },
        })
        .promise();
      const users = await dbHelper()
        .scan({ TableName: "connectionsTable" })
        .promise();
      return sendResponseHelper(200, {
        message: "Pending Approval",
        users: users.Items,
      });
    } catch (error) {
      return sendResponseHelper(500, { message: "Opperation Failed", error });
    }
  } else if (type === "GET") {
    try {
      const users = await dbHelper()
        .scan({ TableName: "connectionsTable" })
        .promise();
      return sendResponseHelper(200, {
        users: users.Items,
      });
    } catch (error) {
      return sendResponseHelper(500, { message: "Opperation Failed", error });
    }
  } else if (type === "NOTIFICATIONS") {
    try {
      const users = await dbHelper().query(queryPaSecondaryIndex).promise();
      return sendResponseHelper(200, {
        users: users.Items,
      });
    } catch (error) {
      return sendResponseHelper(500, { message: "Opperation Failed", error });
    }
  } else if (type === "UPDATE") {
    try {
      await dbHelper().update(updateParams).promise();
      const users = await dbHelper().query(queryPa).promise();
      await dbHelper()
        .put({
          TableName: "confirmationTable",
          Item: {
            userId: confirmUserId,
            connectedWith: confirmNotifyUser,
            msg,
            firstName,
            lastName,
            interests: userInterests,
            actionUserImgURL: imgURL,
            connectedUserInfo,
            status: action,
            deleted: false,
          },
        })
        .promise();
      return sendResponseHelper(200, {
        users: users.Items,
      });
    } catch (error) {
      return sendResponseHelper(500, {
        error,
      });
    }
  } else if (type === "GET_CONFIRMATION") {
    try {
      const users = await dbHelper()
        .scan({ TableName: "confirmationTable" })
        .promise();
      return sendResponseHelper(200, {
        users: users.Items,
      });
    } catch (error) {
      return sendResponseHelper(500, {
        error,
      });
    }
  } else {
    try {
      await dbHelper()
        .update({
          TableName: "confirmationTable",
          Key: {
            userId,
            connectedWith,
          },
          UpdateExpression: "SET markedAsRead = :markedAsRead",
          ExpressionAttributeValues: {
            ":markedAsRead": true,
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();
      const users = await dbHelper()
        .scan({ TableName: "confirmationTable" })
        .promise();
      return sendResponseHelper(200, {
        users: users.Items,
      });
    } catch (error) {
      return sendResponseHelper(500, {
        error,
      });
    }
  }
};
