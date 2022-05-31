$(function () {
    // 点击去注册账号链接
    $('#link_zhuce').on('click', function () {
        $('.denglu').hide()
        $('.zhuce').show()
    })
    // 点击去登陆账号链接
    $('#link_denglu').on('click', function () {
        $('.denglu').show()
        $('.zhuce').hide()
    })
    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify（）自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.zhuce [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致！'
            }
        }
    })
    // 坚挺注册表单的提交事件
    $('#form_zhuce').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser', {
            username: $('#form_zhuce [name=username]').val(),
            password: $('#form_zhuce [name=password]').val()
        }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message, {icon: 6,},{})
            }
             layer.msg('注册成功！', {icon: 6}),
             $('#form_zhuce [name=username]').val(''),
             $('#form_zhuce [name=password]').val('')
            //  模拟人点击
            $('#link_denglu').click()
        })
    })
    // 监听登录表单提交事件
    $('#form_denglu').submit(function(e){
         e.preventDefault()
         $.ajax({
         url:'/api/login',
         method:'post',
         data: $(this).serialize(),
         success:function(res){
             if(res.status !== 0) {
                 return layer.msg('登录失败！')
             }
             layer.msg('登录成功！'),
             localStorage.setItem('token',res.token)
             location.href = '/index.html'
         }
         })
    })
})