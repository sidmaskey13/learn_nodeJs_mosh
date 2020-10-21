const mongoose = require('mongoose')
const Joi = require('joi');
const { genreSchema } = require('./genre')

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true,
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        max:255,
        required: true,
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true,
    },
}))

//validation
validateMovie = (customer) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        numberInStock: Joi.number().min(0).max(9999).required(),
        dailyRentalRate: Joi.number().min(0).max(9999).required(),
        genreId: Joi.objectId().required(),
    });
    return schema.validate(customer);
};

exports.Movie = Movie
exports.validate = validateMovie