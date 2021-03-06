/**
 * Created by 杨友明 on 2017/11/5.
 */
$(function () {

  //短信验证功能
  $(".btn_getCode").on("click",function () {

    //点击后需要把按钮改成 正在发送中... 并禁用
    var $this=$(this);
    if($this.hasClass("disabled")) {
      return false;
    };

    $this.addClass("disabled").html("正在发送中...");

    //发生ajax请求
    $.ajax({
      type:"get",
      url:"/user/vCode",
      success:function (data) {
        // console.log(data);
        console.log(data.vCode);  //打印验证码
        var num=60;
        var timer= setInterval(function () {
            num--;
          $this.html(num+"秒后再次发送");
          
          if(num<=0){
            clearInterval(timer);
            $this.html("再次发送").removeClass("disabled");
          }
        },1000);
      }
    });

  });

  //手机注册功能
  $(".btn_register").on("click",function () {
      //获取数据
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var repassword = $("[name='repassword']").val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();
    
    //表单验证
    if(!username){
      mui.toast("请输入用户名");
      return false;
    }
    if(!password){
      mui.toast("请输入密码");
      return false;
    }
    if(!repassword){
      mui.toast("请输入确认密码");
      return false;
    }

    if(password != repassword){
      mui.toast("确认密码与密码不一致");
      return false;
    }

    if(!vCode){
      mui.toast("请输入验证码");
      return false;
    }

    //验证码只能是6位数字
    if(!/^\d{6}$/.test(vCode)){
      mui.toast("请输入有效的验证码");
      return false;
    }

    if(!mobile){
      mui.toast("请输入手机号");
      return false;
    }

    if(!/^1[34578]\d{9}$/.test(mobile)){
      mui.toast("请输入有效的手机号码");
      return false;
    }

    $.ajax({
      type:"post",
      url:"/user/register",
      data:{
        username:username,
        password:password,
        mobile:mobile,
        vCode:vCode
      },
      success:function (data) {
        // console.log(data);
        if(data.success){
          //登录成功,跳转到登录页
          setTimeout(function () {
              location.href="login.html";
          },600);
        }else {
          mui.toast(data.message);
        }
      }
    });

  });


});