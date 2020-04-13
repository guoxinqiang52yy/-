$(function () {
    $("#header").load("common/header.html")
    $("#footer").load("common/footer.html")
    layui.use(['laypage', 'laytpl', 'layer','flow'], function () {
        var layer = layui.layer
        var laypage = layui.laypage;
        var laytpl = layui.laytpl
        var flow = layui.flow;
        flow.lazyimg();
        var page = 1;
        var total
        //搜索
        var url = location.search //获取url中"?"符后的字串 ('?modFlag=business&role=1')
        var theRequest = new Object()
        var id4, keyword4
        if (url.indexOf('?') != -1) {
            var str = url.substr(1) //substr()方法返回从参数值开始到结束的字符串；
            var strs = str.split('&')
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
            }
        }
        if (theRequest.id4 != undefined && theRequest.keyword4 != undefined) {
            id4 = theRequest.id4
            keyword4 = theRequest.keyword4
            var decodedUrl = decodeURIComponent(keyword4);
            submit_from(id4, decodedUrl)
        } else {
            goodsList(1)
        }

        function submit_from(id, keyword) {
            $.ajax({
                url: urls.search,
                type: 'POST',
                data: {
                    id: id,
                    keyword: keyword,
                    page: 1
                },
                dataType: 'JSON',
                contentType: 'application/x-www-form-urlencoded',
                success: function (res) {
                    console.log(res);
                    if (res.code === 1) {
                        total = res.count
                        ajaxPage(1,total)
                        var list = res.data;
                        if (list === '') {
                            list = []
                        }
                        var getTpl = demoList.innerHTML
                            , view = document.getElementById('viewIDList');
                        laytpl(getTpl).render(list, function (html) {
                            view.innerHTML = html;
                        });
                    }else{
                        layer.msg(res.msg, {icon: 1, time: 1000})
                    }
                }
            })
        }
        //模板列表分页
        function ajaxPage(page,count) {
            laypage.render({
                elem: 'pageNav'
                , count: count
                , curr: page
                , limit: 12
                ,theme:'#000'
                , layout: ['prev', 'page', 'next']
                , jump: function (obj,first) {
                    page = obj.curr;
                    //首次不执行
                    if(!first){
                        goodsList(obj.curr)
                    }
                }
            });
        }

        /*渲染*/
        function goodsList(page) {
            $.ajax({
                url: urls.newsList,
                type: 'POST',
                data: {
                    page:page
                },
                dataType: 'JSON',
                contentType: 'application/x-www-form-urlencoded',
                success: function (res) {
                    if (res.code === 1) {
                        total = res.count
                        ajaxPage(page,total)
                        var list = res.data;
                        if (list === '') {
                            list = []
                        }
                        var getTpl = demoList.innerHTML
                            , view = document.getElementById('viewIDList');
                        laytpl(getTpl).render(list, function (html) {
                            view.innerHTML = html;
                        });
                    }
                }
            })
        }
        goDetailsFunction()
    })
})

/*点击模板进去详情*/
function goDetailsFunction() {
    $("#viewIDList").on("click", '.viedo-box', function (e) {
        var ids = e.currentTarget.id;
        if (ids){
            location.href = `reportDetails.html?id=${ids}`
        }
    })
}