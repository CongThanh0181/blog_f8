const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');

router.get('/list', coursesController.showListCourses);
router.get('/list-trash', coursesController.showListCoursesTrash);
router.post('/create', coursesController.create);

// Restore Course
router.patch('/:id/restore', coursesController.restoreCourse);
// Update Course
router.put('/:id', coursesController.update);
// FORVER DELETE
router.delete('/:id/force', coursesController.forceDestroy);
// SOFT DELETE
router.delete('/:id', coursesController.delete);

router.get('/create', coursesController.showCreateForm);
router.get('/:slug', coursesController.showDetails);
router.get('/:id/edit', coursesController.showEditFrom);



module.exports = router;
