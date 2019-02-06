const config = require('config');
const dbDebug = require('debug')('ml:startupDebug');
const Course = require('./models/course');
const mongoose = require('mongoose');

mongoose.connect(config.get('dbPath'))
    .then(dbDebug('Mongo properly started.'))
    .catch(dbDebug);

// const course1 = new Course({
//     name: 'UX / UI For Developers',
//     author: 'Makaraia',
//     tags: ['ui', 'design', 'ua'],
//     isPublished: true
// });

// createCourse(course1);
getCourses({ isPublished: true });

async function createCourse(course) {
    try {
        const result = await course.save(course);
        dbDebug(result);
    } catch (err) {
        dbDebug(err);
    }
}

const comparisonOperators = {
    equality: { $eq: 10 },
    notEquality: { $ne: 10 },
    greaterThan: { $gt: 10 },
    greaterThanOrEqual: { $gte: 10 },
    lessThan: { $lt: 10 },
    lessThanOrEqual: { $lte: 10 },
    in: { $in: [10, 20, 25, 35] },
    nin: { $nin: [32, 53, 25, 66] }
}

const logicalOperators = {
    //.or[{matricula: entrada}, {name: entrada}] 
    //.and[{matricula: matricula}, {name: name}] - same to use find
}

const pagination = {
    // query sort of like api/courses?pageNumber=2&pageSize=10
    // .skip((pageNumber-1) * pageSize)
}

const importingDataIntoMongo = {
    // command line:
    // mongoimport 
    //     --db nameOfDataBase
    //     --collection nameOfCollection
    //     --file fileWithData.json
    //     --jsonArray (specify format of data on file)
}

async function getCourses(options) {
    try {
        const result = await Course
            .find(options)
            .limit(2)
            .sort({ name: 1 })
            .select({ name: 1, tags: 1 });
        console.log(result);
    } catch (err) {
        dbDebug(err);
    }
}