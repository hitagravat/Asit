const jwt = require("jsonwebtoken");

function generatetoken(userid, email) {
  return jwt.sign(
    {
      userid,
      email
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "3h",
    }
  );
}

function verifyanddecodetoken(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  }
  catch(err) {
    return false;
  }
}

module.exports = {
  generatetoken,
  verifyanddecodetoken
}
