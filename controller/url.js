const shortid = require("shortid");
const { getUser } = require("../service/auth");
const URL = require("../models/url");

async function handleGeneateShortURl(req, res) {
  const body = req.body;
  const reault = await URL.find({});
 
  if (!body.url) {
    return res.status(400).json({ message: "url is required" });
  }
  const userUid = req.cookies.uid;
  const user = getUser(userUid);
  const shortId = shortid(6);
console.log("user",user)
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: user._id,
  });

  return res.render("home", {
    id: shortId,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const reault = await URL.findOne({ shortId });

  return res.json({
    totalclicks: reault.visitHistory.length,
    analytics: reault.visitHistory,
  });
}
module.exports = {
  handleGeneateShortURl,
  handleGetAnalytics,
};
