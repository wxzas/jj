
		$(function () {
			$('.header-mob-navbtn').on('click', function (){

				$(this).toggleClass('mob-nav-active');
				$('.nav').toggleClass('mob-nav-btn');

			});
			$('.header .nav li a').on('click', function (e){
				console.log($(this).parent('li'))
				$($(this).parent('li').find('ul')[0]).toggleClass('nav-menu-active');
				console.log($(this).find('ul')[0]);

			});
		})