const winston = require('winston');
require('express-async-errors')

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.Console({ colorize:true, prettyPrint:true }),
        new winston.transports.File({ filename: 'logfile.log' })
    );

    process.on('unhandledRejection', ex => {
        winston.error(ex.message, ex);
        process.exit(1);
    });
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
}
