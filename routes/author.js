const express = require('express');
const router = express.Router();
const { Author, validate } = require('../models/author')
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    const authors = await Author.find().sort('name')
    res.send({ result: authors })
})

router.post('/', (req, res) => {
    const { error } = validate(req.body)
    if (error) { return res.status(400).send(error.details[0].message) }
    const newItem = new Author({
        name: req.body.name,
        bio: req.body.bio,
        website: req.body.website,
    });
    newItem.save().then((result) => res.status(201).json({ success: true, result: req.body }))
        .catch(err => res.status(404).json({ success: false }));

});

//edit
router.put('/:id', (req, res) => {
    Author.find({ _id: req.params.id }).catch(err => res.status(404).json({ success: false, message: "Id not found" }))
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    Author.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        bio: req.body.bio,
        website: req.body.website,
    }).then((result) => res.status(201).json({ success: true, result: req.body }))
        .catch(err => res.status(404).json({ success: false }));
});

//delete
router.delete('/:id', (req, res) => {
    Author.findById(req.params.id).then(data => data.remove(data).then(() => res.status(200).json({ success: true }))).catch(err => res.status(404).json({ success: false, message: "Id not found" }))
});



module.exports = router
