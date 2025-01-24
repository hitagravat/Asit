const jwt = require("jsonwebtoken");

function logger(req, res, next) {
  const start = Date.now();
  next();
  const duration = Date.now() - start;
  const now = new Date().toISOString();

  console.log(
    `[${now}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`,
  );
}

function generatetoken(userid, email) {
  return jwt.sign(
    {
      userid,
      email,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "3h",
    },
  );
}

function verifyanddecodetoken(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    return false;
  }
}

module.exports = {
  logger,
  generatetoken,
  verifyanddecodetoken
};
