const express = require('express')
const morgan = require('morgan')
const path = require('path')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

// Static files
// eg: http://localhost:3000/img/logo.png
app.use(express.static(path.join(__dirname, 'public')));

// Template Engine
app.engine('handlebars', handlebars.engine({ extname: '.handlebars' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

// HTTP Logger
app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/news', (req, res) => {
    res.render('news');
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})