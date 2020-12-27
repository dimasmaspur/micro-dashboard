const express = require('express');
const router = express.Router();
const lessonHandler = require('./handler/lessons');

const verifyToken = require('../middlewares/verifyToken');


router.get('/', lessonHandler.getAll);
router.get('/:id', lessonHandler.get);
router.post('/',verifyToken, lessonHandler.create);
router.put('/:id',verifyToken, lessonHandler.update);
router.delete('/:id',verifyToken, lessonHandler.destroy);

module.exports = router;
