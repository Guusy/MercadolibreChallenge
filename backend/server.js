const express = require('express');
const app = express();
const cors = require('cors');
// Setting routes.

const apiRouter = require('./routes/api');

app.use(cors());
app.use('/api/', apiRouter);


app.listen(4000);
console.log('Express corre en el puerto 4000');