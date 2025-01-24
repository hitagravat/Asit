const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const token = req.cookies["access-token"];
  
  if (token && token.isadmin === true) {
    next(); // Allow access
  } else {
    res.redirect("/index.html"); // Redirect to login page
  }
};

function logger(req, res, next) {
  const start = Date.now();
  next();
  const duration = Date.now() - start;
  const now = new Date().toISOString();

  console.log(
    `[${now}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`,
  );
}

function generatetoken(userid, email, isadmin) {
  return jwt.sign(
    {
      userid,
      email,
      isadmin
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
  adminAuth,
  logger,
  generatetoken,
  verifyanddecodetoken
};
