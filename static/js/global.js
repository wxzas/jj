;(function(window, document, $, undefined) {

/*	配置说明
	1. 按照指定数据类型配置，勿以其他数据类型测试，没有进行深度判断;
	2. 含有 “data_” 前缀的参数 [data_xx: yy] 表示此参数可通过给元素设置属性 data-xx="yy" 行内配置，且行内属性配置优先级最高
	
bdShare
	-[Boolean] 是否开启百度分享
	
placeholder
	-[Boolean] 是否调用 placeholder 插件
	
htmlSize
	-[Boolean] 是否以默认值开启 rem 缩放函数
	-[Object]
		dpx: 750 设计图宽度
		mpx: 320 最小计算宽度
		
contHeight
	-[Boolean] 是否以默认值开启 container 最小高度设置
	-[Object]
		data_pt: true		是否为 x-container 添加 padding-top 值来填充 x-header 的高度
		data_mh: ''			元素 min-height 设置为 container 高度，多个元素逗号分隔（data-wh=".class1, .class2"）
		data_wh: ''			元素设置为 屏幕高度，多个元素逗号分隔（data-wh=".class1, .class2"）
		data_ch: ''			元素设置为 屏幕高度减去头部、底部高度，多个元素逗号分隔（data-wh=".class1, .class2"）
		data_sh: ''			元素设置为 屏幕高度减去头部高度，多个元素逗号分隔（data-wh=".class1, .class2"）
		
horizontalNav	运行此方法需要 .x-header 具有 .hz-nav 类名以应用水平导航样式
	-[Boolean] 是否以默认值开启水平导航栏项目水平居中
	-[Object]
		elm: '.nav-lv2'		类名(要加‘.’) 应用水平居中的元素对象，多个元素逗号分隔（".class1, .class2"）
		exp: 'exp'				类名(不要加‘.’) 排除计算的元素对象
		
goTop
	-[String] elm: '' 类名(要加‘.’) 元素对象,多个元素逗号分隔（".class1, .class2"）
		
scrollShow
	-[Array] 配置项数组，项目应为如下对象
	-[Object]
		elm: ''					随滚动条显隐的元素
		cls: 'x-show'		对象显示状态类名（此类名无须加“.”号）
		range: 0				触发位置
		always: false		单屏页面是否显示
*/
		
	xPage({
		bdShare: true,
//		htmlSize: false,
		placeholder: true,
		contHeight: true,
		horizontalNav: true,
		goTop: '.gotop',
		scrollShow: [
			{
				elm: '.gotop'
			},
			{
				elm: '.x-sidebar',
				range: $(window).height()/2,
				always: true
			}
		]
	});
	
/* ******************************************************************************************************************* */
	
	$.xPage = {
		scrollShow: scrollShow
	};
	
	function xPage(options){
		
		var def = {
			bdShare: false,
			placeholder: false,
			htmlSize: {
				dpx: 750,
				mpx: 320
			},
			contHeight: {
				data_pt: true,
				data_mh: '',
				data_wh: '',
				data_ch: '',
				data_sh: ''
			},
			horizontalNav: {
				elm: '.nav-lv2',
				exp: 'exp'
			},
		};
		
		var cfg = {
			header: 		'.universal_header',
			container: 	'.x-container',
			footer: 		'.universal_footer',
			navGrp:			'.nav-grp',
			hzNav:			'hz-nav'
		};
		
		var opts = $.extend(true, {}, def, options);
		
		if(is_true(opts.htmlSize)){
			htmlSize(def.htmlSize.dpx, def.htmlSize.mpx);
		}else if(is_object(opts.htmlSize)){
			htmlSize(opts.htmlSize.dpx, opts.htmlSize.mpx);
		}

		fixRequestAnimationFrame();
		
		$(function(){
			
			if(is_true(opts.bdShare)){
				bdShare();
			}

			if(is_true(opts.placeholder)){
				placeholder();
			}

			if(is_true(opts.contHeight)){
				contHeight(def.contHeight, cfg);
			}else if(is_object(opts.contHeight)){
				contHeight(opts.contHeight, cfg);
			}

			if(is_true(opts.horizontalNav)){
				horizontalNav(def.horizontalNav, cfg);
			}else if(is_object(opts.contHeight)){
				horizontalNav(opts.horizontalNav, cfg);
			}

			goTop(opts.goTop);

			scrollShow(opts.scrollShow);
			
			
			
			
		});
	}
	
/*	百度分享 */
	function bdShare(){
		window._bd_share_config = {"common":{"bdMini":"2","bdMiniList":false},"share":{"bdCustomStyle":"http://codebase.dev.ftbj.net/common/src/frame_respond(new)/Public/static/themes/css/bdshare.css"}};
		$('head').append($('<script src="http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5) +'">'));
	}
	
/*	placeholder	*/
	function placeholder(){
		$('input, textarea').placeholder();
	}
	
/*	rem 缩放函数
			dpx-[整数] 设计图宽度像素值;（窗口宽度大于此值时字号固定为 100px）
			mpx-[整数] 最小计算宽度像素值;（窗口宽度小于此值时字号固定为 mpx/dpx*100）
*/	
	function htmlSize(dpx, mpx){
		foo();

		function foo(){
			var ww = $(window).width() < mpx ? mpx : $(window).width();
			if(ww > dpx){
				$('html').css({'font-size' : '100px'});
			}else{
				$('html').css({'font-size' : (ww/dpx)*100 + 'px'});
			}
		}

		$(window).on('resize', foo);
	}
	
/*	container 高度设置
			obj-[对象]
				data_pt: true		是否为 x-container 添加 padding-top 值来填充 x-header 的高度
				data_mh: ''			元素 min-height 设置为 container 高度，多个元素逗号分隔（data-wh=".class1, .class2"）
				data_wh: ''			元素设置为 屏幕高度，多个元素逗号分隔（data-wh=".class1, .class2"）
				data_ch: ''			元素设置为 屏幕高度减去头部、底部高度，多个元素逗号分隔（data-wh=".class1, .class2"）
				data_sh: ''			元素设置为 屏幕高度减去头部高度，多个元素逗号分隔（data-wh=".class1, .class2"）
*/	
	function contHeight(obj, cfg){
		var header = $(cfg.header),
				container = $(cfg.container),
				footer = $(cfg.footer),
        padtop = !is_undefined(container.data('pt')) ? container.data('pt') : obj.data_pt,
        padbot = !is_undefined(container.data('pb')) ? container.data('pb') : obj.data_pt,
				mhelm = !is_undefined(container.data('mh')) ? container.data('mh') : obj.data_mh,
				whelm = !is_undefined(container.data('wh')) ? container.data('wh') : obj.data_wh,
				chelm = !is_undefined(container.data('ch')) ? container.data('ch') : obj.data_ch,
				shelm = !is_undefined(container.data('sh')) ? container.data('sh') : obj.data_sh;

		foo();
		
		$(window).on('load', foo);

		$(window).on('resize', foo);

		function foo(){
			var wHeight	= $(window).height();
			var hHeight	= header.outerHeight();
			var fHeight	= footer.outerHeight(true);

			var cheight = wHeight - fHeight;
      var pt = hHeight;
      var pb = fHeight;

			if(header.css('position') === 'fixed' || header.css('position') === 'absolute'){
				if(is_true(padtop)){
					if(container.css('box-sizing') === 'border-box'){
						cheight = cheight;
					}
				}else{
					pt = 0;
					cheight = cheight;
				}
				container.css({'padding-top' : pt + 'px'});
			}

			if(footer.css('position') === 'fixed' || footer.css('position') === 'absolute'){
        if(is_true(padbot)){
					if(container.css('box-sizing') === 'border-box'){
						cheight = cheight + fHeight;
					}
				}else{
					pb = 0;
					cheight = cheight + fHeight;
				}
				container.css({'padding-bottom' : pb + 'px'});
			}

			container.css({'min-height' : cheight + 'px'});
			
			$(mhelm).each(function(){
				if(is_true(padtop) && container.css('box-sizing') === 'border-box'){
					$(this).css({'min-height' : cheight + 'px'});
				}
			});

			$(whelm).each(function(){
				$(this).css({'height' : wHeight + 'px'});
			});

			$(chelm).each(function(){
				$(this).css({'height' : cheight + 'px'});
			});
			
			$(shelm).each(function(){
				$(this).css({'height' : wHeight - hHeight + 'px'});
			});
		}
	}

/*	元素随滚动条显隐
			[对象]或[对象数组]
				elm-[字符串] 类名(要加‘.’) 元素对象
				cls-[字符串] 类名(不要加‘.’) 对象显示状态样式名
				range-[整数] window 的 scrollTop 大于 range 时 elm 添加 cls
				always-[布尔] 当页面高度只有一屏时，是否显示对象
*/
	function scrollShow(arr){
		if(is_object(arr)){
			arr = [arr];
		}
		
		if(!is_array(arr)){
			return;
		}

		foo();

		$(window).on('resize scroll', foo);

		function foo(){
			for(var i = 0; i < arr.length; i++){
				fun(arr[i]);
			}
		}

		function fun(obj){
			var elm = obj.elm,
					cls = is_string(obj.cls) ? obj.cls : 'x-show',
					range = is_number(obj.range) ? obj.range : 0,
					always = is_boolean(obj.always) ? obj.always : false;
			
			if($('body').height() > $(window).height()){
				if($(window).scrollTop() > range){
					if(!$(elm).hasClass(cls)){
						$(elm).addClass(cls);
					}
				}else{
					if($(elm).hasClass(cls)){
						$(elm).removeClass(cls);
					}
				}
			}else{
				if(always){
					$(elm).addClass(cls);
				}
			}
		}
	}
	
/*	返回顶部
			elm-[字符串]	类名(要加‘.’) 元素对象,多个元素逗号分隔（".class1, .class2"）
*/
	function goTop(elm){
		$(elm).on('click', function(){
			$('body, html').stop().animate({scrollTop: 0}, 400 + $(window).scrollTop() * 0.3);
		});
	}
	
/*	水平导航栏项目水平居中，运行此方法需要 .x-header 具有 .hz-nav 类名
			obj-[对象]
				elm-[字符串] 类名(要加‘.’) 应用水平居中的元素对象
				exp-[字符串] 类名(不要加‘.’) 排除计算的元素对象
*/
	function horizontalNav(obj, cfg){
		if(!$(cfg.header).hasClass(cfg.hzNav)) return;

		if(!device().isMobile){
			getSubnavPos();

			$(window).on('resize', getSubnavPos);
		}

		function getSubnavPos(){
			$(obj.elm).each(function(){
				var $this = $(this);
				if($this.hasClass(obj.exp)) return;

				var wwidth = $(window).width(),
						twidth = $this.parent().width(),
						posl = $this.parent().offset().left,
						width = 0;

				if((twidth / 2 + posl) > (wwidth / 2)){
					width = (wwidth - (twidth / 2 + posl)) * 2;
				}else{
					width = (twidth / 2 + posl) * 2;
				}

				$this.css({'width': wwidth + 'px', left: -posl + 'px'}).find(cfg.navGrp).css({'width': width + 'px', 'margin-left': (twidth / 2 + posl) - (width / 2) + 'px'});
			});
		}
	}
	
	
/*	requestAnimationFrame 兼容函数	*/
	function fixRequestAnimationFrame(){
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame'] || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = new Date().getTime();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
	}
	
	function jqClass(param){
		return $('.' + param);
	}
	
/*	百度地图	*/
	$.fn.xMap = function(options){
		var $map = this;

		var def = {
			map: {
				style: 'normal',										//	地图风格 normal、dark、midnight、grayscale、hardedge
				zoom: 18,														//	地图缩放级别
				mclick: false,											//	地图背景是否可点击
				maker: {
					src: '',													//	自定义图标地址
					size: [100, 100],									//	图标尺寸
					offset: [0, 0],										//	图标偏移
					anim: false												//	图标弹跳动画
				},
				load: {
					count: 0,
					complete: 0
				}
			},
			cenOffset: {													//	中心点偏移
				x: 0,
				y: 0
			},
			control: {
				zoomBar: true,    									//	平移缩放控件
				miniMap: false    									//	缩略图控件
			},
			event: {
				drag: true,													//	拖拽
				wheelZoom: false										//	滚动缩放
			},
			data: {
				data_list: 'bdmap-list-item',				//	查询列表项类名
				data_info: 'bdmap-info-item',				//	信息框项类名
				data_sync: 'bdmap-sync-item',				//	关联项类名
				data_cur: -1,												//	当前触发项
				data_showinfo: true,								//	是否自动弹出信息框
				data_search: null										//	查询关键字或坐标
			},
			temp: []															//	临时数据
		};
		
		var opts = extendOpts();

		if(!window.BMap){
			loadMap();
		}else{
			createMap();
		}

		function getMapData(){
			var data = {};
			
			for(var k in $map.data()){
				if(is_exist($map.data(k))){
					data['data_' + k] = $map.data(k);
				}
			}
			
			def.temp.push(data.data_search);
			data.data_search = [];

			return data;
		}
		
		function getOpts(){
			var obj = $.extend(true, {}, options);
		
			if(is_object(obj)){
				if(is_number(obj.map)){
					obj.map = {zoom: obj.map};
				}else if(is_string(obj.map)){
					obj.map = {style: obj.map};
				}else if(is_boolean(obj.map)){
					obj.map = {mclick: obj.map};
				}

				if(is_number(obj.cenOffset)){
					obj.cenOffset = {x: obj.cenOffset};
				}

				if(is_string(obj.data)){
					var arr1 = obj.data.split(',');

					for(var i = 0; i < arr1.length; i++){
						arr1[i] = parseFloat(arr1[i]);
					}

					if(is_number(arr1[0])){
						obj.data = {data_search: [arr1]};
					}else{
						obj.data = {data_search: arr1};
					}
				}

				if(is_array(obj.data)){
					for(var j = 0; j< obj.data.length; j++){
						if(is_string(obj.data[j])){
							var arr2 = obj.data[j].split(',');

							for(var x = 0; x < arr2.length; x++){
								arr2[x] = parseFloat(arr2[x]);
							}

							if(is_number(arr2[0])){
								obj.data[j] = arr2;
							}
						}
					}
					obj.data = {data_search: obj.data};
				}

				return obj;
			}else{
				return {};
			}
		}		
		
		function extendOpts(){
			var obj = $.extend(true, {}, def, getOpts(), {data: getMapData()});
			
			getListData();
			
			if(is_undefined(obj.data.data_list)){
				if(is_undefined(obj.temp[0])){
					return false;
				}
				
				obj.data.data_search = [obj.temp.shift()];
				obj.data.data_cur = -1;
			}else{
				if(is_undefined(obj.temp[0])){
					obj.temp = [];
					obj.data.data_cur = 0;
				}else{
					obj.data.data_search.push(obj.temp.shift());
					obj.data.data_cur = -1;
				}
			}
			
			function getListData(){
				if(is_undefined(obj.data.data_list)){
					return;
				}
				
				if(obj.data.data_search.length > jqClass(obj.data.data_list).length){
					obj.data.data_search.push(obj.data.data_search.shift());
				}else{
//					obj.data.data_cur = obj.data.data_cur < 0 ? 0 : obj.data.data_cur;
				}
				
				jqClass(obj.data.data_list).each(function(idx){
					var $this = $(this),
							_data = $this.data('search');
					
					if(!is_undefined(_data)){
						if(is_string(_data)){
							var arr1 = _data.split(',');
							var isPoint = false;

							for(var i = 0; i < arr1.length; i++){
								arr1[i] = parseFloat(arr1[i]);
								if(is_number(arr1[i])){
									isPoint = true;
								}
							}

							if(isPoint){
								_data = arr1;
							}
						}
						
						obj.data.data_search[idx] = _data;
					}
				});
			}
			
			function formatSearch(ds){
				for(var i = 0; i < ds.length; i++){
					if(is_string(ds[i])){
						var isPoint = 0;
						
						if(ds[i].indexOf(',') != -1){
							var arr = ds[i].split(',');

							for(var j = 0; j < arr.length; j++){
								if(is_number(parseFloat(arr[j]))){
									arr[j] = parseFloat(arr[j]);
									isPoint++;
								}else{
									break;
								}
							}

						}

						if(isPoint > 1){
							ds[i] = arr;
						}
					}
				}
			}
			
			return obj;
		}
		
		function loadMap(){
			window.BMap = window.BMap || {};
			window.BMap.apiLoad = function (){
				delete window.BMap.apiLoad;
				createMap();
			};

			var s = document.createElement('script');
			s.src = 'http://api.map.baidu.com/getscript?v=3.0&ak=3c3f2a3587ab7a1d7ac9f2b326d66ec8&services=&t=' + new Date().getTime();
			document.body.appendChild(s);
		}

		function createMap(){

//			if ($map.length > 1) {
//				return $map.each(function() {
//					$(this).xMap(opts);
//					createMap($(this), opts);
//				});
//			}
			
			var map = new BMap.Map($map[0], {enableMapClick: opts.map.mclick});

//			map.centerAndZoom(new BMap.Point(0, 0), opts.map.zoom);
//			map.centerAndZoom('北京');
//			map.setCenter(new BMap.Point(116.404, 39.915));
//			map.setZoom(opts.map.zoom);
//			cenOffset();
			addMapControl();			//	向地图添加控件
			setMapEvent();				//	设置地图事件
			setMapStyle();		  	//	设置地图风格	http://lbsyun.baidu.com/custom/list.htm
			setTempData();				//	调用查询函数
			
//			map.addEventListener("tilesloaded", setFirst);
			
			if(!is_undefined(opts.data.data_list)){
				jqClass(opts.data.data_list).on('click.xmap', function(){
					var $this = $(this);

					if(!$this.hasClass('cur')){
						$this.addClass('cur').siblings().removeClass('cur');
//						map.panTo(def.temp[$(this).index()].point, true);
						map.setCenter(opts.temp[$this.index()].point);
						cenOffset();
						
						if(is_true(opts.data.data_showinfo) && !is_undefined(opts.temp[$this.index()].info)){
							opts.temp[$this.index()].marker.openInfoWindow(opts.temp[$this.index()].info);
						}
						
						if(!is_undefined(opts.data.data_sync) && jqClass(opts.data.data_sync).length >= jqClass(opts.data.data_list).length){
							jqClass(opts.data.data_sync).eq($this.index()).addClass('act').siblings().removeClass('act');
						}
					}
				});
			}

			function cenOffset(){
				if(!device().isMobile){
					map.panBy(opts.cenOffset.x, opts.cenOffset.y, {noAnimation: true});
				}
				
//				map.addEventListener('load',function(){
//				setTimeout(function(){
//				},1000);
//				});
			}

			function addMapControl(){
				if(is_true(opts.control)){
					if(is_true(def.control.zoomBar)){
						map.addControl(new BMap.NavigationControl());
					}

					if(is_true(def.control.miniMap)){
						map.addControl(new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
					}
				}

				if(is_object(opts.control)){
					if(is_true(opts.control.zoomBar)){
						map.addControl(new BMap.NavigationControl());
					}

					if(is_true(opts.control.miniMap)){
						map.addControl(new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
					}
				}
			}

			function setMapEvent(){
				if(is_true(opts.event)){
					if(is_false(def.event.drag)){
						map.disableDragging();
					}

					if(is_true(def.event.wheelZoom)){
						map.enableScrollWheelZoom();
					}
				}

				if(is_object(opts.event)){
					if(is_false(opts.event.drag)){
						map.disableDragging();
					}

					if(is_true(opts.event.wheelZoom)){
						map.enableScrollWheelZoom();
					}
				}
			}

			function setMapStyle(){
				map.setMapStyle({style: opts.map.style});
			}

			function setTempData(){

				if(opts.data.data_cur < 0){
					opts.data.data_cur = opts.data.data_search.length + opts.data.data_cur;
					
					if(!is_undefined(opts.data.data_info)){
						jqClass(opts.data.data_info).parent().append(jqClass(opts.data.data_info).eq(0));
					}
				}

				for(var i = 0; i < opts.data.data_search.length; i++){
					
					opts.temp[i] = {point: null, marker: null, title: '', address: '', phoneNumber: '', postcode: '', detailUrl: ''};

					if(is_array(opts.data.data_search[i])){
						opts.temp[i].point = new BMap.Point(opts.data.data_search[i][0], opts.data.data_search[i][1]);
						setInfoWindow(i);
					}else if(is_string(opts.data.data_search[i])){
						opts.map.load.count++;
						search(opts.data.data_search[i], i);
					}
				}

				function search(key, idx){
					var local = new BMap.LocalSearch(map);

					local.search(key, {forceLocal: false});
											
					local.setSearchCompleteCallback(function(results){
						if(local.getStatus() > 0){
							console.log('查询失败 - 无法定位到[' + key +']所在位置，尝试更换查询字符串或坐标');
							return;
						}
						
						opts.map.load.complete++;

						opts.temp[idx].point = results.getPoi(0).point;
						opts.temp[idx].title = results.getPoi(0).title;
						opts.temp[idx].address = results.getPoi(0).address;
						opts.temp[idx].phoneNumber = results.getPoi(0).phoneNumber;
						opts.temp[idx].postcode = results.getPoi(0).postcode;
						opts.temp[idx].detailUrl = results.getPoi(0).detailUrl;
						setInfoWindow(idx);
						
						if(opts.map.load.complete == opts.map.load.count){
							setFirst();
						}
					});
				}

				function setInfoWindow(idx){
					var title = '', address = '', phoneNumber = '', postcode = '';
					if(is_undefined(opts.data.data_info)){
						if(is_string(opts.data.data_search[idx])){
							title = !is_undefined(opts.temp[idx].title) ? '<div class="h18">'+ opts.temp[idx].title +'</div>' : '';
							address = !is_undefined(opts.temp[idx].address) ? '地址：'+ opts.temp[idx].address : '';
							phoneNumber = !is_undefined(opts.temp[idx].phoneNumber) ? '<br>电话：'+ opts.temp[idx].phoneNumber : '';
							postcode = !is_undefined(opts.temp[idx].postcode) ? '<br>邮编：'+ opts.temp[idx].postcode : '';
							opts.temp[idx].info = new BMap.InfoWindow(title +'<p>'+ address + phoneNumber + postcode + '</p>', {width : 300});
						}else{
							console.log('[data_info] - ('+ idx + ') ' + opts.data.data_search[idx] + ': 无法自动获取坐标信息，需自定义信息框数据');
						}
					}else{
						if(is_undefined(jqClass(opts.data.data_info).eq(idx).html())){
							title = !is_undefined(opts.temp[idx].title) ? '<div class="h18">'+ opts.temp[idx].title +'</div>' : '';
							address = !is_undefined(opts.temp[idx].address) ? '地址：'+ opts.temp[idx].address : '';
							phoneNumber = !is_undefined(opts.temp[idx].phoneNumber) ? '<br>电话：'+ opts.temp[idx].phoneNumber : '';
							postcode = !is_undefined(opts.temp[idx].postcode) ? '<br>邮编：'+ opts.temp[idx].postcode : '';
							opts.temp[idx].info = new BMap.InfoWindow(title +'<p>'+ address + phoneNumber + postcode + '</p>', {width : 300});
						}else{
							opts.temp[idx].info = new BMap.InfoWindow(jqClass(opts.data.data_info).eq(idx).html(), {width : jqClass(opts.data.data_info).eq(idx).width()});
						}
					}

					addMapOverlay(idx);
				}

				function addMapOverlay(idx){
					opts.temp[idx].marker = new BMap.Marker(opts.temp[idx].point);

					if(!is_undefined(opts.map.maker.src)){
						var icon = new BMap.Icon(opts.map.maker.src, new BMap.Size(opts.map.maker.size[0], opts.map.maker.size[1]), {anchor: new BMap.Size(opts.map.maker.offset[0], opts.map.maker.offset[1])});
						opts.temp[idx].marker.setIcon(icon);
					}
					
					map.addOverlay(opts.temp[idx].marker);
					
					if(is_true(opts.map.maker.anim)){
						opts.temp[idx].marker.setAnimation(BMAP_ANIMATION_BOUNCE);
					}

					opts.temp[idx].marker.addEventListener('click', function(){
						if(!is_undefined(opts.temp[idx].info)){
							this.openInfoWindow(opts.temp[idx].info);
						}
					});
					
				}
			}
			
			function setFirst(){
				if(!is_undefined(opts.data.data_list) && opts.data.data_cur < jqClass(opts.data.data_list).length){
					jqClass(opts.data.data_list).eq(opts.data.data_cur).addClass('cur').siblings().removeClass('cur');
					
					if(!is_undefined(opts.data.data_sync) && jqClass(opts.data.data_sync).length >= jqClass(opts.data.data_list).length){
						jqClass(opts.data.data_sync).eq(opts.data.data_cur).addClass('act').siblings().removeClass('act');
					}
				}
				
				if(is_undefined(opts.temp[opts.data.data_cur])){
					console.log('[data_search] : 未指定任何查询参数');
					return false;
				}

				map.centerAndZoom(opts.temp[opts.data.data_cur].point, opts.map.zoom);
				cenOffset();

				if(is_true(opts.data.data_showinfo) && !is_undefined(opts.temp[opts.data.data_cur].info)){
					opts.temp[opts.data.data_cur].marker.openInfoWindow(opts.temp[opts.data.data_cur].info);
				}
			}
		}
	};
	
		
})(window, document, jQuery);	
	

$(function(){
	
	//	移动端 点击 菜单按钮 展开/收起 导航层
	$('.x-header .menu-btn').on('click',function(){
		var hd = $('.x-header');
		if(!hd.hasClass('menu-open')){
			hd.addClass('menu-open');
			if($('.x-header').css('position') === 'fixed'){
				unWinScroll();
			}else{
				$('body, html').animate({scrollTop: 0}, 100, function(){
					unWinScroll();
				});
			}
		}else{
			hd.removeClass('menu-open');
			enWinScroll();
		}
	});

	//	移动端 点击 导航链接 收起 弹出导航层（用于解决点击锚点导航在页面没刷新的情况下收起弹出的导航层）
	$('.nav-lv a[href]').on('click',function(){
		$('.x-header').removeClass('menu-open');
		enWinScroll();
	});
	
	//	移动端 点击 导航项的箭头 展开/收起 子级导航
	$('.nav-mod .arr').on('click',function(){
		var _this = $(this);
		var par = _this.closest('.nav-item');
		if(!par.hasClass('act')){
			par.addClass('act').siblings('.nav-item').removeClass('act').children('.nav-lv').slideUp(0);
			_this.parent().siblings('.nav-lv').slideDown(200);
		}else{
			par.removeClass('act').children('.nav-lv').slideUp(200);
		}
	});
	
	//	微信分享二维码弹出/收起
	$('.share-item').on('mouseenter click', function(){
		var $this = $(this);
		
		if(!$this.hasClass('x-show')){
			$this.addClass('x-show');
		}else{
			$this.removeClass('x-show');
		}
	});
	
	$('.share-item').on('mouseleave', function(){
		$(this).removeClass('x-show');
	});
	
	//	pc端搜索
	$('.tools-item .search-btn').on('click', function(e){
		e.stopPropagation();
		
		var $this = $(this);
		
		if(!$this.hasClass('x-show')){
			$this.addClass('x-show');
		}else{
			$this.removeClass('x-show');
		}
	});

	$('.tools-item .search-box').on('click', function(e){
		e.stopPropagation();
	});

	$(document).on('click', function(){
		if($('.tools-item .search-btn').hasClass('x-show')){
			$('.tools-item .search-btn').removeClass('x-show');
		}
	});

	//	关闭弹窗
	$('.pop-close, .pop-overlay').on('click', function(e){
		e.stopPropagation();
		$(this).parents('.pop-mod').removeClass('x-show');
		enWinScroll();
	});
	
	//	下拉框
	$('.select-mod').each(function(){
		var obj = $(this);
		var selectBtn = obj.find('.select-btn');
		var selectTit = obj.find('.select-tit');
		var selectOpts = obj.find('.select-opts');
		var selectQue = obj.find('.squery-list');
		var selectIpt = obj.find('.select-input');
		var selectNat = obj.find('.select-native');
		var val = obj.find('.select-val');

		selectOpts.mCustomScrollbar({
			mouseWheel:{ preventDefault: true}
		});

		selectQue.mCustomScrollbar();

		selectBtn.on('click',function(){
//			if(!device().isMobile){
				if(!obj.hasClass('sc-show')){
					obj.addClass('sc-show');
				}else{
					obj.removeClass('sc-show');
				}
//			}
		});

		selectTit.on('click',function(){
			var _this = $(this);
			var grp = _this.parents('.select-grp');
			if(!grp.hasClass('open')){
				grp.addClass('open').siblings('.select-grp').removeClass('open');
				selectOpts.mCustomScrollbar("scrollTo", grp ,{
						scrollInertia: 0
				});
			}else{
				grp.removeClass('open');
			}
		});

		selectNat.on('change',function(){
			var _this = $(this);

			obj.find('.select-item').eq(_this.get(0).selectedIndex).trigger('click');
		});

		obj.on('click','.select-item',function(){
			var _this = $(this);
			var ptxt = _this.parent().siblings('.select-tit').text();
			var text = !ptxt ? _this.text() : ptxt + ' - ' + _this.text();
			
			if(!_this.hasClass('selected')){
				obj.find('.select-item').removeClass('selected');
				_this.addClass('selected');
				obj.removeClass('sc-show');
				val.text(text);
				selectIpt.val(text);
				if(selectNat[0]){
					selectNat[0].selectedindex = _this.index();
				}
				if(val.hasClass('placeholder')){
					val.removeClass('placeholder');
				}
			}
		});
		
		obj.on('click','.squery-item',function(){
			var _this = $(this);
			var text = _this.text();

			if(!_this.hasClass('selected')){
				_this.addClass('selected').siblings().removeClass('selected');
//				obj.removeClass('sq-show');
				val.text(text);
				selectIpt.val(text);
				if(val.hasClass('placeholder')){
					val.removeClass('placeholder');
				}
			}
		});
		
		if(is_undefined(obj.data('clickup'))){
			selectOpts.data("mCS").opt.mouseWheel.preventDefault = false;
		
			obj.on('mouseenter',function(){
				obj.addClass('hover');
			});
			
			obj.on('mouseleave',function(){
				obj.removeClass('hover');
			});
			
			$(document).on('click',function(){
				if(!obj.hasClass('hover')){
					obj.removeClass('sc-show');
				}
			});
		}else{
			obj.on('mouseleave',function(){
				obj.removeClass('sc-show');
			});
		}
		
		selectIpt.on('focus',function(){
			obj.addClass('sq-show');
		});

		selectIpt.on('blur',function(){
			setTimeout(function(){
				obj.removeClass('sq-show');
			},300);
		});

		selectIpt.on('click',function(e){
			e.stopPropagation();
		});
		
	});
		
	//	tab切换
	$('.tab-mod').each(function(){
		var _this = $(this);
		var _bar = _this.children('.tab-bar');
		var _term = _bar.find('.tab-term');
		var _cont = _this.children('.tab-cont');
		var _item = _cont.children('.tab-item');
		
		if(_bar.find('.cur').length<1){
			_term.eq(0).addClass('cur');
		}
		var _cur = _bar.find('.cur');

		// _item.eq(_cur.index()).addClass('act');
		_term.on('click',function(){
			var $this = $(this);
			if(!$this.hasClass('cur')){
				$this.addClass('cur').siblings('.tab-term').removeClass('cur');
				_item.eq($this.index()).addClass('act').siblings('.tab-item').removeClass('act');
			}
		});
	});

///
});

/* Function */




//	打开弹窗
function popShow(ele){
	$(ele).addClass('x-show');
	unWinScroll();
}

//	关闭弹窗
function popHide(ele){
  $('.pop-mod').removeClass('x-show');
  $(ele).removeClass('x-show');
	enWinScroll();
}

/*	获取滚动条宽度	*/
function getScrollBarWidth(){
	var rw = 0, wh = 0, bh = 0;
	wh = $(window).height();
	bh = $('body').height();
	if(bh > wh){
		if(!$('body').data('scrollBarWidth')){
			$('body').append('<div class="fnScrollBarWrap" style="position: fixed; left: 0; top: 0; width: 100px; height: 100px; overflow: auto; visibility: hidden; z-index: -9999;"><div class="fnScrollBarInner" style="width: 100%; height: 200px;"></div></div>');
			rw = 100-$('.fnScrollBarInner').width();
			$('body').data('scrollBarWidth', rw);
			$('.fnScrollBarWrap').remove();
		}else{
			rw = $('body').data('scrollBarWidth');
		}
	}
	return rw;
}

/*	禁止窗口滚动	*/
function unWinScroll(){
	var top = $(window).scrollTop();
	$('body').css({'position':'fixed','top':-top + 'px','left':'0px','right':getScrollBarWidth() + 'px'}).data('winScroll',top);
}

/*	释放窗口滚动	*/
function enWinScroll(){
	$('body').removeAttr('style');
	$(window).scrollTop($('body').data('winScroll'));
}

/*	禁止选中	*/
function unSelect(ele){	//	ele-[字符串]	操作对象，通常设为body
	$(ele).attr('unselectable','on').css({
		'-moz-user-select':'-moz-none',
		'-moz-user-select':'none',
		'-o-user-select':'none',
		'-khtml-user-select':'none', /* you could also put this in a class */
		'-webkit-user-select':'none',/* and add the CSS class here instead */
		'-ms-user-select':'none',
		'user-select':'none'
	}).on('selectstart', function(){ return false; }); 
}

/*	释放选中	*/
function enSelect(ele){	//	ele-[字符串]	被禁止选中的对象
	$(ele).attr('unselectable','off').css({
		'-moz-user-select':'text',
		'-moz-user-select':'text',
		'-o-user-select':'text',
		'-khtml-user-select':'text', /* you could also put this in a class */
		'-webkit-user-select':'text',/* and add the CSS class here instead */
		'-ms-user-select':'text',
		'user-select':'text'
	}).off('selectstart'); 
}

/*	判断客户端设备类型 http://devicedetector.net	*/
function device(){
	var ua = navigator.userAgent || navigator.vendor || window.opera || '';
	
	var fullNameRe = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
	var prefixRe = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
	var fullNameMobileRe = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
	var prefixMobileRe = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
	
	var dd = {
		isPhone: !!(fullNameRe.test(ua) || prefixRe.test(ua.substr(0, 4))),
		isMobile: !!(fullNameMobileRe.test(ua) || prefixMobileRe.test(ua.substr(0, 4))),
		isTablet: (!!(fullNameRe.test(ua) || prefixRe.test(ua.substr(0, 4)))) && !(!!(fullNameMobileRe.test(ua) || prefixMobileRe.test(ua.substr(0, 4)))),
		isWechat: (ua.toLowerCase().match(/MicroMessenger/i) == 'micromessenger')
	};
	
	return dd;
}


/*	基于xRoll触发的翻滚计数器，[par]需调用xRoll	*/
function rollNumber(par, rate, cld, data, dur){	//par, rate-回调函数提供的参数 cld-数字子集 data-子集data名(用来存储数字) dur-滚动时间
	par.find(cld).each(function(){
		
		var ele = $(this),
				demo = { score: 0 },
				num = ele.data(data) + '',
				fix = num.split('.') || num,
				len = fix.length > 1 ? fix[1].length : 0;
		
		if(ele.data('onOff') === undefined){
			ele.data('onOff', true);
		}

		if(rate < 0.1){
			ele.data('onOff', true);
			ele.text(0);
		}else if(rate >= 1){
			if(ele.data('onOff')){
				ele.data('onOff', false);
				TweenMax.to(demo, dur, {score: num, onUpdate: showScore, onUpdateParams: [ele, demo, len]});
			}
		}
	
	});
	
	function showScore(p1, p2, p3) {
		p1.text(p2.score.toFixed(p3));
	}
}

/*	获取外部坐标相对于元素中心点的距离与弧度、角度，函数返回对象{dist: ,rad: ,ang: }	*/
function getAngle($ele, mx, my) {	//	参数 $ele - 元素，mx - 外部x坐标，my - 外部y坐标
	if(!$ele.data('cp')){
		$ele.data('cp', {x: $ele.offset().left + $ele.width() / 2, y: $ele.offset().top +  $ele.height() / 2});
	}
	
	var rel_x = mx - $ele.data('cp').x;
	var rel_y = my - $ele.data('cp').y;
	var val = {};
	
	val.dist = Math.sqrt(rel_x * rel_x + rel_y * rel_y);
	val.rad = Math.acos( - rel_y / val.dist);
	val.rad = (rel_x > 0) ? val.rad : 2 * Math.PI - val.rad;
	val.ang = val.rad * (180 / Math.PI);
	
	return val;
}

/* ******************************************************************************************************************* */

//	工具函数
function is_null(a) {
	return (a === null);
}
function is_exist(a) {
	return !(typeof a == 'undefined');
}
function is_undefined(a) {
	return (is_null(a) || typeof a == 'undefined' || a === '' || a === 'undefined');
}
function is_array(a) {
	return (a instanceof Array);
}
function is_jquery(a) {
	return (a instanceof jQuery);
}
function is_object(a) {
	return ((a instanceof Object || typeof a == 'object') && !is_null(a) && !is_jquery(a) && !is_array(a) && !is_function(a));
}
function is_number(a) {
	return ((a instanceof Number || typeof a == 'number') && !isNaN(a));
}
function is_string(a) {
	return ((a instanceof String || typeof a == 'string') && !is_undefined(a) && !is_true(a) && !is_false(a));
}
function is_function(a) {
	return (a instanceof Function || typeof a == 'function');
}
function is_boolean(a) {
	return (a instanceof Boolean || typeof a == 'boolean' || is_true(a) || is_false(a));
}
function is_true(a) {
	return (a === true || a === 'true');
}
function is_false(a) {
	return (a === false || a === 'false');
}
function is_percentage(x) {
	return (is_string(x) && x.slice(-1) == '%');
}
	

