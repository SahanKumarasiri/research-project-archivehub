const { generateUploadPreSignedUrl } = require("./utils/helper");
const { sendResponseHelper } = require("./utils/responseHelper");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.handle = async (event) => {
  const { file, userId } = JSON.parse(event.body);
  const authToken = event.headers.Authorization;
  if (!authToken) return sendResponseHelper(401, "Invalid Token");
  else if (!(await jwt.decode(authToken.split("Bearer ")[1])?.authorized))
    return sendResponseHelper(401, "Not Authorized!!!");
  try {
    const { name, uid } = file;
    const path = `${userId}/files/archivehub_assets_${uuidv4()}_${name}`;
    const signedUrl = generateUploadPreSignedUrl(path);
    return sendResponseHelper(200, {
      uid,
      signedUrl,
      path,
      name,
    });
  } catch (error) {
    console.log(error);
    return sendResponseHelper(500, {
      error,
    });
  }
};
