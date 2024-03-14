jQuery(document).ready(function ($) {
    //elimina las etiquetas &nbsp; del campo body
    if ($('.field--name-body').length) {

        $(".field--name-body").html(function (i, html) {
            return html.replace(/&nbsp;/g, ' ');
        });

    }
});