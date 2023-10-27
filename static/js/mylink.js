$(function(){
var username= $.cookie('username');
if(username!="" && username!=null && username!=undefined){
     var params = {
			"username": username
			};
	$.getJSON("/listNavLink.jspx",params ,function(json){
             var v="";
if (json != null && json.length >0) {
		 for(var i = 0 ; i < json.length ; i++){
                      var index=window.parseInt(i) + 1;
                    v=v+getHtml(json[i].name,json[i].link,index);
        	 }
$("#list").html(v);
}
	});	
}
 });

function getHtml(name,link,index){
var html=" <li style='z-index:2;' id='nav_"+index+"' title='你可以拖动进行排序'>"
             +"<a class='icons nav-close' title='删除' href='javascript:;'></a>"
	       +"<a class='icons nav-rename' title='修改' href='javascript:;'></a>"
            +" <a id='a_"+index+"' class='nav-name' target='_blank' href='"+link+"' ><b class='icons'></b><em>"+name+"</em></a>"
            +" <div class='box'>"
               +" <input type='text' value='"+name+"' class='txt' id='name"+index+"' />"
              +"  <input type='text' value='"+link+"' class='txt txt1' id='link"+index+"' />"
             +"   <p align='right'><a href='javascript:changeNL("+index+")'>确定</a><a href='javascript:' class='close'>取消</a></p>"
           +"  </div>"
           +"</li>";
return html;
}

$(function(){
$(".search .tit a").hover(function(){
			var searchIndex = $(".search .tit li").index($(this).parent());
			$(this).addClass("cur").parent().siblings().children("a").removeClass("cur");
			$(".search .con .sCon").eq(searchIndex).show().siblings(".sCon").hide();
		})
		
		$(".bulletin .tit ul li").hover(function(){
			var bulletinIndex = $(".bulletin .tit ul li").index($(this));
			$(this).addClass("cur").siblings().removeClass("cur");
			$(".bulletin .con ul").eq(bulletinIndex).show().siblings().hide();
		})
		$(".popwin .tit a").click(function(){
			var popwinIndex = $(".popwin .tit li").index($(this).parent());
			$(this).addClass("cur").parent().siblings().children("a").removeClass("cur");
			$(".popwin .popCnt .sCon").eq(popwinIndex).show().siblings(".sCon").hide();
		})
	
	  $("#edit").click(function(){
		  $(".Fast_channel").addClass("fastCur");
		  })
	  $("#back").click(function(){
		  $(".Fast_channel").removeClass("fastCur");
editJsonStr();		  
		  })
	  $(".Fast_channel .nav_area li").hover(function(){
		  $(this).addClass("borderCur");
		  },function(){
		$(this).removeClass("borderCur");
		})	
	  $(".Fast_channel .nav_area li .nav-close").live('click', function(){
		 $(this).parent().hide();
		  $(this).parent().empty();
		  editJsonStr();
		  })	
	   
         $('#list li .nav-rename').live('click', function() {
  		  $(this).siblings(".box").show();
          });		  	
	   $(".Fast_channel .nav_area li .box p .close").live('click', function(){
		  $(this).parents(".box").hide();
		  })	
	  


$("#seleNod").one("click",function(){
		getSelecTag();
	})

});

function editJsonStr() {
var username= $.cookie('username');
if(username!="" && username!=null && username!=undefined){
		var jsonStr = "[";
		  jQuery("#list .nav-name").each(function(i) {
             	var hrefVal = $.trim($(this).attr("href"));
             	var txtVal = $.trim($(this).text());
             	jsonStr = jsonStr + "{\"name\":\"" + txtVal +"\",\"link\":\"" + hrefVal + "\",\"order\":\"" +(i+1)+ "\"},";
          });
		  jsonStr = jsonStr.substr(0,jsonStr.length-1)+"]";
		  if(jsonStr == "]") {
		  	 jsonStr="";
		  }
		  $.post("changeMyLinkOrder.jspx",{"jsonStr":jsonStr,"username":username},function(data){
				 
			}
		  );
}
	}

function changeNL(index) {
		var nval = $("#name"+index).val();
		var lval = $("#link"+index).val();
		$("#a_"+index).attr("href",lval);
		//$("#a_"+index+".icons em").text($.trim(nval));
		$("#a_"+index).html("<b class='icons'></b><em>"+$.trim(nval)+"</em>");
                 editJsonStr();
		$(".Fast_channel .nav_area li .box p .close").parents(".box").hide();
		
	}

