
class SiteController {

    // [GET] /home
    index(req, res) {
        res.render('home');
    }

    // [GET] /Search
    search(req, res) {
        res.render('search');
    }

    // [POST] /searchInput
    searchPOST(req, res) {
        res.send(req.body.searchInput)
    }
}

module.exports = new SiteController;