const { dbHelper, generateTokenHelper } = require("./utils/helper");
const { sendResponseHelper } = require("./utils/responseHelper");
const bcrypt = require("bcryptjs");

// Lambda function to handle user login
exports.handle = async (event) => {
  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body);

    // Extract the email and password from the request body
    const { email, password } = requestBody;

    const adminUser = await dbHelper()
      .query({
        TableName: "adminTable",
        IndexName: "emailIndex",
        KeyConditionExpression: "#email = :email",
        ExpressionAttributeNames: {
          "#email": "email",
        },
        ExpressionAttributeValues: {
          ":email": email,
        },
      })
      .promise();

    if (adminUser.Items.length) {
      if (await bcrypt.compare(password, adminUser.Items[0].password))
        return sendResponseHelper(200, {
          token: generateTokenHelper(adminUser, "ADMIN"),
        });
      return sendResponseHelper(400, "Invalid Admin Credentials");
    }

    // Retrieve the user from DynamoDB based on the email
    const queryParams = {
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

    const userResult = await dbHelper().query(queryParams).promise();

    // If the user does not exist, return an error response
    if (userResult.Items.length === 0) {
      return sendResponseHelper(400, { message: "Invalid credentials" });
    }

    // Retrieve the user's hashed password from the query result
    const hashedPassword = userResult.Items[0].password;

    const needToReset = userResult.Items[0].needToReset;
    const deactivated = userResult.Items[0].deactivated;

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    // If the passwords don't match, return an error response
    if (!passwordMatch) {
      return sendResponseHelper(400, { message: "Invalid credentials" });
    }

    // Check if the user needs to reset their password
    if (needToReset == 1) {
      return sendResponseHelper(400, {
        message: "You need to reset your password",
      });
    }

    const token = generateTokenHelper(userResult, "login");

    if (deactivated) {
      return sendResponseHelper(400, {
        token,
        message: "Your account is deactivated",
      });
    }

    // Return the token and user details in the response
    return sendResponseHelper(200, { token });
  } catch (error) {
    return sendResponseHelper(500, { message: "Internal server error", error });
  }
};
