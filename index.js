require('express-async-errors')

const express = require('express')
const dotenv = require('dotenv/config')
const app = express();
const morgan = require('morgan')
const config = require('config');
const winston = require('winston');


require('./startup/db')();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/prod')(app);

// const debugg = require('debug')('app:startup')


// console.log('Application Name: '+config.get('name'))
// console.log('Mail Host: '+config.get('mail.host'))
// console.log('Mail Password: '+config.get('mail.password'))

console.log(process.env.APP_PASSWORD)



if(app.get('env')==='development'){
    app.use(morgan('tiny'))
    debugg('Morgan enabled........')
}


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => { winston.info('Listening in port ', PORT) })

module.exports = server;
