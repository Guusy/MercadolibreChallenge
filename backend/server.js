const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Setting routes.

const apiRouter = require('./routes/api');

app.use('/api/', apiRouter);


app.listen(4000);
console.log('Express corre en el puerto 4000');