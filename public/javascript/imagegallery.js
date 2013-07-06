/*global Backbone, jQuery, _ */

// var ImageGallery = ImageGallery || {};
var ImageGallery = ImageGallery || new Backbone.Marionette.Application();

ImageGallery.addRegions({
    mainRegion: "#main"
});
ImageGallery.Image = Backbone.Model.extend({
    urlRoot: "/images",
    select: function() {
        if(!this.get("selected")) {
            this.set({selected: true}, {silent: true});
            this.trigger("selected");
            this.collection.select(this);
        }
        ImageGallery.vent.trigger("image:selected", this);
    },
    deselect: function() {
        this.unset("selected", {silent: true});
        this.trigger("deselected");
    }
});

// ImageGallery.vent = _.extend({}, Backbone.Events);
ImageGallery.ImageCollection= Backbone.Collection.extend({
    url: "/images",
    model: ImageGallery.Image,
    initialize: function() {
        ImageGallery.vent.bind("image:previous", this.previousImage, this );
        ImageGallery.vent.bind("image:next", this.nextImage, this);
    },
    previousImage: function() {
        var index = this.indexOf(this.selectedImage);
        if (index > 0) {
            index -= 1;
        } else {
            index = this.length - 1;
        }
        var image = this.at(index);
        image.select();
    },
    nextImage: function() {
        var index = this.indexOf(this.selectedImage);
        if (index < this.length -1) {
            index += 1;
        } else { 
            index = 0;
        }
        var image = this.at(index);
        image.select();
    },
    select: function(image) {
        this.deselect();
        this.selectedImage = image;
    },
    deselect: function() {
        if (this.selectedImage) {
            this.selectedImage.deselect();
            delete this.selectedImage;
        }        
    }
});
/***************************/
ImageGallery.AddEditImageView = Backbone.View.extend ({
    id: "add-image-form",
//    template: "#add-image-template",
    
    events: {
        "change #name": "nameChanged",
        "change #description": "descriptionChanged",
        "change #url": "urlChanged",
        "click #save": "saveImage"
    },
    initialize: function(options) {
        _.bindAll(this,"saveSuccess", "saveError");
        this.template = options.template;
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
        this.model.save(undefined, { // could specify model's own attributes.
            success: this.saveSuccess,
            error: this.saveError
        });
  
    },
    saveSuccess: function(image, response, xhrObjectfromXHRCall) {
        if (this.collection && !this.collection.include(image)) {
            this.collection.add(image);           
        }
        image.select();
    },
    saveError:  function(image, response, xhrObjectfromXHRCall) {
        alert("Error" + response);
    },
    render: function(){
        var data;
        if(this.model) {
            data = this.model.toJSON();
        }
        var html = $(this.template).tmpl(data);
        $(this.el).html(html);
    }
});
/****************************/
ImageGallery.ImageListView = Backbone.View.extend({
    tagName: "ul",
//    template: "#image-preview-template",
    template: '<li><a href="#" data-id="${id}"><img src="${url}" width="150" height="100" alt="${description}"><span class="image-label">${name}</span></a></li>',
/*
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
    
*/
    initialize: function(){
        _.bindAll(this, "renderImage");
//        this.template = $(this.template);
        this.collection.bind("add", this.renderImage, this);
        this.collection.bind("reset", this.render, this); // should this come out now?
    },
    
    renderImage: function(image){        
        var imagePreview = new ImageGallery.ImagePreview({model: image});      
        imagePreview.render();
        $(this.el).prepend(imagePreview.el);
        /*
        var html = this.template.tmpl(image.toJSON());
        // prepend so that newest image is put at top
        $(this.el).prepend(html);
        */
    },
    render: function() {
        this.collection.each(this.renderImage);
    }
});
ImageGallery.ImageView = Backbone.View.extend({
    
    template: "#image-view-template",
    className: "image-view",
    events: {
        "click .nav-previous a": "previousImage",
        "click .nav-next a": "nextImage"
    },
    previousImage: function(e) {
        e.preventDefault();
        ImageGallery.vent.trigger("image:previous");
    },
    nextImage: function (e) {
        e.preventDefault();
        ImageGallery.vent.trigger("image:next");
    },
    render: function(){
        var html = $(this.template).tmpl(this.model.toJSON());
        $(this.el).html(html);
    }
    
});

ImageGallery.Router = Backbone.Router.extend({
    routes: {
        "": "newImage",
        "images/new": "newImage",
        "images/:id": "showImage",
        "images/:id/edit": "editImage"
    },
    initialize: function(options) {
        this.collection = options.collection;
    },
    showImage: function(id) {
        var image = this.collection.get(id);
        image.select();
        ImageGallery.showImage(image);
    },
    newImage: function(){
        ImageGallery.addImage(this.collection);
    },
    editImage: function(id) {
        var image = this.collection.get(id);
        ImageGallery.editImage(image);
    }
});

ImageGallery.ImagePreview = Backbone.View.extend({
    template: "#image-preview-template",
//    template: '<li><a href="#" data-id="${id}"><img src="${url}" width="150" height="100" alt="${description}"><span class="image-label">${name}</span></a></li>',
    
    events: {
        "click a": "imageClicked"
    }, 
    imageClicked: function(e) {
        e.preventDefault();
        this.model.select();
//        ImageGallery.vent.trigger("image:selected", this.model);    
    },
    initialize: function() {      
        this.template = $(this.template);  
        this.model.bind("selected", this.imageSelected, this);
        this.model.bind("deselected", this.imageDeselected, this);
        this.model.bind('change', this.render, this);

    },
    imageSelected: function(){
        this.$("img").addClass("selected");       
    },
    imageDeselected: function() {
        this.$("img").removeClass("selected");        
    },
    render: function(){
        var html = this.template.tmpl(this.model.toJSON());
        $(this.el).html(html); 
        // Monkey patch. If render occurs after imageSelected toggles the class,
        // the toggle is overwritten by an unselected html code.
        if (this.model.get("selected") && !this.$("img").hasClass("selected")) {
            this.$("img").addClass("selected");
        }
 
    }
});

/******************/
ImageGallery.addImage = function(images) {
    images.deselect();
    var image = new ImageGallery.Image();
    var addImageView = new ImageGallery.AddEditImageView({
        model: image, 
        collection: images,
        template: "#add-image-template"
    });
//    addImageView.render();
    ImageGallery.mainRegion.show(addImageView);
};
/********************/
ImageGallery.editImage = function(image) {
    var editImageView = new ImageGallery.AddEditImageView({
        model: image,
        template: "#edit-image-template"
    });
//    addImageView.render();
    ImageGallery.mainRegion.show(editImageView);
};



/********************/
ImageGallery.showImage = function(image) {
    var imageView = new ImageGallery.ImageView({
        model:image
    });
    imageView.render();
//    $("#main").html(imageView.el);
    ImageGallery.mainRegion.show(imageView);
};
/*
ImageGallery.MainRegion = function() {
    this.el = $("#main");
    this.show = function(view) {
        view.render();
        this.el.html(view.el);
    }
};
*/
// ImageGallery.addInitializer(function(){ 
ImageGallery.addInitializer(function(options){    
//    var images = new ImageGallery.ImageCollection();
    var images = new ImageGallery.ImageCollection(options.imageData);    
    // var image = new ImageGallery.Image();

    ImageGallery.addImage(images);

    images.bind("add", function(){ImageGallery.addImage(images)}); // important bind technique
    
    ImageGallery.vent.bind("image:selected", function(image) {
        ImageGallery.showImage(image);
        router.navigate("images/" + image.id);
    });
  
    var imageListView = new ImageGallery.ImageListView({collection:images});
    imageListView.render();
    $("#image-list").html(imageListView.el);
      
    var router = new ImageGallery.Router({collection:images});
//    images.fetch();
});

ImageGallery.bind("initialize:after", function() {
    Backbone.history.start();    
});