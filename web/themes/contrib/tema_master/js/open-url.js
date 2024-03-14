(function ($) {

    $("a").click(function (event) {
		var href = $(this).attr('href');
		if (href.includes('.pdf', '.txt', '.doc', '.xls')) {
			window.open(href, '_blank');
			return false;
		}
		var chost = window.location.hostname;
		var hostname = extractHostname(href);
		if ((!hostname.includes('#', 'mailto:')) && (hostname != '') && (chost != hostname)) {
			window.open(href, '_blank');
			return false;
		}
	});

    function extractHostname(url) {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname
        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }
        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];
        return hostname;
    }

})(jQuery);