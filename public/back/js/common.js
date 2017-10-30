/**
 * Created by 杨友明 on 2017/10/29.
 */
//希望在ajax开始之前显示进度条 NProgress.start();
// NProgress.start();

$(document).ajaxStart(function () {
  //让进度条显示
  NProgress.start();
});
$(document).ajaxStart(function () {
  setTimeout(function () {
    //让精度条结束
    NProgress.done();
  },500)
});