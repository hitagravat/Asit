const express = require("express");
const bodyParser = require("body-parser");

const database = require("./database");
const auth_router = require("./auth_router");
const user_router = require("./user_router");
const query_router = require("./query_router");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("demos"));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.redirect("/queryform.html");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Healthy Service!!",
    success: true,
  });
});

app.use("/api/auth", auth_router);
app.use("/api/users", user_router);
app.use("/api/querys", query_router);

app.listen(PORT, () => {
  console.log("Express server start at port: ", PORT);
  console.log(`http://localhost:${PORT}`);
});
