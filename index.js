const express = require("express");
const bodyParser = require("body-parser");

const utils = require("./utils");
const database = require("./database");
const auth_router = require("./auth_router");
const user_router = require("./user_router");
const query_router = require("./query_router");
const news_router = require("./news_router");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("demos"));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Healthy Service!!",
    success: true,
  });
});

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

app.listen(PORT, () => {
  console.log("Express server start at port: ", PORT);
  console.log(`http://localhost:${PORT}`);
});
