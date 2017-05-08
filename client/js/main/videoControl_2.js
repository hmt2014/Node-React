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
    //记录静音前的信息
    var curVol;

    //设置时间信息
    video.addEventListener("canplay", function(){
        video.volume = 0.5;
        curVol = 0.5;
        curIndex = 3;
        $("#timeInfo .cur-time").html("00:00");
        $("#timeInfo .whole-time").html(initTimeLength(video.duration));
    });
    // video的播放条
    function getProgress(){
        var percent = video.currentTime / video.duration;
        playProgress.css("width", percent * (progressWrap.width())+ "px");
        //更新时间
        $("#timeInfo .cur-time").html(initTimeLength(video.currentTime));
    }

    //播放暂停
    $("#pause-play").bind("click", function(){
        if(video.paused) {
            video.play();
            $("#pause-play").removeClass("pause").addClass("play");
            progressFlag = setInterval(getProgress, 60);
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
        var length = e.pageX - progressWrap.offset().left;
        var percent = length / progressWrap.width();
        playProgress.css("width", percent*(progressWrap.width()) + "px");
        video.currentTime = percent * video.duration;
        progressFlag = setInterval(getProgress, 60);
    }
    //根据秒数格式化时间
    function initTimeLength(timeLength){
        timeLength = parseInt(timeLength);
        var second = timeLength%60;
        var minute = (timeLength-second)/60;
        return (minute<10?"0"+minute:minute)+":"+(second<10?"0"+second:second);
    }

    //音量
    $("#volumeBar li").bind("click", function(e){
        var cur = $(this).index();
        var total = $("#volumeBar li").length;
        var allList = $("#volumeBar li span");
        allList.removeClass("liInner");
        $(this).prevAll().find("span").addClass("liInner").css("width", "100%");
        var curWidth = (e.pageX - $(this).offset().left) / $(this).width();
        var percent = curWidth*100;
        var volNum;
        if(percent < 60) {
            $(this).find("span").addClass("liInner").css("width", percent + "%");
            volNum= (cur+curWidth)/total;
            setVol(volNum);
        } else {
            $(this).find("span").addClass("liInner").css("width",  "100%");
            volNum = (cur+1)/total;
            setVol(volNum);
        }
        curVol = volNum;
        //如果是大音量
        if(volNum > 0.5){
            $("#volumeBar .volumeIcon").removeClass("small").addClass("big");
        } else {
            $("#volumeBar .volumeIcon").removeClass("big").addClass("small");
        }
    });

    //静音
    $("#volumeBar .volumeIcon").bind("click", function(){
        if(video.muted){
            video.muted = false;
            $(this).removeClass("mute");
            if(curVol > 0.5){
                $(this).addClass("big");
            } else {
                $(this).addClass("small");
            }
            //根据记录的音量大小还原样式
            var total = $("#volumeBar li").length;
            var num = curVol * total;
            var floor = Math.floor(num);
            var ceil = Math.ceil(num);
            var lastPercent = num - floor;
            $("#volumeBar li:eq(" + floor +")").prevAll().find("span").addClass("liInner").css("width", "100%");
            $("#volumeBar li:eq(" + floor +")").find("span").css("width", lastPercent*100+"%");
            $("#volumeBar li:eq(" + floor +")").find("span").addClass("liInner");

        } else {
            video.muted = true;
            $(this).removeClass("big").removeClass("small").addClass("mute");
            var allList = $("#volumeBar li span");
            allList.removeClass("liInner");
        }
    });

    //進入全屏
    function launchFullscreen(element)
    {
    //此方法不可以在異步任務中執行，否則火狐無法全屏
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen){
            element.msRequestFullscreen();
        } else if(element.oRequestFullscreen){
            element.oRequestFullscreen();
        }
        else if(element.webkitRequestFullscreen)
        {
            element.webkitRequestFullScreen();
        }else{
            var controls = document.getElementById("control-bar");
            var docHtml = document.documentElement;
            var docBody = document.body;
            var videobox = document.getElementById('videoPlayer2');
            var cssText = 'width:100%;height:100%;overflow:hidden;';
            docHtml.style.cssText = cssText;
            docBody.style.cssText = cssText;
            videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
            document.IsFullScreen = true;
        }
    }

    //退出全屏
    function exitFullscreen()
    {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.oRequestFullscreen){
            document.oCancelFullScreen();
        }else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }else{
            var docHtml = document.documentElement;
            var docBody = document.body;
            var videobox = document.getElementById('videoPlayer2');
            docHtml.style.cssText = "";
            docBody.style.cssText = "";
            videobox.style.cssText = "";
            document.IsFullScreen = false;
        }
    }

    $("#fullScreen").bind("click", function(){
        launchFullscreen(video);
    });

    //设置音量
    function setVol(num){
        video.volume = num;
    }

}(this, document));