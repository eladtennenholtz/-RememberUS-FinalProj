const express = require("express");
const apiRouter = require(`${__dirname}/routes/apiPath`); //apiRouter= router from apiPage
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

//LogicManager,initialize the logic`
const logicManager = require(path.join(__dirname, "/Logic/LogicManager"));

app.listen(port, async () => {
  console.log(`listening on port ${port}`);
  await logicManager.ConnectToMongoDB();
  console.log("Server is Ready !!!");
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use(cors());
//when using /api --->going to /api page(apiPath)
app.use("/api", apiRouter);

//Function for checking ...
