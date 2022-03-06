require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const middleware = require('./server/middleware/auth');
const express = require('express');
const app = express();
const indexRouter = require('./server/routes/index.js');
const bookRoutes = require('./server/routes/booksRoutes');
const listRoutes = require('./server/routes/listRoutes');
const entriesRoutes = require('./server/routes/entriesRoutes');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(middleware.decodeIDToken);

app.use('/', indexRouter);
app.use('/', bookRoutes);
app.use('/', listRoutes);
app.use('/', entriesRoutes);

module.exports = app;
