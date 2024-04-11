const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const {
  region,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  JWT_SECRET,
  JWT_EXPIRE,
  EMAIL_USERNAME,
  EMAIL_SERVICE,
  EMAIL_PASSWORD,
  S3_BUCKET,
} = process.env;

const awsAuthObj = {
  region: region,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
};

// Set up AWS DynamoDB and SES clients
const dbHelper = () => new AWS.DynamoDB.DocumentClient(awsAuthObj);

const emailHelper = () => new AWS.SES(awsAuthObj);

const generatePasswordHelper = () => {
  const length = 10;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
};

const generateTokenHelper = (existingUserResult, type) => {
  const {
    email,
    userId,
    firstName,
    lastName,
    institutionWebAddress,
    position,
    undergraduateSupervision,
    mscSupervision,
    mphilOrPhdSupervision,
    chairInConferences,
    editorInJournals,
    reviewerInConferences,
    reviewerInJournals,
    imgURL,
    interests,
    network,
    deactivated,
  } = existingUserResult?.Items?.[0];
  return jwt.sign(
    type === "ADMIN"
      ? { email, type, authorized: true }
      : {
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
          authorized: true,
          verified: existingUserResult.Items[0].verified
            ? existingUserResult.Items[0].verified
            : null,
          imgURL,
          interests,
          network,
          deactivated,
        },
    JWT_SECRET,
    { expiresIn: type === "reset" ? JWT_EXPIRE : "1d" }
  );
};
const nodeMailerHelper = async (options) => {
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"ArchiveHub Platform" <${EMAIL_USERNAME}>`,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  await transporter.sendMail(mailOptions);
};

const headers = { "Access-Control-Allow-Origin": "*" };

const REACT_APP_URL = "http://archivehub.online";

let s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  signatureVersion: "v4",
});

const generateUploadPreSignedUrl = (path) => {
  try {
    let s3Params = {
      Bucket: S3_BUCKET,
      Key: path,
    };

    const signedUrl = s3.getSignedUrl("putObject", s3Params);

    return signedUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const CHAT_S3_BASE_URL =
  "https://archivehub-chat-bucket.s3.us-east-2.amazonaws.com/";

module.exports = {
  dbHelper,
  emailHelper,
  generatePasswordHelper,
  generateTokenHelper,
  nodeMailerHelper,
  headers,
  REACT_APP_URL,
  generateUploadPreSignedUrl,
  CHAT_S3_BASE_URL,
};
