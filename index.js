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
 * /:
 *   get:
 *     summary: Redirect to the index page
 *     description: Redirects the user to the `index.html` page.
 *     responses:
 *       302:
 *         description: Redirect to the index page.
 */
app.get("/", async (req, res) => {
  res.redirect("/index.html");
});

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Check the service health
 *     description: Returns a message indicating the service is healthy.
 *     responses:
 *       200:
 *         description: Service is healthy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Health status message.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the service is healthy.
 */
app.get("/api/health", async (req, res) => {
  res.status(200).json({
    message: "Healthy Service!!",
    success: true,
  });
});

/**
 * @openapi
 * /api/profile:
 *   get:
 *     summary: Get the user's profile
 *     description: Returns the profile of the authenticated user. If the user is not authenticated, redirects to the login page.
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   description: The user's profile data.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user's ID.
 *                     fullname:
 *                       type: string
 *                       description: The user's full name.
 *                     email:
 *                       type: string
 *                       description: The user's email address.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *       302:
 *         description: Redirects to the login page if the user is not authenticated.
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
