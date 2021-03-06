const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

/** Listen Port */
const port = 3000;

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




app.get('/getAll', (req, res) => {
    res.send(projectmydata);
});


projectmydata = {
};
app.post('/postmydata', (req, res) => {
    console.log(req.body)
    projectmydata = req.body,
        projectmydata.temp = req.body.temp,
        projectmydata.date = new Date(),
        projectmydata.feelings = req.body.feelings
    res.send(projectmydata);
});