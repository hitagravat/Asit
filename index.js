const express = require("express");
const bodyParser = require("body-parser");

const database = require("./database");
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

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Healthy Service!!",
    success: true,
  });
});

app.use("/users", user_router);
app.use("/querys", query_router);

app.listen(PORT, () => {
  console.log("Express server start at port: ", PORT);
  console.log(`http://localhost:${PORT}`);
});
