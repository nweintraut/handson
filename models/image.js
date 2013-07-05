var imageData = [
    {
        id: 0,
        url: "/images/island.jpeg",
        name: "Some island",
    },
    {
        id: 1,
        url: "/images/mountain.jpeg",
        name: "A mountain",
        description: "A mountin with a grassy hill and tree in front of it."
    },
    {
        id: 2,
        url: "/images/tools.jpeg",
        name: "A rusty wrench",
        description: "A close up view of a rusty wrench with great color and texture."
    }, 
    {
        id: 3,
        url: "images/tree.jpeg",
        name: "A purple flower",
        description: "A purple flower with a water drop hanging off another plant."
    }
];

exports.get_images = function(){
    return imageData;
};

function length () {
    return imageData.length;
}
exports.length = length;
exports.addImage = function(newImage){
    newImage.id = length();
    imageData.push(newImage);
    return newImage;
};

exports.update = function(image) {
    imageData[image.id] = image;
    return image;
};
exports.delete = function(id) {
    delete imageData[id];
};