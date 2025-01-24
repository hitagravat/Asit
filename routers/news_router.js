const express = require("express");
const router = express.Router();

const database = require("../database/db");

/**
 * @openapi
 * /api/news:
 *   get:
 *     summary: Get all the latest news
 *     description: Retrieve a list of all news items.
 *     responses:
 *       200:
 *         description: A list of news items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: News ID.
 *                       title:
 *                         type: string
 *                         description: Title of the news.
 *                       content:
 *                         type: string
 *                         description: Content of the news.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 */
router.get("/", async (req, res) => {
  let news = await database.getnews();
  res.json({
    result: news,
    success: true,
  });
});

/**
 * @openapi
 * api/news:
 *   post:
 *     summary: Create a new news item
 *     description: Add a new news item with a title and content.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the news.
 *               content:
 *                 type: string
 *                 description: Content of the news.
 *     responses:
 *       200:
 *         description: Successfully created a news item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: News ID.
 *                     title:
 *                       type: string
 *                       description: Title of the news.
 *                     content:
 *                       type: string
 *                       description: Content of the news.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *       400:
 *         description: Missing title or content.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 */
router.post("/", async (req, res) => {
  let title = req.body.title;
  let content = req.body.content;

  if (title == "" || content == "") {
    res.status(400).json({
      message: "Please provide title and content!!",
      success: false,
    });
  } else {
    let news = await database.addnews(title, content);
    res.json({
      result: news,
      success: true,
    });
  }
});

/**
 * @openapi
 * api/news/{id}:
 *   delete:
 *     summary: Delete a news item
 *     description: Delete a news item by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the news to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the news item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   description: Details of the deleted news.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 */
router.delete("/:id", async (req, res) => {
  const newsid = req.params.id;
  const news = await database.deletenewsbyid(newsid);
  res.json({
    result: news,
    success: true,
  });
});

module.exports = router;
