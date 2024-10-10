const express = require("express");
const urlRoute = require("./router/url");
const connect = require("./connect");
const URL = require("./models/url");
const shortid = require("shortid");
const app = express();
const port = 3000;

connect("mongodb://localhost:27017/url-shortner").then(() =>
  console.log("Connected to database")
);

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry=await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}); 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
