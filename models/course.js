const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now }, // setting a default value
    isPublished: Boolean
})

module.exports = mongoose.model('Course', courseSchema);