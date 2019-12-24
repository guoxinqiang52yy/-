$(function () {
    $("#header").load("common/header.html")
    $("#footer").load("common/footer.html")
    detailsFun()
})

function detailsFun() {
    var url = location.search
    var theRequest = new Object()
    if (url.indexOf('?') != -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }

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
                    </div>`
                    $('.videos-icon-text').html(b);
                    $(".blog-details-content").html(c)
                }
            }
        })
    }
}