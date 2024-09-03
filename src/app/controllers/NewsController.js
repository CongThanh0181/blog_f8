
class NewsController {

    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug    Nó giống với khái niệm PathVariables trong Spring Famework
    show(req, res) {
        const slug = req.params.slug;
        res.send(slug);
    }
}

module.exports = new NewsController;