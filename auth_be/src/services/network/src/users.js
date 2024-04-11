const { dbHelper } = require("./utils/helper");
const { sendResponseHelper } = require("./utils/responseHelper");
const jwt = require("jsonwebtoken");

exports.handle = async (event) => {
  const authToken = event.headers.Authorization;
  const { type, profileData } = JSON.parse(event.body);

  const decodedToken = jwt.decode(authToken.split("Bearer ")[1]);

  if (!authToken) return sendResponseHelper(401, "Invalid Token");
  else if (!decodedToken?.authorized)
    return sendResponseHelper(401, "Not Authorized!!!");

  const params = {
    TableName: "usersTable",
  };

  try {
    if (type === "UPDATE") {
      const name = profileData.name.split(" ");
      await dbHelper()
        .update({
          ...params,
          TableName: "usersTable",
          Key: {
            email: decodedToken?.email,
          },
          UpdateExpression:
            "SET firstName = :firstName, lastName = :lastName, interests = :interests, citations = :citations, affiliations = :affiliations, imgURL = :imgURL",
          ExpressionAttributeValues: {
            ":firstName": name[0],
            ":lastName": name.slice(1).join(" "),
            ":interests": profileData.interests,
            ":citations": profileData.cited_by_count,
            ":affiliations": profileData.affiliations,
            ":imgURL": profileData?.imgURL?.includes(
              "https://scholar.googleusercontent.com"
            )
              ? profileData?.imgURL
              : `https://scholar.google.com${profileData?.imgURL}`,
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();
      return sendResponseHelper(200, { msg: "user updated" });
    } else {
      const result = await dbHelper().scan(params).promise();
      return sendResponseHelper(200, {
        result: result.Items.map((el) => {
          return {
            ...el,
            password: null,
          };
        }),
      });
    }
  } catch (error) {
    return sendResponseHelper(500, { error });
  }
};
