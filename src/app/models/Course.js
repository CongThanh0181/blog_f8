const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: String,
    description: String,
    image: String,
}, {
    timestamps: true,
});

// Add plugin Soft delete (https://www.npmjs.com/package/mongoose-delete)
// Course.plugin(mongooseDelete);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Course', Course);

// timestamps: true, Dùng để tự động tạo thêm field createdAt và updatedAt