const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie')
const bodyParser = require('body-parser');
const { Genre } = require('../models/genre');
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title')
    res.send({ result: movies })
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre')
    
    const movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name:genre.name
        },

    });
    await movie.save()
    res.send(movie);
});

//edit
router.put('/:id', (req, res) => {
    Movie.find({ _id: req.params.id }).catch(err => res.status(404).json({ success: false, message: "Id not found" }))
    Movie.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: req.body.genre,
    }).then((result) => res.status(201).json({ success: true, result: req.body }))
        .catch(err => res.status(404).json({ success: false }));
});

//delete
router.delete('/:id', (req, res) => {
    Movie.findById(req.params.id).then(movie => movie.remove(movie).then(() => res.status(200).json({ success: true }))).catch(err => res.status(404).json({ success: false, message: "Id not found" }))
});




module.exports = router
