$(document).ready(function(){
	//分享hover效果
	$(".main .main_til .absolute .floatr img").mouseover(function(){
		var Simglength = $(this).parent("a").index() + 1 ;
		SimgSrch = 'images/base/second_til_shearh' + Simglength + '.png';
		$(this).attr("src",SimgSrch);
	});
	$(".main .main_til .absolute .floatr img").mouseout(function(){
		var Simglength = $(this).parent("a").index() + 1 ;
		SimgSrch = 'images/base/second_til_shear' + Simglength + '.png';
		$(this).attr("src",SimgSrch);
	});
	$(".w1200 .mycontent p>img").parent("p").css({"text-indent":"0","text-align":"center"});
    	//搜索 hover效果

	//内容部分左侧选项卡 end
	$(".sc-newcnt .lefttab > span").click(function(){
		if(!$(this).hasClass("on")){
			$(this).addClass("on").siblings("span").removeClass("on");
			$(this).siblings("a").css("display","none");
			$(this).siblings("a").eq($(this).index()).css("display","block");
			$(this).parent(".lefttab").siblings(".lftabint").find("ul").css("display","none");
			$(this).parent(".lefttab").siblings(".lftabint").find("ul").eq($(this).index()).fadeIn(600);
		}
		if($(this).index()==1){
			$(this).parent(".lefttab").addClass("bgchange");
		}else{$(this).parent(".lefttab").removeClass("bgchange");}
	});
	//教学发展选项卡
	$(function(){
		var leftMenuIndex =	$(".content .menu .menuli.on").index();
		if(leftMenuIndex <= 0 ){
			$(".content .menu .menuli").css("display","none");
			$(".content .menu li").eq(0).click(function(){
				if($(this).next("li").css("display") =="none"){
					$(".content .menu li.firstli + li,.content .menu li.firstli + li + li").css("display","block");
				}else{$(".content .menu li.firstli + li,.content .menu li.firstli + li + li").css("display","none");}
			});
			$(".content .menu li").eq(3).click(function(){
				if($(this).next("li").css("display") =="none"){
					$(".content .menu li.firstli + li + li + li + li,.content .menu li.firstli + li + li + li + li +li,.content .menu li.firstli + li + li + li + li + li +li").css("display","block")
				}else{$(".content .menu li.firstli + li + li + li + li,.content .menu li.firstli + li + li + li + li +li,.content .menu li.firstli + li + li + li + li + li +li").css("display","none")}
			});
		}else if(leftMenuIndex > 0 && leftMenuIndex <= 2 ){
			$(".content .menu .menuli:gt(1)").css("display","none");
			$(".content .menu li").eq(0).click(function(){
				if($(this).next("li").css("display") =="none"){
					$(".content .menu li.firstli + li,.content .menu li.firstli + li + li").css("display","block");
				}else{$(".content .menu li.firstli + li,.content .menu li.firstli + li + li").css("display","none");}
			});
			$(".content .menu li").eq(3).click(function(){
				if($(this).next("li").css("display") =="none"){
					$(".content .menu li.firstli + li + li + li + li,.content .menu li.firstli + li + li + li + li +li,.content .menu li.firstli + li + li + li + li + li +li").css("display","block")
				}else{$(".content .menu li.firstli + li + li + li + li,.content .menu li.firstli + li + li + li + li +li,.content .menu li.firstli + li + li + li + li + li +li").css("display","none")}
			});
		}else{
			$(".content .menu .menuli:lt(2)").css("display","none");
			$(".content .menu li").eq(0).click(function(){
				if($(this).next("li").css("display") =="none"){
					$(".content .menu li.firstli + li,.content .menu li.firstli + li + li").css("display","block");
				}else{$(".content .menu li.firstli + li,.content .menu li.firstli + li + li").css("display","none");}
			});
			$(".content .menu li").eq(3).click(function(){
				if($(this).next("li").css("display") =="none"){
					$(".content .menu li.firstli + li + li + li + li,.content .menu li.firstli + li + li + li + li +li,.content .menu li.firstli + li + li + li + li + li +li").css("display","block")
				}else{$(".content .menu li.firstli + li + li + li + li,.content .menu li.firstli + li + li + li + li +li,.content .menu li.firstli + li + li + li + li + li +li").css("display","none")}
			});
		}
	});//教学发展选项卡 end
		
})