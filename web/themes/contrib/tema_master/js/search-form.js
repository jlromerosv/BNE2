(function ($) {

    $(".ps-block-buscador").click(function (e) {
        e.preventDefault();
        $(".webform-submission-bloque-buscador-form").slideDown();
    });

    $(".close-form-icon").click(function () {
        $(".webform-submission-bloque-buscador-form").slideUp();
    });

})(jQuery);