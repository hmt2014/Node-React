/**
 * Created by admin on 2017/5/7.
 */
//可支持video标签的浏览器
// 为了不随意的创建全局变量，我们将我们的代码放在一个自己调用自己的匿名函数中，这是一个好的编程习惯
(function(window, document){
    // 获取要操作的元素
    var video = document.getElementById("videoPlayer2");
    var progressWrap = $("#progress-bar .progress-bg");
    var playProgress = $("#progress-bar .progress-play");
    var progressFlag;
    // video的播放条
    function getProgress(){
        var percent = video.currentTime / video.duration;
        playProgress.css("width", percent * (progressWrap.width())+ "px");
    }

    //播放暂停
    $("#pause-play").bind("click", function(){
        if(video.paused) {
            video.play();
            $("#pause-play").removeClass("pause").addClass("play");
            progressFlag = setInterval(getProgress, 30);
        } else {
            video.pause();
            $("#pause-play").removeClass("play").addClass("pause");
            clearInterval(progressFlag);
        }
    });

    //点击进度条操作
    progressWrap.bind("mousedown", function(e){
        if(video.paused || video.ended){
            video.play();
            enhanceVideoSeek(e);
        } else {
            enhanceVideoSeek(e);
        }
    });

    function enhanceVideoSeek(e){
        clearInterval(progressFlag);
        var length = e.pageX - progressWrap.offsetLeft;
        var percent = length / progressWrap.offsetWidth;
        alert(percent);
        playProgress.css("width", percent*(progressWrap.offsetWidth) + "px");
        video.currentTime = percent * video.duration;
        progressFlag = setInterval(getProgress, 30);
    }

}(this, document));