const Course = require('../models/Course');


class SiteController {
    // [GET] /home
    // next là function sẽ đẩy error vào midleware
    // find().lean() để chọc vào DB lấy ra data và đổ vào views bằng .render()
    index(req, res, next) {
        Course.find({})
            .lean()
            .then((course) => {
                res.render('home', { course });
            })
            .catch((error) => {
                next(error);
            });

    }

    // [GET] /Search
    search(req, res) {
        res.render('search');
    }

    // [POST] /search
    searchPOST(req, res) {
        res.send(req.body.searchInput);
    }
}

module.exports = new SiteController();
