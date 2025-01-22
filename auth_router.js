const express = require("express");
const router = express.Router();

const database = require("./database");

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
    database.adduser(fullname, email, password);

    let payload = {
      message: "Thank you for your registration",
      success: true,
    };
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

    if (user && user.password == password) {
      let payload = {
        message: "Login successful",
        success: true,
      };
      res.status(200).json(payload);
    } else {
      let payload = {
        message: "Invalid email or password",
        success: false,
      };
      res.status(400).json(payload);
    }
  }
})
