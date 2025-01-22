const express = require("express");
const router = express.Router();

const database = require("./database");

// Get all the users
router.get("/", (req, res) => {
  let users = database.getusers();
  
  res.json({
    result: users,
    success: true,
  });
});

// Get user by id
router.get("/:id", (req, res) => {
  const userid = req.params.id;
  const user = database.getuserbyid(userid);

  if (user) {
    res.json({
      result: user,
      success: true,
    });
  } else {
    res.status(404).json({
      message: "User not found!!",
      success: false,
    });
  }
});

module.exports = router;
