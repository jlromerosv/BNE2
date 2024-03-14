jQuery(document).ready(function ($) {

//impresión de contenido
$(".ps-descargar-pdf").click(function (e) {

    window.print();
    setTimeout(function () {
        Drupal.blazy.init.revalidate()
    }, 300);

});

});