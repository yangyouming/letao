
$(function () {
  //发生ajax请求,获取数据
  var currentPage=1;
  var pageSize=6;
  function render() {
    $.ajax({
      type:"get",
      url:" /user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (data) {
        // console.log(data);
        var html=template("tpl",data);
        $("tbody").html(html);

        //分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,  //指定bootsrap的版本
          currentPage:currentPage,    //指定当前第几页
          size:'small',
          totalPages:Math.ceil(data.total/pageSize),
          onPageClicked:function (event,originalEvent,type,page) {
            //为按钮绑定点击事件  page:当前点击的按钮
            currentPage=page;
            render();
          }
        });
      }

    });
  }
  render();

  //点击启用或禁用按钮弹出模态框
  //这里的按钮都是动态渲染迟来的,所以我们
  $("tbody").on("click",".btn",function () {
    $("#userModal").modal("show");
    var id=$(this).parent().data("id");
    var isDelete=$(this).parent().data("isDelete");
    isDelete = isDelete === 1 ? 0 : 1;
    //点击确定按钮,需要启用或禁用按钮
    $(".btn_confrim").off().on("click",function () {

      //发送ajax请求
      $.ajax({
        type:"post",
        url:" /user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (data) {
          if(data.success){
            $("#userModal").modal("hide");
            render();
          }
        }
      })
    })
  })

});