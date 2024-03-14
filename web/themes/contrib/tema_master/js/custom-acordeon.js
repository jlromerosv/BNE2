(function ($) {

    $(".block-view-accordion h1").click(function() {
       let block = $(this).parent();
       let files_container = block.find(".view");
       files_container.slideToggle();

       block.toggleClass("close-accordion");
    });

})(jQuery);