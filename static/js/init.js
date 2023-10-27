(function () {
	window._config = {
		showConsole: true, //是否需要显示调试信息  
		isNeedProtect: false,
		schoolTit: '中国人民大学就业信息网',
		schName: "中国人民大学",
		navUrls: { //栏目配置
			'招聘信息': './zhaopinInfoLogo.html?type=1',
			'实习信息': './zhaopinInfoLogo.html?type=2',
			'招聘会': './frontRecruitInfo1.html?type=3',
			'双选会': './frontRecruitInfo.html?type=4'
		},
		//就业沙龙：8     lead计划：13    职业测评：10    资料下载：7
		newsUrl: [
			'./newsList.html?id=8',
			'./newsList.html?id=13',
			'./newsList.html?id=10',
			'./newsList.html?id=7'
		],
		imgUrl: {
			urls: '/careeryou'
		},
		home: {
			url: '#',
			name: '首页'
		}, //默认首页配置，地址导航中的小图标
		login: {
			url: 'a/login'
		},
		logout: {
			url: 'a/logout'
		},
		jobUrl: {
			url: 'a/common/student/resumeinfo?resumeType=0'
		}, //投递简历地址
		newsId: ['3fcc824cecbc42aea3dce3700e5a4839', '6ebab28e72ba46da99a0f2c372b129d7', '23', '21'], //公告   新闻   学院动态  国际组织 id  配置
		guidanceId: [{
			id: '5',
			name: '就业指导'
		}, {
			id: '12',
			name: '重要通知'
		}], //职业指导 id  配置,
		friendId: 'f727bb6a4531414cb3683340c7e6f201', //友情链接id  配置
		newsArr: {
			id: '12',
			name: '重要通知'
		}, //详情页的 新闻id   配置
		employmentUrl: ['zhaopinInfoLogo.html?type=1', 'frontRecruitInfo1.html?type=3', 'frontRecruitInfo.html?type=4', 'zhaopinInfoLogo.html?type=2', ], //就业地址
		noticeTit: {
			'0': '企业信息不存在',
			'1': '招聘信息不存在',
			'2': '请输入搜索内容'
		},
		user: {
			'user1': '系统管理员',
			'user2': '教师用户',
			'user3': '学生用户',
			'user4': '企业用户',
			'user5': '中心用户'

		}, //身份  1系统管理员 2教师用户 3学生用户 4企业用户 5中心用户
		token: ''
	}
	//获取域名
	if (window._config.domain == null || window._config.domain == '') {
		var href = window.location.href;
		try {
			if (href.indexOf('/static/') > 0) {
				window._config.domain = href.substring(0, href.indexOf('/static/') + 1);
			} else if (href.indexOf('/f/') > 0) {
				window._config.domain = href.substring(0, href.indexOf('/f/') + 1);
			} else if (href.indexOf('/a/') > 0) {
				window._config.domain = href.substring(0, href.indexOf('/a/') + 1);
			} else if (href.indexOf('/frontpage/') > 0) {
				window._config.domain = href.substring(0, href.indexOf('/frontpage/') + 1);
			} else {
				window._config.domain = '/';
			}
		} catch (e) {
			window._config.domain = '/';
		}
	}
	var domain = window._config.domain;

	$.url = function (url) {
		return domain + url + '?ts=' + new Date().getTime();
	}
	document.title = window._config.schoolTit;
	$.getToken = function () {
		$.ajax({
			type: 'get',
			url: $.url('f/ajaxHome/getToken'),
			dataType: "json",
			async: false,
			success: function (res) {
				window._config.token = res.data;
			},
			error: function (error) {}
		})
	}
	$.getToken()
})();