$(function () {
    $("#header").load("common/header.html")
    $("#footer").load("common/footer.html")
    detailsFun()
})

function detailsFun() {
    var url = location.search //获取url中"?"符后的字串 ('?modFlag=business&role=1')
    var theRequest = new Object()
    if (url.indexOf('?') != -1) {
        var str = url.substr(1) //substr()方法返回从参数值开始到结束的字符串；
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
        $.ajax({
            url: urls.special_service_details,
            type: 'POST',
            data: {
                id: theRequest.id
            },
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded',
            success: function (res) {
                console.log(res);
                if (res.code === 1) {
                    var c = '';
                    var w = ''
                    c += `<div class="imgConCenter"><img src="${res.data.thumb}" alt=""></div>
                    <div class="layui-card mt-20">
                        <div class="layui-card-header">产品名称&nbsp;&nbsp;
                            <span>${res.data.title}</span>
                        </div>
                        <div class="layui-card-header">产品简介&nbsp;&nbsp;
                            <span>${res.data.info}</span>
                        </div>
                    </div>`
                    $(".blog-details-content").html(c)
                    if (res.data.photo_list != null) {
                        res.data.photo_list.forEach(val => {
                            w = `<div class="imgConCenter"><img src="${val.url}" alt=""></div>`
                            $(".blog-details-content").append(w)
                        })
                    }
                }
            }
        })
    }
}