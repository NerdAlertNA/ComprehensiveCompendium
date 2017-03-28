var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;


// Component schema
var ComponentSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_at: Date,
  updated_at: Date,
});

ComponentSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});


// User schema
var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: String,
  created_at: Date,
  updated_at: Date,
  components: [ComponentSchema]
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

ComponentSchema.author = UserSchema.username


var UserModel = mongoose.model("User", UserSchema);
var ComponentModel = mongoose.model("Component", ComponentSchema);

module.exports = {
  User: UserModel,
  Component: ComponentModel
};