let baseURL = "http://api-breakingnews-web.itheima.net"

$.ajaxPrefilter(function (options) {
    // 如果是index.html页面，不需要添加前缀
   
    // console.log(options);
    // 手动为 url 添加路径前缀
     console.log('http://api-breakingnews-web.itheima.net' + options.url)
    options.url = baseURL + options.url
});