$(document).ready(function(){

    

    var btn = $(".top");

    btn.on("click", function(e){
        e.preventDefault();

        var wrap = $(".wrap");
        var active = wrap.offset().top;
        $("html, body").animate({scrollTop:active},1000);
    });
});