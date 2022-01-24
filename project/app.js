const express = require('express');
const { sequelize } = require('./models');
const routes = require('./routes/routes');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/admin', routes);

app.use('/api', routes);

app.use(express.static(path.join(__dirname, '../Events/dist')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../Events/dist/index.html'));
})

app.listen({ port: 8001 }, async () => {
    await sequelize.authenticate();
    console.log("Pokrenut app server");
});