const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: String,
    name: String,
    author: String,
    date: { type: Date, default: Date.now },
    tags: [String],
    isPublished: Boolean,
    price: Number,
})

module.exports = mongoose.model('Course', courseSchema);