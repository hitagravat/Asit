const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("demos"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.redirect("/queryform.html");
});

app.get("/querys", (req, res) => {
  let filterresolved = req.query.resolved;
  let querys = database.getquerys();
  
  if (filterresolved) {
    querys = querys.filter(query => query.resolved == filterresolved);
  }
  
  res.json({
    result: querys,
    success: true,
  });
});

app.get("/querys/:id", (req, res) => {
  const queryid = req.params.id;
  const query = database.getquerybyid(queryid);

  if (query) {
    res.json({
      result: query,
      success: true,
    });
  } else {
    res.status(404).json({
      message: "Query not found!!",
      success: false,
    });
  }
});

app.post("/querys", (req, res) => {
  let fullname = req.body.fullname;
  let mobileno = req.body.mobileno;
  let message = req.body.message;

  if (fullname == "" || mobileno == "" || message == "") {
    let payload = {
      message: "Please provide fullname, mobileno and message!!",
      success: true,
    };
    res.status(400).json(payload);
  } else {
    database.addquery(fullname, mobileno, message);

    let payload = {
      message: "Thank you for your message",
      success: true,
    };
    res.status(200).json(payload);
  }
});

app.post("/querys/resolve/:id", (req, res) => {
  const queryid = req.params.id;
  const query = database.resolvedquerybyid(queryid);

  if (query) {
    let payload = {
      result: query,
      success: true,
    };
    res.json(payload);
  } else {
    let payload = {
      message: "Query not found!!",
      success: false,
    };
    res.status(404).json(payload);
  }
});

app.listen(PORT, () => {
  console.log("Express server start at port: ", PORT);
  console.log(`http://localhost:${PORT}`);
});
