/**
 * Created by 杨友明 on 2017/11/4.
 */


//点击确定获取表单的值,发送ajax请求,登录用户
$(".btn_login").on("click",function () {
  var username=$(".mui-input-clear").val();
  var password=$(".mui-input-password").val();
  //校验表单
  if (!username){
    mui.toast("请输入用户名!");
    return false;
  };
  if (!password){
    mui.toast("请输入密码!");
    return false;
  };

  //发送ajax请求登录
  $.ajax({
    type:"post",
    url:"/user/login",
    data:{
      username:username,
      password:password
    },
    success:function (data) {
      // console.log(data);
      if (data.error===403) {
        //登录失败
        mui.toast(data.message);
      }
      if (data.success) {
        //登录成功,需要判断是从哪个页面来访问的
        //获取访问页面的路径
        var search=location.search;
        // 地址前面有returnUrl的需要回跳页面,否则跳转到个人中心页
        if (search.indexOf("returnUrl")>-1) {
          // 需要回跳
          search=search.replace("?returnUrl=","");
          location.href=search;
        }else {
          location.href="user.html";
        }
      }
    }
  });
})