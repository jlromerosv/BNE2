(function ($) {

    $(".ps-node--type-alerta").each(function () {
        let color = $(this).attr("alert-color-data");
        $(this).css("background-color", color);
    });

})(jQuery);