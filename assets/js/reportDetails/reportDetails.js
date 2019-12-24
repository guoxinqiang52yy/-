$(function () {
    $("#header").load("common/header.html")
    $("#footer").load("common/footer.html")
    detailsFun()

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
                url: urls.newsDetail,
                type: 'POST',
                data: {
                    id: theRequest.id
                },
                dataType: 'JSON',
                contentType: 'application/x-www-form-urlencoded',
                success: function (res) {
                    if (res.code === 1) {
                        var b = '',d = ''
                        d = `<h3>${res.data.title}</h3><p>${res.data.add_time}</p>`
                        b += `<p>${res.data.detail}</p>`
                        $(".section-title").html(d)
                        $('.blog-details-content').html(b);
                    }
                }
            })
        }
    }
})

