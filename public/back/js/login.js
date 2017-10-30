/**
 * Created by 杨友明 on 2017/10/29.
 */




$(function () {
  var $form=$("#form");
  //1初始化表单插件
  $form.bootstrapValidator({
    feedbackIcons: {
      //校验时使用的图标
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验规则
    fields: {
      username: {

        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          callback: {
            message: '用户名验证失败',
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '用户密码不能为空'
          },
          stringLength: {
            min:6,
            max:12,
            message:"用户密码必须是6-12位"
          },
          callback: {
            message:"用户密码验证失败"
          }
        }
      }
    }
  });

  var validator = $form.data('bootstrapValidator');  //获取表单校验实例

  //表单校验成功时,会触发success.from.bv事件,此时会提交表单,我们需要静止表单提交,使用ajax提交表单
  $form.on('success.form.bv', function (e) {
    e.preventDefault();

    //发送ajax请求,以为之二我们需要获取username和password的值
    $.ajax({
      type:"post",
      url:" /employee/employeeLogin",
      data:$form.serialize(),
      success:function (data) {
        if(data.success){
          location.href="index.html";
        }else {
          if (data.error===1000){
            validator.updateStatus('username', 'INVALID', 'callback');
          }
          if (data.error===1001){
            validator.updateStatus('password', 'INVALID', 'callback');
          }
        }
      }

    })
  });

  //表单重置功能
  $("[type='reset']").on("click",function () {
    //调用表单重置功能
    //获取表单校验实例,调取resetForm方法

    validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
  })
});