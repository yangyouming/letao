/**
 * Created by 杨友明 on 2017/11/5.
 */

$(function () {
   $.ajax({
     type:"get",
     url:"/user/queryUserMessage",
     success:function (data) {
       // console.log(data);
       //检查是否登录
       tools.checkLogin(data);
       $(".mui_user").html(template("tpl",data));
     }
   });

  //点击退出功能,退出登录
  $(".lt_logout_btn").on("click",function () {
     mui.confirm("你确定要退出登录吗?",["取消","确定"],function (e) {
       // console.log(e);
       if (e.index===0){
         mui.toast("操作取消!");
       }else{
         //发送ajax请求,退出登录
         $.ajax({
           type:"get",
           url:"/user/logout",
           success:function (data) {
             // console.log(data);
             if (data.success) {
               location.href="login.html";
             }
           }
         });
       }
     })
  });
});