/*
===============
简单的瀑布流插件
===============
.list .item{width:calc(33.3% - 8px);position:absolute;margin-right:12px;}
.list .item:nth-child(3n){margin-right:0;}

$(".list").mFalls1({
		 //margin : "",
	 isCenter : false,//是否剧中
	   cancel : 750,
		imgload : true,
	 callback : function(idx){}
});

取首项值margin计算
*/

(function($) {
	$.fn.mFalls1 = function(options) {
		var fall,go_fill;
		var opts = $.extend({},$.fn.mFalls1.defaults,options);
		var frame,fw,
				child,cw,//子元素宽度，只支持固定宽度
				cols,//可容纳列数
				colh=[],//每列信息				
				fix=0,
				left,
				top,
				sto,
				z=0,
				margin;
		frame=$(this);
		fw=frame.width();	
		
		var getsize = function(){//计算列数
			fw=frame.width();	
			child=frame.children();
			if(frame.css("position")=="static"){frame.css("position","relative");}
			if(child.css("position")!="absolute"){child.css("position","inherit");}
			cw=child.outerWidth();
			cols=((fw - getMargin()*((fw/cw)-1))/cw);
		}
		
		fall = function(){
			getsize();
			//取消瀑布流
			if($(window).width()<=opts.cancel){
				frame.css("height","auto");
				child.css({left:"auto",top:"auto",position:"static"});
				return false;
			}
			frame.attr("cols",cols);
			margin=getMargin();//记录间距
			if(opts.isCenter){
				fix=(fw-cols*cw-(cols-1)*getMargin())*0.5;
			}
			colh=[];
			for(var i=0;i<cols;i++){//初始化
				colh[i]={h:0,i:i};
			}
			//if(cols>2 && $(window).width()>=1024){
				/*for(var i=0;i<Math.floor(cols/2);i++){
					colh[i]["h"]+=(Math.floor(cols/2)-i)*child.eq(0).width()*0.7
				}
				for(var i=0;i<Math.floor(cols/2);i++){
					colh[cols-i-1]["h"]+=(Math.floor(cols/2)-i)*child.eq(0).width()*0.7
				}
				*/
				colh[0]["h"]=$(".x-layout").width() * 0.28;
				colh[1]["h"] = $(".x-layout").width() * 0.18;
				colh[3]["h"]=$(".x-layout").width() * 0.08;
			//}
			
			child.each(function (index, element) {
				//排序
				colh.sort(function(a,b){
					if(a["h"]!=b["h"]){z++;}
					return a["h"]-b["h"];
				});
				//高度相等按序号重新排序
				if(z==0){
					colh.sort(function(a,b){	
						return a["i"]-b["i"];
					});
				}
				z = 0;
				
				/*if(colh[0]["i"]==0){//第一列
					left=colh[0]["i"]*getMargin() + fix;
				}
				else{*/
				
					left=colh[0]["i"]*(getMargin() + cw) + fix;
				//}
				
				if (index < cols) {//第一行
					top=colh[0]["h"];
					colh[0]["h"]=colh[0]["h"]+$(this).outerHeight()+getMargin();;//记录行高	
				}
				else{
					top=colh[0]["h"]+getMargin();
					colh[0]["h"]=colh[0]["h"]+$(this).outerHeight()+getMargin();
				}
				
				if($(this).css("position")!="absolute"){$(this).css("position","absolute");}
				$(this).css({left:left,top:top});
				
				
				
			});
			
			colh.sort(function(a,b){return b["h"]-a["h"];});
			frame.height(colh[0]["h"]);
			if(typeof(opts.callback)=="function"){
				opts.callback();
			}
		}
		
		$(window).resize(function(){
			clearTimeout(sto);
			sto=setTimeout(function(){
				getsize();
				//if(frame.attr("cols")!=cols || margin!=getMargin() || fw!=frame.width()){
					fall();
				//}
			},500);
		});
		
		function getMargin(){				
			/*if(typeof(opts.margin)=="object"){
				var mg=0;
				for(var i=0;i<opts.margin.length;i++){
					var m=new Object(opts.margin[i]);
					if($(window).width()>m.width){
						mg=m.value;
					}
				}
				return mg;
			}
			else{
				return opts.margin;
			}*/
			var mg=parseInt(child.eq(0).css("margin-left"))+parseInt(child.eq(0).css("margin-right"));
			return mg;
		}
		
		go_fall=function(){
			if(opts.imgload && frame.find("img").size()>0){
				//获取所有图片地址
				var imgall = [];
				var $imgs = frame.find("img");
				$imgs.each(function() {
					var item = $(this);
					if (typeof(item.attr("src")) != "undefined" && item.attr("src")!="" && this.nodeName.toLowerCase() == "img") {
						imgall.push({
							src: item.attr('src')
						});
					}
					/*else if (item.css("background-image") != "none") {
						imgall.push({
							src: item.css("background-image").replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
						});
					}*/
				});
				imgc=imgall.length;
				
				$.imgpreload(imgall,{
					each: function(){					
					},
					all: function(){
						fall();
					}
				});
			}
			else{
				fall();
			}
		}
		
		go_fall();
	};	
	
	$.fn.mFalls1.resize=function(){		
		go_fall();
	}
	
	$.fn.mFalls1.defaults = {
		 //margin : "",
	 isCenter : false,//是否剧中
		imgload : true,
	 callback : function(idx){}
	}
})(jQuery);