const path = require("path");
const fs = require("fs");
const axios = require("axios");

function base64_encode(file) {
  return fs.readFileSync(file, "base64");
}

async function sendImageDecode(pathString) {
  let furnitureString = "";
  await axios
    .post("http://localhost:5000/image", {
      Base64_image: base64_encode(path.join(__dirname, pathString)),
    })
    .then((response) => {
      console.log(response.data);
      furnitureString = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return furnitureString;
}

async function sendBase64Decode(base64String) {
  const response = await axios.post("http://localhost:5000/image", {
    Base64_image: base64String.slice(23),
  });
  console.log(`1:${response.data}`);
  return response.data;
}

module.exports = {
  sendImageDecode: sendImageDecode,
  sendBase64Decode: sendBase64Decode,
};
