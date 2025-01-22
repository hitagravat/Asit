let uid = 1;
const data = {
  querys: [],
  users: []
}

function getquerys() {
  return [...data.querys];
}

function addquery(fullname, mobileno, message) {
  let query = {
    id: uid++,
    fullname: fullname,
    mobileno: mobileno,
    message: message,
  }
  data.querys.push(query);
}

function adduser(fullname, email, password) {
  let user = {
    id: uid++,
    fullname: fullname,
    email: email,
    password: password
  }
  data.users.push(user);
}

function getusers() {
  return [...data.users];
}

function getuserbyid(searchid) {
  let user = data.users.find(user => user.id == searchid);
  return user;
}

function getuserbyemail(searchemail) {
  let user = data.users.find(user => user.id == searchemail);
  return user;
}

module.exports = {
  getusers,
  getquerys,
  addquery,
  adduser,
  getuserbyid,
  getuserbyemail
};
