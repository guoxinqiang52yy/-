$(function () {
    $("#header").load("common/header.html")
    $("#footer").load("common/footer.html")
    detailsFun()
})

function detailsFun() {
    layui.use(['layer', 'laypage', 'laytpl'], function () {


    var url = location.search
    var theRequest = new Object()
    if (url.indexOf('?') != -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
        //请求详情数据
        $.ajax({
            url: urls.templateDetail,
            type: 'POST',
            data: {
                id: theRequest.id
            },
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded',
            success: function (res) {

                if (res.code === 1) {
                    var b = '';
                    var c = '';
                    b += `<h3>Watch Video</h3>
                            <a class="popup-video wow pulse infinite"
                               href="${res.data.video}">
                                <i class="fa fa-play"></i>
                            </a>`
                    c += `<div class="imgConCenter"><img src="${res.data.image}" alt=""></div>
                        <div class="layui-card mt-20">
                        <div class="layui-card-header">模板名称&nbsp;&nbsp;
                            <span>${res.data.template_name}</span>
                        </div>
                        <div class="layui-card-header">模板简介&nbsp;&nbsp;
                            <span>${res.data.info}</span>
                        </div>
                        <div class="layui-card-header"><span class="spaceFont">镜</span>头&nbsp;&nbsp;
                            <span>${res.data.camera_lens}</span>
                        </div>
                        <div class="layui-card-header"><span class="spaceFont">辅</span>件&nbsp;&nbsp;
                            <span>${res.data.accessory}</span>
                        </div>
                        <div class="layui-card-header">工具坐标&nbsp;&nbsp;
                            <span>${res.data.tool_coordinates}</span>
                        </div>
                        <div class="layui-card-header">建议速度&nbsp;&nbsp;
                            <span>${res.data.recommended_speed}</span>
                        </div>
                        <div class="layui-card-header">桌子坐标&nbsp;&nbsp;
                            <span>${res.data.table_coordinates}</span>
                        </div>
                        <div class="layui-card-header">
                            <div class="viedo-box-int">下载模板</div>
                        </div>
                    </div>`
                    $('.videos-icon-text').html(b);
                    $(".blog-details-content").html(c)
                    // 下载
                    $(".viedo-box-int").click(function () {
                        downloadFunction()
                    })
                }
            }
        })
        function downloadFunction() {
            if (sessionStorage.getItem("dataTokencode")) {
                $.ajax({
                    url: `${urls.templateDownload}?id=${theRequest.id}&tokencode=${sessionStorage.getItem("dataTokencode")}`,
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
        }

    }
    })
}