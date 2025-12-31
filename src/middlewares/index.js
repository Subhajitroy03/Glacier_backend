module.exports = {
  authenticate: require("./auth"),
  isAdmin: require("./isAdmin"),
  upload: require("./multer").upload,
  errorHandler: require("./errorHandler").errorHandler
};
