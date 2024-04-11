const { dbHelper } = require("./utils/helper");
const { sendResponseHelper } = require("./utils/responseHelper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Lambda function to handle the password reset confirmation process
exports.handle = async (event) => {
  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body);

    // Extract the reset token and new password from the request body
    const { resetToken, newPassword, type, email } = requestBody;

    if (type === "ADMIN") {
      await dbHelper()
        .update({
          TableName: "adminTable",
          Key: {
            email,
          },
          UpdateExpression: "SET #password = :password",
          ExpressionAttributeNames: {
            "#password": "password",
          },
          ExpressionAttributeValues: {
            ":password": await bcrypt.hash(newPassword, 10),
          },
        })
        .promise();
      return sendResponseHelper(200, {
        message: "Admin Password Reset Successfully",
      });
    }

    if (type === "NEED_TO_RESET") {
      // Retrieve the user from DynamoDB
      const getUserParams = {
        TableName: "usersTable",
        Key: {
          email,
        },
        FilterExpression: "deleted = :deleted",
        ExpressionAttributeValues: {
          ":deleted": false,
        },
      };

      const userResult = await dbHelper().get(getUserParams).promise();

      if (!userResult.Item) {
        return sendResponseHelper(400, { message: "Invalid User" });
      }

      // Generate a hashed password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password and needToReset attribute in DynamoDB
      const updateParams = {
        TableName: "usersTable",
        Key: {
          email,
        },
        UpdateExpression:
          "SET #password = :password, needToReset = :needToReset",
        ExpressionAttributeNames: {
          "#password": "password",
        },
        ExpressionAttributeValues: {
          ":password": hashedPassword,
          ":needToReset": 0,
        },
      };

      await dbHelper().update(updateParams).promise();

      // Return a response indicating success
      return sendResponseHelper(200, { message: "Password reset successful" });
    }

    // Verify the reset token and check the expiration time
    let decodedEmail = null;
    let decodedTokenExp = null;
    jwt.verify(resetToken, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        console.log(err);
      } else {
        decodedEmail = decoded.email;
        decodedTokenExp = decoded.exp;
      }
    });

    const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds

    // Check if the token has expired
    if (decodedTokenExp <= currentTimestamp) {
      return sendResponseHelper(400, { message: "Reset token has expired" });
    }

    // Retrieve the user from DynamoDB
    const getUserParams = {
      TableName: "usersTable",
      Key: {
        email: decodedEmail,
      },
    };

    const userResult = await dbHelper().get(getUserParams).promise();

    // If the user does not exist, return an error response
    if (!userResult.Item) {
      return sendResponseHelper(400, {
        message: "Invalid reset token for user",
      });
    }

    // Generate a hashed password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and needToReset attribute in DynamoDB
    const updateParams = {
      TableName: "usersTable",
      Key: {
        email: decodedEmail,
      },
      UpdateExpression: "SET #password = :password, needToReset = :needToReset",
      ExpressionAttributeNames: {
        "#password": "password",
      },
      ExpressionAttributeValues: {
        ":password": hashedPassword,
        ":needToReset": 0,
      },
    };

    await dbHelper().update(updateParams).promise();

    // Return a response indicating success
    return sendResponseHelper(200, { message: "Password reset successful" });
  } catch (error) {
    // If the reset token is invalid or expired, return an error response
    return sendResponseHelper(500, { message: "Token Expired!.", error });
  }
};
