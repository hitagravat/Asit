const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const utils = require("./utils");
const database = require("./database");
const auth_router = require("./auth_router");
const user_router = require("./user_router");
const query_router = require("./query_router");
const news_router = require("./news_router");
const admission_router = require("./admission_router");
const swaggerDocs = require("./swagger");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("demos"));
app.use(cors());

const PORT = process.env.PORT || 8080;

/**
 * @openapi
 * '/':
 *   get:
 *     tags:
 *       - Basic/Default
 *     description: returns the home page
 */
app.get("/", (req, res) => {
  res.redirect("/index.html");
});

/**
 * @openapi
 * 'api/health':
 *   get:
 *     tags:
 *       - Basic/Default
 *     description: a simple health check route
 *     responses:
 *       200:
 *         description: retuns a simple message
 *         content:
 *           application/json:
 *             schema:
 */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Healthy Service!!",
    success: true,
  });
});

/**
 * @openapi
 * 'api/profile':
 *   get:
 *     tags:
 *       - Users
 *     description: returns the user profile
 *     responses:
 *       200:
 *         description: retuns the user profile
 *         content:
 *           application/json:
 *             schema:
 *       401:
 *         description: unauthorized
 *         content:
 *           application/json:
 *             schema:
 */
app.get("/api/profile", (req, res) => {
  let token = req.cookies?.["access-token"];
  let user = utils.verifyanddecodetoken(token);

  if (user) {
    user = database.getuserbyid(user.userid);
    res.json({
      result: user,
      success: true,
    });
  } else {
    res.status(401).json({
      message: "Unauthorized!!",
      success: false,
    });
  }
});

app.use("/api/auth", auth_router);
app.use("/api/users", user_router);
app.use("/api/querys", query_router);
app.use("/api/news", news_router);
app.use("/api/admission", admission_router);

app.listen(PORT, () => {
  console.log(`Express server start at: http://localhost:${PORT}`);
  swaggerDocs(app, PORT);
});
