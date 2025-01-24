const express = require("express");
const router = express.Router();

const database = require("./database");

// Get all the admission request
router.get("/", async (req, res) => {
  let admission = await database.getadmission();
  res.json({
    result: admission,
    success: true,
  })
});

// Create a new admission request
router.post("/register", async (req, res) => {
  let fullname = req.body.fullname;
  let mobileno = req.body.mobileno;
  let course = req.body.course;

  if (fullname == "" || mobileno == "" || course == "") {
    res.redirect("/admission.html");
  } else {
    let admission = await database.addadmission(fullname, mobileno, course);
    res.json({
      result: admission,
      success: true,
    })
  }
});

module.exports = router;
