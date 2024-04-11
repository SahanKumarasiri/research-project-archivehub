const { ET_02 } = require("./templates/ET_02");
const {
  dbHelper,
  emailHelper,
  generateTokenHelper,
  nodeMailerHelper,
  REACT_APP_URL,
} = require("./utils/helper");
const { sendResponseHelper } = require("./utils/responseHelper");

// Lambda function to handle the password reset process
exports.handle = async (event) => {
  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body);

    // Extract the user's email from the request body
    const { email } = requestBody;

    // Check if the email exists in DynamoDB
    const existingUserParams = {
      TableName: "usersTable",
      IndexName: "emailIndex",
      KeyConditionExpression: "#email = :email",
      FilterExpression: "#deleted = :deleted",
      ExpressionAttributeNames: {
        "#email": "email",
        "#deleted": "deleted",
      },
      ExpressionAttributeValues: {
        ":email": email,
        ":deleted": false,
      },
    };

    const existingUserResult = await dbHelper()
      .query(existingUserParams)
      .promise();

    // If the email does not exist, return an error response
    if (existingUserResult.Items.length === 0) {
      return sendResponseHelper(400, { message: "Email does not exist" });
    }

    // Generate a password reset token
    const resetToken = generateTokenHelper(existingUserResult, "reset");

    // Calculate the token expiration time (10 minutes from now)
    const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes in milliseconds

    const updateParams = {
      TableName: "usersTable",
      Key: {
        email,
      },
      UpdateExpression:
        "SET #resetToken = :resetToken, #expirationTime = :expirationTime",
      ExpressionAttributeNames: {
        "#resetToken": "resetToken",
        "#expirationTime": "expirationTime",
      },
      ExpressionAttributeValues: {
        ":resetToken": resetToken,
        ":expirationTime": expirationTime,
      },
    };

    await dbHelper().update(updateParams).promise();

    // Send the reset URL containing the token to the user's email
    const resetUrl = `${REACT_APP_URL}/reset-password/${resetToken}`;

    await nodeMailerHelper({
      to: email,
      subject: "Password Reset Request",
      text: ET_02(resetUrl, existingUserResult.Items[0].firstName),
    });

    // Return a response indicating success
    return sendResponseHelper(200, {
      message: "Password reset URL sent successfully",
    });
  } catch (error) {
    // Return an error response
    return sendResponseHelper(500, { message: "Password reset failed", error });
  }
};
