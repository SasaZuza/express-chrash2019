// Importing express
const express = require('express');
// Importing path to work with file paths
const path = require('path');
// Import tool for creating templates - 'npm install express-handlebars'
const exphbs = require('express-handlebars')
// Importing logger middleware
const logger = require('./middleware/logger');
// Importing 'Members.js' file
const members = require('./Members')


// Initialize variable with express
const app = express();

// Handlebars middlaware for creating templates
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Using this middleware from above
// app.use(logger);

// This is older way and can be complicated with many files and options
/*
// Creating route 
app.get('/', (req, res) => {
    // Sending simple message to browser
    // res.send('<h1>Hello World!</h1>')

    // Sending a file
    // res.sendFile(path.join(__dirname, 'public', 'index.html'))
});
*/

// Body parser middleware so we can send data with 'post' request
app.use(express.json());
// This is how we handle form submitions
app.use(express.urlencoded({ extended: false }));

// Seting home page route with 'index.handlebars'
app.get('/', (req, res) => res.render('index', {
    title: 'Member APP',
    // Adding members array from 'Members.js' file
    members
}));

// Better way is with creating static folder and point to it
app.use(express.static(path.join(__dirname, 'public')));

// This is how we require routes from folder 'routes'
app.use('/api/members', require('./routes/api/members'))

// Creating port variable that connects to envirenment variables or this port
const PORT = process.env.PORT || 5000;

// Listening and connecting to this PORT variable
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));