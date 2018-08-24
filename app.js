/* 
Setear variables de entorno para NODEjs en CONSOLA:
WINDOWS: set NODE_ENV=production
UBUNTU: NODE_ENV=production o export NODE_ENV=production
*/
// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cors = require('cors');
var apiRouter = require('./routes/api');
var helmet = require('helmet');
var response = require('./models/default/response')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet());

/***************  Logs Morgan ***********************/
morgan.token('date', function(){
  return timestamp;
})
app.use(morgan(':date - URL ":method :url :status" - ORIGEN ":remote-addr :remote-user" - RESLENGTH ":res[content-length]" - :response-time ms'))
/****************************************************/

/*************** response y Routas ******************/
app.use(response);
app.use('/api', apiRouter);
//Propia
app.use((req, res) => {
  res.status(404).send('Recurso no disponible');
});
/***************************************/

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
