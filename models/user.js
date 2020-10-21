const mongoose = require('mongoose')
const Joi = require('joi');
const config = require('config')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        unique:true
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 1024,
        required: true,
    },
    isAdmin:Boolean
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}
 
const User = mongoose.model('User', userSchema)

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this.id }, config.get('jwtPrivateKey'));
//     return token;
// }


validateUserRegister = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(3).max(255).required(),
    });
    return schema.validate(user);
};

validateUserLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(3).max(255).required(),
    });
    return schema.validate(user);
};

exports.User = User;
exports.validateRegister = validateUserRegister;
exports.validateLogin = validateUserLogin;