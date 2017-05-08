/**
 * Created by admin on 2017/5/7.
 */
//控制  IE8及以下浏览器  Object
$("#controls-bar").bgiframe();
$("#pause-play").bind("click", function(){
    if(testtest.paused){
        testtest.play();
    } else {
        testtest.pause();
    }
});