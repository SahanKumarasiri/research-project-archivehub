const { nodeMailerHelper } = require("./utils/helper");
const { sendResponseHelper } = require("./utils/responseHelper");

exports.handle = async (event) => {
  const requestBody = JSON.parse(event.body);
  const { emailBy } = requestBody;

  console.log("emailBy" , emailBy)

  try {
    const message = `<div><h3>New verification request from: ${emailBy} <div>`;
    console.log("000" )

    await nodeMailerHelper({
      to: process.env.DEV_EMAIL,
      subject: "Verification Request",
      text: message,
    });
    console.log("1111" )

    return sendResponseHelper(200, {
      message: "Verification Process In Progress",
    });
  } catch (error) {
    console.log("error" , error)
    return sendResponseHelper(500, { error });
  }
};
