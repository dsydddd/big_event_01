$(function () {
    $("#link_reg").on("click", function () {
        $(".login_box").hide()
        $(".reg_box").show()
        
    });
    $("#link_login").on('click',function () {
       $(".login_box").show() 
       $(".reg_box").hide()
    })
    // 取得layui的form对象 进行表单的安全判定
    let form = layui.form
    console.log(form);
    

    form.verify({
        required: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
          
          //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
          if(value === 'xxx'){
            alert('用户名不能为敏感词');
            return true;
          }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pwdLength: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ]
        ,repassword:function (value,) {
            var pwd = $('.reg_box  input[name="password"]').val()

            if (value != pwd) {
                return "两次密码不一致"
            }
        }
    });
    console.log(layui);
    
  var layer = layui.layer;
  console.log(layer);
  
  $("#form_reg").on(function () {
    e.preventDefalut()
    $.ajax({
      type:'POST',
      url:'/api/reguser',
      data: {
        username: $(".reg_box input[name=username]").val(),
        password: $(".reg_box input[name=password]").val(),
        
      },
      success:(res)=>{
        if (res.status != 0) {
          return layer.msg(res.message, { icon: 5 });
        }
        layer.msg("恭喜您，用户名注册成功！", { icon: 6 });
        $("#link_login").click();
        $("#form_reg")[0].reset();
      }
    })
    
  })
    // 需求4: 用户登录
    $("#form_login").on("submit", function (e) {
      // 阻止表单默认提交
      e.preventDefault();
      // 发送ajax
      // ajax三板斧：1.console   2.请求 type,url,data   3.响应体
      $.ajax({
          type: 'POST',
          url: '/api/login',
          data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            
              // 错误提示
              if (res.status != 0) {
                  return layer.msg(res.message, { icon: 5 });
              }
              // 成功后操作，跳转页面，保存token
              location.href = "/index.html";
              localStorage.setItem("token", res.token);
          }
      });
  })
    
    
})
