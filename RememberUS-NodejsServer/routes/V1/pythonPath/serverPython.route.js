//in order to pass the router to the v1Page and using the current page router
const express = require("express");
const pythonServerRouter = express.Router();
module.exports = pythonServerRouter;
const path = require("path");
const ML = require(path.join(
  __dirname,
  "../../../ML-python/ImageDecoding.ML-python"
));

// pythonServerRouter.get("/send_photo_to_python_server", async (req, res) => {
//     res.send(await ML.sendImageDecode("../public/Images/di.jpg"));
// });

pythonServerRouter.post("/send_photo_to_python_server", async (req, res) => {
  const data = await ML.sendBase64Decode(req.body.base64);
  console.log(`2:${data}`);
  res.send({ type: data });
});
