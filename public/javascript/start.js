/*global ImageGallery */
/*
    var imageData = [
        {
            id: 1,
            url: "/images/island.jpeg",
            name: "Some island",
        },
        {
            id: 2,
            url: "/images/mountain.jpeg",
            name: "A mountain",
            description: "A mountin with a grassy hill and tree in front of it."
        },
        {
            id: 3,
            url: "/images/tools.jpeg",
            name: "A rusty wrench",
            description: "A close up view of a rusty wrench with great color and texture."
        }, 
        {
            id: 4,
            url: "images/tree.jpeg",
            name: "A purple flower",
            description: "A purple flower with a water drop hanging off another plant."
        }
    ];
*/    
$(function(){
//    ImageGallery.start();
    ImageGallery.start({imageData: imageData});
});