var express = require('express');
var router = express.Router();
const apiAdapter = require('./apiAdapter');
const {
  URL_SERVICE_COURSE
} = process.env;

const apiCourse = apiAdapter(URL_SERVICE_COURSE);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/view_dashboard');
});

// course
router.get('/course', async function (req, res, next) {
  try {
    const course = await apiCourse.get('/api/courses');
    dataCourse = course.data.data.data;
    res.render('admin/view_course', {
      dataCourse
    });
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }

});
router.post('/course', async function (req, res, next) {
  const { name, thumbnail, certificate, type, price, status, level, description, mentor_id } = req.body;

  try {
    await apiCourse.post('/api/courses', { name, thumbnail, certificate: Boolean(certificate), type, price, status, level, description, mentor_id });
    res.redirect('/dashboard/course');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }


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
