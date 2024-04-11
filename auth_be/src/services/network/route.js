const { handle: users } = require("./src/users");
const { handle: connections } = require("./src/connections");
const { handle: grants } = require("./src/grants");
const { handle: message } = require("./src/message");
const { handle: fileUpload } = require("./src/fileUpload");
const { handle: deactivate } = require("./src/deactivate");
const { handle: disconnect } = require("./src/disconnect");
const { handle: collaborations } = require("./src/collaborations");
const { handle: shareGrants } = require("./src/shareGrants");
const { sendResponseHelper } = require("./src/utils/responseHelper");

exports.handle = async (event) => {
  const { resource } = event;

  try {
    switch (resource) {
      case "/users":
        return await users(event);
      case "/connect":
        return await connections(event);
      case "/grants":
        return await grants(event);
      case "/chat":
        return await message(event);
      case "/fileUpload":
        return await fileUpload(event);
      case "/deactivate":
        return await deactivate(event);
      case "/disconnect":
        return await disconnect(event);
      case "/collaborate":
        return await collaborations(event);
      case "/share-grants":
        return await shareGrants(event);
      default:
        break;
    }
  } catch (error) {
    return sendResponseHelper(500, error);
  }
};
