const mongoose = require('mongoose')
let postSchema = new mongoose.Schema({
    title:String,
    body:String,
});

module.exports = mongoose.model('post',postSchema);