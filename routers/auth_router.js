const express = require("express");
const router = express.Router();

const database = require("../database/db");
const utils = require("../utils");

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     description: Create a new user account and log the user in by setting a token in cookies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: Full name of the user.
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       302:
 *         description: Redirects to the signup page if any field is missing. Otherwise, redirects to the home page.
 */
router.post("/signup", async (req, res) => {
  let fullname = req.body.fullname;
  let email = req.body.email;
  let password = req.body.password;

  if (fullname == "" || email == "" || password == "") {
    res.redirect("/signup.html");
  } else {
    let user = await database.adduser(fullname, email, password);
    let token = utils.generatetoken(user.id, user.email);
    res.cookie("access-token", token);
    res.redirect("/");
  }
});

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate the user and log them in by setting a token in cookies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       302:
 *         description: Redirects to the login page if authentication fails. Otherwise, redirects to the home page.
 */
router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let isadmin = false;
  
  if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
    isadmin = true;
  }

  if (email == "" || password == "") {
    res.redirect("/login.html");
  } else {
    let user = await database.getuserbyemail(email);
    let token = utils.generatetoken(user.id, user.email, isadmin);

    if (user && user.password == password) {
      res.cookie("access-token", token);
      res.redirect("/");
    } else {
      res.redirect("/login.html");
    }
  }
});

/**
 * @openapi
 * /api/auth/logout:
 *   get:
 *     summary: User logout
 *     description: Log the user out by clearing the authentication token cookie.
 *     responses:
 *       302:
 *         description: Redirects to the login page after logout.
 */
router.get("/logout", async (req, res) => {
  res.clearCookie("access-token");
  res.redirect("/login.html");
});

module.exports = router;
