const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

// Static files
// eg: http://localhost:3000/img/logo.png
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình method-override để xử lý các method PUT và DELETE thay cho method mặc định của <form>
app.use(methodOverride('_method'));

// Use for POST methods
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Template Engine
// Vì Template Engine không hỗ trợ logic trong file handlebars, nên ta phải dùng helpers để thực hiện được logic
app.engine('handlebars', handlebars.engine({
    extname: '.handlebars',
    helpers: {
        sum: (a, b) => a + b,
    },
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

// HTTP Logger
app.use(morgan('combined'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
