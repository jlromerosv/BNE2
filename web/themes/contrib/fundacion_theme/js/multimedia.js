jQuery(document).ready(function ($) {


    //Oculta la region multimedia si no existen bloques a mostrar
    if ($('.ps_multimedia_region .ps-multimedia-region-content .contenido .region-multimedia').length) {

    }
    else {
        $('.ps_multimedia_region').css('display', 'none');
    }



    //funcionalidad collapsable plantilla ckeditor
    if ($('.ckeditor-collapsable').length > 0) {
        $('.ckeditor-collapsable .title').click(function (e) {
            e.preventDefault();
            //$(this).parent().find('.contenido').toggleClass('show-collapsable')
            $(this).parent().find('.contenido').slideToggle()
            $(this).toggleClass('change-collapsable-icon')

        });
    }

    if ($('.ps-leer-mas').length > 0) {
        $('.ps-show-text').click(function (e) {
            $(this).parent().parent().find('.ps-texto-leer-mas').slideDown();
            $(this).addClass('ps-hide-button');
            $(this).parent().parent().find('.ps-hide-text').removeClass('ps-hide-button')
        });
        $('.ps-hide-text').click(function (e) {
            $(this).parent().parent().find('.ps-texto-leer-mas').slideUp();
            $(this).addClass('ps-hide-button');
            $(this).parent().parent().find('.ps-show-text').removeClass('ps-hide-button')

        });
    }


    // funcionalidad bloque videos
    if ($('.ps-videos-web .videos-container .video-link').length) {
        var videos = $('.ps-videos-web .videos-container .video-link')
        $(".ps-videos-web .videos-container .video-link").each(function () {
            $(this).appendTo('.ps-videos-web .tabs-videos');
        });

        $('.ps-videos-web .tabs-videos .video-link').click(function (e) {

            //Se paran todos los videos al cambiar de video
            $('.ps-videos-web .media-oembed-content').each(function () {
                var videoURL = $(this).prop('src');
                //videoURL = videoURL.replace("&autoplay=1", "");
                $(this).prop('src', '');
                $(this).prop('src', videoURL);
            });



            e.preventDefault();
            var id = "#ps-" + $(this).attr('id')

            //se añade clase activa al link seleccionado
            $(this).parent().find('.video-link').removeClass('link-active');
            $(this).addClass('link-active');

            //se muestra el video seleccionado
            $(this).parent().parent().find('.video-content').slideUp();
            $(this).parent().parent().find(id).slideDown();


        });

        // $('.ps-videos-web .tabs-videos .video-link').click(function(){
        //     $('.media-oembed-content').contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        // });

    }

    // Establece la altura del iframe del video
    if ($(".ps-videos-web .videos-container").length) {
        var video_width = $(".field--name-field-media-oembed-video iframe").width()
        var video_height = Math.round(video_width * 0.56);
        $(".field--name-field-media-oembed-video iframe").height(video_height);

        $(window).resize(function () {
            var video_width = $(".field--name-field-media-oembed-video iframe").width()
            var video_height = Math.round(video_width * 0.56);
            $(".field--name-field-media-oembed-video iframe").height(video_height);
        });
    }

     // Establece la altura del iframe del video
     if ($(".ps-videos-web .videos-container").length) {
        var video_width = $(".field--name-field-media-oembed-video video").width()
        var video_height = Math.round(video_width * 0.56);
        $(".field--name-field-media-oembed-video video").height(video_height);

        $(window).resize(function () {
            var video_width = $(".field--name-field-media-oembed-video video").width()
            var video_height = Math.round(video_width * 0.56);
            $(".field--name-field-media-oembed-video video").height(video_height);
        });
    }




    // Establece la altura del iframe del video del bloque de obras de video en la ficha de coleccion
    if ($(".ps-obras-videos .views-field-field-media-oembed-video").length) {

        var video_width = $(".ps-obras-videos .views-field-field-media-oembed-video").width()
        var video_height = Math.round(video_width * 0.56);
        $(".ps-obras-videos .views-field-field-media-oembed-video iframe").height(video_height);
        $(".ps-obras-videos .views-field-field-media-oembed-video iframe").width(video_width);

        $(window).resize(function () {
            var video_width = $(".ps-obras-videos .views-field-field-media-oembed-video").width()
            var video_height = Math.round(video_width * 0.56);
            $(".ps-obras-videos .views-field-field-media-oembed-video iframe").height(video_height);
            $(".ps-obras-videos .views-field-field-media-oembed-video iframe").width(video_width);
        });
    }




    // Establece la altura del iframe del campo iframes
    if ($(".ps-iframes-page").length) {


        $(".ps-iframes-page iframe").width("80%")
        var iframe_width = $(".ps-iframes-page iframe").width()
        var iframe_height = Math.round(iframe_width * 0.8);
        $(".ps-iframes-page iframe").height(iframe_height);

        $(window).resize(function () {
            $(".ps-iframes-page iframe").width("80%")
            var iframe_width = $(".ps-iframes-page iframe").width()
            var iframe_height = Math.round(iframe_width * 0.8);
            $(".ps-iframes-page iframe").height(iframe_height);
        });
    }

    //cambia el ancho de la imagen destacada de noticia si la imagen es vertical
    if ($(".page-node-type-noticia, .page-node-type-entidad, .page-node-type-dossier, .page-node-type-evento, .page-node-type-iniciativa, .page-node-type-servicio, .page-node-type-lugar, .page-node-type-entrada-de-blog, .page-node-type-catalogo").length > 0) {

        var imagen = $(".field--name-field-imagen-destacada img");
        var imagen_width = imagen.width()
        var imagen_height = imagen.height()
        console.log(imagen_width)
        console.log(imagen_height)
        if (imagen_width < imagen_height) {
            console.log("la imagen es vertical")
            if (screen.width > 768) {
                $(".field--name-field-imagen-destacada img").css("width", "40%")
            }
        }

        $(window).resize(function () {
            var imagen = $(".field--name-field-imagen-destacada img");
            var imagen_width = imagen.width()
            var imagen_height = imagen.height()
            if (imagen_width < imagen_height) {

                if (screen.width > 768) {
                    $(".field--name-field-imagen-destacada img").css("width", "40%")
                }
                else {
                    $(".field--name-field-imagen-destacada img").css("width", "100%")
                }
            }
        });
    }

    //cambia el ancho de la imagen de cabecera de evento si la imagen es vertical
    if ($(".page-node-type-evento").length > 0) {

        var imagen = $(".field--name-field-imagen-cabecera img");
        var imagen_width = imagen.width()
        var imagen_height = imagen.height()
        console.log("ancho " + imagen_width)
        console.log("alto " + imagen_height)
        if (imagen_width < imagen_height) {
            console.log("la imagen es vertical")
            if (screen.width > 768) {
                $(".field--name-field-imagen-cabecera img").css("width", "40%")
            }
        }

        $(window).resize(function () {
            var imagen = $(".field--name-field-imagen-cabecera img");
            var imagen_width = imagen.width()
            var imagen_height = imagen.height()
            if (imagen_width < imagen_height) {

                if (screen.width > 768) {
                    $(".field--name-field-imagen-cabecera img").css("width", "40%")
                }
                else {
                    $(".field--name-field-imagen-cabecera img").css("width", "100%")
                }
            }
        });
    }

    //cambia el ancho de la imagen destacada de noticia si la imagen es vertical
    if ($(".page-node-type-obra").length > 0) {

        var imagen = $(".layout--onecol .field--name-field-imagen-destacada img");
        var imagen_width = imagen.width()
        var imagen_height = imagen.height()
        console.log(imagen_width)
        console.log(imagen_height)
        if (imagen_width < imagen_height) {

            if (screen.width > 768) {
                $(".layout--onecol .field--name-field-imagen-destacada img").css("width", "40%")
            }
        }


        $(window).resize(function () {
            var imagen = $(".layout--onecol .field--name-field-imagen-destacada img");
            var imagen_width = imagen.width()
            var imagen_height = imagen.height()
            if (imagen_width < imagen_height) {

                if (screen.width > 768) {
                    $(".layout--onecol .field--name-field-imagen-destacada img").css("width", "40%")
                }
                else {
                    $(".layout--onecol .field--name-field-imagen-destacada img").css("width", "100%")
                }
            }
        });
    }


    //cambia el ancho de la imagen representativa de ciclo si la imagen es vertical
    if ($(".page-node-type-campana").length > 0) {

        var imagen = $(".layout--onecol .field--name-field-imagen-representativa img");
        var imagen_width = imagen.width()
        var imagen_height = imagen.height()
        console.log(imagen_width)
        console.log(imagen_height)
        if (imagen_width < imagen_height) {

            if (screen.width > 768) {
                $(".layout--onecol .field--name-field-imagen-representativa img").css("width", "40%")
            }
        }


        $(window).resize(function () {
            var imagen = $(".layout--onecol .field--name-field-imagen-representativa img");
            var imagen_width = imagen.width()
            var imagen_height = imagen.height()
            if (imagen_width < imagen_height) {

                if (screen.width > 768) {
                    $(".layout--onecol .field--name-field-imagen-representativa img").css("width", "40%")
                }
                else {
                    $(".layout--onecol .field--name-field-imagen-representativa img").css("width", "100%")
                }
            }
        });
    }

     //cambia el ancho de la imagen representativa del dossier si la imagen es vertical
     if ($(".page-node-type-dossier").length > 0) {

        var imagen = $(".layout--onecol .field--name-field-imagen-representativa img");
        var imagen_width = imagen.width()
        var imagen_height = imagen.height()
        console.log(imagen_width)
        console.log(imagen_height)
        if (imagen_width < imagen_height) {

            if (screen.width > 768) {
                $(".layout--onecol .field--name-field-imagen-representativa img").css("width", "40%")
            }
        }


        $(window).resize(function () {
            var imagen = $(".layout--onecol .field--name-field-imagen-representativa img");
            var imagen_width = imagen.width()
            var imagen_height = imagen.height()
            if (imagen_width < imagen_height) {

                if (screen.width > 768) {
                    $(".layout--onecol .field--name-field-imagen-representativa img").css("width", "40%")
                }
                else {
                    $(".layout--onecol .field--name-field-imagen-representativa img").css("width", "100%")
                }
            }
        });
    }

    if ($('.sintesis-voz').length){
        $('.sintesis-voz .ps-lector-texto .title').click(function (e) {
            e.preventDefault();
            $(this).parent().find('.ps-lector-texto-controles').toggleClass('ps-controles-show');


        });
    }

    //funcion que añade id a los elementos del slider
    if ($('.slick').length){
        //console.log($('.slick__slide'))
        let num = 1;
        $(".slick__slide").each(function () {
            let identificador = "diapositiva" + num;
            $(this).attr('id', identificador);
            num++;
        });
    }









});






































