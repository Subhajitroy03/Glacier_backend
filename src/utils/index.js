const {ApiError} = require("./ApiError");
const {ApiSuccess}=require("./ApiSuccess")
const {sendMail}=require("./mailer");
module.exports={
    ApiError,
    ApiSuccess,
    sendMail
}