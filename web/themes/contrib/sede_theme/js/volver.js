jQuery(document).ready(function ($) {


    var observer = new MutationObserver(function (mutations) {
        if ($(".ps-rrss-share").length){
            console.log("entramos en el bloque rrss")

            let idioma = lenguagePageVolver();

            if ( idioma == "en" ){
                console.log("el idioma es ingles")

                $('.ps-rrss-share .view-header .field--name-body p a').text("Back");
            }
            observer.disconnect()

        }

    })

    observer.observe(document, {
        attributes: false,
        childList: true,
        characterData: false,
        subtree: true
      })

   if ($(".ps-rrss-share").length){
    console.log("entramos en el bloque rrss")

    let idioma = lenguagePageVolver();

    if ( idioma == "en" ){
        console.log("el idioma es ingles")

        $('.ps-rrss-share .view-header .field--name-body p a').text("Back");
      }

   }

    function lenguagePageVolver(){
      // Obtener la ruta actual de la URL
      var urlPath = window.location.pathname;

      // Usar una expresión regular para obtener la cadena que sigue después de la barra inicial
      var match = urlPath.match(/^\/([a-z]{2})/);

      // Comprobar si se encontró una coincidencia
      if (match) {
        // La cadena que sigue después de la barra inicial se encuentra en la posición 1 del array match
        var language = match[1];
        return language
      }

    }

})