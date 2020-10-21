const mongoose = require('mongoose')
const Joi = require('joi');

const Author = mongoose.model('Author', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    bio: {
        type: String,
        required: true,
        minlength: 6,
    },
    website: {
        type: String,
        required: true,
        minlength: 6, 
    }
}))

//validation
validateAuthor = (author) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        bio: Joi.string().min(6).required(),
        website: Joi.string().min(6).required(),
    });
    return schema.validate(author);
};

exports.Author = Author
exports.validate = validateAuthor