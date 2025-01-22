let uid = 1;
const data = {
  querys: [],
  users: []
}

function getquerys() {
  return [...data.querys];
}

function getquerybyid(queryid) {
   return data.querys.find(query => query.id == queryid);
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

function getuserbyid(userid) {
  let user = data.users.find(user => user.id == userid);
  return user;
}

function getuserbyemail(useremail) {
  let user = data.users.find(user => user.id == useremail);
  return user;
}

module.exports = {
  getusers,
  getquerys,
  getquerybyid,
  addquery,
  adduser,
  getuserbyid,
  getuserbyemail
};
