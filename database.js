const { runAsync, getAsync, allAsync } = require("./db");

async function addquery(fullname, mobileno, message) {
  const sql = `INSERT INTO query (fullname, mobileno, message) VALUES (?, ?, ?)`;
  const result = await runAsync(sql, [fullname, mobileno, message]);
  return { id: result.id, fullname, mobileno, message, resolved: false };
}

async function getquerys() {
  const sql = `SELECT * FROM query`;
  return await allAsync(sql);
}

async function getquerybyid(queryid) {
  const sql = `SELECT * FROM query WHERE id = ?`;
  return await getAsync(sql, [queryid]);
}

async function resolvedquerybyid(queryid) {
  const sql = `UPDATE query SET resolved = 1 WHERE id = ?`;
  await runAsync(sql, [queryid]);
  return { id: queryid, resolved: true };
}

async function adduser(fullname, email, password) {
  const sql = `INSERT INTO user (fullname, email, password) VALUES (?, ?, ?)`;
  const result = await runAsync(sql, [fullname, email, password]);
  return { id: result.id, fullname, email, password };
}

async function getusers() {
  const sql = `SELECT * FROM user`;
  return await allAsync(sql);
}

async function getuserbyid(userid) {
  const sql = `SELECT * FROM user WHERE id = ?`;
  return await getAsync(sql, [userid]);
}

async function updateuserbyid(userid, newuser) {
  const sql = `UPDATE user SET fullname = ?, email = ?, password = ? WHERE id = ?`;
  await runAsync(sql, [newuser.fullname, newuser.email, newuser.password, userid]);
  return { id: userid, ...newuser };
}

async function deleteuserbyid(userid) {
  const sql = `DELETE FROM user WHERE id = ?`;
  await runAsync(sql, [userid]);
  return { id: userid };
}

async function addnews(title, content) {
  const sql = `INSERT INTO news (title, content) VALUES (?, ?)`;
  const result = await runAsync(sql, [title, content]);
  return { id: result.id, title, content };
}

async function getnews() {
  const sql = `SELECT * FROM news`;
  return await allAsync(sql);
}

async function deletenewsbyid(newsid) {
  const sql = `DELETE FROM news WHERE id = ?`;
  await runAsync(sql, [newsid]);
  return { id: newsid };
}

async function addadmission(fullname, mobileno, course) {
  const date = new Date().toISOString().split('T')[0];
  const sql = `INSERT INTO admission (fullname, mobileno, course, registerat) VALUES (?, ?, ?, ?)`;
  const result = await runAsync(sql, [fullname, mobileno, course, date]);
  return { id: result.id, fullname, mobileno, course, registerat: date };
}

async function getadmission() {
  const sql = `SELECT * FROM admission`;
  return await allAsync(sql);
}

module.exports = {
  getusers,
  getquerys,
  getnews,
  getadmission,
  addquery,
  getquerybyid,
  resolvedquerybyid,
  adduser,
  getuserbyid,
  updateuserbyid,
  deleteuserbyid,
  addnews,
  deletenewsbyid,
  addadmission
};
