
/*
 * GET home page.
 */
var imageData = require('../models/image.js');

exports.index = function(req, res){
  var images = imageData.get_images();
  res.render('index', { title: 'Express', images: JSON.stringify(images,  null, 2) });
};


exports.imageList = function(req, res, next) {
    var jsonImages = JSON.stringify(imageData.get_images(),  null, 2);
    res.end(jsonImages);
};

exports.postAnImage = function(req, res, next) {
    var image = {
        url: req.body.url,
        name: req.body.name,
        description: req.body.description
    };
    image = imageData.add(image);
    res.end(JSON.stringify(image, null, 2));
};

exports.getAnImage = function(req, res, next) {
    
};

exports.deleteAnImage = function(req, res, next) {
    imageData.delete(req.query.id);
    res.end(req.query.id);
};

exports.updateAnImage = function(req, res, next) {
    var image = {
        id: req.query.id,
        url: req.body.url,
        name: req.body.name,
        description: req.body.description
    };   
    imageData.update(image);
    res.end(JSON.stringify(image, null, 2));
};