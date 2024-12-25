require('dotenv').config();
const express = require('express');
const cors =  require('cors')
const bodyParser = require('body-parser');
const routes = require('./routes'); // Import routes

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', routes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log("server is up on port: " + process.env.PORT)
});
