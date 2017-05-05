/**
 * Created by admin on 2017/5/5.
 */
$(".input-upload").on("change", "input[type='file']", function(){
    var filePath = $(this).val();
    if(filePath.indexOf("mp4")!=-1){
        $(".fileerrorTip").html("").hide();
        var arr=filePath.split("\\");
        var fileName = arr[arr.length - 1];
        $(".showFileName").html(fileName);
    } else {
        $(".showFileName").html("");
        $(".fileerrorTip").html("您未上传文件，或者您上传文件类型有误！").show();
        return false;
    }
})