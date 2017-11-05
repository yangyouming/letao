
var tools={
  //首先获取地址栏的参数,然后将地址的参数切割成我们想要的对象形式
  getParamObj:function () {
    var obj= {};
    var value=location.search;
    value=value.slice(1);
    var arr=value.split("&");
    for (var i= 0;i< arr.length;i++) {
      var k = arr[i].split("=")[0];
      //decodeURI可将地址栏传的中文解码到页面上
      var v = decodeURI(arr[i].split("=")[1]);
      obj[k]=v;
    }
    return obj ;
  },
  //获取对象中对应的属性的值
  getParam:function (key) {
    return this.getParamObj()[key];
  },
  checkLogin:function (data) {
      if(data.error==400){
        location.href="login.html?returnUrl=" + location.href;
      }
  }
}



