let baseURL = "http://api-breakingnews-web.itheima.net"

$.ajaxPrefilter(function (options) {
    // 如果是index.html页面，不需要添加前缀
   
    // console.log(options);
    // 手动为 url 添加路径前缀
     console.log('http://api-breakingnews-web.itheima.net' + options.url)
    options.url = baseURL + options.url
    // 如果带my的url 提出
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message === "身份认证失败!") {
            localStorage.removeItem("token");
            location.href ="/login.html"
        }
        
        
    }

});