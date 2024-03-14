jQuery(document).ready(function ($) {

    //funcion que genera la fecha y hora actual.
    function horaActual() {
        var hoy = new Date();

        var dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        var diaSemana = dias[hoy.getDay()];

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayWeek = days[hoy.getDay()];

        //---------------------------------------------------------------------------------------------------

        var dia = hoy.getDate();
        var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        var mes = meses[hoy.getMonth()];

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var month = months[hoy.getMonth()];

        var anio = hoy.getFullYear();
        var hora = hoy.getHours();
        var minuto = hoy.getMinutes().toString().padStart(2, '0');

        var idioma = lenguagePage();

        if ( idioma == "es"){
          var horaActual = diaSemana + ', ' + dia + ' de ' + mes + ' de ' + anio + ' ' + hora + ':' + minuto + ' h';
          $('.view-hora-oficial .view-content .views-row .views-field-nothing .field-content p a ').after(" | " + horaActual)
        }
        if ( idioma == "en"){
          var horaActualIngles = dayWeek + ', ' + month + ' ' + dia + ', ' + anio + ' ' + hora + ':' + minuto + ' h';
          $('.view-hora-oficial .view-content .views-row .views-field-nothing .field-content p a ').after(" | " + horaActualIngles)
        }



      }

      horaActual();
    //Funcion que obtiene el idioma de la página
    function lenguagePage(){
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