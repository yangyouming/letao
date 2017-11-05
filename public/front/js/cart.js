/**
 * Created by 杨友明 on 2017/11/5.
 */

$(function () {

  // mui(".mui-scroll-wrapper").scroll({
  //   indicators:false
  // });

  //下拉刷新功能,在页面加载结束后结束刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback :function () {

          //发送ajax请求,渲染购物车页面
          $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function (data) {
              // console.log(data);
              setTimeout(function () {
                // 验证是否登录
                tools.checkLogin(data);
                $("#OA_task_2").html(template("tpl",{data:data}));
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
              },600);
             
            }
          });

        }
      }
    }
  });

  //点击删除按钮删除当前的商品
  //mui在处理下拉刷新为了兼容ios,这边不支持click事件
  $("#OA_task_2").on("tap", ".btn_delete",function () {
      var id=$(this).data("id");
    // console.log(id);
    mui.confirm("你确定删除这件商品吗?","提示",["取消","确定"],function (e) {
      if(e.index===1) {
        //确定删除商品
        //发送ajax请求删除商品
        $.ajax({
          type:"get",
          url:"/cart/deleteCart",
          data:{
            id:[id]
          },
          success:function (data) {
            // console.log(data);
            if (data.success) {
              //让容器下拉刷新一次
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })

      }else {
        mui.toast("操作取消!");
      }

    });


  });

  //点击编辑按钮,更改信息
  $("#OA_task_2").on("tap", ".btn_edit",function () {
    var data=this.dataset;
    // console.log(data);
    var html=template("tpl2",data);
    html= html.replace(/\n/g, "");

    mui.confirm(html,"编辑商品",["取消","确定"],function (e) {
      if (e.index===1){
        $.ajax({
          type:"post",
          url:"/cart/updateCart",
          data:{
            id:data.id,
            size:$(".lt_edit_size span.now").html(),
            num:$(".mui-numbox-input").val()
          },
          success:function (data) {
            console.log(data);
            //校验是否登录
            tools.checkLogin(data);
            if (data.success){
              //编辑成功,重新渲染页面
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
              }
          }
        });
      }else{
        mui.toast("操作取消")
      }

    });

    //重新渲染mui数字框,给尺码注册点击事件
    mui(".mui-numbox").numbox();
    $(".lt_edit_size span").on("tap",function () {
        $(this).addClass("now").siblings().removeClass("now");
    });

  });

  //计算总金额,给所有的checkbox注册点击事件
  $("#OA_task_2").on("change",".ck",function () {
    var total=0;
    $(":checked").each(function (i,e) {
        total+=$(this).data("num")*$(this).data("price");
    })
    $(".total_price").html(total);
  })

});