const express =      require('express');
const path =         require('path');
const favicon =      require('serve-favicon');
const logger =       require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser =   require('body-parser');
const http =         require('http');
const mongoose =     require('mongoose');
const config =       require('config');

const mongoConfig = config.get('mongo');
const db = mongoose.connect(`mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`, { useMongoClient: true }, function(err) {
  if (err) console.log(err);
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/upload', require('./server/routes'));
app.use('/api/ingredients/', require('./server/routes/ingredients-routes'));
app.use('/api/raw-materials/', require('./server/routes/raw-materials-routes'));
app.use('/api/products/', require('./server/routes/product-routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'))
});

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, console.log("App is running on localhost:3000"))
