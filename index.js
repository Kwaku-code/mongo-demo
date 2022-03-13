const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
     name: String,
     author: String,
     tags:[ String ],
     date: { type: Date, default: Date.now },
     isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
};

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    
    
    const courses = await Course
        .find({author: 'Mosh', isPublished: true})
        // .find()
        // .or([ {author: 'Mosh'}, {isPublished: true} ])
        // .find({price: { $in: [10, 15, 20] } })
        // Starts with Mosh
        // .find({ author: /^Mosh/ })
        // Ends with Hamedani
        // .find({ author: /Hamedani$/i})
        // Contains Mosh
        // .find({ author: /.*Mosh.*/i})
        .skip((pageNumber -1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .count()
        // .select({ name:1, tags:1});
    console.log(courses);
};

async function updateCourse(id) {
    // Query First
    // const course = await Course.findById(id);
    // if (!course) return;

    // course.isPublished = true;
    // course.author = 'Another Author';

    // const result = await course.save();
    // console.log(result);

    // Update First
    // const result = await Course.update({ _id: id }, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // });

    // Update First and Return the Document that was Updated
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: false
        }
    }, { new: true});
    console.log(course);
}

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    // console.log(result);

    // Delete many documents
    // const result = await Course.deleteMany({ _id: id });
    
    // Return document that was deleted
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

removeCourse('622c76f85e8c5e4bbc606510');