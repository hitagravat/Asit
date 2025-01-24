const express = require("express");
const router = express.Router();

const database = require("../database/db");
const utils = require("../utils");

router.post("/signup", async (req, res) => {
  let fullname = req.body.fullname;
  let email = req.body.email;
  let password = req.body.password;

  if (fullname == "" || email == "" || password == "") {
    res.redirect("/signup.html");
  } else {
    let user = await database.adduser(fullname, email, password);
    let token = utils.generatetoken(user.id, user.email);
    res.cookie("access-token", token);
    res.redirect("/");
  }
});

router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (email == "" || password == "") {
    res.redirect("/login.html");
  } else {
    let user = await database.getuserbyemail(email);
    let token = utils.generatetoken(user.id, user.email);
    
    if (user && user.password == password) {
      res.cookie("access-token", token);
      res.redirect("/");
    } else {
      res.redirect("/login.html");
    }
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("access-token");
  res.redirect("/login.html");
});

module.exports = router;
