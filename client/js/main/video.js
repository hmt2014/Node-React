/**
 * Created by admin on 2017/5/7.
 */
$(document).ready(function(){
    $.ajax({
        url: "/videoConfig",
        type: "GET",
        async: true,
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            //根据数据显示页面
            var modes = data.modes;
            var sizes = data.sizes;
            var colors = data.colors;
            var inits = data.inits;
            for(var i=0; i<modes.length; i++){
                var item=modes[i];
                if(inits["mode"]==item["mode"]){
                    $('#modes').append("<option selected='selected' value='"+item["mode"]+"'>"+item["title"]+"</option>");
                } else {
                    $('#modes').append("<option value='"+item["mode"]+"'>"+item["title"]+"</option>");
                }

            }
            for(var i=0; i<sizes.length; i++){
                var item=sizes[i];
                if(inits["size"]==item["size"]){
                    $('#sizes').append("<option selected='selected' value='"+item["size"]+"'>"+item["title"]+"</option>");
                } else {
                    $('#sizes').append("<option value='"+item["size"]+"'>"+item["title"]+"</option>");
                }
            }
            for(var i=0; i<colors.length; i++){
                var item=colors[i];
                if(inits["color"]==item["color"]){
                    $('#colors').append("<option selected='selected' value='"+item["color"]+"'>"+item["title"]+"</option>");
                } else {
                    $('#colors').append("<option value='"+item["color"]+"'>"+item["title"]+"</option>");
                }
            }
            //init
            $("#modes").attr({"danmu-mode": inits["mode"]});
            $("#sizes").attr({"danmu-size": inits["size"]});
            $("#colors").attr({"danmu-color": inits["color"]});

        },
        error: function(xhr, textStatus){
            console.log("error");
        }
    });
    $("#modes").change(function(){
        var s = $(this).children("option:selected").val();
        $(this).attr({"danmu-mode":s});
    });
    $("#sizes").change(function(){
        var s = $(this).children("option:selected").val();
        $(this).attr({"danmu-size": s});
    });
    $("#colors").change(function(){
        var s = $(this).children("option:selected").val();
        $(this).attr({"danmu-color": s});
    })
});

//弹幕
window.addEventListener("load", function(){

    var CM = new CommentManager(document.getElementById("my-comment-stage"));
    CM.init();
    CM.start();

    window.CM = CM;

    var socket = io();
    socket.on('message show', function(msg){
        var danmu = JSON.parse(msg);
        $('#messages').append($('<li>').text( ":" + danmu["text"]));
        CM.send(danmu);
    });

});

var socket = io();
$("#btnSend").click(function(e){
    e.preventDefault();
    var danMu = {
        "mode": Number($("#modes").attr("danmu-mode")),
        "text": $("#msg").val(),
        "stime": 0,
        "size": Number($("#sizes").attr("danmu-size")),
        "color": parseInt($("#colors").attr("danmu-color"), 16),
        "dur": 10000
    };
    var msg = JSON.stringify(danMu);
    socket.emit('message send', msg);
    $('#msg').val("");
});