/**
 * Created by 杨友明 on 2017/11/3.
 */
mui(".mui-scroll-wrapper").scroll({
  indicators:false
});


var id = tools.getParam("productId");
// console.log(id);
//发送ajax请求,渲染页面数据
$.ajax({
  type:"get",
  url:"/product/queryProductDetail",
  data:{
    id:id
  },
  success:function (data) {
    // console.log(data);
    //定义一个sizeArray用来存放尺码
    var arr=data.size.split("-");
    var sizeArray=[];
    for (var i=arr[0]; i<=arr[1]; i++) {
      sizeArray.push(i);
    }
    data.sizeArray=sizeArray;

    $(".mui-scroll").html(template("tpl",data));


    //内容渲染完成之后初始化轮播图
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
    });

    //动态添加的数字输入框手动激活
    mui(".mui-numbox").numbox();

  }
});


//选择尺码功能
$(".mui-scroll").on("click",".size span",function () {
  // console.log(11);
  $(this).addClass("now").siblings().removeClass("now");
});

//点击加入购物车按钮,判断是否登录,若是没有登录舔砖登录页面;若是登录了,添加商品到购物车
$(".btn_add_cart").on("click",function () {
  //首先获取数据
  var size=$(".size .now").html();
  var num= $(".mui-numbox-input").val();
  
  if (!size) {
    mui.toast("请选择尺码");
    return false;
  }

  //发送ajax请求判断登录状态
  $.ajax({
    type:"post",
    url:"/cart/addCart",
    data:{
      productId:id,
      size:size,
      num: num
    },
    success:function (data) {
      // console.log(data);
      //判断登录状态
      if (data.error===400){
        mui.toast(data.message);
        // console.log(location.href);
        location.href="login.html?returnUrl="+ location.href;
      }
    }
  });

});