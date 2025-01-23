let uid = 1;
const data = {
  querys: [],
  users: []
}


/* Query Data */
function addquery(fullname, mobileno, message) {
  let query = {
    id: uid++,
    fullname: fullname,
    mobileno: mobileno,
    message: message,
    resolved: false
  }
  data.querys.push(query);
  return query;
}

function getquerys() {
  return [...data.querys];
}

function getquerybyid(queryid) {
  return data.querys.find(query => query.id == queryid);
}

function resolvedquerybyid(queryid) {
  let query = getquerybyid(queryid);
  query.resolved = true;
  return query;
}


/* User Data */
function adduser(fullname, email, password) {
  let user = {
    id: uid++,
    fullname: fullname,
    email: email,
    password: password
  }
  data.users.push(user);
  return user;
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

function updateuserbyid(userid, newuser) {
  let user = getuserbyid(userid);
  if (user) {
    user = { ...newuser, id: userid };
    return user;
  }
}

function deleteuserbyid(userid) {
  let user = getuserbyid(userid);
  if (user) {
    data.users = data.users.filter(user => user.id != userid);
    return user;
  }
}


module.exports = {
  getusers,
  getquerys,
  addquery,
  getquerybyid,
  resolvedquerybyid,
  adduser,
  getuserbyid,
  getuserbyemail,
  updateuserbyid,
  deleteuserbyid
};
