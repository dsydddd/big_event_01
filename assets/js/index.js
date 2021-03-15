$(function () {
  getUserInof()
  

  $("#btnLogout").on("click",function () {
    //eg1
layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
  //弹出层要做的事
  localStorage.removeItem("token");
  location.href ="/login.html"
  
  layer.close(index);
});
    
  })
})


function getUserInof() {
    $.ajax({
      type:'get',
      url:'/my/userinfo',
   /*    headers: {
        Authorization: localStorage.getItem('token') || ''
      }, */
   /*    complete: {
        
      }; */
      success: (res) => {
        console.log(res);
        
        if (res.status != 0) {
            return layui.layer.msg(res.message, {icon: 5});
        }
        // 头像和文字渲染
        renderAvatar(res.data);
        
      }
    })
}
function renderAvatar(user) {
    // console.log(user);
    // 1.渲染用户名，如果有昵称以昵称为准
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    // 2.渲染头像; 判断图片头像是否存在
    if (user.user_pic == null) {
        // 隐藏图片头像, 渲染文字头像
        $(".layui-nav-img").hide();
        $(".text-avatar").show().html(name[0].toUpperCase());
    } else {
        // 渲染图片头像，隐藏文字头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    }
}