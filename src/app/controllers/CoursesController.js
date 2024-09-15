const Course = require('../models/Course');

class CoursesController {

    // [GET] /courses/list
    showListCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsWithDeleted({ deleted: true })])
            .then(([course, deletedCount]) => {

                // Chuyển đổi từng course thành plain object. Vì dùng promise không dùng được hàm lean()
                const plainCourses = course.map(course => course.toObject());
                res.render('course/show-list', {
                    deletedCount,
                    course: plainCourses
                });
            })
            .catch(next);
    }

    showListCoursesTrash(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .lean()
            .then((course) => {
                res.render('course/show-list-trash', { course });
            })
            .catch((error) => {
                next(error);
            });
    }

    // [GET] /courses/:id/edit
    showEditFrom(req, res, next) {
        let id = req.params.id;
        Course.findById(id)
            .lean()
            .then((course) => {
                res.render('course/edit', { course });
            })
            .catch((error) => {
                next(error);
            });
    }

    // [GET] /courses/:slug
    showDetails(req, res, next) {
        const slug = req.params.slug;
        Course.findById(slug)
            .lean()
            .then((item) => {
                let course = [item];
                res.render('course/detail', { course });
            })
            .catch((error) => {
                next(error);
            });
    }

    // [GET] /courses/create
    showCreateForm(req, res, next) {
        res.render('course/create')
    }

    // [POST] /courses/create
    create(req, res, next) {
        let course = new Course(req.body);
        course.save()
            .then(() => { res.redirect('/home') })
            .catch((error) => { next(error) });
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/courses/list'))
            .catch(next);
    }

    // [DELETE] /courses/:id    (SOFT DELETE)
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.send('Deleted successfully!'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force      (FOREVER DELETE)
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.send('Deleted successfully!'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restoreCourse(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.send('Restore successfully!'))
            .catch(next);
    }

}

module.exports = new CoursesController();



// .then((item) => {
//     let course = [item];
//     res.render('home', { course });
// })
// Giải thích:
// item: chính là record mà db trả về
// let course: phải tạo lại 1 array vì bên view home nhận về 1 array course và loof nó để render ra UI
// res.render('home', { course }); Hàm render ra UI có view là home và truyền object là 1 mảng course để render