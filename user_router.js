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

// Update user by id
router.put("/:id", (req, res) => {
  let userid = req.params.id;
  let newuser = req.body;
  let user = database.updateuserbyid(userid, newuser);
  
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

// Delete user by id
router.delete("/:id", (req, res) => {
  let userid = req.params.id;
  let user = database.deleteuserbyid(userid);
  return res.json({
    result: user,
    success: true,
  });
});

module.exports = router;
