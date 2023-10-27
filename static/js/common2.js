$(function () {


  $('.collapse-button').click(function () {
    $('.phone_nav').toggleClass('active')
    $('.masking').toggleClass('active')
  })

  $('.masking').click(function () {
    $('.phone_nav').toggleClass('active')
    $('.masking').toggleClass('active')
  })


  $('.one>a>i.jian_down').click(function() {
    console.log(111)
    $(this).parent().siblings('ul').slideToggle();
  })

  // $('#one').click(function(){
  //   if($('#two').is(':hidden')){
  //     $('#two').show()
  //   }else{
  //     $('#two').hide()
  //   }
  // })

  $('.one>ul').mousemove(function(){
    $(this).find('ul').slideDown(300);
  });
  $('.one>ul').mouseleave(function(){
    $(this).find('ul').stop().slideUp("active");
  });
  


  // $(".phone_nav>.one").on("click", ".one", function() {
  //   $(".two_ji")[0].style.display = 'block';
  //   $(this).next('.two_ji').slideToggle(500);
  //   $(this).parent().siblings().children('.two_ji').slideUp(500);
  // });

 
})


