const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express(); 
const PORT = 3030;
const ENVIRON = process.env.ENVIRON || 'production'; 
const imovel = require('./imovel/imovel.routes');

if (ENVIRON === 'production') {
    mongoose.connect('mongodb://angoncal:Andre95153565@ds229373.mlab.com:29373/gbet', { useNewUrlParser: true });
    app.use(cors())
} else {
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/imovel', imovel);

app.listen(PORT, () => console.log('Server started on port ' + PORT + ' and on ' + ENVIRON + ' enviroment'))

module.exports = app;