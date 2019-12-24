$(function () {
    $("#header").load("common/header.html")
    $("#footer").load("common/footer.html")
    layui.use(['laypage', 'laytpl', 'layer'], function () {
        var layer = layui.layer
        var laypage = layui.laypage;
        var laytpl = layui.laytpl
        ajaxPage(1)

        //模板列表分页
        function ajaxPage(page) {
            laypage.render({
                elem: 'pageNav'
                , count: 10
                , curr: page
                , layout: ['prev', 'page', 'next']
                , jump: function (obj) {
                    page = obj.curr;
                    goodsList(obj)
                }
            });
        }

        /*渲染*/
        function goodsList(obj) {
            $.ajax({
                url: urls.newsList,
                type: 'POST',
                data: {},
                dataType: 'JSON',
                contentType: 'application/x-www-form-urlencoded',
                success: function (res) {
                    if (res.code === 1) {
                        var list = res.data;
                        if (list === '') {
                            list = []
                        }
                        var thisData = list.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                        var getTpl = demoList.innerHTML
                            , view = document.getElementById('viewIDList');
                        laytpl(getTpl).render(thisData, function (html) {
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
        var ids = $(e.target).parents('.viedo-box').data('id');
        location.href = `reportDetails.html?id=${ids}`
    })
}