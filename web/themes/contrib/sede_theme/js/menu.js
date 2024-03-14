jQuery(document).ready(function ($) {

    console.log("load contenidos")

    //añade funcionalidad menu sidebar
    if ($(".menu-sidebar").length > 0) {

        var r = $('<button aria-label="icono menu sidebar" type="button" class="rotate-svg"></button>');
        $(".menu-sidebar .menu-item--expanded").append(r);

        //Se despliegan el menu del enlace activo y sus superiores.
        $('.menu-sidebar .menu-item--active-trail > .menu_link_content > .menu').slideDown();
        $('.menu-sidebar .menu-item--active-trail .menu .is-active').parents('.menu-item--active-trail .menu').slideDown();
        //se rotan los iconos de los submenus que estan desplegados
        $(".menu-sidebar .menu-item--active-trail .menu").each(function () {
            if ($(this).css("display") == "block") { //si menu esta visible
                $(this).parent().parent().children('button').removeClass('rotate-svg') //se rota el icono
            }
        });

        // $('.menu-sidebar .menu-item--active-trail .menu').slideDown();
        // $('.menu-sidebar .menu-item--active-trail button').removeClass('rotate-svg');
        //$('.menu-sidebar .menu-item--active-trail button').addClass('rotate-svg');

        /* BEGIN COLLAPSE MENU SIDEBAR */
        $('.menu-sidebar .menu-item').click(function (event) {
            event.stopPropagation();

            if (!$(this).find('.menu_link_content ul').is(':visible')) {
                $(this).find('.menu_link_content ul').eq(0).slideDown();
                $(this).children('button').eq(0).removeClass('rotate-svg');
            } else {
                $(this).find('.menu_link_content ul').eq(0).slideUp();
                $(this).children('button').eq(0).addClass('rotate-svg');
            }


        })
    }

    // Ejecuta el enlace de la caja del elemento del menú principal de la home de sede electrónica
    if ($('.ps-node-27006').length){
        $('.menu--mx1---sede-electronica-bne').click(function (e) {
            var hrefActive = $(this).eq(0).find('a').attr('href');
            window.open(hrefActive, '_self');
            return false;

        });
    }




    //añade funcionalidad menu seleccion de perfil
    if ($(".menu-select-perfil").length > 0) {

        var r = $('<button aria-label="boton seleccion perfil" type="button" class="rotate-svg"></button>');
        $(".menu-select-perfil .menu-item--expanded").append(r);

        /* BEGIN COLLAPSE MENU SIDEBAR */
        $('.menu-select-perfil .menu-item').click(function (event) {
            event.stopPropagation();
            console.log("se abre el collapsable");
            $(this).children('ul').slideToggle();
            $('.language-switcher-language-url ul').slideUp();

        })

        let perfil = decodeURI(getNameUrl('nameperfil')).split("-").join(" ");
        if (perfil.length > 0){
            $('.menu-select-perfil ul > .menu-item span').text(perfil);
        }

        //codigo valido si los enlaces de menu del menu perfiles apuntan al nodo
        // if ($('.menu-select-perfil ul li ul .menu-item--active-trail').length) {
        //     let perfil_seleccionado = $('.menu-select-perfil ul li ul .menu-item--active-trail a').text();
        //     console.log(perfil_seleccionado);
        //     $('.menu-select-perfil ul > .menu-item--active-trail span').text(perfil);
        // }


    }











    //funcionalidad barra de menu movil para el sidebar
    if ($(".layout-sidebar-first").length > 0) {


        $('#block-bloquedenavegacionsidebarmovilbne').css('display', 'block');
        // var boton = $('<button aria-label="boton menu" type="button" class="rotate-svg"></button>');
        // $(".ps-navigation-bar").append(boton);
        $('.ps-navigation-bar').click(function (e) {
            console.log("se ha hecho click en la barra de navegacion")
            e.preventDefault();
            $(".layout-sidebar-first").slideToggle();
            $(".layout-sidebar-first").toggleClass("aweb-content-hide");
            $(this).children('button').toggleClass('rotate-svg');

        });
    } else {
        $('#block-bloquedenavegacionsidebarmovilbne').css('display', 'none');
    }



    if ($("#block-sede-theme-enlacesdeayudaalanavegacion").length) {
        $(".ps-breadcrumb-region").css('display', 'block');
    } else {
        $(".ps-breadcrumb-region").css('display', 'none');
    }


    // se comprueba si esta cargado el selector de idioma. Si no lo esta espera 10 milisegundos y vuelve a comprobar.
    // let selector_idioma = cargarSelectorIdioma();

    // function cargarSelectorIdioma() {
    //     if ($(".language-switcher-language-url").length > 0) {
    //         console.log("se ha cargado")
    //         var idioma_activo = 'ES';
    //         try {
    //             idioma_activo = window.location.pathname.substr(1, 2).toUpperCase();
    //         } catch (err) {
    //             idioma_activo = 'ES';
    //             console.log('PS - Error al capturar el idioma activo');
    //         }

    //         var label = $('<label>' + idioma_activo + '</label>');
    //         $(".language-switcher-language-url").prepend(label);


    //         var icono = $('<button aria-label="boton menu idioma" type="button"></button>');
    //         $(".language-switcher-language-url").prepend(icono);

    //         $('.language-switcher-language-url').click(function (event) {
    //             event.stopPropagation();
    //             $(this).children('ul').slideToggle();
    //             $('.menu-select-perfil .menu-item ul').slideUp();

    //         })
    //     } else {
    //         setTimeout(
    //             function () {
    //                 cargarSelectorIdioma();
    //             }, 10);
    //     }
    // }

    // se añade el boton del selector de lenguajes una vez que se ha cargado el bloque con el listado de idiomas.
    var observer = new MutationObserver(function (mutations) {
        if ($(".language-switcher-language-url").length > 0) {

            var idioma_activo = 'ES';
            try {
                idioma_activo = window.location.pathname.substr(1, 2).toUpperCase();
            } catch (err) {
                idioma_activo = 'ES';
                console.log('PS - Error al capturar el idioma activo');
            }

            var label = $('<label>' + idioma_activo + '</label>');
            $(".language-switcher-language-url").prepend(label);


            var icono = $('<button aria-label="boton menu idioma" type="button"></button>');
            $(".language-switcher-language-url").prepend(icono);

            $('.language-switcher-language-url').click(function (event) {
                event.stopPropagation();
                $(this).children('ul').slideToggle();
                $('.menu-select-perfil .menu-item ul').slideUp();

            })
            observer.disconnect();
        }
    });

    observer.observe(document, {
        attributes: false,
        childList: true,
        characterData: false,
        subtree: true
    });




    //Se pliegan los menus de selector de perfil e intercambiador de idiomas al hacer click fuera.
    if ($(".language-switcher-language-url").length > 0 | $(".menu-select-perfil").length > 0) {
        $('body').click(function () {
            $('.menu-select-perfil .menu-item ul').fadeOut();
            $('.language-switcher-language-url ul').fadeOut();
        });
    }

    //Funcionalidad menu principal movil
    $('.ps_microsite_container .ps_header_site_2_col_content .header_site_right .region-header-site-2-2 #block-sede-theme-mx1bne-menu').click(function (e) {
        e.preventDefault();
        $(this).parent().find('ul.menu').slideToggle();

    });


    $(window).resize(function () {
        var resolution = $(window).width();
        if (resolution < 992) {
            $('.ps_microsite_container .ps_header_site_2_col_content .header_site_right .region-header-site-2-2 ul').css('display', 'none');
        }

    });



    //funcionalidad bloque buscador general
    $('.view-bloque-mostrar-ocultar-buscador-bne .view-content .views-row:first').addClass("lupa");
    $('.view-bloque-mostrar-ocultar-buscador-bne .view-content .views-row:last').addClass("cerrar");

    if ($("#block-webform-2").hasClass("show-search")) {

        $('.lupa').addClass('hide-element');
        $('.cerrar').removeClass('hide-element');
    } else {
        $('.lupa').removeClass('hide-element');
        $('.cerrar').addClass('hide-element');
    }

    $('.ps-mostrar-ocultar-buscador').click(function () {
        if ($("#block-webform-2").hasClass("show-search")) {
            $("#block-webform-2").removeClass('show-search');
            $("#block-webform-2").slideUp();
            $('.cerrar').addClass('hide-element');
            $('.lupa').removeClass('hide-element');

        } else {
            $("#block-webform-2").addClass('show-search')
            $("#block-webform-2").slideDown()
            $('.cerrar').removeClass('hide-element');
            $('.lupa').addClass('hide-element');

        }

    });


    //añade icono lupa al input del buscador general
    var icono = '<div class="icono-lupa"><svg xmlns="http://www.w3.org/2000/svg" width="27.11" height="27.11" viewBox="0 0 27.11 27.11"><defs><style>.a{fill:#FFFFFF;}</style></defs><g transform="translate(-0.006)"><g transform="translate(0.006)"><g transform="translate(0)"><path class="a" d="M26.859,25.635l-7-6.888a11.071,11.071,0,0,0,2.959-7.523A11.317,11.317,0,0,0,11.412,0,11.316,11.316,0,0,0,.006,11.225,11.316,11.316,0,0,0,11.412,22.449a11.471,11.471,0,0,0,7.179-2.507l7.027,6.915a.887.887,0,0,0,1.241,0A.855.855,0,0,0,26.859,25.635ZM11.412,20.722a9.575,9.575,0,0,1-9.651-9.5,9.575,9.575,0,0,1,9.651-9.5,9.575,9.575,0,0,1,9.651,9.5A9.575,9.575,0,0,1,11.412,20.722Z" transform="translate(-0.006)"/></g></g></g></svg><div></div>'



    $(".ps-bloque-buscador-bne form .form-actions").prepend(icono);


    //funcionalidad boton compartir redes sociales
    $('.ps-rrss-share-button .views-field-field-icono-svg- .field-content ').click(function (e) {
        e.preventDefault();
        $('.ps-rrss-share .view-content').not('.ps-rrss-share .view-header .view-content').toggleClass("show-rrss");
    });




    if ($('.ps-menu-niveles').length) {

        $('.ps-menu-niveles .menu-item--expanded').children('.menu_link_content').append('<div class="ps-menu-niveles-bar"><svg class="mostrar-nivel show-nivel" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><defs><style>.a{fill:#333;}</style></defs><g transform="translate(0 0)"><path class="a" d="M9.608,4.61H5.39V.39a.391.391,0,1,0-.781,0V4.61H.39a.391.391,0,0,0,0,.781H4.61V9.609a.391.391,0,1,0,.781,0V5.39H9.609a.391.391,0,1,0,0-.781Z" transform="translate(0 0)"/></g></svg><svg class="ocultar-nivel" xmlns="http://www.w3.org/2000/svg" width="10" height="0.803" viewBox="0 0 10 0.803"><defs><style>.a{fill:#333;}</style></defs><g transform="translate(-0.042)"><path class="a" d="M9.641,187.733H.443a.4.4,0,0,0,0,.8h9.2a.4.4,0,0,0,0-.8Z" transform="translate(0 -187.733)"/></g></svg></div>')

        $('.ps-menu-niveles-bar').click(function (e) {
            e.preventDefault();
            $(this).parent().find('ul').slideToggle()
            $(this).find('.mostrar-nivel').toggleClass('show-nivel')
            $(this).find('.ocultar-nivel').toggleClass('show-nivel')
        });

    }

    if ($('.ps-menu-niveles2').length) {
        $('.ps-menu-niveles2 .menu-item--expanded').children('.menu_link_content').append('<div class="ps-menu-niveles2-bar"><svg class="mostrar-nivel show-nivel" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><defs><style>.a{fill:#333;}</style></defs><g transform="translate(0 0)"><path class="a" d="M9.608,4.61H5.39V.39a.391.391,0,1,0-.781,0V4.61H.39a.391.391,0,0,0,0,.781H4.61V9.609a.391.391,0,1,0,.781,0V5.39H9.609a.391.391,0,1,0,0-.781Z" transform="translate(0 0)"/></g></svg><svg class="ocultar-nivel" xmlns="http://www.w3.org/2000/svg" width="10" height="0.803" viewBox="0 0 10 0.803"><defs><style>.a{fill:#333;}</style></defs><g transform="translate(-0.042)"><path class="a" d="M9.641,187.733H.443a.4.4,0,0,0,0,.8h9.2a.4.4,0,0,0,0-.8Z" transform="translate(0 -187.733)"/></g></svg></div>')

        $('.ps-menu-niveles2-bar').click(function (e) {
            e.preventDefault();
            $(this).parent().find('ul').slideToggle()
            $(this).find('.mostrar-nivel').toggleClass('show-nivel')
            $(this).find('.ocultar-nivel').toggleClass('show-nivel')
        });

    }



    // Obtiene la url del li del menu de contacto y lo abre.
    if ($('#block-mx1bnecontacto').length) {
        $("#block-mx1bnecontacto .menu li").click(function () {
            var hrefActive = $(this).eq(0).find('a').attr('href');
            window.open(hrefActive, '_self');
            return false;
        });
    }
    $(document).ajaxComplete(function () {
        if ($('#block-mx1bnecontacto').length) {
            $("#block-mx1bnecontacto .menu li").click(function () {
                var hrefActive = $(this).eq(0).find('a').attr('href');
                window.open(hrefActive, '_self');
                return false;
            });
        }
    });

    //añade funcionalidad al menu del sidebar de la pagina horarios
    $('.menu--horarios-de-salas-servicios-y-ex .menu-level-0 .menu-item span').click(function (e) {
        // e.preventDefault();
        $(this).parent().find('.menu_link_content').slideToggle();
        $(this).parent().find('span').eq(0).toggleClass('rotate');

    });
    if ($('.ps-path-horarios').length) {
        var parameter = window.location.search;
        if (parameter != "") {
            $('.menu--horarios-de-salas-servicios-y-ex .menu-level-0 .menu-item .view-content .views-row a').each(function () {
                var url = $(this).attr('href')

                if (url.includes(parameter)) {

                    $(this).addClass("active");
                    $(this).closest(".menu_link_content").slideToggle();
                    $(this).closest(".menu-item").find('span:first').addClass('rotate')
                }
            });
        }
    }


    // Pliega y despliega el menu sidebar de horarios en version movil
    if ($('.ps-path-horarios').length) {
        $('.menu--horarios-de-salas-servicios-y-ex #-menu').click(function (e) {
            e.preventDefault();
            if (screen.width < 992) {
                $(this).parent().find('.menu-level-0').slideToggle();
                $(this).toggleClass('rotate');
            }
        });
    }



    // Obtiene la url de item de menu del panel de gestion de usuario y lo abre.
    $(".ps-panel-gestion-usuario .menu-item").click(function () {
        console.log("item de menu")
        var hrefActive = $(this).eq(0).find('a').attr('href');
        window.open(hrefActive, '_self');
        return false;
    });









});

/* funcion que obtiene el valor de un parametro de la url */
function getNameUrl(sParametroNombre) {
    var sPaginaURL = window.location.search.substring(1);
    var sURLVariables = sPaginaURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParametro = sURLVariables[i].split('=');
        if (sParametro[0] == sParametroNombre) {
            return sParametro[1];
        }
    }
    return "";
}