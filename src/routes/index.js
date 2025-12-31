const {adminRouter}=require("./admin.route");
const express=require("express");
const app=express();
app.use("/admin",adminRouter);
module.exports=app;