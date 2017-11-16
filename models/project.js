var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var User = require('./user');
var Schema = mongoose.Schema

// define the schema for our user model

var projectSchema = mongoose.Schema({
    projectName: { type: String, required: true},
    projectCode: { type: String, required: true, unique: true },
    Employees: [{ type: Schema.ObjectId , ref: 'User'}]
});

module.exports = mongoose.model('Project', projectSchema);
