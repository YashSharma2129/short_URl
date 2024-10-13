const { v4: uuid } = require("uuid");
const User = require("../models/user");
const { getUser } = require("../service/auth");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid UserName or Password",
    });

  const sessionId = uuid();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);

  res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
