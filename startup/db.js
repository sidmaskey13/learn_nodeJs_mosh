const winston = require('winston');
const mongoose = require('mongoose')
const config = require('config')

// module.exports = function() {
//     mongoose.connect('mongodb+srv://sidmas13:GOpass13@learn.aivbc.mongodb.net/learn_node?retryWrites=true&w=majority',
//         {
//             useNewUrlParser: true, 
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//         })
//         .then(() => { winston.info('Mongo Connected'); console.log('Mongo connected') }).catch(err=>console.log(err.message))
// }
module.exports = function () {
    const db = config.get('db')
    mongoose.connect(db,
    {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    )
        .then(() => { winston.info('Mongo Connected'); console.log('Mongo connected') }).catch(err=>console.log(err.message))
}