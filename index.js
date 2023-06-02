
const { config } = require('dotenv');
const express = require('express');
const cors = require('cors');

config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/', require('./api'));

app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
});

app.listen(process.env.PORT || 4000, function () {
    console.log('Ready to Go!');
});