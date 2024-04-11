const bcrypt = require("bcryptjs");
const {
  dbHelper,
  emailHelper,
  generatePasswordHelper,
  nodeMailerHelper,
} = require("./utils/helper");
const { sendResponseHelper } = require("./utils/responseHelper");
const { ET_01 } = require("./templates/ET_01");

// Lambda function to handle the onboarding process
exports.handle = async (event) => {
  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body);

    // Extract the user details from the request body
    const {
      userId,
      firstName,
      lastName,
      email,
      institutionWebAddress,
      position,
      undergraduateSupervision,
      mscSupervision,
      mphilOrPhdSupervision,
      chairInConferences,
      editorInJournals,
      reviewerInConferences,
      reviewerInJournals,
      interests,
      imgURL,
      affiliations,
      citations,
      verified,
      type,
      adminPassword,
    } = requestBody;
    if (type === "ADMIN") {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await dbHelper()
        .put({
          TableName: "adminTable",
          Item: {
            email,
            password: hashedPassword,
            type,
          },
        })
        .promise();
      return sendResponseHelper(200, "Admin Created Sucessfully");
    }

    // Check if the email already exists in DynamoDB
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

    const existingUserParamsForSecondaryIndex = {
      TableName: "usersTable",
      IndexName: "userIdindex",
      KeyConditionExpression: "#userId = :userId",
      FilterExpression: "#deleted = :deleted",
      ExpressionAttributeNames: {
        "#userId": "userId",
        "#deleted": "deleted",
      },
      ExpressionAttributeValues: {
        ":userId": userId,
        ":deleted": false,
      },
    };

    const existingUserResult = await dbHelper()
      .query(existingUserParams)
      .promise();

    const existingUserResultForSecondaryIndex = await dbHelper()
      .query(existingUserParamsForSecondaryIndex)
      .promise();

    if (
      existingUserResultForSecondaryIndex.Items[0]?.verified ||
      existingUserResult.Items.length > 0 ||
      existingUserResultForSecondaryIndex.Items.length > 0 ||
      existingUserResultForSecondaryIndex.Items[0]?.deleted
    ) {
      return sendResponseHelper(400, {
        message: "Invalid User. Please contact our support service.",
      });
    }

    // Generate a random password
    const password = generatePasswordHelper();
    // Hash the password using bcrypt for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new item in the DynamoDB table
    const params = {
      TableName: "usersTable",
      Item: {
        userId,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        needToReset: 1,
        institutionWebAddress,
        position,
        undergraduateSupervision,
        mscSupervision,
        mphilOrPhdSupervision,
        chairInConferences,
        editorInJournals,
        reviewerInConferences,
        reviewerInJournals,
        interests,
        imgURL,
        affiliations,
        citations,
        verified,
        deleted: false,
      },
    };

    // Put the item in DynamoDB
    await dbHelper().put(params).promise();

    await nodeMailerHelper({
      to: email,
      subject: "Welcome! You are onboarded.",
      text: ET_01(password),
    });

    // Return a response indicating success
    return sendResponseHelper(200, { message: "Onboarding successful" });
  } catch (error) {
    // Return an error response
    return sendResponseHelper(500, { message: "Onboarding failed", error });
  }
};
