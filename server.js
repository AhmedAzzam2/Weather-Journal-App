const cors = require('cors'); 
const express = require('express');
const bodyParser = require('body-parser');

/** Listen Port */
const port = 1000;

// Setup empty JS object to act as endpoint for all routes
projectmydata = {};

// Start up an instance of app
const app = express();



/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
 
app.listen(port, () => {
    console.log(`Server On: http://localhost:${port}`);
});



// Require Express to run server and routes
/**
 * Get All mydata By The: http://localhost:1000/getAll
 */
app.get('/getAll', (request, response) => {
    response.send(projectmydata).status(200).end();
});



/**
 * Post mydata By The: http://localhost:1000/postmydata
 */
app.post('/postmydata', (request, response) => {
    //Post mydata Now
    projectmydata={
        temp:request.body.temp,
        date:request.body.date,
        content:request.body.content 
    };
    response.send(projectmydata).status(404).end();
});
 