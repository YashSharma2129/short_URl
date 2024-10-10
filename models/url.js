const moongoose = require("mongoose");

const urlSchema = new moongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  {
    timestamps: true,
  }
);

const Url = moongoose.model("url", urlSchema);

module.exports = Url;