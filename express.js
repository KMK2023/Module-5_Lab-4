// Use the Express App template in Exercise4/m5lab4_expressapp from Google Drive. The friendRoutes.js file details 4 tasks to give more understanding on setting up different types of requests via routes:
// ● Part 1: Add support to the 'filter' endpoint for a new query parameter 'letter' which filters friends by starting letter
// ● Part 2: Modify the 'info' route to only return the user-agent, content-type and accept header data
// ● Part 3: Modify the dynamic GET route to return a single friend object matching the dynamic 'id' request parameter
// ● Part 4: Complete the PUT route which will update data for an existing friend
// Test each of the above with different data, and include some basic data validation.

//Standard way to setup Express
const express = require('express');
const app = express();

//Middleware for friends
const friends = require('./models/friends'); // 

//Middleware for parsing JSON-if incoming data needs json
app.use(express.json());

//Static file server for any HTML used
app.use('/',express.static('public'));

// Friend routes defined
const friendRoutes = require('./routes/friendRoutes');
app.use('/friends', friendRoutes);

//Root path-Get
app.get('/', (req, res) => {
console.log("someone made a get request on'/'");
res.send('The server is responding!')
})

//Server listening
const port = 3000;
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
});