/* 通用JS */

/* 手机导航栏 */

/* 手机导航栏 */
$(function() {
    $('.headerbtn_bar').click(function() {
        $('.iphone_nav').toggleClass('focus');
        $('.masking').toggleClass('focus');
    })
    $('.iphone_nav>.iphone-box>ul>li').click(function() {
        if ($(this).is('.active')) {
            $(this).find('ul').slideToggle();
        } else {
            $('.iphone_nav>.iphone-box>ul>li>ul').slideUp();
            $('.iphone_nav>.iphone-box>ul>li').removeClass('active');
            $(this).addClass('active').find('ul').slideDown();
        }
    })
    $('.masking').click(function() {
        $('.iphone_nav').toggleClass('focus');
        $('.masking').toggleClass('focus');
    });
})
