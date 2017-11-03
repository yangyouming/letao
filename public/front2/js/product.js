/**
 * Created by HUCC on 2017/11/2.
 */
$(function () {

  mui(".mui-scroll-wrapper").scroll({
    indicators:false
  })



  //首先，获取到id
  var id = tools.getParam("productId");
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:id
    },
    success:function (data) {
      console.log(data);
      var temp = data.size.split("-");
      var sizeArray = [];
      for(var i = temp[0]; i <= temp[1]; i++){
        sizeArray.push(i);
      }

      data.sizeArray = sizeArray;

      $(".mui-scroll").html( template("tpl", data) );

      //当内容渲染完成后，需要去初始化轮播图
      //轮播图效果
      mui('.mui-slider').slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      mui(".mui-numbox").numbox();


    }
  });

})