const express = require("express");
const router = express.Router();

const database = require("../database/db");

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all the users
 *     description: Retrieve a list of all users in the system.
 *     responses:
 *       200:
 *         description: A list of users.
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
 *                         description: User ID.
 *                       fullname:
 *                         type: string
 *                         description: Full name of the user.
 *                       email:
 *                         type: string
 *                         description: Email of the user.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 */
router.get("/", async (req, res) => {
  let users = await database.getusers();

  res.json({
    result: users,
    success: true,
  });
});

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve details of a specific user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Details of the user.
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
 *                       description: User ID.
 *                     fullname:
 *                       type: string
 *                       description: Full name of the user.
 *                     email:
 *                       type: string
 *                       description: Email of the user.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *       404:
 *         description: User not found.
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

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update the details of a specific user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update.
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
 *       200:
 *         description: Successfully updated the user.
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
 *                       description: User ID.
 *                     fullname:
 *                       type: string
 *                       description: Full name of the user.
 *                     email:
 *                       type: string
 *                       description: Email of the user.
 *                 success:
 *                   type: boolean
 *       404:
 *         description: User not found.
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

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Remove a user from the system by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   description: Details of the deleted user.
 *                 success:
 *                   type: boolean
 */
router.delete("/:id", async (req, res) => {
  let userid = req.params.id;
  let user = await database.deleteuserbyid(userid);
  return res.json({
    result: user,
    success: true,
  });
});

module.exports = router;
