const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');

router.get('/list', coursesController.showListCourses);
router.post('/create', coursesController.create);

router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.delete);

router.get('/create', coursesController.showCreateForm);
router.get('/:slug', coursesController.showDetails);
router.get('/:id/edit', coursesController.showEditFrom);



module.exports = router;
