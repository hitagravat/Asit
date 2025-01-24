require("dotenv").config();

const express = require("express");
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require("cors");

const utils = require("./utils");
const database = require("./database/db");
const auth_router = require("./routers/auth_router");
const user_router = require("./routers/user_router");
const query_router = require("./routers/query_router");
const news_router = require("./routers/news_router");
const admission_router = require("./routers/admission_router");
const swaggerDocs = require("./swagger");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("demos"));

const PORT = process.env.PORT || 8080;

/**
 * @openapi
 * '/':
 *   get:
 *     tags:
 *       - Basic/Default
 *     description: returns the home page
 */
app.get("/", async (req, res) => {
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
app.get("/api/health", async (req, res) => {
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
app.get("/api/profile", async (req, res) => {
  let token = req.cookies["access-token"];
  
  if (!token) {
    return res.redirect("/login.html");
  }
  
  let user = utils.verifyanddecodetoken(token);
  if (!user) {
    res.clearCookie("access-token");
    return res.redirect("/login.html");
  }
  
  user = await database.getuserbyid(user.userid);
  return res.json({
    result: user,
    success: true,
  });
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
