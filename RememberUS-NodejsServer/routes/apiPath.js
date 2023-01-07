//In order to pass the router to the app.js
const express = require("express");
let apiRouter = express.Router();
module.exports = apiRouter;

//Getting the router from next path /api/v1/v1Page
const v1Router = require(`${__dirname}/V1/index`);

//When using /api/v1 --->going to /api/v1 page(v1Page)
apiRouter.use("/V1", v1Router);


