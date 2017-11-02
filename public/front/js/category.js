/**
 * Created by 杨友明 on 2017/11/2.
 */
//初始化区域滚动时,若页面有多处区域滚动,返回值是数组
var scr=mui('.mui-scroll-wrapper').scroll({
  indicators: false, //是否显示滚动条
});
// console.log(scr);

$.ajax({
  type:"get",
  url:"/category/queryTopCategory",
  success:function (data) {
    // console.log(data);
    $(".lt_category_l ul").html(template("tpl",data));

    var id=data.rows[0].id;
    renderSecond(id);
  }
});

//获取一级列表下对应的二级列表商品
//参数是一级分类的ID
function renderSecond(id) {
  $.ajax({
    type:"get",
    url:"/category/querySecondCategory",
    data:{
      id:id
    },
    success:function (data) {
      // console.log(data);
      $(".lt_category_r ul").html(template("tpl2",data));
    }
  });
}

//给li注册委托事件
$(".lt_category_l").on("click","li",function () {
  $(this).addClass("now").siblings().removeClass("now");
  //获取自定义属性传的id
  var id=$(this).data("id");
  renderSecond(id);
  //让右侧的内容在切换时回到默认0,0位置
  scr[1].scrollTo(0, 0,500);
})



