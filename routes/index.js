
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
    image = imageData.addImage(image);
    res.set("Content-Type", "text/json");
    res.json(image);
//    res.end(JSON.stringify(image, null, 2));
};

exports.getAnImage = function(req, res, next) {
    
};
exports.edit = function(req, res, next) {
    var image = imageData.getImage(req.params.id);
    res.json(image);
};

exports.deleteAnImage = function(req, res, next) {
    imageData.delete(req.params.id);
    res.type('json');
    res.json(200, {}); // can also send, for example, res.json(500, {error, 'message'})
/*    
    // Perform content-negotiation on the request Accept header field
    // This method uses req.accepted, an array of acceptable types ordered by their quality values,
    // otherwises the first callback is involked.
    // When no match is performed, the server response with 406 'Not Acceptable', or
    // invokes the default callback
    res.format ({
        'text/plain': function () { // can also be text:
            res.end('hey');
        },
        'text/html': function () { // can also be html:
            res.send('key');
        },
        'application/json': function() { // can also be json:
            res.send({message: 'hey'});
        },
        'default' : function() {
            // some default code
        }
    });
*/
};

exports.updateAnImage = function(req, res, next) {
    var image = {
        id: req.params.id,
        url: req.body.url,
        name: req.body.name,
        description: req.body.description
    };   
    imageData.update(image);
    res.json(200, image);
//    res.end(JSON.stringify(image, null, 2));
};