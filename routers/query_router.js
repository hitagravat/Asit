const express = require("express");
const router = express.Router();

const database = require("../database/db");

/**
 * @openapi
 * /api/querys/:
 *   get:
 *     summary: Get all queries
 *     description: Retrieve all queries from the database. Optionally filter queries by resolved status.
 *     parameters:
 *       - name: resolved
 *         in: query
 *         description: Filter queries by resolved status (true or false).
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved queries.
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
 *                         description: The query ID.
 *                       fullname:
 *                         type: string
 *                         description: Full name of the person submitting the query.
 *                       mobileno:
 *                         type: string
 *                         description: Mobile number of the person submitting the query.
 *                       message:
 *                         type: string
 *                         description: The query message.
 *                       resolved:
 *                         type: boolean
 *                         description: Whether the query is resolved.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 */
router.get("/", async (req, res) => {
  let filterresolved = req.query.resolved;
  let querys = await database.getquerys();

  if (filterresolved) {
    querys = querys.filter((query) => query.resolved == filterresolved);
  }

  res.json({
    result: querys,
    success: true,
  });
});

/**
 * @openapi
 * /api/querys/{id}:
 *   get:
 *     summary: Get a single query by ID
 *     description: Retrieve a single query from the database by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the query to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the query.
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
 *                       description: The query ID.
 *                     fullname:
 *                       type: string
 *                       description: Full name of the person submitting the query.
 *                     mobileno:
 *                       type: string
 *                       description: Mobile number of the person submitting the query.
 *                     message:
 *                       type: string
 *                       description: The query message.
 *                     resolved:
 *                       type: boolean
 *                       description: Whether the query is resolved.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *       404:
 *         description: Query not found.
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
 */
router.get("/:id", async (req, res) => {
  const queryid = req.params.id;
  const query = await database.getquerybyid(queryid);

  if (query) {
    res.json({
      result: query,
      success: true,
    });
  } else {
    res.status(404).json({
      message: "Query not found!!",
      success: false,
    });
  }
});

/**
 * @openapi
 * /api/querys/:
 *   post:
 *     summary: Create a new query
 *     description: Add a new query to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: Full name of the person submitting the query.
 *               mobileno:
 *                 type: string
 *                 description: Mobile number of the person submitting the query.
 *               message:
 *                 type: string
 *                 description: The query message.
 *     responses:
 *       200:
 *         description: Query successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Missing required fields.
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
 */
router.post("/", async (req, res) => {
  let fullname = req.body.fullname;
  let mobileno = req.body.mobileno;
  let message = req.body.message;

  if (fullname == "" || mobileno == "" || message == "") {
    let payload = {
      message: "Please provide fullname, mobileno and message!!",
      success: true,
    };
    res.status(400).json(payload);
  } else {
    await database.addquery(fullname, mobileno, message);

    let payload = {
      message: "Thank you for your message",
      success: true,
    };
    res.status(200).json(payload);
  }
});

/**
 * @openapi
 * /api/querys/resolve/{id}:
 *   post:
 *     summary: Resolve a query
 *     description: Mark a query as resolved.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the query to resolve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully resolved the query.
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
 *                       description: The query ID.
 *                     resolved:
 *                       type: boolean
 *                       description: Whether the query is resolved.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *       404:
 *         description: Query not found.
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
 */
router.post("/resolve/:id", async (req, res) => {
  const queryid = req.params.id;
  const query = await database.resolvedquerybyid(queryid);

  if (query) {
    let payload = {
      result: query,
      success: true,
    };
    res.json(payload);
  } else {
    let payload = {
      message: "Query not found!!",
      success: false,
    };
    res.status(404).json(payload);
  }
});

module.exports = router;
