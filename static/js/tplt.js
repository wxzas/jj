/**模板通用的函数*/
(function($,artTemplate){
	template.helper('out',function(){
		var data = arguments[0] || {};
		if(arguments[1] != null && arguments[1]!==''){
			var urls = arguments[1].split('.');
			for(var i=0; i<urls.length; i++){
				data = data[urls[i]];
				if( data === undefined || data === '' ){
					return arguments[2] == null ? '' : arguments[2];
				}
			}
			return data;
		}else{
			return data || arguments[2]
		}
	});
	/**判断是否为空*/
	template.helper('addUrl',function(val){
		return window._config.domain+val;
	});
	/**判断是否为空*/
	template.helper('isEmpty',function(){
		return $.isEmpty(arguments[0]);
	});
	/**取整**/
	template.helper('parseInt',function(val){
		return $.parseInt(val);
	});
	/**判断是否相等*/
	template.helper('isEq',function(val1,val2){
		return val1 === val2;
	});
	/**判断json的长度*/
	template.helper('lengthJson',function(){
		return $.length_json(arguments[0]);
	});
	template.helper('toHtml',function(text){
		return $('<div/>').text(text).html();
	});
	/**日期格式化*/
	template.helper('dateFormate',function(date,fmt){
		date = date.replace(/-/g,"/");  
		date = new Date(date);
		var o = {
			"M+": date.getMonth() + 1, //月份 
			"d+": date.getDate(), //日 
			"h+": date.getHours(), //小时 
			"m+": date.getMinutes(), //分 
			"s+": date.getSeconds(), //秒 
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
			"S": date.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) 
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) 
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	});
	window.tplt = {};
	tplt.draw = function(name,data){
		data._config = window._config; // 常用的默认配置项
		var html = template(name,data);
		if(html==''){
			//return false;
		}
		$('#'+name+'Place').replaceWith($(html).attr('id',name+'Place'));
	}
})($,template);