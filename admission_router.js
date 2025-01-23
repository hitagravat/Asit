const express = require("express");
const router = express.Router();

const database = require("./database");

// Get all the admission request
router.get("/", (req, res) => {
  let admission = database.getadmission();
  res.json({
    result: admission,
    success: true,
  })
});

// Create a new admission request
router.post("/register", (req, res) => {
  let fullname = req.body.fullname;
  let mobileno = req.body.mobileno;
  let course = req.body.course;

  if (fullname == "" || mobileno == "" || course == "") {
    res.redirect("/admission.html");
  } else {
    let admission = database.addadmission(fullname, mobileno, course);
    res.json({
      result: admission,
      success: true,
    })
  }
});

module.exports = router;
