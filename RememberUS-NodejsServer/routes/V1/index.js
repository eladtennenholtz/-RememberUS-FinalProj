//in order to pass the router to the apiPath
const express = require("express");
const v1Router = express.Router();
module.exports = v1Router;

//python Path
//getting the router from next path /api/v1/python
const serverPythonRouter = require(`${__dirname}/pythonPath/serverPython.route`);
//when using /api/v1/python --->going to /api/v1/python page(serverPython.route)
v1Router.use("/python", serverPythonRouter);

//getting the router from next path /api/v1/User
const serverUserRouter = require(`${__dirname}/UserPath/serverUser.route`);
v1Router.use("/User", serverUserRouter);
