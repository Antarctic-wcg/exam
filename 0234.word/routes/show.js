var express = require('express');
var router = express.Router();
var assert = require('assert');
var db = require('../db');
var bcrypt = require('bcrypt');
var salt = 10;

/* GET home page. */
router.get('/', function(req, res) {
  var man = '';
  var lady = '';
  db.user.findOne({email: req.session.email}, function(err, doc){
    assert.equal(err, null);
    req.session.password = doc.password;
    if(doc.sex == '男'){
      man = "checked";
      lady = "";
    }else if(doc.sex === '女'){
      man = "";
      lady = "checked";
    }

    res.render('show', { title: 'show', doc: doc, man: man, lady: lady });
  })
});

router.post('/', function(req, res, next){

  console.log("我在这里",req.session.password);
  if(req.body.password === req.session.password){
    db.user.update(
      {email: req.body.email},
      {$set: req.body}, function(err){
        console.log(err);
      }
    );
  }else {
    bcrypt.hash(req.body.password, salt, (err, hash) =>{
      req.body.password = hash;
      db.user.update(
        {email: req.body.email},
        {$set: req.body}, function(err){
          console.log(err);
        }
      );
    })

  }

  res.redirect('/show');
})


module.exports = router;
