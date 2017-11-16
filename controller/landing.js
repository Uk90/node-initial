var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var session = require('express-session');
var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var User = require('../models/user');
var Project = require('../models/project');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.urlencoded({extended: true}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

require('../config/passport')(passport);


app.post('/register', passport.authenticate('local-signup', function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json({message:"Success", username: 'username'});
  }));

  exports.register = function(req, res) {
  User.findOne( { $or:[ {'email': req.body.email}, {'employeeId':req.body.employeeId} ]}, function(err, user) {
    console.log('13');
      // if there are any errors, return the error
      if (err){
        console.log(12);
        return res.json({status:"Failure", message: err});
      }
      // check to see if theres already a user with that email
      if(user) {
        if (user.email == req.body.email) {
          return res.json({status:"Failure", message: 'email already exist'});
      } else if (user.employeeId == req.body.employeeId){
        return res.json({status:"Failure", message: 'employeeId already exist'});
      }
    }else {
          // if there is no user with that email
          // create the user
          var newUser            = new User();

          // set the user's local credentials
          newUser.firstname    = req.body.firstName;
          newUser.lastname    = req.body.lastName;
          newUser.email    = req.body.email;
          newUser.employeeId    = req.body.employeeId;
          newUser.password = newUser.generateHash(req.body.password);

          // save the user
          newUser.save(function(err) {
              if (err)
                  throw err;
              return res.json({status:"Success", user: newUser});

          });
      }

  });

  }

  exports.project = function(req, res) {
    console.log(req.body.projectName);
  Project.findOne( { $or:[ {'projectName': req.body.projectName}, {'projectCode':req.body.projectCode} ]}, function(err, project) {
      // if there are any errors, return the error
      // if (err){
      //   return res.json({status:"Failure", message: handleError(err)});
      // }
       if (err) return handleError(err);
      // check to see if theres already a project with that email
      if(project) {
        if (project.projectName == req.body.projectName) {
          return res.json({status:"Failure", message: 'projectNames already exist'});
      } else if (project.projectCode == req.body.projectCode){
        return res.json({status:"Failure", message: 'projectCode already exist'});
      }
    }else {
      console.log('******************************************');
          // if there is no project with that email
          // create the project
          var newProject            = new Project();

          // set the project's local credentials
          newProject.projectName    = req.body.projectName;
          newProject.projectCode    = req.body.projectCode;

          // save the project
          newProject.save(function(err) {
              if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                 return res.json({status:"Failure", message: 'projectNames already exist'});
               }else{
                 return res.json({status:"Failure", message: 'something went wrong'});
               }
                }
              return res.json({status:"Success", project: newProject});

          });
      }

  });

  }

  exports.getEmpList = function(req, res) {
    User.find( {}, function(err, user) {
        if (err){
          return res.json({status:"Failure", message: err});
        }
        if(!user) {
            return res.json({status:"Failure", message: 'No Records Found '});
      }else {
            return res.json({status:"Success", user: user});
        }
    });
  }


  exports.updateEmp = function(req, res) {
    User.findOne({ 'email': req.params.email }, function(err, user) {
        if (err){
          return res.json({status:"Failure", message: err});
        }
        if(!user) {
          User.findByIdAndUpdate(new ObjectID(req.params.id), {'firstname': req.body.firstname, 'lastname': req.body.lastname, 'employeeId': req.body.employeeId}, function(err, user) {
            if (err){
              return res.json({status:"Failure", message: err});
            }
            return res.json({status:"Success", message: 'updated successfully' });
          });
        }else {
            if(user._id !== req.params.id){
              return res.json({status:"Failure", message:"Email already exist"});
            }
            User.findByIdAndUpdate(new ObjectID(req.params.id), {'firstname': req.body.firstname, 'lastname': req.body.lastname, 'employeeId': req.body.employeeId}, function(err, user) {
              if (err){
                return res.json({status:"Failure", message: err});
              }
              return res.json({status:"Success", message: 'updated successfully' });
            });
          }
    });
  }

  exports.deleteEmp = function(req, res) {
    User.findByIdAndRemove(new ObjectID(req.params.id), function(err) {
        if (err){
          return res.json({status:"Failure", message: err});
        }
            return res.json({status:"Success", message: 'Deleted successfully '});
    });
  }

  exports.getProjects = function(req, res) {
    Project.find( {}, function(err, projects) {
        if (err){
          return res.json({status:"Failure", message: err});
        }
        if(!projects) {
            return res.json({status:"Failure", message: 'No Records Found '});
      }else {
            return res.json({status:"Success", projects: projects});
        }
    });
  }


  exports.addEmployee = function(req, res) {

  Project.findOne({'_id':new ObjectID(req.params.id)}, function(err, project) {
       if (err)
         return res.json({status:"Failure", message: 'Something went wrong'});
      // check to see if already a project with that id
      if(project) {
        var index = project.Employees.indexOf(req.body._id);
        if(index !== -1){
          return res.json({status:"Failure", message: 'Employee already added'});
        }

        project.Employees.push(req.body._id);
        project.save(function(err) {
            if (err)
             return res.json({status:"Failure", message: 'something went wrong'});

         User.findOne({'_id':new ObjectID(req.body._id)}, function(err, user) {
           user.project.push(req.params.id);
           user.save();
         });
         return res.json({status:"Success", message: 'done'});
        });

    }else {
      return res.json({status:"Failure", message: 'no project found'});
      }
  });

  }

  exports.deleteEmployee = function(req, res) {

    Project.findOne({'_id':new ObjectID(req.params.id)}, function(err, project) {
      var index = project.Employees.indexOf(req.body._id);
      project.Employees.splice(index, 1);
      project.save();
    });
    User.findOne({'_id':new ObjectID(req.body._id)}, function(err, user) {
      var prjIndex = user.project.indexOf(req.params.id);
      user.project.splice(prjIndex, 1);
      user.save();
    });
    return res.json({status:"Success", message: 'done'});
  }

  exports.listEmployee = function(req, res) {

    Project
    .findOne({'_id':new ObjectID(req.params.id)})
    .populate('Employees') // <--
    .exec(function (err, project) {
      if (err)
      return res.json({status:"Failure", message: 'something went wrong'});

      return res.json({status:"Success", projects: project.Employees});
      // prints "The creator is Aaron"
    })

  }
  exports.listProject = function(req, res) {

    User
    .findOne({'_id':new ObjectID(req.params.id)})
    .populate('project') // <--
    .exec(function (err, user) {
      if (err)
      return res.json({status:"Failure", message: 'something went wrong'});

      return res.json({status:"Success", projects: user});
      // prints "The creator is Aaron"
    })

  }
