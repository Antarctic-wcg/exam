var express = require('express');
var router = express.Router();
var db = require('../db');
var assert = require('assert');
var bcrypt = require('bcrypt');
var salt = 10;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('register', { title: 'register', err: '', email: '' });
});

router.post('/', function(req, res){
  console.log(req.body);
  db.user.findOne({email: req.body.email}, (err, doc) => {
    assert.equal(null, err);
    console.log(doc);
    if(doc === null){
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        var user = new db.user({
          email: req.body.email,
          password: hash
        });
        user.save((err, data) => {
          assert.equal(err, null);
          res.redirect('/login');
        })
      })
    }else{
      res.render('register', { title: 'register', err: "该邮箱已用做注册!!", email: req.body.email });
    }


  })
})


module.exports = router;
