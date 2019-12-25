$(function () {
    $("#header").load("common/header.html")
    $("#footer").load("common/footer.html")
    layui.use(['laypage', 'laytpl', 'layer'], function () {
        var layer = layui.layer
        var laypage = layui.laypage;
        var laytpl = layui.laytpl
        var page = 1;
        var total
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
        goodsList(1)
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