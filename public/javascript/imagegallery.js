/*global Backbone, jQuery, _ */

var ImageGallery = ImageGallery || {};

ImageGallery.Image = Backbone.Model.extend({
    
});

ImageGallery.vent = _.extend({}, Backbone.Events);
ImageGallery.ImageCollection= Backbone.Collection.extend({
    model: ImageGallery.Image
});

ImageGallery.AddImageView = Backbone.View.extend ({
    id: "add-image-form",
    template: "#add-image-template",
    
    events: {
        "change #name": "nameChanged",
        "change #description": "descriptionChanged",
        "change #url": "urlChanged",
        "click #save": "saveImage"
    },
    nameChanged: function(e){
        var value = $(e.currentTarget).val();
        this.model.set({name: value});
    },
    descriptionChanged: function(e){
        var value = $(e.currentTarget).val();
        this.model.set({description: value});
    },
    urlChanged: function(e) {
        var value = $(e.currentTarget).val();
        this.model.set({url: value});
        this.$("#preview").attr("src", value);
    },
    saveImage: function(e){
        e.preventDefault();
 //       var name = this.model.get("name");
 //       var desc = this.model.get("description");
 //       var url  = this.model.get("url");
        this.collection.add(this.model);           
    },
    render: function(){
        var html = $(this.template).tmpl();
        $(this.el).html(html);
    }
});

ImageGallery.ImageListView = Backbone.View.extend({
    tagName: "ul",
//    template: "#image-preview-template",
    template: '<li><a href="#" data-id="${id}"><img src="${url}" width="150" height="100" alt="${description}"><span class="image-label">${name}</span></a></li>',
    initialize: function(){
        _.bindAll(this, "renderImage");
        this.template = $(this.template);
        this.collection.bind("add", this.renderImage, this);
    },
    events: {
        "click a": "imageClicked"
    },
    imageClicked: function(e) {
        e.preventDefault();
        var id= $(e.currentTarget).data("id");
        var image = this.collection.get(id);
        // tell the app the image was clicked
        ImageGallery.vent.trigger("image:selected", image);
        
    },
    renderImage: function(image){
        var html = this.template.tmpl(image.toJSON());
        // prepend so that newest image is put at top
        $(this.el).prepend(html);
    },
    render: function() {
        this.collection.each(this.renderImage);
    }
});
ImageGallery.ImageView = Backbone.View.extend({
    template: "#image-view-template",
    className: "image-view",
    
    render: function(){
        var html = $(this.template).tmpl(this.model.toJSON());
        $(this.el).html(html);
    }
});
ImageGallery.addImage = function(images) {
    var image = new ImageGallery.Image();
    var addImageView = new ImageGallery.AddImageView({model: image, collection: images});
    addImageView.render();
    $("#main").html(addImageView.el);
};

ImageGallery.showImage = function(image) {
    var imageView = new ImageGallery.ImageView({
        model:image
    });
    imageView.render();
    $("#main").html(imageView.el);
};

$(function() {
    
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
    
    var images = new ImageGallery.ImageCollection(imageData);    
    // var image = new ImageGallery.Image();

    ImageGallery.addImage(images);

    images.bind("add", function(){ImageGallery.addImage(images)}); // important bind technique
    
    ImageGallery.vent.bind("image:selected", ImageGallery.showImage);
    
    var imageListView = new ImageGallery.ImageListView({collection:images}); 
    imageListView.render();
    $("#image-list").html(imageListView.el);

});