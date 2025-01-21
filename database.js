let uid = 1;
const data = {
  querys: []
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

module.exports = {
  getquerys,
  addquery
};
