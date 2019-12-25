var lengthList,lengthList1
$(function ($) {
    layui.use(['laytpl', 'layer', 'carousel'], function () {
        var layer = layui.layer
        var laytpl = layui.laytpl
        $("#header").load("common/header.html")
        $("#footer").load("common/footer.html")
        productFuntion(laytpl)
        templateFunction(laytpl)
        reportFuntion(laytpl)
        goDetailsFunction()
        gotemplateDetailsFunction()
        goreportDetailsFunction()
        templatelook()

    })
})

//产品展示左右切换
function productlook(lengthList) {
    let tuijianBox4 = document.querySelector(".tuijianBox");
    let left4 = document.querySelector(".zuoyou i");
    let right4 = document.querySelector(".zuoyou li");
    let width4 = tuijianBox4.offsetWidth / 4;
    if (lengthList > 5) {
        leftRightFunction(right4, left4, width4, tuijianBox4)
    }
}

//模板展示左右切换
function templatelook(lengthList1) {
    let tuijianBox4 = document.querySelector(".tuijianBoxTemplate");
    let left4 = document.querySelector(".zuoyouTemplate i");
    let right4 = document.querySelector(".zuoyouTemplate li");
    let width4 = tuijianBox4.offsetWidth / 4;
    if (lengthList1 > 5) {
        leftRightFunction(right4, left4, width4, tuijianBox4)
    }
}

function leftRightFunction(right, left, width, box) {
    let nums1 = 0;
    right.onclick = function () {
        nums1++;
        if (nums1 == 4) {
            nums1 = 3;
        }
        box.style.transform = `translateX(${-width * nums1}px)`;
    }
    left.onclick = function () {
        nums1--;
        if (nums1 == -1) {
            nums1 = 0;
        }
        box.style.transform = `translateX(${-width * nums1}px)`;
    }
}

//产品展示
function productFuntion(laytpl) {
    $.ajax({
        url: urls.getProduct,
        type: 'POST',
        data: {},
        dataType: 'JSON',
        contentType: 'application/x-www-form-urlencoded',
        success: function (res) {
            if (res.code === 1) {
                var list = res.data;
                if (list === undefined) {
                    list = []
                }
                var getTpl = demoProduct.innerHTML
                    , view = document.getElementById('viewProduct');
                laytpl(getTpl).render(list, function (html) {
                    view.innerHTML = html;
                });
                lengthList = $(".tuijian-box").parent().children().length;
                productlook(lengthList)
            }

        }
    })
}

//模板展示
function templateFunction(laytpl) {
    $.ajax({
        url: urls.getTemplate,
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
                var getTpl = demoTemplate.innerHTML
                    , view = document.getElementById('viewTemplate');
                laytpl(getTpl).render(list, function (html) {
                    view.innerHTML = html;
                });
                lengthList1 = $("#btnListTemplate").parent().children().length;
                templatelook(lengthList1)
            }
        }
    })
}

//新闻展示
function reportFuntion(laytpl) {
    $.ajax({
        url: urls.getNews,
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
                var getTpl = demoReport.innerHTML
                    , view = document.getElementById('viewReport');
                laytpl(getTpl).render(list, function (html) {
                    view.innerHTML = html;
                });
            }
        }
    })
}

/*点击产品进去详情*/
function goDetailsFunction() {
    // 点击每条数据
    $("#viewProduct").on("click", '.tuijian-box', function (e) {
        var ids = e.target.id;
        if (ids){
            location.href = `productDetails.html?id=${ids}`
        }
    })
}

/*点击模板进去详情*/
function gotemplateDetailsFunction() {
    // 点击每条数据
    $("#viewTemplate").on("click", '.tuijian-box', function (e) {
        var ids = e.target.id;
        location.href = `templateDetails.html?id=${ids}`
    })
}

/*点击新闻进去详情*/
function goreportDetailsFunction() {
    // 点击每条数据
    $("#viewReport").on("click", '.viedo-box', function (e) {
        var ids = e.currentTarget.id;
        location.href = `reportDetails.html?id=${ids}`
    })
}
