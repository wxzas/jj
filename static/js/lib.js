$(document).ready(function() {

    // 导航
    $('.nav').each(function() {
        var LI = $(this).find('li');
        $(LI).hover(function() {
            $(this).addClass('on').removeClass('not').siblings('li').removeClass('on');
            if ($(LI).hasClass('on')) {
                $('li.on').next('li').addClass('not');
            }
        }, function() {
            if ($(LI).hasClass('not')) {
                $(LI).removeClass('not');
            }
        });
        if ($(LI).hasClass('on')) {
            $('li.on').next('li').addClass('not');
        }
    });
    $('.nav').hover(function() {
        // 空
    }, function() {
        $(this).each(function(index, el) {
            var LI = $(this).find('li');
            var active = $('li.on');
            if ($(LI).hasClass('on')) {
                $('li.on').next('li').addClass('not');
            }
        });
    });

    $('.nav li').hover(function() {
        $(this).find('dl').stop().slideDown();
    }, function() {
        $(this).find('dl').stop().slideUp();
    });

    // 手机导航
    $('.menuBtn').click(function(e) {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.menu').removeClass('open');
            e.stopPropagation();
        } else {
            $(this).addClass('on');
            $('.menu').addClass('open');
            e.stopPropagation();
        }
    });
    $('.menu').click(function(e) {
        e.stopPropagation();
    });
    $(document).on('click', function() {
        $('.menu').removeClass('open');
        $('.menuBtn').removeClass('on');
        $('.menu dl').stop().slideUp();
    });
    $('.menu li').click(function() {
        $(this).find('dl').stop().slideToggle();
        $(this).siblings('li').find('dl').stop().slideUp();
    });

    // 手机头部
    $(window).scroll(function() {
        var _top = $(window).scrollTop();
        if (_top > 10) {
            $('.m-header').css("box-shadow", "0 0 20px rgba(0,0,0,.3)");
        } else {
            $('.m-header').css("box-shadow", "none");
        }
    });

    // 选项卡 鼠标经过切换
    $(".TAB li").mousemove(function() {
        var tab = $(this).parent(".TAB");
        var con = tab.attr("id");
        var on = tab.find("li").index(this);
        $(this).addClass('hover').siblings(tab.find("li")).removeClass('hover');
        $(con).eq(on).show().siblings(con).hide();
    });

    // 百度分享
    window._bd_share_config = {
        "common": {
            "bdSnsKey": {},
            "bdText": "",
            "bdMini": "2",
            "bdMiniList": false,
            "bdPic": "",
            "bdStyle": "1",
            "bdSize": "32"
        },
        "share": {}
    };
    with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
});