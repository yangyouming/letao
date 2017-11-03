/**
 * Created by 杨友明 on 2017/11/2.
 */
//初始化区域滚动
mui(".mui-scroll-wrapper").scroll({
  indicators:false
});

//获取localStorage里存储的字符串,并转换成数组
function getHistory() {
  var search_history =localStorage.getItem("lt_search_history")||"[]";
  var arr = JSON.parse(search_history);
  return arr;
};

function render() {
  var arr=getHistory();
  // 用模板引擎将获取的历史记录渲染到页面上
  $(".lt_history").html(template("tpl",{arr:arr}));
};
render();

//点击清空消息按钮清空历史记录
$(".lt_content").on("click",".title .mui-pull-right",function () {
  console.log("呵呵");
  localStorage.removeItem("lt_search_history");
  render();
});

//点击X号根据自定义属性data-index记录的当前数据删除
$(".lt_content").on("click","span[data-index]",function () {
  // $(this).parent().remove();
  // 此方法不能将缓存中的记录清除,当再次刷新页面时历史记录会再次出现,所以我们在删除当条历史记录的时候根据data-index传的下标将缓存数组中对应的记录删除,并重新渲染历史记录就不会再有这条历史记录了

  //设置mui.confrim的提示选项消息

  var index= $(this).data("index");
  // console.log(index);
  var arr=getHistory();
  var btnArray=["是","否"];
  mui.confirm("你确定删除这条历史记录吗?",btnArray,function (data) {
    // console.log(data);
    // 1是,0否
    if (data.index===1){
      arr.splice(index,1);
      localStorage.setItem("lt_search_history",JSON.stringify(arr));
      render();
      mui.toast("操作成功");
    }else {
      mui.toast("操作取消");
    }
  })
});

//点击搜索按钮,获取文本框输入的内容,设置到localSroage缓存中,并跳转到搜索详情页
//原则:历史记录不能超过10条  新加的历史记录要显示在最前面  历史记录中不能重复

$(".search_btn").on("click",function () {
  var key=$(".lt_search input").val().trim();
  var arr=getHistory();

  if (key==="") {
    mui.alert("亲,你想找啥?","温馨提示");
    return;
  }

  //获取key在arr中的索引,若是没有就是-1
  var index=arr.indexOf(key);
  if (index>-1){
    //说明有,将原来arr中的key删除
    arr.splice(index,1);
  }
  //若是已有10条历史记录,删除最后一条
  if( arr.length>=10) {
    arr.pop();
  }
  //将key添加到arr数组中,然后再添加到缓存中
  arr.unshift(key);
  localStorage.setItem("lt_search_history",JSON.stringify(arr));
  render();

  //跳转到搜索列表页,并将搜索内容传过去
  location.href="searchList.html?key="+ key;
});
















