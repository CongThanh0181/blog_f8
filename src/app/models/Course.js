const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: String,
    description: String,
    image: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', Course);

// timestamps: true, Dùng để tự động tạo thêm field createdAt và updatedAt