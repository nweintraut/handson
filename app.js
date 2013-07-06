
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var imageData = require('./models/image.js');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(path.join(__dirname, 'public')));  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get("/images", routes.imageList);
app.post("/images", routes.postAnImage);
app.get("images/:id/edit", routes.edit);
app.get("/images/:id", routes.getAnImage);
app.delete("/images/:id", routes.deleteAnImage);
app.put("/images/:id", routes.updateAnImage);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
