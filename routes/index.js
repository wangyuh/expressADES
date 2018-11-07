var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: '首页' });
});

router.get('/list', function (req, res) {
    var sql = 'SELECT * FROM user';
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query(sql, [], function (err, result) {
                if (err) {
                    return next(err);
                } else {
                    res.json({ success: true, data: result });
                }
            });
        }
    });
});

router.post('/add', function (req, res) {
    var json = req.body;
    var sql = "INSERT INTO user(name,age,password) VALUES ('" + json.name + "','" + json.age + "','" + json.password + "')";
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query(sql, [], function (err, result) {
                if (err) {
                    return next(err);
                } else {
                    res.json({ success: true, data: result });
                }
            });
        }
    });
});

router.post('/edit', function (req, res) {
    var json = req.body;
    var sql = "UPDATE user set ? where id="+json.id;
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query(sql, json, function (err, result) {
                if (err) {
                    return next(err);
                } else {
                    res.json({ success: true, data: result });
                }
            });
        }
    });
});

router.post('/delete', function (req, res) {
    var json = req.body;
    var sql = 'DELETE FROM user WHERE ?';
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query(sql, json, function (err, result) {
                if (err) {
                    return next(err);
                } else {
                    res.json({ success: true, data: result });
                }
            });
        }
    });
});

router.post('/inquiry', function (req, res) {
    var json = req.body;
    var sql = 'select * from user WHERE ?';
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            conn.query(sql, json, function (err, result) {
                if (err) {
                    return next(err);
                } else {
                    res.json({ success: true, data: result });
                }
            });
        }
    });
});

module.exports = router;
