var express = require('express');
var router = express.Router();
var db = require('../db');
var assert = require('assert');
var bcrypt = require('bcrypt');
var salt = 10;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'login', err: '', email: '',user: ''});
});

router.post('/', function(req, res) {
  req.session.email = req.body.email;
  
  db.user.findOne({email: req.body.email}, function(err, doc){
        if(doc){
        bcrypt.compare(req.body.password, doc.password, function(err, hash) {
          if (hash) {
            console.log(hash);
            res.redirect('/show');
          } else {
            res.render('login', { title: 'login', err: '密码错误!!!', email: req.body.email, user: ''});
          }
        });
      }else {
        res.render('login', { title: 'login', err: '', email: req.body.email, user: "用户名错误!!"});
      }
  });
});


module.exports = router;
