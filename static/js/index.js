$(document).ready(function() {
    //动态新闻
    $.ajax({
        type: "get",
        async: false,
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',
        jsonpCallback: "jsonpCallback",
        url: './json/a.json',
        success: function(data) {
            var msg = '';
            $.each(data.news.slice(0, 4), function(i, e) {
                msg += '<li>' + '<a  href=' + e.url + '>' + e.title + '</a>' +
                    '<span>' + e.date + '</span>' + '</li>'
            })
            $('#moder').append(msg)
        }
    });
		 $.getJSON('https://xxgk.ruc.edu.cn/json/a.json', function (data) {
    // $.getJSON('./json/a.json', function(data) {
        var msg1 = ''
        $.each(data.data.slice(0, 4), function(i, e) {
            msg1 += '<li>' + '<a  href=' + 'https://xxgk.ruc.edu.cn/tzgg/tzgg.htm?id=' + e.nid + '&date=' + e.publishtime + ' target="_bank" >' + e.title + '</a>' +
                '<span>' + e.publishtime.replace(/\D/g, '.').substr(5, 5) + '</span>' + '</li>'
        })
        $('#model').append(msg1)

    })
})
