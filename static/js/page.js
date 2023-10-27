 var perpage = 20
 var curpage = 1
 var total_page = 0
 getdatabaseList(1)
 // 分页跳转
 $('.page').on('click', 'a', function () {
     console.log(curpage);
     if ($(this).hasClass('gp-page-prev') && $(this).attr('page') == 0) {
         //  alert('当前已是第一页')
     } else if ($(this).hasClass('gp-page-next') && $(this).attr('page') == total_page) {
         //  alert('当前已是最后一页')
     } else {
         $(this).siblings('a').removeClass('on_pages')
         $(this).addClass('on_pages')
         curpage = $(this).attr('page')
         //  console.log(curpage);
         getdatabaseList(curpage)
     }
 })
 // 切换每页显示条数
 $('.page').on('change', 'select', function () {
     perpage = parseInt($('.page select').val())
     getdatabaseList(1)
 })

 function getdatabaseList(curpage) {
     $.ajax({
         url: 'https://xxgk.ruc.edu.cn/CrossDomainData/Notice/getOpenNotice?schoolid=235&type=1&curpage=' + curpage + '&perpage=' + perpage,
         //url: 'js/data.json?schoolid=235&type=1&curpage=' + curpage + '&perpage=' + perpage,
         type: "GET",
         dataType: "JSON",
         success: function (data) {

             var html = ''
             getHtml(data.data, curpage)

             function getHtml(newArr, curpage) {
                 var newArr2 = newArr
                 //  newArr2 = newArr.slice((parseInt(curpage) - 1) * perpage, curpage * perpage)
                 // newArr2 = newArr2.sort(compare)
                 var html = ''
                 $.each(newArr2, function (i, d) {
                     html += '<li>' +
                         '<div class="crules_con">' +
                         '<a href="https://xxgk.ruc.edu.cn/tzgg/tzgg.htm?id=' + d.nid + '&date=' + d.publishtime.substring(0, 10) + '" target="_blank">' + d.title + '</a>' +
                         '<span>' + d.publishtime.substring(0, 4) + '年' + d.publishtime.substring(5, 7) + '月' + d.publishtime.substring(8, 10) + '日' + '</span>' +
                         '</div>' +
                         '</li>'
                 })
                 $('.crules ul').html(html)
             }


             // 分页开始
             totalCount = data.total //总条数
             total_page = Math.ceil(totalCount / perpage) //总页数   
             var pagehtml = ''
             pagehtml =
                 '<a href="javascript:void(0);" page="1" class="gp-page-start">首页</a>' +
                 '<a href="javascript:void(0);" page="' + (parseInt(curpage) - 1) + '" class="gp-page-prev">上一页</a>' +
                 '<a href="javascript:void(0);" page="1" class="1">1</a>' +
                 '<a href="javascript:void(0);" page="2" class="2">2</a>' +
                 '<a href="javascript:void(0);" page="3" class="3">3</a>' +
                 '<a href="javascript:void(0);" page="4" class="4">4</a>' +
                 '<a href="javascript:void(0);" page="5" class="5">5</a>' +
                 '<a href="javascript:void(0);" page="' + (parseInt(curpage) + 1) + '" class="gp-page-next">下一页</a>'

             $('.page').html(pagehtml)

             $.each($('.page a'), function (i, d) {
                 console.log($(this).attr('class'), $(this).attr('page'));
                 if ($(this).hasClass('gp-page-prev') && $(this).attr('page') == 0) {
                     $(this).addClass('disabled')
                 } else if ($(this).hasClass('gp-page-next') && $(this).attr('page') == total_page) {
                     $(this).addClass('disabled')
                 }
             })
             $('.page select').val(perpage)
         }
     })
 }