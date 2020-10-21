const mongoose = require('mongoose')
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 12,
    },
    isGold: Boolean
}))

//validation
validateCustomer = (customer) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.number().min(4999).max(9999999999).required(),
        isGold: Joi.boolean().required(),
    });
    return schema.validate(customer);
};

exports.Customer = Customer
exports.validate = validateCustomer