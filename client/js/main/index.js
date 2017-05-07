/**
 * Created by admin on 2017/5/2.
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
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