const moongoose = require("mongoose");

async function connect(url) {
  return moongoose.connect(url);
}

module.exports = connect;
