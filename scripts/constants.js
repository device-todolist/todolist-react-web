const path = require("path");

const PROJECT_PATH = path.resolve(__dirname, "../");
const PROJECT_NAME = path.parse(PROJECT_PATH).name;
const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  isDev,
};
