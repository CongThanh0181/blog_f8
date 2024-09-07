const mongoose = require('mongoose');

// Config connection to database
async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education-dev');
        console.log('Connect DB successfully');
    } catch (error) {
        console.log('connect DB error: ' + error);
    }

}

module.exports = { connect }