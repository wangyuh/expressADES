var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    dbOption = {
      host:"localhost",
      user:"root",
      password:"root123",
      port:3306,
      database:'sys'
    }

//引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
//初始化express
var app = express();

// 模板引擎
//__dirname是node.js中的全局变量，表示取当前执行文件的路径
app.set('views', path.join(__dirname, 'views'));//设置视图存放的目录
app.engine('.html', require('ejs').__express);//引擎设置为ejs并且后缀还是保持.html的配置
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(myConnection(mysql,dbOption,'single'));//作为中间件使用

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/index',indexRouter);

// 生产环境错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

// 开发环境错误处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 输出错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
