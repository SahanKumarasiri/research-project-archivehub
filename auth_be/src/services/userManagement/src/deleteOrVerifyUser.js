const { ET_05 } = require("./templates/ET_05");
const { ET_06 } = require("./templates/ET_06");
const { dbHelper, nodeMailerHelper } = require("./utils/helper");
const { sendResponseHelper } = require("./utils/responseHelper");
const jwt = require("jsonwebtoken");

exports.handle = async (event) => {
  const { userId, type, email, firstName, lastName, imgURL } = JSON.parse(
    event.body
  );
  const authToken = event.headers.Authorization;

  const decodedToken = jwt.decode(authToken.split("Bearer ")[1]);

  if (!authToken) return sendResponseHelper(401, "Invalid Token");
  else if (!decodedToken?.authorized)
    return sendResponseHelper(401, "Not Authorized!!!");

  try {
    const userResult = await dbHelper()
      .query({
        TableName: "usersTable",
        IndexName: "userIdindex",
        KeyConditionExpression: "#userId = :userId",
        ExpressionAttributeNames: {
          "#userId": "userId",
        },
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
      .promise();
    if (!userResult.Items.length) {
      return sendResponseHelper(400, "User Doesn't exist");
    }

    const users = await dbHelper().scan({ TableName: "usersTable" }).promise();
    const to = users?.Items.filter((el) => el.userId !== userId).map(
      (el) => el.email
    );

    if (type === "VERIFY") {
      await dbHelper()
        .update({
          TableName: "usersTable",
          Key: {
            email,
          },
          UpdateExpression: "SET #verified = :verified",
          ExpressionAttributeNames: {
            "#verified": "verified",
          },
          ExpressionAttributeValues: {
            ":verified": true,
          },
        })
        .promise();

      await nodeMailerHelper({
        to: email,
        subject: "Verification Completed",
        text: ET_06(firstName, lastName, imgURL, "my"),
      });
      await nodeMailerHelper({
        to,
        subject: "New Member Alert !!!",
        text: ET_06(firstName, lastName, imgURL, "network"),
      });
      return sendResponseHelper(200, "User successfully verified.");
    } else if (type === "DELETE" || type === "RESTORE") {
      await dbHelper()
        .update({
          TableName: "usersTable",
          Key: {
            email,
          },
          UpdateExpression: "SET #deleted = :deleted",
          ExpressionAttributeNames: {
            "#deleted": "deleted",
          },
          ExpressionAttributeValues: {
            ":deleted": type === "DELETE" ? true : false,
          },
        })
        .promise();
      await dbHelper()
        .update({
          TableName: "grantsTable",
          Key: {
            userId,
          },
          UpdateExpression: "SET deleted = :deleted",
          ExpressionAttributeValues: {
            ":deleted": type === "DELETE" ? true : false,
          },
        })
        .promise();
      const checkConfirmation1 = (
        await dbHelper().scan({ TableName: "confirmationTable" }).promise()
      )?.Items?.filter((el) => el?.userId === userId);
      const checkConfirmation2 = (
        await dbHelper().scan({ TableName: "confirmationTable" }).promise()
      )?.Items?.filter((el) => el?.connectedWith === userId);

      const checkConnection1 = (
        await dbHelper().scan({ TableName: "connectionsTable" }).promise()
      )?.Items?.filter((el) => el?.userId === userId);

      const checkConnection2 = (
        await dbHelper().scan({ TableName: "connectionsTable" }).promise()
      )?.Items?.filter((el) => el?.connectedWith === userId);

      const arr = [];

      if (checkConfirmation1?.length) {
        for (const row of checkConfirmation1) {
          await dbHelper()
            .update({
              TableName: "confirmationTable",
              Key: {
                userId,
                connectedWith: row?.connectedWith,
              },
              UpdateExpression: "SET deleted = :deleted",
              ExpressionAttributeValues: {
                ":deleted": type === "DELETE" ? true : false,
              },
              ReturnValues: "ALL_NEW",
            })
            .promise();
          arr.push(row.connectedWith);
        }
      }
      if (checkConfirmation2?.length) {
        for (const row of checkConfirmation2) {
          await dbHelper()
            .update({
              TableName: "confirmationTable",
              Key: {
                userId: row?.userId,
                connectedWith: userId,
              },
              UpdateExpression: "SET deleted = :deleted",
              ExpressionAttributeValues: {
                ":deleted": type === "DELETE" ? true : false,
              },
              ReturnValues: "ALL_NEW",
            })
            .promise();
          arr.push(row.userId);
        }
      }
      if (checkConnection1?.length) {
        for (const row of checkConnection1) {
          await dbHelper()
            .update({
              TableName: "connectionsTable",
              Key: {
                userId,
                connectedWith: row?.connectedWith,
              },
              UpdateExpression: "SET deleted = :deleted",
              ExpressionAttributeValues: {
                ":deleted": type === "DELETE" ? true : false,
              },
              ReturnValues: "ALL_NEW",
            })
            .promise();
          arr.push(row.connectedWith);
        }
      }
      if (checkConnection2?.length) {
        for (const row of checkConnection2) {
          await dbHelper()
            .update({
              TableName: "connectionsTable",
              Key: {
                userId: row?.userId,
                connectedWith: userId,
              },
              UpdateExpression: "SET deleted = :deleted",
              ExpressionAttributeValues: {
                ":deleted": type === "DELETE" ? true : false,
              },
              ReturnValues: "ALL_NEW",
            })
            .promise();
          arr.push(row.userId);
        }
      }
      await nodeMailerHelper({
        to: email,
        subject: `${
          type === "DELETE" ? "Account Deletion Alert" : "Account Restore Alert"
        }`,
        text: ET_05(type, email, `${firstName} ${lastName}`, "my"),
      });

      if (arr.length) {
        await nodeMailerHelper({
          to: users?.Items.filter((el) => el.userId !== userId)
            ?.filter((el) => arr.includes(el.userId))
            .map((el) => el.email),
          subject: `${
            type === "DELETE"
              ? "Account Deletion Alert"
              : "Account Restore Alert"
          }`,
          text: ET_05(type, email, `${firstName} ${lastName}`, "network"),
        });
      }
    }
    return sendResponseHelper(200, "Success");
  } catch (error) {
    return sendResponseHelper(500, error);
  }
};
