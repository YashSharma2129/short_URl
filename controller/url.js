const shortid = require("shortid");

const URL = require("../models/url");
async function handleGeneateShortURl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ message: "url is required" });
  }

  const shortId = shortid(6);
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user_id,
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
