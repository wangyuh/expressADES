var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登陆' });
});

router.post('/login',function(req,res){
  var json = req.body;
  var sql = 'SELECT * FROM user WHERE name="'+json.name+'" and password="'+json.password+'"';
  req.getConnection(function(err, conn) {
      if (err) {
          return next(err);
      } else {
          conn.query(sql, [], function(err,result) {
              if (err) {
                  return next(err);
              } else {
                  if(result.length > 0){
                    res.json({success:true, message:"登陆成功"});
                  }else{
                    res.json({success:false,message:"用户名或密码错误"});
                  }                  
              }
          });
      }
  });
});
module.exports = router;