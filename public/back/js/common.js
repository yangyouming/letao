/**
 * Created by 杨友明 on 2017/10/29.
 */
//校验用户是否登录
if(location.href.indexOf("login.html")<0){
  $.ajax({
    type:"get",
    url:" /employee/checkRootLogin",
    success:function (data) {
       if (data.error===400){
         //说明用户没有登录,跳转到登录页
         location.href="login.html";
       }
    }
  });
}

//希望在ajax开始之前显示进度条 NProgress.start();
// NProgress.start();
$(document).ajaxStart(function () {
  //让进度条显示
  NProgress.start();
});

$(document).ajaxStart(function () {
  setTimeout(function () {
    //让精度条结束
    NProgress.done();
  },500)
});

//点击分类管理显示或隐藏二级分类
$(".child").prev().on("click",function () {
    $(this).next().slideToggle();
})

//点击icon_menu让侧边栏显示隐藏
$(".icon_menu").on("click",function () {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
})

//共用的退出功能
$(".icon_logout").on("click",function () {
  // 点击退出显示模态框
  $('#logoutModal').modal("show");
});

// 发送一个ajax请求,告诉服务器我要退出了
$(".btn_logout").on("click",function () {
    $.ajax({
      type:"get",
      url:" /employee/employeeLogout",
      success:function (data) {
        console.log(data);
        if (data.success) {
          location.href="login.html";
        }
      }
    });
})