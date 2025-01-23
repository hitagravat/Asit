const express = require("express");
const router = express.Router();

const database = require("./database");

// Get all the latest news
router.get("/", (req, res) => {
  let news = database.getnews();
  res.json({
    result: news,
    success: true,
  });
});

// Create a new news
router.post("/", (req, res) => {
  let title = req.body.title;
  let content = req.body.content;

  if (title == "" || content == "") {
    res.status(400).json({
      message: "Please provide title and content!!",
      success: false,
    });
  } else {
    let news = database.addnews(title, content);
    res.json({
      result: news,
      success: true,
    });
  }
});

// Delete a news by id
router.delete("/:id", (req, res) => {
  const newsid = req.params.id;
  const news = database.deletenewsbyid(newsid);
  res.json({
    result: news,
    success: true,
  });
});

module.exports = router;
