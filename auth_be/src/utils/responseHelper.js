const { headers } = require("./helper");

exports.sendResponseHelper = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers,
  };
};
