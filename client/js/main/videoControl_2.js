/**
 * Created by admin on 2017/5/7.
 */
//可支持video标签的浏览器
$("#pause-play").bind("click", function(){
    var flashMovie = document.getElementById("videoPlayer");
    flashMovie.play();
});