const { dbHelper, nodeMailerHelper, headers } = require("./utils/helper");
const jwt = require("jsonwebtoken");
const { sendResponseHelper } = require("./utils/responseHelper");
const { ET_05 } = require("./templates/ET_05");

exports.handle = async (event) => {
  const authToken = event.headers.Authorization;
  const { users, type, token = null } = JSON.parse(event.body);

  let decodedToken = null;
  if (authToken) {
    decodedToken = jwt.decode(authToken?.split("Bearer ")[1]);
  } else {
    decodedToken = jwt.decode(token);
  }

  if (!authToken && type === "DEACTIVATE")
    return sendResponseHelper(401, "Invalid Token");
  else if (!decodedToken?.authorized && type === "DEACTIVATE")
    return sendResponseHelper(401, "Not Authorized!!!");

  try {
    await dbHelper()
      .update({
        TableName: "usersTable",
        Key: {
          email: decodedToken?.email,
        },
        UpdateExpression: "SET deactivated = :deactivated, network = :network",
        ExpressionAttributeValues: {
          ":deactivated": type === "DEACTIVATE" ? true : false,
          ":network": users,
        },
      })
      .promise();

    await dbHelper()
      .update({
        TableName: "grantsTable",
        Key: {
          userId: decodedToken?.userId,
        },
        UpdateExpression: "SET deactivated = :deactivated",
        ExpressionAttributeValues: {
          ":deactivated": type === "DEACTIVATE" ? true : false,
        },
      })
      .promise();

    if (users?.length) {
      for (const id of users) {
        const checkConfirmation = (
          await dbHelper().scan({ TableName: "confirmationTable" }).promise()
        )?.Items?.filter((el) => el?.userId === decodedToken?.userId);

        const checkConnection = (
          await dbHelper().scan({ TableName: "connectionsTable" }).promise()
        )?.Items?.filter((el) => el?.userId === decodedToken?.userId);

        if (checkConfirmation?.length) {
          await dbHelper()
            .update({
              TableName: "confirmationTable",
              Key: {
                userId: decodedToken?.userId,
                connectedWith: id,
              },
              UpdateExpression: "SET deactivated = :deactivated",
              ExpressionAttributeValues: {
                ":deactivated": type === "DEACTIVATE" ? true : false,
              },
              ReturnValues: "ALL_NEW",
            })
            .promise();
        } else {
          await dbHelper()
            .update({
              TableName: "confirmationTable",
              Key: {
                userId: id,
                connectedWith: decodedToken?.userId,
              },
              UpdateExpression: "SET deactivated = :deactivated",
              ExpressionAttributeValues: {
                ":deactivated": type === "DEACTIVATE" ? true : false,
              },
              ReturnValues: "ALL_NEW",
            })
            .promise();
        }
        if (checkConnection?.length) {
          await dbHelper()
            .update({
              TableName: "connectionsTable",
              Key: {
                userId: decodedToken?.userId,
                connectedWith: id,
              },
              UpdateExpression: "SET deactivated = :deactivated",
              ExpressionAttributeValues: {
                ":deactivated": type === "DEACTIVATE" ? true : false,
              },
              ReturnValues: "ALL_NEW",
            })
            .promise();
        } else {
          await dbHelper()
            .update({
              TableName: "connectionsTable",
              Key: {
                userId: id,
                connectedWith: decodedToken?.userId,
              },
              UpdateExpression: "SET deactivated = :deactivated",
              ExpressionAttributeValues: {
                ":deactivated": type === "DEACTIVATE" ? true : false,
              },
              ReturnValues: "ALL_NEW",
            })
            .promise();
        }
      }

      const to = (
        await dbHelper().scan({ TableName: "usersTable" }).promise()
      )?.Items?.filter((el) => users?.includes(el?.userId))?.map(
        (el) => el?.email
      );

      await nodeMailerHelper({
        to,
        subject: `${
          type === "DEACTIVATE"
            ? "Account Deactivation Alert"
            : "Account Activation Alert"
        }`,
        text: ET_05(
          type,
          decodedToken?.email,
          `${decodedToken?.firstName} ${decodedToken?.lastName}`
        ),
      });
    }

    return sendResponseHelper(200, {
      message: `${type === "DEACTIVATE" ? "DEACTIVATED" : "ACTIVATED"}`,
    });
  } catch (error) {
    return sendResponseHelper(500, {
      message: `${
        type === "DEACTIVATION FAILED" ? "DEACTIVATED" : "ACTIVATION FAILED"
      }`,
      error,
    });
  }
};
