// async function createCourse() {
//     const course = new Course({
//         name: 'CCNA',
//         // author: 'Sid',
//         category: 'web',
//         tags: ['network'],
//         isPublished: true,
//         price: 50,
//         author: '5f7302f67f64c33c60d7b17d'
//     });
//     try {
//         const result = await course.save();
//         console.log(result)
//     }
//     catch (err) {
//         for (field in err.errors)
//             console.log(err.errors[field].message)
//     }
// }
// createCourse()
// async function getCourse() {
//     const result = await Course.find()
//         // .find({price:{$lt:100,$gte:15}})
//         // .find({price:{$in:[10,20,30]}})
//         //     .or([{author:'Sid'},{isPublished:true}])
//         // .and([{author:'Sid'},{isPublished:true}])
//         // .find({author:/^Sid/}) //starts with
//         // .find({author:/Sid$/}) //ends with
//         // .find({author:/^Sid/i}) //starts with, case insensitive
//         // .find({author:/.*Sid.*/i}) //contains sid
//         // .select('name tags')
//         .limit(5)
//         .sort({ name: 1 })
//     // .count()
//     // .skip()//pagination

//     console.log(result)
// }
// // getCourse()

// async function updateCourse(id) {
//     const result = await Course.findByIdAndUpdate(id, {
//         $set: {
//             author: 'Hari',
//             price: 150,
//         }
//     }, { new: true });
//     console.log(result)
// }
// // updateCourse('5f71c06a7cd6ec101cecf127')

const express = require('express');
const router = express.Router();
const { Course, validate } = require('../models/course')
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    const courses = await Course.find().sort('name')
        .populate('author','name')
    res.send({ result: courses })
})

router.post('/', (req, res) => {
    const newItem = new Course({
        name: req.body.name,
        tags: req.body.tags,
        isPublished: req.body.isPublished,
        price: req.body.price,
        category: req.body.category,
        authors: req.body.authors,
    });
    newItem.save().then((result) => res.status(201).json({ success: true, result: req.body }))
        .catch(err => res.status(404).json({ success: false,message:err.message }));

});

//edit
router.put('/:id', (req, res) => {
    Course.find({ _id: req.params.id }).catch(err => res.status(404).json({ success: false, message: "Id not found" }))
    Course.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    }).then((result) => res.status(201).json({ success: true, result: req.body }))
        .catch(err => res.status(404).json({ success: false }));
});

//delete
router.delete('/:id', (req, res) => {
    Course.findById(req.params.id).then(course => course.remove(course).then(() => res.status(200).json({ success: true }))).catch(err => res.status(404).json({ success: false, message: "Id not found" }))
});

//add author to course
router.post('/add-author', (req, res) => {
    const courseId = req.body.courseId
    const author = req.body.author
    const course = Course.find({ _id: courseId })
    course.authors.push(author);
    course.save().then((result) => res.status(201).json({ success: true, result: req.body }))
        .catch(err => res.status(404).json({ success: false, message: err.message }));
    
    

});



module.exports = router
