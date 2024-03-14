(function ($) {

    $("#ps_to_up, .ps_to_up").on('click', function (e) {
		e.preventDefault(); //evita que se ejecute el tag ancla (<a href="#">valor</a>).
		$('html,body').animate({ scrollTop: 0 }, 2000, function () { });
	});

})(jQuery);