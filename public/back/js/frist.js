/**
 * Created by 杨友明 on 2017/10/31.
 */


//发送ajax请求获取后台数据渲染到页面上
$(function () {
  var currentPage=1;
  var pageSize=5;

  function render() {
    $.ajax({
      type:"get",
      url:"  /category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (data) {
        // console.log(data);
        $("tbody").html(template("tpl",data));

        //添加分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage:currentPage,
          totalPages:Math.ceil(data.total/pageSize),
          size:"small",
          onPageClicked:function (event,originalEvent,type,page) {
            currentPage=page;
            render();
          }
        });
      }
    });
  }
  render();
  
  //点击添加按钮,弹出模态框
  $(".btn_add").on("click",function () {
    $("#addModal").modal("show");
  });
  
  //表单验证
  var $form=$("#form");
  $form.bootstrapValidator({
    //校验时使用的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //name属性
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级风雷名称不能为空"
          }
        }
      }
    }
  });

  $form.on("success.form.bv",function (e) {
    e.preventDefault();

    //发生ajax请求给后台添加新的分类
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data: $form.serialize(),
      success:function (data) {
          if(data.success){
            //成功了需要关闭模态框,然后重新渲染页面
            $("#addModal").modal("hide");
            
            currentPage=1;
            render();
            
            //重置表单
            $form.data("bootstrapValidator").resetForm();
            //表单有一个reset方法,会把表单中所有的值都清空,js对象的方法
            $form[0].reset();
          }
      }
    })
  })


  

});
