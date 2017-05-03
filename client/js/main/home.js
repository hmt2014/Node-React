/**
 * Created by admin on 2017/5/3.
 */
/**
 * Created by admin on 2017/5/2.
 */
$(document).ready(function(){
    $("#photo-box .photo").hover(function(){
        $(this).find(".content-mask").animate({left: "0"}, 200);
    }, function(){
        $(this).find(".content-mask").animate({left: "-180px"}, 200);
    });
});