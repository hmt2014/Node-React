/**
 * Created by admin on 2017/5/2.
 */
$(document).ready(function(){
   $("#btn-login").bind("click",function(){
       var username = $("#username").val();
       var password = $("#password").val();
       if(username=="" || username==null){
           alert("用户名不能为空");
           return false;
       }
       if(password=="" || password==null){
           alert("密码不能为空");
           return false;
       }
       $("#login-form").submit();
   });
   $("#btn-register").bind("click", function(){
       window.location.href = "/register";
   });
});