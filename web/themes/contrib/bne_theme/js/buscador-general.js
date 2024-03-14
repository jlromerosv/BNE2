jQuery(document).ready(function ($) {

    console.log("load buscador general")


    //funcionalidad buscador por dominios
    if ($(".ps-node-15327").length) { //si nos encontramos en la pagina de busqueda por dominios
        let parametro = obtenerValorParametro("search_api_fulltext");
        if (parametro.length > 0) {
            if (parametro != "undefined") { // se activa la pestaña de busqueda en los dominios si hay una busqueda realizada
                $('.buscador-dominios-input').val(decodeURI(parametro)); //se añade al input de busqueda general el valor del parametro de la url.
            }

        }

        $('.buscador-dominios-button').click(function (e) {
            e.preventDefault();
            let valor = $('.buscador-dominios-input').val(); //se obtiene el valor del input del buscador
            $('.gsc-input').val(valor); // se asigna el valor del input del buscador al input oculto del script de google.
            $(".gsc-search-button").trigger("click"); //se fuerza el click del buscador de google oculto.
        });

    }






    if ($(".ps-node-2785").length) { //si nos encontramos en la pagina de busqueda en la web
        let parametro = obtenerValorParametro("search_api_fulltext");
        if (parametro.length > 0) {
            if (parametro != "undefined") { // se activa la pestaña de busqueda en los dominios si hay una busqueda realizada
                $('.buscador-web-input').val(decodeURI(parametro)); //se añade al input de busqueda general el valor del parametro de la url.
            }
        }

        $('.buscador-web-button').click(function (e) {
            e.preventDefault();
            console.log("prueba")
            let valor = $('.buscador-web-input').val(); //se obtiene el valor del input del buscador general
            let idioma = window.location.pathname.split('/')[1]; //se obtiene el idioma de la url
            let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/2785" + "?search_api_fulltext=" + valor; //se genera la url.
            window.open(url, "_self"); //redireccionamos hacia la url.
        });

        //Bloque resultados busqueda general. Se añade el footer de vista al contenido y se genera el evento click del ver mas resultados.
        if ($(".ps-buscador-solr").length) {

            $(".ps-buscador-solr .view-footer").appendTo('.ps-buscador-solr .view-content');

            $('.ps-buscador-solr .view-footer').click(function (e) {
                e.preventDefault();
                let valor = $('.buscador-web-input').val(); //se obtiene el valor del input del buscador general
                let idioma = window.location.pathname.split('/')[1]; //se obtiene el idioma de la url
                let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/22877" + "?search_api_fulltext=" + valor; //se genera la url.
                window.open(url, "_self"); //redireccionamos hacia la url.
            });

        }


        //modifica bloque 3 resultados buscador en otros dominios
        if ($('#block-bloqueresultadosenotrosdominios').length) {

            // $('#block-bloqueresultadosenotrosdominios .ver-mas').appendTo('#block-bloqueresultadosenotrosdominios .gsc-resultsbox-visible .gsc-tabdActive .gsc-expansionArea');

            setTimeout(function () {
                $('#block-bloqueresultadosenotrosdominios .ver-mas').appendTo('#block-bloqueresultadosenotrosdominios .gsc-resultsbox-visible .gsc-tabdActive .gsc-expansionArea');


                //redirige a la pagina de busqueda general en otros dominios
                $('#block-bloqueresultadosenotrosdominios .ver-mas').click(function (e) {
                    e.preventDefault();
                    let valor = $('.buscador-web-input').val(); //se obtiene el valor del input del buscador
                    let idioma = window.location.pathname.split('/')[1]; //se obtiene el idioma de la url
                    let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/15327" + "?search_api_fulltext=" + valor; //se genera la url.
                    window.open(url, "_self"); //redireccionamos hacia la url.
                });
                $('#block-bloqueresultadosenotrosdominios .gsc-adBlockNoHeight').remove();
                $("#block-bloqueresultadosenotrosdominios .gsc-resultsbox-visible .gsc-tabdActive .gsc-webResult .gsc-expansionArea .gsc-webResult ").each(function () {
                    $(this).find('.gs-per-result-labels').prependTo($(this).find('.gsc-thumbnail-inside'));
                });

                if ($('.gsc-expansionArea .gsc-result').length < 1 || $('.gsc-expansionArea .gs-no-results-result').length > 0 ) {

                    $('#block-bloqueresultadosenotrosdominios').remove();
                }

            }, 3000);

        }

    }






    // Pagina de gusqueda general en la web con filtros avanzados. Se crea el evento click del ver todos los resultados.
    if ($(".ps-node-22877").length) { //si nos encontramos en la pagina de busqueda en la web
        let parametro = obtenerValorParametro("search_api_fulltext");
        if (parametro.length > 0) {
            if (parametro != "undefined") { // se activa la pestaña de busqueda en los dominios si hay una busqueda realizada
                $('.buscador-web-input').val(decodeURI(parametro)); //se añade al input de busqueda general el valor del parametro de la url.
            }

        }

        $('.buscador-web-button').click(function (e) {
            e.preventDefault();
            let valor = $('.buscador-web-input').val(); //se obtiene el valor del input del buscador general
            let idioma = window.location.pathname.split('/')[1]; //se obtiene el idioma de la url
            let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/22877" + "?search_api_fulltext=" + valor; //se genera la url.
            window.open(url, "_self"); //redireccionamos hacia la url.
        });

    }


});




























































// jQuery(document).ready(function ($) {

//     console.log("load buscador general")


//  //funcionalidad buscador por dominios
//  if ($(".ps-node-15327").length) { //si nos encontramos en la pagina de busqueda por dominios

//     $('.buscador-dominios-button').click(function (e) {
//         e.preventDefault();
//         let valor = $('.buscador-dominios-input').val(); //se obtiene el valor del input del buscador
//         $('.gsc-input').val(valor); // se asigna el valor del input del buscador al input oculto del script de google.
//         $(".gsc-search-button").trigger("click"); //se fuerza el click del buscador de google oculto.
//     });



//      //funcionalidad buscador por catalogos
//      if ($(".ps-node-18794").length) { //si nos encontramos en la pagina de busqueda por catalogos

//         $('.buscador-dominios-button').click(function (e) {

//             e.preventDefault();
//             let valor = $('.buscador-dominios-input').val(); //se obtiene el valor del input del buscador
//             let idioma = window.location.pathname.split('/')[1]; //se obtiene el idioma de la url
//             let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/18794" + "?search_api_fulltext=" + valor; //se genera la url.
//             window.open(url, "_self"); //redireccionamos hacia la url.
//         });

//     }




//     if ($(".ps-node-2785").length) { //si nos encontramos en la pagina de busqueda en la web
//         let parametro = obtenerValorParametro("search_api_fulltext");
//         if (parametro.length > 0) {
//             if (parametro != "undefined") { // se activa la pestaña de busqueda en los dominios si hay una busqueda realizada
//                 $('.buscador-web-input').val(decodeURI(parametro)); //se añade al input de busqueda general el valor del parametro de la url.


//                 //$('.gsc-input').val(decodeURI(parametro)); // se asigna el valor del input del buscador al input oculto del script de google.
//                 //$(".gsc-search-button").trigger("click"); //se fuerza el click del buscador de google oculto.
//             }

//         }

//         $('.buscador-web-button').click(function (e) {
//             e.preventDefault();
//             let valor = $('.buscador-web-input').val(); //se obtiene el valor del input del buscador general
//             let idioma = window.location.pathname.split('/')[1]; //se obtiene el idioma de la url
//             let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/2785" + "?search_api_fulltext=" + valor; //se genera la url.
//             window.open(url, "_self"); //redireccionamos hacia la url.
//         });
//         if ($(".ps-buscador-solr").length) {

//             $(".ps-buscador-solr .view-footer").appendTo('.ps-buscador-solr .view-content');

//             $('.ps-buscador-solr .view-footer').click(function (e) {
//                 e.preventDefault();
//                 let valor = $('.buscador-web-input').val(); //se obtiene el valor del input del buscador general
//                 let idioma = window.location.pathname.split('/')[1]; //se obtiene el idioma de la url
//                 let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/22877" + "?search_api_fulltext=" + valor; //se genera la url.
//                 window.open(url, "_self"); //redireccionamos hacia la url.
//             });

//         }


//         //modifica bloque 3 resultados buscador en otros dominios
//         if ($('#block-bloqueresultadosenotrosdominios').length) {

//             $('#block-bloqueresultadosenotrosdominios .ver-mas').appendTo('#block-bloqueresultadosenotrosdominios .gsc-resultsbox-visible .gsc-tabdActive .gsc-expansionArea');

//             $('#block-bloqueresultadosenotrosdominios .gsc-adBlockNoHeight').remove();

//             $("#block-bloqueresultadosenotrosdominios .gsc-resultsbox-visible .gsc-tabdActive .gsc-webResult .gsc-expansionArea .gsc-webResult ").each(function () {
//                 $(this).find('.gs-per-result-labels').prependTo($(this).find('.gsc-thumbnail-inside'));
//             });

//             //redirige a la pagina de busqueda general en otros dominios
//             $('#block-bloqueresultadosenotrosdominios .ver-mas').click(function (e) {
//                 e.preventDefault();
//                 let valor = $('.buscador-web-input').val(); //se obtiene el valor del input del buscador
//                 let idioma = window.location.pathname.split('/')[1]; //se obtiene el idioma de la url
//                 let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/15327" + "?search_api_fulltext=" + valor; //se genera la url.
//                 window.open(url, "_self"); //redireccionamos hacia la url.
//             });
//         }



//     }







//     if ($(".ps-node-22877").length) { //si nos encontramos en la pagina de busqueda en la web
//         let parametro = obtenerValorParametro("search_api_fulltext");
//         if (parametro.length > 0) {
//             if (parametro != "undefined") { // se activa la pestaña de busqueda en los dominios si hay una busqueda realizada
//                 $('.buscador-web-input').val(decodeURI(parametro)); //se añade al input de busqueda general el valor del parametro de la url.
//             }

//         }

//         $('.buscador-web-button').click(function (e) {
//             e.preventDefault();
//             let valor = $('.buscador-web-input').val(); //se obtiene el valor del input del buscador general
//             let idioma = window.location.pathname.split('/')[1]; //se obtiene el idioma de la url
//             let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/22877" + "?search_api_fulltext=" + valor; //se genera la url.
//             window.open(url, "_self"); //redireccionamos hacia la url.
//         });

//     }










//     if ($(".selector-buscador-general").length) {

//         //Al cargar la pagina de busqueda en la web se añade la clase active a la pestaña web y se agrega el texto del paramametro al input de busqueda.
//         if ($('.ps-node-2785').length) {
//             $('.item-web').addClass('active');
//             let parametro = obtenerValorParametro("search_api_fulltext")
//             if (parametro.length > 0) {
//                 if (parametro != "undefined") { // se activa la pestaña de busqueda en los dominios si hay una busqueda realizada
//                     $('.item-dominios').addClass('ps-active')
//                     $('.item-catalogos').addClass('ps-active')
//                     $('.buscador-web-input').val(decodeURI(parametro)); //se añade al input de busqueda general el valor del parametro de la url.
//                 }

//             }

//         }
//         //Al cargar la pagina de busqueda en los dominios se añade la clase active a la pestaña dominios ,se agrega el texto del paramametro al input de busqueda y se fuerza un click para que muestre resultados.
//         // if ($('.ps-node-15327').length) {

//         //     //se añade la clase active a la pestaña de busqueda por dominios
//         //     $('.item-dominios').addClass('active');
//         //     let parametro = obtenerValorParametro("search_api_fulltext") //se captura el parametro de la url
//         //     $('.buscador-dominios-input').val(decodeURI(parametro)); //se decodifica el valor del parametro y se añade al input del buscador.

//         //     if (parametro.length > 0) {
//         //         if (parametro != "undefined") { // se activa la pestaña de busqueda en catalogos si hay una busqueda realizada
//         //             $('.item-catalogos').addClass('ps-active')
//         //         }

//         //     }


//         //     window.addEventListener("load", function () {
//         //         if ($('.buscador-dominios-button').length) { //una vez cargado el boton se fueza un click del buscador general.
//         //             $(".buscador-dominios-button").click();
//         //         }

//         //     });
//         // }


//         //Al cargar la pagina de busqueda en catalogos se añade la clase active a la pestaña dominios ,se agrega el texto del paramametro al input de busqueda y se fuerza un click para que muestre resultados.
//         if ($('.ps-node-18794').length) {

//             //se añade la clase active a la pestaña de busqueda por dominios
//             $('.item-catalogos').addClass('active');
//             let parametro = obtenerValorParametro("search_api_fulltext") //se captura el parametro de la url
//             $('.buscador-dominios-input').val(decodeURI(parametro)); //se decodifica el valor del parametro y se añade al input del buscador.
//             if (parametro.length > 0) {
//                 if (parametro != "undefined") { // se activa la pestaña de busqueda en los dominios si hay una busqueda realizada
//                     $('.item-dominios').addClass('ps-active')
//                 }

//             }

//             // window.addEventListener("load", function () {
//             //     if ($('.buscador-dominios-button').length) { //una vez cargado el boton se fueza un click del buscador general.
//             //         $(".buscador-dominios-button").click();
//             //     }

//             // });
//         }

//         $('.item-web').click(function (e) { //
//             e.preventDefault();
//             let parametro = "";
//             if ($('.ps-node-15327')) {
//                 parametro = $('.buscador-dominios-input').val() //se obtiene el valor del input de busqueda

//             }
//             let idioma = window.location.pathname.split('/')[1]; //se obtiene el idioma de la url
//             let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/2785?search_api_fulltext=" + parametro + "#ps-search-block"; //se genera la url de destino con el parametro obtenido del input de busqueda
//             window.open(url, "_self");


//         });
//         $('.item-dominios').click(function (e) {
//             e.preventDefault();
//             let parametro = obtenerValorParametro("search_api_fulltext") //se obtiene el valor del parametro de la url.
//             console.log(parametro)

//             if (parametro.length > 0) {
//                 let idioma = window.location.pathname.split('/')[1];
//                 let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/15327?search_api_fulltext=" + parametro + "#ps-search-block";
//                 console.log(url)
//                 window.open(url, "_self");
//             }



//         });
//         $('.item-catalogos').click(function (e) {
//             e.preventDefault();
//             let parametro = obtenerValorParametro("search_api_fulltext") //se obtiene el valor del parametro de la url.
//             let parametro_input = $(".buscador-dominios-input").val()
//             let idioma = window.location.pathname.split('/')[1]; //se obtiene el idioma de la url
//             if ($('.ps-node-15327').length) {
//                 if (parametro_input.length > 0) {
//                     let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/18794?search_api_fulltext=" + parametro_input + "#ps-search-block";
//                     window.open(url, "_self");
//                 } else {
//                     if (parametro.length > 0) {
//                         let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/18794?search_api_fulltext=" + parametro + "#ps-search-block";
//                         window.open(url, "_self");
//                     }
//                 }
//             } else {
//                 if (parametro.length > 0) {

//                     let idioma = window.location.pathname.split('/')[1];
//                     let url = window.location.protocol + "//" + window.location.hostname + "/" + idioma + "/node/18794?search_api_fulltext=" + parametro + "#ps-search-block";
//                     window.open(url, "_self");
//                 }
//             }

//         });

//     }

// }












// });