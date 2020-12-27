var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/view_dashboard');
});
router.get('/course', function (req, res, next) {
  res.render('admin/view_course');
});
router.get('/chapter', function (req, res, next) {
  res.render('admin/view_chapter');
});
router.get('/lesson', function (req, res, next) {
  res.render('admin/view_lesson');
});
router.get('/mentor', function (req, res, next) {
  res.render('admin/view_mentor');
});
router.get('/transaction', function (req, res, next) {
  res.render('admin/view_order');
});

module.exports = router;
