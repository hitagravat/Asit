const express = require("express");
const router = express.Router();

const database = require("./database");
const utils = require("./utils");

router.post("/signup", (req, res) => {
  let fullname = req.body.fullname;
  let email = req.body.email;
  let password = req.body.password;

  if (fullname == "" || email == "" || password == "") {
    let payload = {
      message: "Please provide fullname, email and password!!",
      success: true,
    };
    
    res.status(400).json(payload);
  } else {
    let user = database.adduser(fullname, email, password);
    let token = utils.generatetoken(user.id, user.email);
    
    let payload = {
      user: user,
      success: true,
    };
    
    res.cookie("access-token", token);
    res.status(200).json(payload);
  }
});

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (email == "" || password == "") {
    let payload = {
      message: "Please provide email and password!!",
      success: true,
    };
    
    res.status(400).json(payload);
  } else {
    let user = database.getuserbyemail(email);
    let token = utils.generatetoken(user.id, user.email);
    
    if (user && user.password == password) {
      let payload = {
        message: "Login successfully!!",
        success: true,
      };
      
      res.cookie("access-token", token);
      res.status(200).json(payload);
    } else {
      let payload = {
        message: "Invalid email or password!!",
        success: false,
      };
      
      res.status(400).json(payload);
    }
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("access-token");
  res.status(200).json({
    message: "Logout successfully!!",
    success: true,
  });
});

module.exports = router;
