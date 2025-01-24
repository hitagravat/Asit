const express = require("express");
const router = express.Router();

const database = require("../database/db");

// Get all the users
router.get("/", async (req, res) => {
  let users = await database.getusers();
  
  res.json({
    result: users,
    success: true,
  });
});

// Get user by id
router.get("/:id", async (req, res) => {
  const userid = req.params.id;
  const user = await database.getuserbyid(userid);

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
router.put("/:id", async (req, res) => {
  let userid = req.params.id;
  let newuser = req.body;
  let user = await database.updateuserbyid(userid, newuser);
  
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
router.delete("/:id", async (req, res) => {
  let userid = req.params.id;
  let user = await database.deleteuserbyid(userid);
  return res.json({
    result: user,
    success: true,
  });
});

module.exports = router;
