const { handle: onboarding } = require("./src/onboarding");
const { handle: login } = require("./src/login");
const { handle: forgotPassword } = require("./src/forgotPassword");
const { handle: resetPassword } = require("./src/resetPassword");
const { handle: deleteOrVerifyUser } = require("./src/deleteOrVerifyUser");
const { sendResponseHelper } = require("./src/utils/responseHelper");

exports.handle = async (event) => {
  const { resource } = event;

  try {
    switch (resource) {
      case "/onboarding":
        return await onboarding(event);
      case "/login":
        return await login(event);
      case "/forgotPassword":
        return await forgotPassword(event);
      case "/resetPassword":
        return await resetPassword(event);
      case "/verifyAccount":
        return await verifyAccount(event);
      case "/deleteOrVerifyUser":
        return await deleteOrVerifyUser(event);
      default:
        break;
    }
  } catch (error) {
    return sendResponseHelper(500, error);
  }
};
