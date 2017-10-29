/**
 * Created by 杨友明 on 2017/10/29.
 */
$(function () {

  //1初始化表单插件
  var $from=$("#from");
  $from.bootstrapValidator({
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



});