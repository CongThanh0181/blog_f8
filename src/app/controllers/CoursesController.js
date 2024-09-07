const Course = require('../models/Course');

class CoursesController {

    // [GET] /courses/list
    showListCourses(req, res, next) {
        Course.find({})
            .lean()
            .then((course) => {
                res.render('course/show-list', { course });
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

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.send('Deleted successfully!'))
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