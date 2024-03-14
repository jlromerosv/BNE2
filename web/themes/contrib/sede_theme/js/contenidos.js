jQuery(document).ready(function ($) {

    //cambia de ubicacion el footer de la vista para que aparezca en la seccion del contenido.
    if ($(".ps-te-puede-interesar ").length) {

        $('.ps-te-puede-interesar .view-footer').appendTo($(".ps-te-puede-interesar .view-content"));
    }

    // Obtiene la url existente dentro del MENU SEDE ELECTRÓNICA y la ejecuta
    if ($(".menu--mx1---sede-electronica-bne").length) {
        $(".ps-menu-enlazable .menu .menu-item").click(function () {
            var hrefActive = $(this).eq(0).find('a').attr('href');
            window.open(hrefActive, '_self');
            return false;
        });
    }

    // Obtiene la url existente dentro del contenedor y la ejecuta
    if ($(".ps-menu-niveles2").length) {
        $(".ps-menu-niveles2 .menu .menu-item").click(function () {
            var hrefActive = $(this).eq(0).find('a').attr('href');
            window.open(hrefActive, '_self');
            return false;
        });
    }

    // Obtiene la url existente dentro del elemento del listado de noticias y lo ejecuta.
    if ($(".ps-listado-noticias").length) {
        $(".ps-listado-noticias .views-row .node__content").click(function () {
            var hrefActive = $(this).eq(0).find('a').attr('href');
            window.open(hrefActive, '_self');
            return false;

        });
    }
    $(document).ajaxComplete(function () {
        if ($(".ps-listado-noticias").length) {
            $(".ps-listado-noticias .views-row .node__content").click(function () {
                var hrefActive = $(this).eq(0).find('a').attr('href');
                window.open(hrefActive, '_self');
                return false;
            });
        }

        if ($(".ps-fulltext-search-list").length) {
            $(".ps-fulltext-search-list .views-row ").click(function () {
                var hrefActive = $(this).eq(0).find('a').attr('href');
                window.open(hrefActive, '_self');
                return false;
            });
        }

        $(".ps-title-link .views-row").click(function () {
            var hrefActive = $(this).eq(0).find('.layout .field--name-title a').attr('href');
            window.open(hrefActive, '_self');
            return false;
        });

        $(".ps-salas-consultas .views-row").click(function () {
            var hrefActive = $(this).eq(0).find('.views-field-title a').attr('href');
            window.open(hrefActive, '_self');
            return false;
        });

        $(".ps-salas-consultas .views-row").click(function () {
            var hrefActive = $(this).eq(0).find('.views-field-title a').attr('href');
            window.open(hrefActive, '_self');
            return false;
        });

        $(".ps-listado-blog .views-row").click(function () {
            var hrefActive = $(this).eq(0).find('.views-field-title a').attr('href');
            window.open(hrefActive, '_self');
            return false;
        });

        $(".ps-listado-iniciativas .views-row").click(function () {
            var hrefActive = $(this).eq(0).find('.views-field-title a').attr('href');
            window.open(hrefActive, '_self');
            return false;
        });

        $(".ps-unidades-organizativas-link .views-row").click(function () {
            var hrefActive = $(this).eq(0).find('.views-field-title a').attr('href');
            window.open(hrefActive, '_self');
            return false;
        });
        if ($(".ps-listado-publicaciones").length > 0) {
            $(".block-field-blocknodepublicacionfield-precio-oferta-euros").each(function () {
                $(this).parent().find('.block-field-blocknodepublicacionfield-precio-euros').css('display', 'none');
            });
        }

        if ($('.container-fields').length) {} else {

            $(".ps-listado-blog .form--inline .form-actions").after('<div class="container-fields"></div>');
            $('.form-item-field-etiquetas-busqueda-1').appendTo('.container-fields')
            $('.form-item-autor-entrada-blog').appendTo('.container-fields')
            $(".form-item-field-etiquetas-busqueda-1 input").change(function () {

                let output = $(".form-item-field-etiquetas-busqueda-1 input").text()
                output = output.replace(output.substr(output.indexOf('('), output.indexOf(')') - output.indexOf('(') + 1), '');
            });
        }
        if ($('.facets-widget-checkbox').length) {

            $(".facets-widget-checkbox ul li label").each(function () {
                $(this).find('.facet-item__count').appendTo($(this).find('.facet-item__value'));
            });
        }
        if ($('.facets-widget-dropdown select').length) {

            $(".facets-widget-dropdown select").select2()
        }



        if ($(".ps-listado-noticias").length > 0) {
            $(".ps-listado-noticias .views-row article").each(function () {
                $(this).find('h2').prependTo($(this).find('.node__content'));
            });
        }
        if ($('.views-exposed-form').length) {
            $('.views-exposed-form .form-actions input:nth-child(2)').attr('title', 'Restaurar filtros');
        }
        if ($('.ps-faqs-list').length > 0) {
            $('.ps-faqs-list .views-row article h2').prop("onclick", null).off("click");
            if ($('.ps-faqs-list').length > 0) {
                $('.ps-faqs-list .views-row article h2').click(function (e) {
                    e.stopPropagation();
                    $(this).parent().find('.node__content').slideToggle()
                    $(this).toggleClass('change-collapsable-icon')
                });
            }
        }
        if ($('.ps-listado-box .views-exposed-form').length) {
            $('.ps-listado-box .views-exposed-form .bef--secondary').appendTo('.ps-listado-box .views-exposed-form .form--inline');
        }
    });




    // Obtiene la url existente dentro del contenedor y la ejecuta
    if ($(".ps-fulltext-search-list").length) {
        $(".ps-fulltext-search-list .views-row").click(function () {
            var hrefActive = $(this).eq(0).find('a').attr('href');
            window.open(hrefActive, '_self');
            return false;

        });
    }

    // Obtiene la url existente dentro del contenedor y la ejecuta en el listado de convocatorias
    $(".ps-title-link .views-row").click(function () {
        var hrefActive = $(this).eq(0).find('.layout .field--name-title a').attr('href');
        window.open(hrefActive, '_self');
        return false;
    });


    // Obtiene la url existente dentro del contenedor y la ejecuta en el listado de salas
    $(".ps-salas-consultas .views-row").click(function () {
        var hrefActive = $(this).eq(0).find('.views-field-title a').attr('href');
        window.open(hrefActive, '_self');
        return false;
    });


    // Obtiene la url existente dentro del contenedor y la ejecuta en el listado de salas
    $(".ps-transparencia .views-row").click(function () {
        var hrefActive = $(this).eq(0).find('.views-field-title a').attr('href');
        window.open(hrefActive, '_self');
        return false;
    });


    // Obtiene la url existente dentro del contenedor y la ejecuta en el listado de blog
    $(".ps-listado-blog .views-row").click(function () {
        var hrefActive = $(this).eq(0).find('.views-field-title a').attr('href');
        window.open(hrefActive, '_self');
        return false;
    });


    // Obtiene la url existente dentro del contenedor y la ejecuta en el listado de iniciativas
    $(".ps-listado-iniciativas .views-row").click(function () {
        var hrefActive = $(this).eq(0).find('.views-field-title a').attr('href');
        window.open(hrefActive, '_self');
        return false;
    });


    // Obtiene la url existente dentro del contenedor y la ejecuta en el bloque unidades organizativas de entidad
    $(".ps-unidades-organizativas-link .views-row").click(function () {
        var hrefActive = $(this).eq(0).find('.views-field-title a').attr('href');
        window.open(hrefActive, '_self');
        return false;
    });

    // cambia los elementos del bloque contenidos relacionados inversa al del contenidos relacionados si existe el bloque contenidos relacionados.
    if ($('.page-node-type-evento .ps-contenido-relacionado .view-content .views-row ').length) {
        console.log("existe bloque contenido relacionado")
        if ($('.ps-contenido-relacionado-inversa .view-content .views-row').length) {
            console.log("existe bloque contenido relacionado inversa")

            $(".ps-contenido-relacionado-inversa .view-content .views-row").each(function () {
                $(this).prependTo('.ps-contenido-relacionado .view-content');
            });
            $('.ps-contenido-relacionado-inversa').remove()
        }
    }






    // cambia de ubicacion los campos del tipo de contenido servicios
    if ($('.page-node-type-servicio .block-field-blocknodeserviciofield-horarios').length) {
        $(".block-field-blocknodeserviciofield-horarios .field__items .field__item article").each(function () {
            $(this).prependTo('.layout--onecol:nth-child(2) .layout__region');
        });
        $('.block-field-blocknodeserviciofield-horarios').remove()
    }
    if ($('.page-node-type-servicio .block-field-blocknodeserviciofield-horarios-especificos').length) {

        $('.page-node-type-servicio .block-field-blocknodeserviciofield-horarios-especificos').prependTo('.layout--onecol:nth-child(2) .layout__region');
    }
    if ($('.page-node-type-servicio .block-field-blocknodeserviciofield-donde-servicio-listado').length) {
        $('.block-field-blocknodeserviciofield-donde-servicio-listado').prependTo('.layout--onecol:nth-child(2) .layout__region');
    }


    //cambia de ubicacion los campos del tipo de contenido evento
    if ($('.page-node-type-evento .block-field-blocknodeeventofield-horarios').length) {
        //recorre el array de forma inversa
        $($(".block-field-blocknodeeventofield-horarios .field__items .field__item article").get().reverse()).each(function () {
            $(this).prependTo('.layout--onecol:nth-child(4) .layout__region');
        });
        $('.block-field-blocknodeeventofield-horarios').remove()
    }
    if ($('.page-node-type-evento .block-field-blocknodeeventofield-horarios-especificos').length) {
        $('.block-field-blocknodeeventofield-horarios-especificos').prependTo('.layout--onecol:nth-child(4) .layout__region');
    }


    // cambia de ubicacion los campos del tipo de contenido lugar
    if ($('.page-node-type-lugar .block-field-blocknodelugarfield-horarios').length) {
        //recorre el array de forma inversa
        $($(".block-field-blocknodelugarfield-horarios .field__items .field__item article").get().reverse()).each(function () {
            $(this).prependTo('.layout--onecol:nth-child(2) .layout__region');
        });
        $('.block-field-blocknodelugarfield-horarios').remove()
    }
    if ($('.page-node-type-lugar .block-field-blocknodelugarfield-horarios-especificos').length) {
        $('.block-field-blocknodelugarfield-horarios-especificos').prependTo('.layout--onecol:nth-child(2) .layout__region');
    }

    // cambia de ubicacion los campos del tipo de contenido entidad
    if ($('.page-node-type-entidad .block-field-blocknodeentidadfield-horarios-especificos').length) {
        $('.block-field-blocknodeentidadfield-horarios-especificos').appendTo('.layout--onecol:nth-child(2) .layout__region');
    }
    if ($('.page-node-type-entidad .block-field-blocknodeentidadfield-horarios').length) {
        $(".block-field-blocknodeentidadfield-horarios .field__items .field__item article").each(function () {
            $(this).appendTo('.layout--onecol:nth-child(2) .layout__region');
        });
        $('.block-field-blocknodeentidadfield-horarios').remove()
    }


    //añade icono a enlace formulario de contacto ficha contenido lugar
    if ($('.page-node-type-lugar .layout .field--name-field-enlace').length) {
        $('.page-node-type-lugar .layout .field--name-field-enlace').append('<svg xmlns="http://www.w3.org/2000/svg" width="17.695" height="17.694" viewBox="0 0 17.695 17.694"><defs><style>.a{fill:#606060;}</style></defs><path class="a" d="M17.574,5.749a1.036,1.036,0,0,0-.316-.363l-.01-.007L14.377,3.486V2.419a.346.346,0,0,0-.346-.346H12.371L9.846.318a1.729,1.729,0,0,0-2,0L5.324,2.073H3.664a.346.346,0,0,0-.346.346V3.486L.447,5.38l-.01.007A1.539,1.539,0,0,0,.1,5.753a1.425,1.425,0,0,0-.1.479V16.658a1.037,1.037,0,0,0,1.037,1.037H16.658A1.037,1.037,0,0,0,17.7,16.658V6.232a1.032,1.032,0,0,0-.1-.444.333.333,0,0,0-.02-.039ZM17,16.617l-5.765-4.835L17,6.633ZM.691,6.634l5.765,5.148L.691,16.617Zm6.286,5.613.7.628a1.728,1.728,0,0,0,2.335,0l.7-.628L16.389,17H1.306ZM16.785,5.9l-2.408,2.15V4.314ZM8.248.881a1.039,1.039,0,0,1,1.2,0l1.711,1.19H6.535Zm5.438,1.883V8.67L9.553,12.361l0,0a1.031,1.031,0,0,1-1.4,0l0,0L4.009,8.67V2.764ZM3.318,8.053.91,5.9,3.318,4.314Zm0,0" transform="translate(0 0)"/><path class="a" d="M166.346,200.679h5.53a.346.346,0,1,0,0-.691h-5.53a.346.346,0,1,0,0,.691Zm0,0" transform="translate(-160.263 -193.076)"/><path class="a" d="M166.346,140.679h5.53a.346.346,0,1,0,0-.691h-5.53a.346.346,0,1,0,0,.691Zm0,0" transform="translate(-160.263 -135.15)"/><path class="a" d="M190.493,259.988h-4.147a.346.346,0,1,0,0,.691h4.147a.346.346,0,1,0,0-.691Zm0,0" transform="translate(-179.572 -251.003)"/></svg>')
    }

    //añade icono a enlace formulario cita previa ficha contenido lugar
    if ($('.page-node-type-lugar .layout .field--name-field-url').length) {
        $('.page-node-type-lugar .layout .field--name-field-url').append('<svg xmlns="http://www.w3.org/2000/svg" width="18.486" height="18.486" viewBox="0 0 18.486 18.486"><defs><style>.a{fill:#606060;}</style></defs><g transform="translate(31.345 -0.65)"><path class="a" d="M-14.6,1.851h-.35V1.2A.55.55,0,0,0-15.5.65a.549.549,0,0,0-.549.549v.649h-1.9V1.2A.55.55,0,0,0-18.5.65a.549.549,0,0,0-.549.549v.649h-1.9V1.2A.55.55,0,0,0-21.5.65a.549.549,0,0,0-.549.549v.649h-1.9V1.2A.55.55,0,0,0-24.492.65a.55.55,0,0,0-.549.549v.649h-1.9V1.2A.55.55,0,0,0-27.489.65a.549.549,0,0,0-.549.549v.649h-.35A1.75,1.75,0,0,0-30.136,3.6v7.235A5,5,0,0,0-30,17.506a3.546,3.546,0,0,0,.281.281,5.006,5.006,0,0,0,3.419,1.35,5,5,0,0,0,3.256-1.2h8.439a1.75,1.75,0,0,0,1.748-1.748V3.6A1.75,1.75,0,0,0-14.6,1.851Zm-12.887,2.3a.55.55,0,0,0,.549-.549V2.95h1.9V3.6a.549.549,0,0,0,.549.549.55.55,0,0,0,.549-.549V2.948h1.9V3.6a.549.549,0,0,0,.549.549.55.55,0,0,0,.549-.549V2.948h1.9V3.6a.549.549,0,0,0,.549.549.55.55,0,0,0,.549-.549V2.948h1.9V3.6a.549.549,0,0,0,.549.549.55.55,0,0,0,.549-.549V2.948h.35a.65.65,0,0,1,.649.649V4.846H-29.037V3.6a.649.649,0,0,1,.649-.649h.35V3.6a.549.549,0,0,0,.161.389.549.549,0,0,0,.389.161Zm5.555,12.465.038-.062c.077-.141.147-.28.208-.417l.046-.112c.045-.107.089-.223.126-.335.019-.055.036-.109.05-.161.032-.106.059-.2.081-.309l.037-.167c.022-.106.039-.219.06-.391l.011-.088a4.613,4.613,0,0,0,.026-.484A5.059,5.059,0,0,0-26.3,9.045a4.274,4.274,0,0,0-.459.024,1.017,1.017,0,0,0-.175.021c-.1.013-.218.031-.332.053l-.165.035c-.1.024-.2.051-.3.08l-.166.051c-.11.037-.22.08-.324.123l-.12.048c-.145.063-.285.134-.422.21l-.1.062c-.063.037-.122.073-.181.111V5.947h15.09V16.184a.65.65,0,0,1-.649.649h-7.467c.036-.065.08-.137.131-.221Zm-1.538.255-.124.114a3.973,3.973,0,0,1-5.379,0,2.781,2.781,0,0,1-.211-.21,3.961,3.961,0,0,1,.218-5.594,3.942,3.942,0,0,1,2.684-1.05,3.943,3.943,0,0,1,2.9,1.268,3.96,3.96,0,0,1-.093,5.471ZM-22.114,16.431Z" transform="translate(0 0)"/><path class="a" d="M-26.288,10.551a.551.551,0,0,0-.549.55v2.447h-1.249a.551.551,0,0,0-.549.55.55.55,0,0,0,.549.549h1.8a.55.55,0,0,0,.549-.549v-3a.551.551,0,0,0-.549-.55Z" transform="translate(-0.003 -0.01)"/></g></svg>')
    }


    // añade funcionalidad al collapsable mas informacion de la ficha de servicios
    if ($('.page-node-type-servicio .block-field-blocknodeserviciofield-mas-informacion').length > 0) {
        $('.field--name-field-mas-informacion .field__label').click(function (e) {
            e.preventDefault();
            $(this).parent().find('.field__item').slideToggle()
            $(this).toggleClass('change-collapsable-icon')

        });
    }

    // añade funcionalidad al collapsable mas informacion de la ficha de evento
    if ($('.page-node-type-evento .block-field-blocknodeeventofield-mas-informacion').length > 0) {
        $('.field--name-field-mas-informacion .field__label').click(function (e) {
            e.preventDefault();
            $(this).parent().find('.field__item').slideToggle()
            $(this).toggleClass('change-collapsable-icon')

        });
    }

    // añade funcionalidad al collapsable mas informacion de la ficha de lugar
    if ($('.page-node-type-lugar .block-field-blocknodelugarfield-mas-informacion').length > 0) {
        $('.field--name-field-mas-informacion .field__label').click(function (e) {
            e.preventDefault();
            $(this).parent().find('.field__item').slideToggle()
            $(this).toggleClass('change-collapsable-icon')

        });
    }

    // añade funcionalidad al collapsable mas informacion de la ficha de publicacion
    if ($('.page-node-type-publicacion .block-field-blocknodepublicacionfield-mas-informacion').length > 0) {
        $('.field--name-field-mas-informacion .field__label').click(function (e) {
            e.preventDefault();
            $(this).parent().find('.field__item').slideToggle()
            $(this).toggleClass('change-collapsable-icon')

        });
    }


    // añade funcionalidad a los collapsables del listado de preguntas precuentes
    if ($('.ps-faqs-list').length > 0) {
        $('.ps-faqs-list .views-row article h2').click(function (e) {
            e.stopPropagation();
            $(this).parent().find('.node__content').slideToggle()
            $(this).toggleClass('change-collapsable-icon')
        });
    }

    // añade funcionalidad al collapsable mas informacion de la ficha de lugar
    if ($('.page-node-type-convocatoria .block-field-blocknodeconvocatoriafield-galeria-de-documentos').length > 0) {
        $('.field--name-field-galeria-de-documentos .field__item article h2').click(function (e) {
            e.preventDefault();
            $(this).parent().find('.node__content').slideToggle()
            $(this).find('a').toggleClass('change-collapsable-icon')

        });
    }


    // añade funcionalidad al collapsable bloque grupo de documentos
    if ($('.ps-grupo-documentos').length > 0) {
        $('.ps-grupo-documentos .views-row article h2').click(function (e) {
            e.preventDefault();
            $(this).parent().find('.node__content').slideToggle()
            $(this).find('a').toggleClass('change-collapsable-icon')
        });
    }

    //Cambia los servicios de tipo texto al contenedor de servicios de tipo entidad en la ficha de lugar.
    if ($('.page-node-type-lugar .block-field-blocknodelugarfield-servicios').length) {
        if ($('.page-node-type-lugar .block-field-blocknodelugarfield-servicio-texto-').length) {
            $(".block-field-blocknodelugarfield-servicio-texto- .field__items .field__item").each(function () {
                $(this).appendTo('.block-field-blocknodelugarfield-servicios .field__items ');
            });
            $('.block-field-blocknodelugarfield-servicio-texto-').remove()
        }
    }



    //cambia de ubicacion los elementos del formulario de busqueda de los listados
    if ($('.ps-listado-box .views-exposed-form').length) {

        $('.ps-listado-box .views-exposed-form .bef--secondary').appendTo('.ps-listado-box .views-exposed-form .form--inline');

    }

    // gestiona la rotacion del icono de mas filtros
    if ($('.ps-listado-box .views-exposed-form').length) {
        $('.ps-listado-box .views-exposed-form .bef--secondary').removeAttr("open")
    }

    if ($('.page-node-type-faq').length) {
        $('#block-sede-theme-contenidoprincipaldelapagina h1 .field--name-title').prependTo('.layout__region--second')
    }

    // Agrupa el campo precio oferta junto al campo precio de la ficha de publicacion y tacha el campo precio
    if ($('.page-node-type-publicacion .block-field-blocknodepublicacionfield-precio-oferta-euros').length) {
        if ($('.page-node-type-publicacion .block-field-blocknodepublicacionfield-precio-euros').length) {
            $('.field--name-field-precio-oferta-euros').appendTo('.block-field-blocknodepublicacionfield-precio-euros')
            $('.block-field-blocknodepublicacionfield-precio-oferta-euros').remove()
            $('.block-field-blocknodepublicacionfield-precio-euros').addClass('ps-oferta')
        }
    }

    //cambia de ubicacion el footer del bloque otras publicaciones del tipo de contenido publicacion
    if ($(".page-node-type-publicacion .publicaciones-home ").length > 0) {

        $('.publicaciones-home .view-footer').appendTo($(".publicaciones-home .view-content"));
    }


    // Obtiene la url existente dentro del contenedor y la ejecuta
    $(".page-node-type-convocatoria .block-field-blocknodeconvocatoriafield-galeria-de-documentos .field--name-field-archivos .media--type-archivo").click(function () {
        var hrefActive = $(this).eq(0).find('a').attr('href');
        window.open(hrefActive, '_blank');
        return false;
    });






    // añade clase activa al tipo de coleccion seleccionada en el listado de colecciones
    if ($(".ps-path-colecciones").length > 0) {
        var url = window.location.search;
        if (url == "?field_tipos_target_id=9564") {

            $(".ps-selector-coleccion .view-content .views-row:first-child").addClass("collection-active")
        } else if (url == "?field_tipos_target_id=9569") {

            $(".ps-selector-coleccion .view-content .views-row:last-child").addClass("collection-active")
        } else {
            $(".ps-selector-coleccion .view-content .views-row:first-child").addClass("collection-active")
        }
    }

    if ($(".ps-listado-publicaciones").length > 0) {
        $(".block-field-blocknodepublicacionfield-precio-oferta-euros").each(function () {
            $(this).parent().find('.block-field-blocknodepublicacionfield-precio-euros').css('display', 'none');
        });
    }


    //muestra solo una vez el titulo del apartado obras de la ficha de coleccion.
    if ($(".page-node-type-coleccion").length > 0) {
        if ($('.ps-obras-imagenes .view-header').length) {
            $('.ps-obras-audios .view-header').remove();
            $('.ps-obras-videos .view-header').remove();
        }
        if ($('.ps-obras-videos .view-header').length) {
            $('.ps-obras-audios .view-header').remove();
        }
    }

    //funcionalidad mostrar texto completo ficha coleccion
    if ($(".page-node-type-coleccion").length > 0) {

        if ($('.view-leer-texto-completo-de-la-coleccion .views-row .views-field-body .collection-body-container').length) {
            $('.ps-show-description').click(function (e) {
                e.preventDefault();
                $('.ps-descripcion-coleccion .views-field-body').slideUp();
                // $('.ps-descripcion-coleccion .views-field-body-1').slideDown();
                // $('.ps-descripcion-coleccion .views-field-field-requisitos').slideDown();
                $('.ps-hide-description').css('display', 'flex')
                $('.ps-show-description').css('display', 'none')
            });
            $('.ps-hide-description').click(function (e) {
                e.preventDefault();
                // $('.ps-descripcion-coleccion .views-field-body-1').slideUp();
                $('.ps-descripcion-coleccion .views-field-body').slideDown();
                // $('.ps-descripcion-coleccion .views-field-field-requisitos').slideUp();
                $('.ps-hide-description').css('display', 'none')
                $('.ps-show-description').css('display', 'flex')
            });

        } else {
            $('.view-leer-texto-completo-de-la-coleccion .view-footer').css('display', 'none');
        }



    }

    //cambia de ubicacion los elementos de la vista horarios.
    if ($(".ps-horarios-sede-central ").length) {
        var elementos = $('.ps-horarios-sede-central .view-content .views-row .views-field-field-horarios .field-content article');

        $(".ps-horarios-sede-central .view-content .views-row .views-field-field-horarios .field-content article").each(function () {
            $(this).appendTo('.ps-horarios-sede-central .view-content .views-row');
        });
        $(".ps-horarios-sede-central .view-content .views-row .views-field-field-horarios").remove();
        $(".ps-horarios-sede-central .view-content .views-row .views-field-field-telefonos").appendTo('.ps-horarios-sede-central .view-content .views-row');
        $(".ps-horarios-sede-central .view-content .views-row .views-field-title").appendTo('.ps-horarios-sede-central .view-header');
        if ($(".ps-horarios-sede-central .view-content .views-row .views-field-field-horarios-especificos").length) {
            let horario = $(".ps-horarios-sede-central .view-content .views-row .views-field-field-horarios-especificos .horario-general").length
            if (horario == 0) {
                $(".ps-horarios-sede-central .view-content .views-row .views-field-field-horarios-especificos").remove()
            }
        }

    }

    if ($(".ps-horarios-sede-alcala ").length) {
        var elementos = $('.ps-horarios-sede-alcala .view-content .views-row .views-field-field-horarios .field-content article');

        $(".ps-horarios-sede-alcala .view-content .views-row .views-field-field-horarios .field-content article").each(function () {
            $(this).appendTo('.ps-horarios-sede-alcala .view-content .views-row');
        });
        $(".ps-horarios-sede-alcala .view-content .views-row .views-field-field-horarios").remove();
        $(".ps-horarios-sede-alcala .view-content .views-row .views-field-field-telefonos").appendTo('.ps-horarios-sede-alcala .view-content .views-row');
        if ($(".ps-horarios-sede-alcala .view-content .views-row .views-field-field-horarios-especificos").length) {
            let horario_alcala = $(".ps-horarios-sede-alcala .view-content .views-row .views-field-field-horarios-especificos .horario-generales").length

            if (horario_alcala == 0) {
                $(".ps-horarios-sede-alcala .view-content .views-row .views-field-field-horarios-especificos").remove()
            }
        }
    }

    //cambia de ubicacion el footer de la vista lo mas visto de la portada de blog para que aparezca en la seccion del contenido.
    if ($(".ps-lo-mas-visto-blog ").length) {

        $('.ps-lo-mas-visto-blog .view-footer').appendTo($(".ps-lo-mas-visto-blog .view-content"));
    }


    if ($('.ps-node-3209').length) {
        $('.ps-select-contacto-buzon-envios .view-header').click(function (e) {
            $(this).parent().find('.view-content').slideToggle();

        });

        $('.ps-select-contacto-buzon-envios .view-content .views-row').click(function (e) {
            let email = $(this).find('.ps-item-buzon-contacto').attr('value');
            let name = $(this).find('.ps-item-buzon-contacto').text();
            $('#header-select-contact').attr('placeholder', name)
            $(this).parent().slideToggle();
            $('.form-item-email-destino input').attr('value', email);
            console.log($('.form-item-email-destino input').attr('value'))

        });
    }




    //cambia de ubicacion el boton guardar preferencias del bloque de politica de cookies
    if ($('.eu-cookie-compliance-banner').length) {
        $('.eu-cookie-compliance-categories-buttons button').prependTo('#popup-buttons')
        $('#eu-cookie-compliance-categories').append('<div class="container"></div>')
        $('#popup-text p').appendTo('#eu-cookie-compliance-categories .container')
        $('#popup-text button').appendTo('#eu-cookie-compliance-categories .container')
    }


    //Elimina el borde de cuadro que contiene varios campos del contenido servicios.
    if ($('.page-node-type-servicio .layout--onecol:nth-child(2) .block ').length == 0) {
        $('.page-node-type-servicio .layout--onecol:nth-child(2)').addClass('ps-no-border')
    }

    //Elimina el borde de cuadro que contiene varios campos del contenido autores.
    if ($('.page-node-type-autor .layout--onecol:nth-child(2) .block ').length == 0) {
        $('.page-node-type-autor .layout--twocol-section').addClass('ps-no-border')
    }

    //Elimina el borde de cuadro que contiene varios campos del contenido convocatoria.
    if ($('.page-node-type-convocatoria .layout--onecol:nth-child(4) .block ').length == 0) {
        $('.page-node-type-convocatoria .layout--onecol:nth-child(4)').addClass('ps-no-border')
    }

    //Elimina el borde de cuadro que contiene varios campos del contenido entidad.
    if ($('.page-node-type-entidad .layout--onecol:nth-child(2) .block ').length == 0) {
        $('.page-node-type-entidad .layout--onecol:nth-child(2)').addClass('ps-no-border')
    }

    //Elimina el borde de cuadro que contiene varios campos del contenido evento.
    if ($('.page-node-type-evento .layout--onecol:nth-child(4) .block ').length == 0) {
        $('.page-node-type-evento .layout--onecol:nth-child(4)').addClass('ps-no-border')
    }
    //Elimina el borde de cuadro que contiene varios campos del contenido evento.
    if ($('.page-node-type-evento .layout--onecol:nth-child(5) .block ').length == 0) {
        $('.page-node-type-evento .layout--onecol:nth-child(5)').addClass('ps-no-border')
    }



    //añade clase a contenedor padre de imagenes importadas
    if ($("img[class^='wp-image']").length) {
        console.log("hay imagenes")
        $("img[class^='wp-image']").each(function () {
            $(this).parent().parent().addClass('wp-container');
        });
    }
    if ($("img[class^=' wp-image']").length) {
        console.log("hay imagenes")
        $("img[class^=' wp-image']").each(function () {
            $(this).parent().parent().addClass('wp-container');
        });
    }
    if ($("img[class^='size-medium wp-image']").length) {
        console.log("hay imagenes")
        $("img[class^='size-medium wp-image']").each(function () {
            $(this).parent().parent().addClass('wp-container');
        });
    }



    //agrupa etiquetas tipo de contenido blog
    if ($('.page-node-type-entrada-de-blog .block-field-blocknodeentrada-de-blogfield-categoria').length) {


        if ($('.block-field-blocknodeentrada-de-blogfield-etiquetas-busqueda').length) {

            $(".block-field-blocknodeentrada-de-blogfield-categoria .field__item").each(function () {
                $(this).prependTo('.block-field-blocknodeentrada-de-blogfield-etiquetas-busqueda .field--name-field-etiquetas-busqueda');
            });
        }

    }

    if ($('.ps-node-3244').length | $('.ps-node-15363').length | $('.ps-node-15361').length) {
        if ($('.container-fields').length) {} else {
            //$('.ps-listado-blog .form--inline').prepend('<div class="container-fields"></div>')

            $(".ps-listado-blog .form--inline .form-actions").after('<div class="container-fields"></div>');
            $('.form-item-field-etiquetas-busqueda-1').appendTo('.container-fields')
            $('.form-item-autor-entrada-blog').appendTo('.container-fields')
            $(".form-item-field-etiquetas-busqueda-1 input").change(function () {

                let output = $(".form-item-field-etiquetas-busqueda-1 input").text()
                output = output.replace(output.substr(output.indexOf('('), output.indexOf(')') - output.indexOf('(') + 1), '');
            });
        }
    }

    // Agrupa el titulo y el numero de resultados de las facetas
    if ($('.facets-widget-checkbox').length) {

        $(".facets-widget-checkbox ul li label").each(function () {
            $(this).find('.facet-item__count').appendTo($(this).find('.facet-item__value'));
        });
    }

    //Ejecuta el script de los select para convertilos a listas y poder darle estilos.
    if ($('.facets-widget-dropdown select').length) {

        $(".facets-widget-dropdown select").select2()
    }


    //añade clase con margin inferior al bloque contenidos relacionados si no existe el bloque documentos/enlaces de interes.
    if ($('.ps-contenido-relacionado').length) {
        if ($('.view-documentos-enlaces-de-la-pagina').length) {
            $('.ps-contenido-relacionado').css("margin-botom", "0px");
        } else {
            $('.ps-contenido-relacionado').addClass('ps-margen-inferior');
        }
    }
    //añade clase aria-hidden a mapas de google para errores de accesibilidad
    if ($('.geofield-google-map').length) {

        $('.geofield-google-map iframe').attr('aria-hidden', 'false');
        $('.geofield-google-map').attr('aria-hidden', 'false');

    }


    //se añaden atributos a textarea de captcha de formulario para corregir errores de accesibilidad
    if ($('.g-recaptcha').length) {

        $('.g-recaptcha #g-recaptcha-response').attr("aria-hidden", "true");
        $('.g-recaptcha #g-recaptcha-response').attr("aria-label", "do not use");
        $('.g-recaptcha #g-recaptcha-response').attr("aria-readonly", "true");

    }
    //se añade el atributo aria-label a los botones que no lo tengan para solucionar errores de accesibilidad.
    if ($('button').length) {
        $("button").each(function () {

            var attr = $(this).attr('aria-label');
            if (typeof attr !== typeof undefined && attr !== false) {
                $(this).attr("aria-label", "boton");
            }
        });

    }


    //se añade el atributo aria-label a los enlaces para solucionar errores de accesibilidad.
    if ($('a').length) {
        $('a').attr("aria-label", "enlace");

    }

    if ($('.ps-lector-texto').length) {
        $(".ps-lector-texto button").attr("aria-label", "boton-lector-texto");
    }

    //se añade el atributo aria-hiden a los h1 vacios en el tipo de contenido fag para solucionar errores de accesibilidad.
    if ($('.page-node-type-faq').length) {
        $(".page-node-type-faq h1").each(function () {
            var cadena = $(this).text().trim().length
            if (cadena == 0) {
                $(this).remove();
            }
        });

    }

    //se añade el atributo aria-hiden a los h2 vacios en el tipo de contenido pagina personalizada para solucionar errores de accesibilidad.
    if ($('.ps-node-8445').length) {
        $(".ps-node-8445 h2").each(function () {
            var cadena = $(this).text().trim().length
            if (cadena == 0) {
                $(this).append('<span class="sr-only">Enlace sin destino</span>')
            }
        });

    }



    //se añade el atributo alt a las imagenes que no lo tengan para solucionar errores de accesibilidad.
    if ($('img').length) {
        let valor = 1
        $("img").each(function () {
            var attr = $(this).attr('alt');
            if (typeof attr !== typeof undefined && attr !== false) {
                valor++;
                let imagen = "imagen" + valor
                $(this).attr("alt", imagen);
            }
        });
    }

    //añade aria-label a botones de colorbox
    if ($('#colorbox').length) {
        $("#colorbox button").attr("aria-label", "boton-colorbox");
    }




    //se añaden atributos a enlaces del bloque rrss para correfir errores accesibilidad
    if ($('.ps-rrss-share').length) {
        $('.ps-rrss-share .view-content a').attr("aria-label", "enlace rrss");
    }




    //Si la caja que contiene los campos de la ficha de publicacion esta vacia se elimina el borde.
    if ($('.page-node-type-publicacion').length) {
        let contenido = $('.page-node-type-publicacion #block-sede-theme-contenidoprincipaldelapagina .node__content .layout:nth-child(2) .layout__region--second .block').length
        if (contenido == 0) {
            $('.page-node-type-publicacion #block-sede-theme-contenidoprincipaldelapagina .node__content .layout:nth-child(2) .layout__region--second').css('border', 'none')
        }
    }

    //detecta si se visualiza la coleccion desde un dispositivo movil para cambiar la presentacion del bloque de obras.
    if ($('.ps-obras-imagenes').length) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            $('.ps-obras-imagenes .views-row').addClass("is-movil")
        } else {
            $('.ps-obras-imagenes .views-row').removeClass("is-movil")
        }

    }
    $(window).resize(function () {
        if ($('.ps-obras-imagenes').length) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
                $('.ps-obras-imagenes .views-row').addClass("is-movil")
            } else {
                $('.ps-obras-imagenes .views-row').removeClass("is-movil")
            }
        }
    });

    //añade padding izquierdo a los titulos del organigramaque no son collapsables para que queden alineados con aquellos que si lo son
    if ($('.ps-node-2754').length) {
        $(".views_tree_collapsed .views-field-title-1").each(function () {
            let is_collapsed = $(this).siblings('.views_tree_link').length;
            if (is_collapsed == 0) {
                $(this).css("padding-left", "41px");
            }
        });
    }

    //codigo que permite alinear la fecha de cada noticia en la parte inferior
    if ($(".ps-listado-noticias").length > 0) {
        $(".ps-listado-noticias .views-row article").each(function () {
            $(this).find('h2').prependTo($(this).find('.node__content'));
        });
    }

    //se convierte la tabla a responsive
    if ($(".ck-tabla-responsive").length > 0) {

        let tablas = $('.ck-tabla-responsive');
        tablas.each(function () {
            if ($(this).find('table thead').length) {
                //se captura array con los titulos
                let titulos = $(this).find('table thead tr th');
                //se crea array con las filas de la tabla
                let campos = $(this).find('table tbody tr'); //cada una de las filas del body
                campos.each(function () { //se recorre el array de filas

                    //se crea array de cada una de las filas
                    let elementos = $(this).find('td');
                    var i = 0
                    elementos.each(function () { //se recorre el array de elementos de cada fila
                        $(this).attr("data-titulo", titulos[i].innerText); //se le agrega el atributo con el titulo
                        i++;
                    });
                });
            }
        });

        if (window.matchMedia("(max-width: 992px)").matches) {
            let elementosTd = $('.ck-tabla-responsive tbody td');
            elementosTd.each(function () {

                let texto = $(this)[0].innerText
                if (texto.trim() < 1) {
                    console.log("no contiene texto")
                    $(this).css('padding', 0)
                } else {
                    console.log(texto)
                }
            });

            elementosTd.each(function () {

                let data_titulo = $(this).attr("data-titulo")
                if (data_titulo.length) {
                    $(this).prepend('<span class="data-titulo">' + data_titulo + '</span>')
                }

            });


        }
    }


    //inserta el bloque de menu a continuacion del titulo de la pagina
    if ($(".ps-menu-niveles2").length > 0) {
        $('.ps-menu-niveles2').appendTo($("#block-sede-theme-contenidoprincipaldelapagina"))
    }



    //CODIGO PARA QUE ENLACES EXTERNOS SE ABRAN EN OTRA PESTAÑA
    $("a").click(function (event) {
        if (!$(this).hasClass('rsbtn_play')) {


            var href = $(this).attr('href');
            if (href.includes('.pdf', '.txt', '.doc', '.xls')) {
                window.open(href, '_blank');
                return false;
            }

            if (href.includes('enlaces-interes/')) {
                window.open(href, '_blank');
                return false;
            }

            var chost = window.location.hostname;
            var hostname = extractHostname(href);
            if ((!hostname.includes('#', 'mailto:')) && (hostname != '') && (chost != hostname)) {
                window.open(href, '_blank');
                return false;
            }
        };
    });

    if ($('.ps-grupo-documentos').length) {
        $(".ps-grupo-documentos .views-row .field--name-field-archivos > .field__item").click(function () {

            var hrefActive = $(this).find('a').attr('href');
            console.log(hrefActive)
            window.open(hrefActive, '_blank');
            return false;

        });

    }

    function extractHostname(url) {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname
        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        } else {
            hostname = url.split('/')[0];
        }
        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];
        return hostname;
    }

    if ($('.page-node-type-obra').length) {
        $('.bloque-audios audio').attr('controlsList', 'nodownload');
    }

    //se añaden titulos a los iframe de horarios por temas de accesibilidad.
    if ($('.ps-path-horarios').length) {
        setTimeout(add_title_iframe, 2000);
    } else {
        if ($('iframe').length) {
            setTimeout(add_title_iframe_external, 2000);
        }
    }

    function add_title_iframe_external() {
        $('iframe').attr('title', 'página externa incrustada')

    }

    function add_title_iframe() {
        $('.view-display-id-sede_central_recoletos iframe').attr('title', 'mapa Sede central Recoletos')
        $('.view-display-id-sede_alcala iframe').attr('title', 'mapa Sede Alcala de Henares')

    }

    if ($('#eu-cookie-compliance-categories').length) {

        $(".eu-cookie-compliance-category input").each(function () {
            $(this).parent().append('<fieldset></fieldset>');

            $(this).parent().find('label').appendTo($(this).parent().find('fieldset'))
            $(this).prependTo($(this).parent().find('fieldset'))
            $(this).parent().prepend('<legend class="visually-hidden">Opcion politica de cookies</legend>');

        });
        $(".eu-cookie-compliance-category-description").each(function () {

            $(this).parent().append("<div class='descripcion'><p class='parrafo'></p></div>");
            $(this).parent().find('.parrafo').text($(this).text());
            $(this).remove();
        });
    }


    if ($('.addtocal-container').length) {
        $('.addtocal-container button').text('Añadir al calendario')
    }

    if ($('.views-exposed-form').length) {
        $('.views-exposed-form .form-actions input:nth-child(2)').attr('title', 'Restaurar filtros');
    }

    $('.ck-tabla-responsiva table').stacktable();
    $('.ck-tabla-responsiva-cards table').cardtable();


    if ($('.page-node-type-autor').length) {
        if ($('.page-node-type-autor .field--name-field-nacimiento').length == 0) {
            if ($('.page-node-type-autor .field--name-field-defuncion').length == 0) {
                console.log("no existen fechas")
                $('.page-node-type-autor .layout--onecol:first-child').css('display', 'none');

            }
        }
    }

    //elimina el borde a los elementos que tienen imagen de los bloques de colabora, subvenciona, patrocina y organiza de la ficha de evento.
    if ($('.page-node-type-evento').length) {
        if ($('.views-row .views-field-nothing .container-image')) {
            $(".views-row .views-field-nothing .container-image").each(function () {
                $(this).parent().parent().parent().css('border', 'none');
            });
        }
    }


    // if ($('.ckeditor-readmore-wrapper').length) {
    //     $('.ckeditor-readmore-wrapper').addClass('rs_preserve')
    // }

    // if ($('.ps-iconos-acceso-rapido-transparencia').length) {
    //    $('.ps-iconos-acceso-rapido-transparencia').insertAfter('.ps-transparencia .view-filters');

    // }



    //   if ($('.ps-node-3057').length) {

    //        var now = new Date();
    //        var day = ("0" + now.getDate()).slice(-2);
    //        var month = ("0" + (now.getMonth() + 1)).slice(-2);
    //        var today = now.getFullYear() + "-" + (month) + "-" + (day);
    //        $('.form-item-field-fecha-fin input').val(today)
    //        $('.ps-agenda .form-actions input').trigger('click');

    //    }


    //se añaden los elementos de la segunda vista a la primera en la agenda
    if ($('.agenda-prox-eventos').length) {

        if ($('.agenda-prox-eventos-2').length) {
            console.log("existe agenda 2")

            $(".agenda-prox-eventos-2 .views-row").each(function () {
                $(this).appendTo('.agenda-prox-eventos .view-content');

            });
            $('.agenda-prox-eventos-2').remove();
        }
    }

    //Se eliminan las etiquetas br de la plantilla de tabla autoajustable.
    if ($('.ck-tabla-autoajustable').length) {
        $("br").each(function () {
            $(this).remove();
            console.log("se elimina etiqueta br")
        });
    }



     //detecta si se visualiza la coleccion desde un dispositivo movil para cambiar la presentacion del bloque de obras.
     if ($('.ps-node-3209').length) {

            $("#block-mx1bnecontacto ul .menu-item--active-trail a").attr("href","#");
            $('#block-mx1bnecontacto ul .menu-item--active-trail').click(function (e) {
                e.preventDefault();
                $('#block-sede-theme-contenidoprincipaldelapagina article .node__content').slideToggle()
                $('#block-mx1bnecontacto ul .menu-item--active-trail').toggleClass('ps-link-activo')

                $('#block-readspeakerlistados').slideToggle()


            });


    }










});

/* funcion que obtiene el valor de un parametro de la url */
function obtenerValorParametro(sParametroNombre) {
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

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}