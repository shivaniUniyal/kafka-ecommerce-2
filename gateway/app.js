var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let dotenv = require('dotenv');
let cors =require('cors');
let proxy = require('express-http-proxy');
 dotenv.config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());



app.use('/user',proxy("http://localhost:2002"));
app.use('/',proxy("http://localhost:2001"));
// catch 404 and forward to error handler`
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
let port = process.env.PORT||2000;
app.listen(port,()=>{
  console.log(`App is listen to port ${port} for gateway`);
})
module.exports = app;
