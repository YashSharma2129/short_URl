const express = require("express");
const path = require("path");
const connect = require("./connect");
const { restrictToLoginUserOnly, checkAuth } = require("./middleware/auth");

const cookieparser = require("cookie-parser");
const URL = require("./models/url");
const shortid = require("shortid");
const urlRoute = require("./router/url");
const staticRoute = require("./router/staticRouter");
const userRoute = require("./router/user");

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/collegeDB')
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.error('MongoDB connection error:', err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

app.use("/url", restrictToLoginUserOnly, urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

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
