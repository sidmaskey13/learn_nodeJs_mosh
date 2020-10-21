const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const validateObjectId = require('../middleware/validateObjectId')
const { Genre, validate } = require('../models/genre')
const Joi = require('joi');
const bodyParser = require('body-parser');
const asyncMiddleware = require('../middleware/async');
router.use(bodyParser.json()); 


router.get('/', async (req, res) => {
    // throw new Error('Cant get genres at all')
    const genres = await Genre.find().sort('name')
    res.send({ genres }); 
});

router.get('/:id',validateObjectId, async (req, res) => {
    
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('Genre with given id doesnt exist')
    res.send({ genre }); 
});

router.post('/', [auth], async (req, res) => {
// router.post('/', [auth,admin], (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let genre = new Genre({
        name: req.body.name,
    });
    genre = await genre.save()
    res.send(genre);
    // newItem.save().then((result) => res.status(201).json({ success: true, result: req.body }))
    //     .catch(err => res.status(404).json({ success: false }));

});

//edit
router.put('/:id', (req, res) => {
    Genre.find({ _id: req.params.id }).catch(err => res.status(404).json({ success: false, message: "Id not found" }))
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    Genre.updateOne({ _id: req.params.id }, {
        name: req.body.name,
    }).then((result) => res.status(201).json({ success: true, result: req.body }))
        .catch(err => res.status(404).json({ success: false }));
});

//delete
router.delete('/:id', (req, res) => {
    Genre.findById(req.params.id).then(genre => genre.remove(genre).then(() => res.status(200).json({ success: true }))).catch(err => res.status(404).json({ success: false, message: "Id not found" }))
});


module.exports = router