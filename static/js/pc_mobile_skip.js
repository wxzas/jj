(function($){
	$.isPhone = function(){
		if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
			return true;
		}
		return false;
	};
	$.pcToMobile = function(url){
		if(url.indexOf('/index.html') < 0){	
			url = url.replace('/frontpage/','/frontpage/mobile/').replace('.html','').replace('/html/','/dist/index.html#/');
		}else{
			url = url.replace('/frontpage/','/frontpage/mobile/').replace('index.html','').replace('/html/','/dist/index.html#/');
		}	
		return url;
	};	
	$.mobileToPc = function(url){				
		if (url.indexOf("?") != -1){
			var view = url.match(/html#\/(\S*)\?/)[1];//获取视图：如（newsDetail）
			if(!view){view = 'index';}		
			var param =  url.match(/\?(\S*)/)[1];//获取参数:如?id=***
			return  '/frontpage/jy/html/' + view + '.html?' + param;
		}else{
			var view = url.match(/html#\/(\S*)/)[1];;//获取视图：如（newsDetail）
			if(!view){view = 'index';}		
			return '/frontpage/jy/html/' + view + '.html';
		}
	};

	
	var url = window.location.href;
	
	
	
	if($.isPhone()){
		if(url.indexOf('/mobile/') < 0){		
			var view = url.match(/\/html\/(\S*)\.html/)[1];//获取视图：如（newsDetail）
			if(view == 'index'){ view = ''; }
			var param;
			if (url.indexOf("?") != -1){			
				param =  url.match(/\.html(\S*)/)[1];//获取参数:如?id=***
				window.location.href = '/frontpage/mobile/dist/index.html#/'+ view + param;
			}else{
				window.location.href = '/frontpage/mobile/dist/index.html#/'+ view;
			}
			
		}
	}else{
		if(url.indexOf('/mobile/')>=0){			
			if (url.indexOf("?") != -1){
				var view = url.match(/html#\/(\S*)\?/)[1];//获取视图：如（newsDetail）
				if(!view){view = 'index';}	
				var param =  url.match(/\?(\S*)/)[1];//获取参数:如?id=***
				window.location.href= '/frontpage/cufe/html/' + view + '.html?' + param;
			}else{
				var view = url.match(/html#\/(\S*)/)[1];;//获取视图：如（newsDetail）
				if(!view){view = 'index';}	
				window.location.href= '/frontpage/cufe/html/' + view + '.html';
			}
			
		}
	}
})($);



