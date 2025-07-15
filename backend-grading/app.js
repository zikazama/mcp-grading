var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const siswaRouter = require('./routes/siswa');
const mapelRouter = require('./routes/mapel');
const penilaianRouter = require('./routes/penilaian');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Grading API',
      version: '1.0.0',
      description: 'API untuk CRUD Siswa, Mata Pelajaran, dan Penilaian',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/siswa', siswaRouter);
app.use('/mapel', mapelRouter);
app.use('/penilaian', penilaianRouter);

module.exports = app;
