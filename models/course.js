const mongoose = require('mongoose')
const Joi = require('joi');
const authorSchema = new mongoose.Schema({
    name: String
}) 
const Course = mongoose.model('Course', new mongoose.Schema({
    name:String,
    // author:String,
    tags: {
        type: Array,
        validate: {
            // isAsync:true
            validator: function (v) {
                return v && v.length > 0;                
            },
            // validator: function (v,callback) {
            // setTimeout(() => {
            //     cosnt result =  v && v.length > 0;
            //     callback(result); 
            // }, 4000);
            // },
            message:'A course should have atleast 1 tag.'
        }
    },
    isPublished:Boolean,
    price: {
        type: Number,
        min: 10,
        max: 200,
        set: v => Math.round(v),
        get: v => Math.round(v),
        required:function () {
            return this.isPublished
        }
    },
    category: {
        type: String,
        lowercase: true,
        // trim:true,
        enum: ['web','mobile','desktop','network']
    },
    date: { type: Date, default: Date.now() },
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Author'
    // }
    // author: {
    //     type: authorSchema,
    //     required: true
    // },
    authors: [authorSchema]
}))

//validation
validateCourse = (course) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        isPublished: Joi.boolean().required(),
    });
    return schema.validate(course);
};

exports.Course = Course
exports.validate = validateCourse