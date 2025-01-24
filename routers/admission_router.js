const express = require("express");
const router = express.Router();

const database = require("../database/db");

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get all admission requests
 *     description: Retrieve all the admission requests from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved all admissions.
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
 *                         description: The admission ID.
 *                       fullname:
 *                         type: string
 *                         description: Full name of the applicant.
 *                       mobileno:
 *                         type: string
 *                         description: Mobile number of the applicant.
 *                       course:
 *                         type: string
 *                         description: Course applied for.
 *                       registerat:
 *                         type: string
 *                         description: Registration date.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 */
router.get("/", async (req, res) => {
  let admission = await database.getadmission();
  res.json({
    result: admission,
    success: true,
  });
});

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Create a new admission request
 *     description: Register a new admission request in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: Full name of the applicant.
 *               mobileno:
 *                 type: string
 *                 description: Mobile number of the applicant.
 *               course:
 *                 type: string
 *                 description: Course applied for.
 *     responses:
 *       200:
 *         description: Successfully created the admission request.
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
 *                       description: The admission ID.
 *                     fullname:
 *                       type: string
 *                       description: Full name of the applicant.
 *                     mobileno:
 *                       type: string
 *                       description: Mobile number of the applicant.
 *                     course:
 *                       type: string
 *                       description: Course applied for.
 *                     registerat:
 *                       type: string
 *                       description: Registration date.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *       400:
 *         description: Missing required fields.
 */
router.post("/register", async (req, res) => {
  let fullname = req.body.fullname;
  let mobileno = req.body.mobileno;
  let course = req.body.course;

  if (fullname == "" || mobileno == "" || course == "") {
    res.redirect("/admission.html");
  } else {
    let admission = await database.addadmission(fullname, mobileno, course);
    res.json({
      result: admission,
      success: true,
    });
  }
});

module.exports = router;
