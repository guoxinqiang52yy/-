var typeId, modelId
$(function ($) {
    $("#header").load("common/header.html")
    $("#footer").load("common/footer.html")
    layui.use(['layer', 'laypage', 'laytpl'], function () {
        var layer = layui.layer
        var laypage = layui.laypage;
        var laytpl = layui.laytpl
        cartgoryFunction()
        cartgoryFunction1()
        goDetailsFunction()

        /*渲染分类列表*/
        function cartgoryFunction() {
            $.ajax({
                url: urls.getTypeurl,
                type: 'POST',
                data: {},
                dataType: 'JSON',
                contentType: 'application/x-www-form-urlencoded',
                success: function (res) {
                    if (res.code === 1) {
                        var list = res.data;
                        if (list === '') {
                            list = []
                        } else {
                            var getTpl = demoClassList.innerHTML
                                , view = document.getElementById('viewClassList');
                            laytpl(getTpl).render(list, function (html) {
                                view.innerHTML = html;
                            });
                        }
                        //获取id
                        var ids = $('.option-list ul .addOpen1');
                        for (var d = 0; d < ids.length; d++) {
                            ids[d].onclick = function () {
                                var idsss = this.id
                                var idssstext = this.innerText
                                if (idsss) {
                                    showEditModel(idsss, idssstext)
                                }
                            }
                        }
                    }
                }
            })
        }

        /*渲染型号列表*/
        function cartgoryFunction1() {
            $.ajax({
                url: urls.getModel,
                type: 'POST',
                data: {},
                dataType: 'JSON',
                contentType: 'application/x-www-form-urlencoded',
                success: function (res) {
                    if (res.code === 1) {
                        var list = res.data;
                        if (list === '') {
                            list = []
                        } else {
                            var getTpl = demoClassListCode.innerHTML
                                , view = document.getElementById('viewClassListCode');
                            laytpl(getTpl).render(list, function (html) {
                                view.innerHTML = html;
                            });
                        }
                        //获取id
                        var ids = $('.option-list ul .addOpen2');
                        for (var d = 0; d < ids.length; d++) {
                            ids[d].onclick = function () {
                                if (this.id) {
                                    var iddd = this.id
                                    var idddtext = this.innerText
                                    showCodeFunction(iddd, idddtext)
                                }
                            }
                        }
                    }
                }
            })
        }

        // 显示分类二级弹框
        function showEditModel(mUser, parentsText) {
            layer.open({
                type: 1,
                anim: 1,
                title: '选择二级分类',
                area: ['50%', '50%'],
                offset: 'auto',
                content: $('#modelUser').html(),
                success: function (layero, dIndex) {
                    $.ajax({
                        url: urls.typeChild,
                        type: 'POST',
                        data: {
                            id: mUser
                        },
                        dataType: 'JSON',
                        contentType: 'application/x-www-form-urlencoded',
                        success: function (res) {
                            if (res.code === 1) {
                                var list = res.data;
                                if (list === '') {
                                    list = []
                                } else {
                                    var getTpl = demoClassListModel.innerHTML
                                        , view = document.getElementById('viewClassListModel');
                                    laytpl(getTpl).render(list, function (html) {
                                        view.innerHTML = html;
                                    });
                                    //点击分类获取数据
                                    $(".ClassListModel").click(function (e) {
                                        $(".selectClass").text(`${parentsText} / ${e.target.innerText}`)
                                        typeId = e.target.id
                                        if (modelId) {
                                            ajaxPage(1, typeId, modelId)
                                            layer.closeAll()
                                        } else {
                                            layer.msg("请选择型号", {icon: 1, time: 1000})
                                            setTimeout(function () {
                                                layer.closeAll()
                                            }, 1500)
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            })
        }

        //显示型号二级弹框
        function showCodeFunction(mUser, parentsText) {
            layer.open({
                type: 1,
                anim: 1,
                title: '选择二级分类',
                area: ['50%', '50%'],
                offset: 'auto',
                content: $('#modelUser1').html(),
                success: function (layero, dIndex) {
                    $.ajax({
                        url: urls.modelChild,
                        type: 'POST',
                        data: {
                            id: mUser
                        },
                        dataType: 'JSON',
                        contentType: 'application/x-www-form-urlencoded',
                        success: function (res) {
                            if (res.code === 1) {
                                var list = res.data;
                                if (list === '') {
                                    list = []
                                } else {
                                    var getTpl = demoClassListCodeModel.innerHTML
                                        ,
                                        view = document.getElementById('viewClassListCodeModel');
                                    laytpl(getTpl).render(list, function (html) {
                                        view.innerHTML = html;
                                    });
                                    //点击型号获取数据
                                    $(".ClassListCodeModel").click(function (e) {
                                        $(".selectCode").text(`${parentsText} / ${e.target.innerText}`)
                                        modelId = e.target.id
                                        if (typeId) {
                                            ajaxPage(1, typeId, modelId)
                                            layer.closeAll()
                                        } else {
                                            layer.msg("请选择型号", {icon: 1, time: 1000})
                                            setTimeout(function () {
                                                layer.closeAll()
                                            }, 1500)
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            })
        }

        //模板列表分页
        function ajaxPage(page, typeId, modelId) {
            laypage.render({
                elem: 'pageNav'
                , count: 10
                , curr: page
                , theme: '#000'
                , layout: ['prev', 'page', 'next']
                , jump: function (obj) {
                    page = obj.curr;
                    goodsList(page, typeId, modelId, obj)
                }
            });

        }

        /*渲染模板列表*/
        function goodsList(page, typeId, modelId, obj) {
            $.ajax({
                url: urls.templateList,
                type: 'POST',
                data: {
                    page: page,
                    type_id: typeId,
                    model_id: modelId
                },
                dataType: 'JSON',
                contentType: 'application/x-www-form-urlencoded',
                success: function (res) {
                    if (res.code === 1) {
                        var list = res.data;
                        if (list === '') {
                            list = []
                        } else {
                            var thisData = list.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                            var getTpl = demoList.innerHTML
                                , view = document.getElementById('viewIDList');
                            laytpl(getTpl).render(thisData, function (html) {
                                view.innerHTML = html;
                            });
                        }
                    } else {
                        var viewEmpty = document.getElementById('viewIDList');
                        viewEmpty.innerHTML = '';
                        layer.msg(res.msg, {icon: 1, time: 1000})
                    }
                }
            })
        }

        ajaxPage(1)

        /*点击模板进去详情*/
        function goDetailsFunction() {
            // 点击每条数据
            $(".layui-tpl").on("mouseenter", '.viedo-box', function (e) {
                var ids = e.currentTarget.id;
                if (ids !== undefined) {
                    $(".layui-tpl .viedo-box").click(function () {
                        event.stopPropagation();
                        location.href = `templateDetails.html?id=${ids}`

                    })
                    $(".layui-tpl .viedo-box-int").click(function () {
                        event.stopPropagation();
                        if (sessionStorage.getItem("dataTokencode")) {
                            $.ajax({
                                url: `${urls.templateDownload}?id=${ids}&tokencode=${sessionStorage.getItem("dataTokencode")}`,
                                type: 'get',
                                data: {},
                                dataType: 'JSON',
                                contentType: 'application/x-www-form-urlencoded',
                                success: function (res) {
                                    if (res.code === 1) {
                                        var a = document.createElement('a');
                                        a.href = `${res.data}`
                                        $('body').append(a);
                                        a.click();
                                        $(a).remove();
                                    } else {
                                        layer.msg(res.msg, {icon: 2, time: 1000})
                                    }
                                }
                            })
                        } else {
                            layer.msg("请登录", {icon: 1, time: 1000})
                        }
                    })
                } else {
                    return
                }
            })
        }
    })
})


