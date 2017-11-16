// // grab the things we need
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// // create a schema
// var userSchema = new Schema({
//   firstname: { type: String, required: true },
//   lastname: String,
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   created_at: Date,
//   updated_at: Date
// });

// // the schema is useless so far
// // we need to create a model using it
// var User = mongoose.model('User', userSchema);

// // make this available to our users in our Node applications
// module.exports = User;
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema

// define the schema for our user model
var userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email        : { type: String, required: true },
    password     : String,
    employeeId    :String,
    project: [{ type: Schema.ObjectId , ref: 'Project' }]
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
