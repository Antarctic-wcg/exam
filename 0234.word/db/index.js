var mongoose = require('mongoose');
var url = 'mongodb://10.198.1.213:27017/exam';
mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true});


var db = mongoose.connection;

db.on('error', function(){
  console.log('Connect error');
})
db.once('open', function(){
  console.log('mongoose working!!!');
})

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  name: {type: String, default: ''},
  sex: {type: String, default: ''},
  age: {type: Number, default: ''},
  data: {type: String, default: ''}
})
var User = mongoose.model('user', userSchema);
module.exports.user = User;
