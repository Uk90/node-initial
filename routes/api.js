var express = require('express');
var router = express.Router();
var LandingController  = require('../controller/landing');
/* Statement Apis. */
router.post('/v1/users/login', function(req, res, next) {
  res.send('respond with a resource');

});
router.post('/v1/users', LandingController.register);
router.post('/v1/users/project', LandingController.project);
router.get('/v1/getEmpList', LandingController.getEmpList);
router.post('/v1/employee/edit/:id', LandingController.updateEmp);
router.get('/v1/employee/delete/:id', LandingController.deleteEmp);
// router.post('/api/v1/users/login', function(req, res, next) {
router.get('/v1/getProjectList', LandingController.getProjects);
router.post('/v1/project/:id/addEmployee', LandingController.addEmployee);
router.get('/v1/project/:id/listEmployee', LandingController.listEmployee);
router.get('/v1/project/:id/listProject', LandingController.listProject);
router.post('/v1/project/:id/deleteEmployee', LandingController.deleteEmployee);
//   //res.sendfile('index.html');
//   res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({ a: 1 }));
// });


module.exports = router;
