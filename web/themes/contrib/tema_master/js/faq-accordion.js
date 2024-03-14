(function ($) {

    $(".node--type-faq.node--view-mode-acordeon").each(function() {
        //console.log($(this));
        let title_faq = $(this).find(".field--name-title").text();
        $(this).find(".accordion-faq")
                        .children(".accordion-item")
                        .children("a")
                        .text(title_faq);
            
    })

})(jQuery);