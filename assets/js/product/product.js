var typeId
$(function () {
    $("#header").load("common/header.html")
    $("#footer").load("common/footer.html")

    layui.use(['laypage', 'laytpl', 'layer'], function () {
        var laypage = layui.laypage;
        var laytpl = layui.laytpl;
        var layer = layui.layer

        ajaxPage()
        cartgoryFunction()
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
        /*分页*/
        function ajaxPage(page, idList) {
            laypage.render({
                elem: 'pageNav'
                , count: 10
                , curr: page
                ,theme:'#000'
                , layout: ['prev', 'page', 'next']
                , jump: function (obj) {
                    page = obj.curr;
                    goodsList(page, idList, obj)
                }
            });
        }

        /*渲染产品列表*/
        function goodsList(page, idList, obj) {
            $.ajax({
                url: urls.productList,
                type: 'POST',
                data: {
                    page: page,
                    type_id: idList
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
                                        ajaxPage(1, typeId)
                                        layer.closeAll()
                                    })
                                }
                            }
                        }
                    })
                }
            })
        }
    })
    goDetailsFunction()
})


/*渲染*/


//laytpl


/*点击产品进去详情*/
function goDetailsFunction() {
    // 点击每条数据
    $("#viewIDList").on("click", '.viedo-box', function (e) {
        var ids = e.currentTarget.id;
        if (ids){
            location.href = `productDetails.html?id=${ids}`
        }
    })
}

