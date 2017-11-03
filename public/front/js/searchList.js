/**
 * Created by 杨友明 on 2017/11/3.
 */
mui(".mui-scroll-wrapper").scroll({
  indicators:false
});

var datas = {
  proName:"",
  brandId:"",
  price:"",
  num:"",
  page:1,
  pageSize:4
}

function render() {
  $.ajax({
    type:"get",
    url:"/product/queryProduct",
    data:datas,
    success:function (data) {
      // console.log(data);
      setTimeout(function () {
        $(".product").html(template("tpl",data));
      },1000)
    }
  });  
}

//获取搜索页传的值
var key=tools.getParam("key");
$(".search_text").val(key);  //设置给文本框
datas.proName=key;
render();

//点击搜索按钮获取文本框中的内容
$(".search_btn").on("click",function () {

  //把所有样式清空
  $(".lt_sort a").removeClass("now");
  $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
  datas.price = '';
  datas.num = '';

    var value=$(".search_text").val().trim();
  if (value===""){
    mui.toast("请输入搜索的内容");
  }
  $(".product").html(' <div class="loading"></div>');

  datas.proName=value;
  render(datas);
});


//点击排序
$(".lt_sort .my_btn").on("click", function () {
  var $this=$(this);
  console.log($this);
  var $span=$(this).find("span");
  if ($this.hasClass("now")) {
    $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
  }else {
    $this.addClass("now").siblings().removeClass("now");
    $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
  }

  //判断是那种排序
  var type=$this.data("type");
  var value=$span.hasClass("fa-angle-down")?2:1;

  //设置num或price的值,之前需要先清除其值
  datas[type]=value;
  render(datas);
})