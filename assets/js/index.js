$(function () {
    // 调用用户信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 1清空本地存储的token
            localStorage.removeItem('token'),
                // 2重新跳转到登录面
                location.href = '/login.html',
                layer.close(index);
        });
    })
})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用函数渲染头像
            renderAvatar(res.data)           
        }
        // complete: function(res) {
        //     console.log(res);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！'){
        //         // 1强制清除token
        //         localStorage.removeItem('token'),
        //         // 2强制跳转登录页
        //         location.href='/login.html'
        //     }
        // }
    })

}
// 渲染头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}