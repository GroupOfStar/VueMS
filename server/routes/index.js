var express = require ('express');
var router = express.Router ();
var connection = require ('./conn');

// 连接数据库
connection.connect (err => {
  if (err) {
    console.error ('数据库连接失败: ' + err.stack);
    return;
  }
  console.log ('数据库连接成功...,连接ID为：', connection.threadId);
});

// 接收登录请求
router.post ('/api/checkLogin', (req, res) => {
  console.log('req.body.params', req.body)
  // 接收用户名和密码
  let {username, password} = req.body;

  const sqlStr = `select * from users where username='${username}' and password ='${password}'`;
  connection.query (sqlStr, (err, data) => {
    if (err) {
      console.log ('err.sqlMessage :', err.sqlMessage);
    } else {
      res.send (data);
    }
  });
});

// 接收获取用户列表请求
router.get ('/api/getUserList', (req, res) => {
  const sqlStr = 'select * from users';
  connection.query (sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      setTimeout (() => {
        res.send (data);
      }, 1000);
    }
  });
});

// 新增用户数据
router.post ('/api/addUserInfo', (req, res) => {
  let {id, username, password, realname, age, idType} = req.body;
  const sql =
    'insert into users(id,username,password,realname,age,rate,idType) values(0,?,?,?,?,2,?)';
  const sqlParams = [id, username, password, realname, age, idType];
  connection.query (sql, sqlParams, (err, data) => {
    if (err) {
      console.log ('err.sqlMessage :', err.sqlMessage);
    }
    res.send ();
  });
});

// 修改用户数据
router.post ('/api/setUserInfo', (req, res) => {
  let {id, realname, age, rate, idType} = req.body;
  const sql = `update users set realname=?,age=?,rate=?,idType=? where id=?`;
  const sqlParams = [realname, age, rate, idType, id];
  connection.query (sql, sqlParams, (err, data) => {
    if (err) {
      console.log ('err.sqlMessage :', err.sqlMessage);
    }
    res.send ();
  });
});

// 删除用户数据
router.post ('/api/delUserInfo', (req, res) => {
  let {id} = req.body;
  const sqlStr = `delete from users where id='${id}';`;
  connection.query (sqlStr, (err, data) => {
    if (err) {
      console.log ('err.sqlMessage :', err.sqlMessage);
    }
    res.send ();
  });
});

module.exports = router;
