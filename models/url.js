const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
      unique:true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model("url", urlSchema);

module.exports = Url;