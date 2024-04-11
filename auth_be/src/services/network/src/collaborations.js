const jwt = require("jsonwebtoken");
const { sendResponseHelper } = require("./utils/responseHelper");
const { dbHelper, CHAT_S3_BASE_URL } = require("./utils/helper");
const { v4: uuid } = require("uuid");

exports.handle = async (event) => {
  const authToken = event.headers.Authorization;
  const {
    userId,
    collaboratorName = null,
    count = 0,
    url = "https://scholar.google.com/",
    photo = null,
    type = null,
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
    if (type === "create") {
      const params = {
        TableName: "collaborationsTable",
        Item: {
          id: uuid(),
          userId,
          collaboratorName,
          count,
          url,
          photo: photo
            ? CHAT_S3_BASE_URL + photo
            : "https://scholar.google.com/citations/images/avatar_scholar_56.png",
        },
      };

      await dbHelper().put(params).promise();

      return sendResponseHelper(200, "Collaborator Added.");
    } else {
      const params = {
        TableName: "collaborationsTable",
        IndexName: "userIdIndex",
        KeyConditionExpression: "#userId = :userId",
        ExpressionAttributeNames: {
          "#userId": "userId",
        },
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      };
      const result = await dbHelper().query(params).promise();
      return sendResponseHelper(200, result.Items);
    }
  } catch (error) {
    return sendResponseHelper(500, `Something went wrong... ${error}`);
  }
};
