// 以下是利用Node自带的Express（默认使用body-parser作为请求体解析中间件）来处理post提交的数据请求
var express = require ('express');
var bodyParser = require ('body-parser');

// 引用连接数据库模块
const connection = require ('./conn');

// 连接数据库
connection.connect (() => {
  console.log ('数据库连接成功...');
});

var apiServer = express ();
apiServer.use (bodyParser.urlencoded ({extended: true}));
apiServer.use (bodyParser.json ());
var apiRouter = express.Router ();

// 接收请求
apiRouter.post ('/checkLogin', (req, res) => {
  // 接收用户名和密码
  let {username, password} = req.body.params;

  const sqlStr = `select * from users where username= '${username}' and password = '${password}'`
  connection.query(sqlStr, (err, data) => {
    if(err){
      throw err;
    }else{
      res.send(data)
    }
  })
  // res.send('111111')
  // console.log(req,res)
  // console.log ('接收用户信息111：', username, password);
});

apiServer.use ('/api', apiRouter);

apiServer.listen (8081, () => {
  console.log ('服务器已经启动...');
});