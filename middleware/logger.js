// Importing moment installed with 'npm i moment' to deal with datae and time
const moment = require('moment');

// Creating middleware for log
const logger = (req, res, next) => {
    // This is how we get url of page where app is served and with 'momemt' we get date and time
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    // Next is used to finish this and go to next middleware if there is 
    next();
}

module.exports = logger;