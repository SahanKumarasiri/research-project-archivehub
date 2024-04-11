const { ET_03 } = require("./templates/ET_03");
const { dbHelper, nodeMailerHelper } = require("./utils/helper");
const moment = require("moment");

exports.handle = async (event) => {
  const today = moment();
  try {
    const users = await dbHelper().scan({ TableName: "grantsTable" }).promise();
    if (users.Items.length) {
      for (const user of users.Items) {
        for (const grant of user.grantsData) {
          let daysDifference = null;
          if (moment(grant.closedate).isSame(today)) {
            daysDifference = 0;
          } else if (!moment(grant.closedate).diff(today, "days")) {
            daysDifference = 1;
          } else {
            daysDifference = moment(grant.closedate).diff(today, "days");
          }
          if (
            daysDifference <= 3 &&
            daysDifference >= 0 &&
            user.notified &&
            !user.deactivated &&
            !user.deleted
          ) {
            await nodeMailerHelper({
              to: (
                await dbHelper()
                  .query({
                    TableName: "usersTable",
                    IndexName: "userIdindex",
                    KeyConditionExpression: "#userId = :userId",
                    ExpressionAttributeNames: {
                      "#userId": "userId",
                    },
                    ExpressionAttributeValues: {
                      ":userId": user.userId,
                    },
                  })
                  .promise()
              ).Items[0].email,
              subject: "Grant Opportunity Daily Reminder!",
              text: ET_03(
                (
                  await dbHelper()
                    .query({
                      TableName: "usersTable",
                      IndexName: "userIdindex",
                      KeyConditionExpression: "#userId = :userId",
                      ExpressionAttributeNames: {
                        "#userId": "userId",
                      },
                      ExpressionAttributeValues: {
                        ":userId": user.userId,
                      },
                    })
                    .promise()
                ).Items[0].firstName,
                { ...grant, dateDiff: daysDifference }
              ),
            });
          }
        }
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};
