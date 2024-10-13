const { default: mongoose } = require("mongoose");
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
      unique:true,
    },
    visitHistory: [{ timestamp: { type: Number } }],createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users",
    },
  },
  {
    timestamps: true,
  }
);

const Url = moongoose.model("url", urlSchema);

module.exports = Url;