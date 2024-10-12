const express = require("express");
const path = require("path");
const connect = require("./connect");
const urlRoute = require("./router/url");
const staticRoute = require("./router/staticRouter");
const URL = require("./models/url");
const shortid = require("shortid");

const app = express();
const port = 3000;

connect("mongodb://localhost:27017/url-shortner").then(() =>
  console.log("Connected to database")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).send("Not found");
  }

  const originalUrl = entry.redirectUrl;

  const fullUrl = `https://${originalUrl}`; // Change to https if needed
  res.redirect(fullUrl);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
