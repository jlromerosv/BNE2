jQuery(document).ready(function ($) {

    //situa el footer del bloque ultimas noticias de la home al final del content.
    if ($(".ps-noticias-destacadas ").length > 0) {

        $('.ps-noticias-destacadas > .view-footer').appendTo($( ".ps-noticias-destacadas > .view-content" ));
    }
    if ($(".path-frontpage ").length > 0) {
        $('.ps-catalogos .view-content .views-row .views-field-field-contenido-generico a').append('<button><svg xmlns="http://www.w3.org/2000/svg" width="27.11" height="27.11" viewBox="0 0 27.11 27.11"><defs><style>.a{fill:#FFFFFF;}</style></defs><g transform="translate(-0.006)"><g transform="translate(0.006)"><g transform="translate(0)"><path class="a" d="M26.859,25.635l-7-6.888a11.071,11.071,0,0,0,2.959-7.523A11.317,11.317,0,0,0,11.412,0,11.316,11.316,0,0,0,.006,11.225,11.316,11.316,0,0,0,11.412,22.449a11.471,11.471,0,0,0,7.179-2.507l7.027,6.915a.887.887,0,0,0,1.241,0A.855.855,0,0,0,26.859,25.635ZM11.412,20.722a9.575,9.575,0,0,1-9.651-9.5,9.575,9.575,0,0,1,9.651-9.5,9.575,9.575,0,0,1,9.651,9.5A9.575,9.575,0,0,1,11.412,20.722Z" transform="translate(-0.006)"/></g></g></g></svg></button>')
    }

    //se añade el icono junto al resto de elementos que se muestran juntos en los bloques de enlaces destacados
    if ($(".path-frontpage .ps-enlace-destacado-inicio .view-content .views-row .views-field-field-icono").length > 0) {

        $('.enlace-0 .views-field-field-icono').prependTo($( ".enlace-0 .views-field-title .field-content .contenido " ));
    }

     //se añade el icono junto al resto de elementos que se muestran juntos en los bloques de enlaces destacados perfil prensa
     if ($(".ps-node-15301 .ps-enlace-destacado-inicio .view-content .views-row .views-field-field-icono").length > 0) {

        $('.enlace-0 .views-field-field-icono').prependTo($( ".enlace-0 .views-field-title .field-content .contenido " ));
    }

     //se añade el icono junto al resto de elementos que se muestran juntos en los bloques de enlaces destacados perfil familias y niños
     if ($(".ps-node-15305 .ps-enlace-destacado-inicio .view-content .views-row .views-field-field-icono").length > 0) {

        $('.enlace-0 .views-field-field-icono').prependTo($( ".enlace-0 .views-field-title .field-content .contenido " ));
    }

     //se añade el icono junto al resto de elementos que se muestran juntos en los bloques de enlaces destacados perfil bibliotecarios
     if ($(".ps-node-6422 .ps-enlace-destacado-inicio .view-content .views-row .views-field-field-icono").length > 0) {

        $('.enlace-0 .views-field-field-icono').prependTo($( ".enlace-0 .views-field-title .field-content .contenido " ));
    }

     //se añade el icono junto al resto de elementos que se muestran juntos en los bloques de enlaces destacados en perfil invetigadores
     if ($(".ps-node-8442 .ps-enlace-destacado-inicio .view-content .views-row .views-field-field-icono").length > 0) {

        $('.enlace-0 .views-field-field-icono').prependTo($( ".enlace-0 .views-field-title .field-content .contenido " ));
    }


    if ($(".publicaciones-home ").length > 0) {

        $('.publicaciones-home .view-footer').appendTo($( ".publicaciones-home .view-content" ));
    }

    if ($(".view-bloque-agenda-actividades-home ").length > 0) {

        $('.view-bloque-agenda-actividades-home .view-footer').appendTo($( ".view-bloque-agenda-actividades-home > .view-content" ));
    }

    if ($(".path-frontpage ").length > 0) {
        console.log("se cambia elemento")

        $('.view-colecciones .view-footer').appendTo($( ".view-colecciones > .view-content" ));
    }

    if ($(".page-node-type-pagina-personalizada ").length > 0) {

        $('.view-colecciones .view-footer').appendTo($( ".view-colecciones > .view-content" ));
    }

    var destacados_responsive = $(".destacados-responsive .views-row").length

    $(".destacados-responsive").find(".view-content").addClass("grid-" + destacados_responsive)


});