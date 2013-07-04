$(function(){
    

    $("#url").change(function(e){
       var url = $(e.currentTarget).val();
       console.log ("Url is: [" + url);
       $("#preview").attr("src", url);
    });
    $("#save").click(function(e){
        e.preventDefault();
        var name = $("#name").val();
        var desc = $("#description").val();
        var url = $("#url").val();
        var message = "Name: " + name + "\n";
        message += "Description: " + desc + "\n";
        message += "URL: " + url;
        alert(message);
    });
});