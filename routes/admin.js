var express = require('express');
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "/public/images" });


const apiAdapter = require('./apiAdapter');
const {
  URL_SERVICE_COURSE,
  URL_SERVICE_ORDER_PAYMENT,
  URL_SERVICE_MEDIA

} = process.env;

const apiCourse = apiAdapter(URL_SERVICE_COURSE);
const apiOrder = apiAdapter(URL_SERVICE_ORDER_PAYMENT);
const apiMedia = apiAdapter(URL_SERVICE_MEDIA);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/view_dashboard');
});

// course
router.get('/course', async function (req, res, next) {
  try {
    const course = await apiCourse.get('/api/courses');
    dataCourse = course.data.data.data;
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }

    res.render('admin/view_course', {
      dataCourse,
      alert
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
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/course');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/course');
  }


});
router.put('/course', async function (req, res, next) {
  const { id, name, thumbnail, certificate, type, price, status, level, description, mentor_id } = req.body;

  try {
    await apiCourse.put(`/api/courses/${id}`, { name, thumbnail, certificate: Boolean(certificate), type, price, status, level, description, mentor_id });
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/course');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/course');
  }


});
router.delete('/course/:id', async function (req, res, next) {
  const { id } = req.params;

  try {
    await apiCourse.delete(`/api/courses/${id}`);
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/course');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/course');
  }


});
// course

// chapter
router.get('/chapter', async function (req, res, next) {
  try {
    const chapter = await apiCourse.get('/api/chapters');
    dataChapter = chapter.data.data;
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }

    res.render('admin/view_chapter', {
      dataChapter,
      alert
    });
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }

});
router.post('/chapter', async function (req, res, next) {
  const { name, course_id } = req.body;

  try {
    await apiCourse.post('/api/chapters', { name, course_id });
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/chapter');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/chapter');
  }


});
router.put('/chapter', async function (req, res, next) {
  const { id, name, course_id } = req.body;

  try {
    await apiCourse.put(`/api/chapters/${id}`, { name, course_id });
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/chapter');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/chapter');
  }


});
router.delete('/chapter/:id', async function (req, res, next) {
  const { id } = req.params;

  try {
    await apiCourse.delete(`/api/chapters/${id}`);
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/chapter');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/chapter');
  }


});
// chapter

// lesson
router.get('/lesson', async function (req, res, next) {
  try {
    const lesson = await apiCourse.get('/api/lessons');
    dataLesson = lesson.data.data;

    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }

    res.render('admin/view_lesson', {
      dataLesson,
      alert
    });
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }

});
router.post('/lesson', async function (req, res, next) {
  const { name, video, chapter_id } = req.body;

  try {
    await apiCourse.post('/api/lessons', { name, video, chapter_id });
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/lesson');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/lesson');
  }


});
router.put('/lesson', async function (req, res, next) {
  const { id, name, video, chapter_id } = req.body;

  try {
    await apiCourse.put(`/api/lessons/${id}`, { name, video, chapter_id });
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/lesson');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/lesson');
  }


});
router.delete('/lesson/:id', async function (req, res, next) {
  const { id } = req.params;

  try {
    await apiCourse.delete(`/api/lessons/${id}`);
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/lesson');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/lesson');
  }


});
// lesson

// mentor
router.get('/mentor', async function (req, res, next) {
  try {
    const mentor = await apiCourse.get('/api/mentors');
    dataMentor = mentor.data.data;

    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }

    res.render('admin/view_mentor', {
      dataMentor,
      alert
    });
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }

});
router.post('/mentor', async function (req, res, next) {
  const { name, profile, email, profession } = req.body;

  try {
    await apiCourse.post('/api/mentors', { name, profile, email, profession });
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/mentor');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/mentor');
  }


});
router.put('/mentor', async function (req, res, next) {
  const { id, name, profile, email, profession } = req.body;

  try {
    await apiCourse.put(`/api/mentors/${id}`, { name, profile, email, profession });
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/mentor');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/mentor');
  }


});
router.delete('/mentor/:id', async function (req, res, next) {
  const { id } = req.params;

  try {
    await apiCourse.delete(`/api/mentors/${id}`);
    req.flash('alertMessage', 'Success');
    req.flash('alertStatus', 'success');
    res.redirect('/dashboard/mentor');
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/dashboard/mentor');
  }


});
// mentor

// order
router.get('/transaction', async function (req, res, next) {
  try {
    const order = await apiOrder.get('/api/orders');
    dataOrder = order.data.data;


    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }

    res.render('admin/view_order', {
      dataOrder,
      alert
    });
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
});
// order

// media
router.get('/media', async function (req, res, next) {
  try {
    const media = await apiMedia.get('/media');
    dataMedia = media.data.data;


    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }

    res.render('admin/view_media', {
      dataMedia,
      alert
    });
  } catch (error) {

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
});

// media

module.exports = router;
