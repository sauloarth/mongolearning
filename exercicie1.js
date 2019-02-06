const mongoose = require('mongoose');
const Course = require('./models/course2');
const config = require('config');
const debug = require('debug')('ml:exercicies');

mongoose.connect(config.get('dbPath'))
    .then(debug(`Mongo is working on ${config.get('dbPath')} baby!`))
    .catch(err => debug(err));

//printCourses();
//updateCourse('5a68fdf95db93f6477053ddd');
// updateCourseDirectly('5a68fdf95db93f6477053ddd');
//updateCourseDirectlyAfterFind('5a68fdf95db93f6477053ddd');
//removeCourse('5a68fdf95db93f6477053ddd');
removeCourseAfterFind('5a68fde3f09ad7646ddec17e');

async function getCourse() {
    return Course
        .find({ isPublished: true })
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
        .sort('-price')
        .select({ name: 1, author: 1, tags: 1, price: 1 });
}

async function printCourses() {
    const courses = await getCourse();
    courses.forEach((course) => {
        const { name, author, tags, price } = course;
        console.log(`Course: ${name}|Author: ${author}|Tags:${tags} |Price:${price} `);
    })
}

async function updateCourse(id) {

    try {
        const course = await Course.findById(id);
        debug(course);
        if (!course) return debug('Course not found.');

        course.set({
            isPublished: true,
            author: 'New Man'
        })

        const result = await course.save();
        debug(result);
    } catch (err) {
        debug(err);
    }
}

// updating without consulting first

async function updateCourseDirectly(id) {

    try {
        const result = await Course.update({ _id: id }, {
            $set: {
                author: 'Astrogildo Bolovides',
                isPublished: true,
            },
        });

        debug(result); // since value is already save, there's no need to .save
    } catch (err) {
        debug(err);
    }
}

// find before to update 

async function updateCourseDirectlyAfterFind(id) {

    try {
        const course = await Course.findByIdAndUpdate(id, {
            $set: {
                author: 'Banlangandan Jr.',
                isPublished: false,
            },
        }, { new: true });

        debug(course); // since value is already save, there's no need to .save
    } catch (err) {
        debug(err);
    }
}

async function removeCourse(id) {
    try {
        const result = await Course.deleteOne({ _id: id })
        debug(result); // For delete more than one, use deleteMany
    } catch (err) {
        debug(err);
    }
}

async function removeCourseAfterFind(id) {

    try {
        const course = await Course.findByIdAndRemove(id)
        debug(course); // For delete more than one, use deleteMany
    } catch (err) {
        debug(err);
    }
}
