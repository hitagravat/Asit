const express = require("express");
const bodyParser = require("body-parser");

const database = require("./database");
const query_router = require("./query_router");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("demos"));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.redirect("/queryform.html");
});

app.use("/querys", query_router);

app.listen(PORT, () => {
  console.log("Express server start at port: ", PORT);
  console.log(`http://localhost:${PORT}`);
});
