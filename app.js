var createError = require('http-errors');
var express = require('express');
var fileUpload = require("express-fileupload")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var categoriesRouter = require('./src/modules/categories/controllers');
var productsRouter = require('./src/modules/products/controllers');
var orderRouter = require('./src/modules/orders/controllers');
var tablesRouter = require('./src/modules/tables/controllers');
var adminRouter = require('./src/modules/admin/controllers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(fileUpload())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((_, res, next) => {

	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': 'Content-Type, access_token',
	})

	next()
})


app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/order', orderRouter);
app.use('/tables', tablesRouter);
app.use('/login', adminRouter);

// catch 404 and forward to error handler
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

module.exports = app;
