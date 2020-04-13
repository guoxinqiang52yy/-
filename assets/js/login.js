$(function () {
    layui.use(['form', 'jquery', 'layer','flow'], function () {
        var $ = layui.jquery;
        var form = layui.form;
        var layer = layui.layer
        var flow = layui.flow;
        flow.lazyimg();
        form.render();
        clearSession()
        //添加表单验证方法
        form.verify({
            //登录验证
            loginNamerequired: function (t) {
                var reg = /[\S]+/;
                if (!reg.test(t)) {
                    return '昵称不可为空';
                }
            },
            pwdrequired: function (t) {
                var reg = /[\S]+/;
                if (!reg.test(t)) {
                    return '密码不可为空';
                }
            },
            //注册验证
            nameRequired: function (t) {
                var reg = /[\S]+/;
                if (!reg.test(t)) {
                    return '必填项不能为空';
                }
            },
            email: function (value, item) { //value：表单的值、item：表单的DOM对象
                if (value != '') {
                    if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
                        value)) {
                        return '邮箱格式不正确';
                    }
                }

            },
            chineseLetterNum: function (t) {
                //汉字字母数字
                if (t != '') {
                    if (!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(t)) {
                        return '请输入汉字、字母、数字';
                    }
                }

            },
            letterNum: function (t) {
                //字母数字
                if (t != '') {
                    if (!/^[A-Za-z0-9]+$/.test(t)) {
                        return '请输入字母、数字';
                    }
                }

            },
            length_f_max_5: function (value, ele) {
                var reg =
                    /^(([1-9][0-9]{0,7})|(([0]\.\d{1,6}|[1-9][0-9]{0,7}\.\d{1,6})))$|(^\d{0,1}$)/
                if (!reg.test(value.trim())) {
                    var notice = $(ele).data('notice') ? $(ele).data(
                        'notice') : '';
                    return notice + '允许输入整数位八位，小数位六位';
                }
            },
            bigLetterNum: function (t) {
                //汉字字母数字
                if (t != '') {
                    if (!/^[A-Z0-9]+$/.test(t)) {
                        return '请输入数字、大写字母';
                    }
                }

            },
            num: function (t) {
                //数字
                if (t != '') {
                    if (!/^[0-9]+$/.test(t)) {
                        return '请输入数字';
                    }
                }

            },
            length18: function (t) {
                //汉字字母数字
                if (t != '') {
                    if (!/^\d{18}$/.test(t)) {
                        return '要求长度为18位';
                    }
                }

            },
            length15: function (t) {
                //长度限制
                if (t != '') {
                    if (!/^\d{15}$/.test(t)) {
                        return '要求长度为15位';
                    }
                }

            },
            length6: function (t) {
                //长度限制
                if (t != '') {
                    if (!/^\d{6}$/.test(t)) {
                        return '要求长度为6位';
                    }
                }

            }
        });
        // 表单提交
        form.on('submit(login-submit)', function (data) {
            layer.load(2);
            $.ajax({
                url: urls.login,
                type: 'POST',
                data: data.field,
                dataType: 'JSON',
                contentType: 'application/x-www-form-urlencoded',
                success: function (res) {
                    if (res.code === 1) {
                        if (!sessionStorage.getItem("dataUserName") && !sessionStorage.getItem("dataTokencode")) {
                            sessionStorage.setItem("dataUserName", res.data.user_name);//用户名
                            sessionStorage.setItem("dataTokencode", res.data.tokencode);//用户名
                        }
                        layer.msg(res.msg, {icon: 1, time: 1000},function () {
                            location.href = "index.html"
                        });
                    } else {
                        layer.msg(res.msg, {icon: 1, time: 1000})
                        layer.closeAll('loading');
                    }
                },
                error: function (xhr) {
                    console.log(xhr);
                    layer.closeAll('loading');
                }

            });
            return false
        });
        //点击注册
        $("#register").click(function () {
            $(".loginBlock").fadeOut(1200).css({"display": "none"})
            $(".resginNone").fadeIn(1200).css({"display": "block"})
        })
        //注册提交
        form.on('submit(register-submit)', function (data) {
            if (data.field.user_pass !== data.field.user_pass2) {
                layer.msg('两次密码输入不一致,请重新输入', {icon: 1, time: 1000})
            } else {
                delete (data.field.user_pass2)
                $.ajax({
                    url: urls.resgin,
                    type: 'POST',
                    data: data.field,
                    dataType: 'JSON',
                    contentType: 'application/x-www-form-urlencoded',
                    success: function (res) {
                        if (res.code === 1) {
                            // sessionStorage.setItem("dataUserName", res.data.user_name);//用户名
                            // sessionStorage.setItem("dataTokencode", res.data.tokencode);//用户名
                            layer.msg(res.msg, {icon: 1, time: 1000}, function () {
                                $(".loginBlock").fadeOut(1200).css({"display": "block"})
                                $(".resginNone").fadeIn(1200).css({"display": "none"})
                            });
                        } else {
                            layer.msg(res.msg, {icon: 1, time: 1000})
                        }
                    },
                    error: function (xhr) {
                        console.log(xhr);
                        layer.closeAll('loading');
                    }
                });
                return false
            }
        })
    });
})

//初始化
function clearSession() {
    sessionStorage.clear()
}