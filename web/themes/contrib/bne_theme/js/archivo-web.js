jQuery(document).ready(function ($) {
  if ($('.ps-node-26939').length) {
    //Se espera a que esten cargados los filtros y el formulario.
    var observer = new MutationObserver(function (mutations) {
      // Una vez estan cargados los filtros y el formulario se obtienen los valores de los parametros de la url
      if ($('.ps-listado-archivo-web').length && $('#bloque-filtros-archivos-web').length) {
        let titulo = getParametro('titulo');
        let palabras_clave = getParametro('palabras-clave');
        let texto = decodeURI(getParametro('buscar'));
        let coleccion = decodeURI(getParametro('coleccion'));
        let colecciones_id = decodeURI(getParametro('coleccion-id'));
        let materia = decodeURI(getParametro('materia'));
        let materia_id = decodeURI(getParametro('materia-id'));
        let pagina = decodeURI(getParametro('page'));
        let total = decodeURI(getParametro('total'));
        let url_orden = decodeURI(getParametro('orden'));

        if ((titulo.length > 0) | (palabras_clave.length > 0) | (texto.length > 0) | (pagina.length > 0) | (materia != '') | (coleccion != '') | (colecciones_id != '') | (materia_id != '') | (url_orden != '')) {


          if (url_orden.length){
            $('#ordenarPor').val(url_orden);
          }

          //Si existe el parametro page en la url
          if (pagina.length) {
            $('#ps-num-page').val(pagina) //se establece el valor del parametro page al campo pagina actual del formulario.
            //Si el valor del parametro es mayor que uno se habilita el botón anterior del paginador porque existen páginas anteriores.
            if (pagina > 1) {
              $('.pager .pager__item--previous').removeClass('inactive')
            }
            // Si el valor del parametro page de la url es igual al valor del parametro de la
            //  url total se inhabilita el botón siguiente del paginador porque estamos en
            //  la última página.
            if (pagina == $('#ps-total-paginas').val()) {
              $('.pager .pager__item--next').addClass('inactive')
            }
          }
          //Si existe el parametro titulo en la url se marca el checkbox del formulario y se desmarcan el resto.
          if (titulo.length > 0) {
            $('.details-wrapper input').prop('checked', false);
            $('#ps-archivo-web-titulo').prop('checked', true);
          }
          //Si existe el parametro palabras-clave en la url se marca el checkbox del formulario y se desmarcan el resto.
          if (palabras_clave.length > 0) {
            $('.details-wrapper input').prop('checked', false)
            $('#ps-archivo-web-palabras-clave').prop('checked', true);
          }
          //Si existe texto en el parametro buscar de la url se sustituye el campo tipo texto del buscador por dicho texto.
          if (texto.length > 0) {
            $('#ps-search-text-archivo-web').val(texto.replace(/\+/g, ' '));
          }

          //Se hace visible el botón restablecer porque existen parametros de busqueda marcados en el formulario.
          $('#ps-archivo-web-reload').css('display', 'block');

          //Se oculta el boton de restablecer filtros porque no existen filtros de busqueda.
          if (window.location.search.length < 1) {
            $('#ps-archivo-web-reload').css('display', 'none');
          }

          if (titulo.length < 1 && palabras_clave.length < 1 && texto.length < 1 && materia.length < 1 && coleccion.length < 1) {
            $('#ps-archivo-web-reload').css('display', 'none');
          }
          //boton restablecer filtros
          $('#ps-archivo-web-reload').click(function (e) {
            e.preventDefault()
            let url =
              window.location.protocol +
              '//' +
              window.location.hostname +
              window.location.pathname
            window.open(url, '_self')
          })
        }

        // Cuando se pulsa en el check se marca o desmarca el input oculto
        $('.block-facets-web li .check').click(function(event) {
          $(this).toggleClass("activo"); // Se añade o elimina la clase activo a la caja que simula el check.

          if ($(this).hasClass("activo")){ // Si la caja tiene la clase activo
            $(this).parent().find("input").prop("checked", true).trigger('change');  // Se marca el check asociado y se dispara el evento change.
            actualizaColecciones(); // Se actualizan los id de búsqueda del formulario si el check seleccionado es de una coleccion.
            actualizaMaterias(); // Se actualizan los id de búsqueda del formulario si el check seleccionado es de una materia.
          }
          else{ // Si la caja no tiene la clase activo
            $(this).parent().find("input").prop("checked", false).trigger('change'); // Se desmarca el check asociado y se dispara el evento change.
            actualizaColecciones(); // Se actualizan los id de búsqueda del formulario si el check seleccionado es de una coleccion.
            actualizaMaterias(); // Se actualizan los id de búsqueda del formulario si el check seleccionado es de una materia.
          }
        });

        //Intercambiador de checkbox seleccionado en tipo de busqueda.
        $('.details-wrapper input').click(function (e) {
          $('.details-wrapper input').prop('checked', false)
          $(this).prop('checked', true)
        })

        //Se obtienen los parametros de coleccion de la URL y se seleccionan los option de los select.
        let valor_coleccion = getParametro('coleccion')
        if (valor_coleccion.length > 0) {
          // Se establece el valor del parametro de la url coleccion al campo coleccion del formulario.
          $('#ps-coleccion').val(valor_coleccion)

          // Se marcan los checkbox del filtro de colecciones con las opciones que coinciden con los valores del parametro de url coleccion.
          let valores_coleccion = valor_coleccion.split('-') //Se crea un array de valores utilizando la barra como separador.
          for (var i = 0; i < valores_coleccion.length; i++) {
            seleccionaCheckboxColeccion(valores_coleccion[i]) // Se envia el valor a una función que busca el check que tenga ese valor y lo marca.
          }
        }

        //Se obtiene el valor del parametro coleccion-id de la url, se añade su valor al campo del formulario y se marcan los checkbox en los filtros.
        let valor_colecciones_id = getParametro('coleccion-id')
        if (valor_colecciones_id.length > 0) {
          // Se establece el valor del parametro de la url coleccion al campo coleccion del formulario.
          $('#ps-colecciones-id').val(valor_colecciones_id)

          // Se marcan los checkbox del filtro de colecciones con las opciones que coinciden con los valores del parametro de url coleccion.
          let valores_coleccion = valor_colecciones_id.split('-')
          for (var i = 0; i < valores_coleccion.length; i++) {
            seleccionaCheckboxColeccion(valores_coleccion[i])
          }
        }

        let valor_materia = getParametro('materia')
        if (valor_materia.length > 0) {
          // Se establece el valor del parametro de la url materia al campo materia del formulario.
          $('#ps-materia').val(valor_materia)
          // Se marcan los checkbox del filtro de materias con las opciones que coinciden con los valores del parametro de url materia.
          let valores_materia = valor_materia.split('-')
          for (var i = 0; i < valores_materia.length; i++) {
            seleccionaCheckboxMateria(valores_materia[i])
          }
        }

        let valor_materia_id = getParametro('materia-id')
        if (valor_materia_id.length > 0) {
          // Se establece el valor del parametro de la url materia al campo materia del formulario.
          $('#ps-materias-id').val(valor_materia_id)
          // Se marcan los checkbox del filtro de materias con las opciones que coinciden con los valores del parametro de url materia.
          let valores_materia = valor_materia_id.split('-')
          for (var i = 0; i < valores_materia.length; i++) {
            seleccionaCheckboxMateria(valores_materia[i])
          }
        }

        // se marca el check de la coleccion si todos las subcolecciones estan marcadas al recargar la pagina.
        $('.colecciones-checkbox-list .subcolecciones').each(function (index) { //Se recorren las subcolecciones
          let total_marcados = $(this).find('input[type=checkbox]:checked').length // total de check marcados de una coleccion
          let total = $(this).find('input[type=checkbox]').length //total de check existentes de una coleccion
          if (total_marcados == total) { // Si estan todos marcados
            $(this).parent().find('.facet-item-principal input').prop('checked', true); // Se marca el check principal de la coleccion
            $(this).parent().find('.facet-item-principal .check').addClass('activo'); // Se marcan las subcolecciones.
          }
          if ((total_marcados > 0) & (total_marcados < total)) { // Si no estan marcados todos.
            $(this).parent().find('.facet-item-principal .facet-item__count').text('(' + total_marcados + ')'); //Se añade al contador el numero de subcoleciones marcadas.

          }
        })

        // se marca el check de la materia si todas las submaterias estan marcadas al recargar la pagina.
        $('.materias-checkbox-list .submaterias').each(function (index) {
          let total_marcados = $(this).find('input[type=checkbox]:checked').length
          let total = $(this).find('input[type=checkbox]').length
          if (total_marcados == total) {
            $(this).parent().find('.facet-item-principal input').prop('checked', true)
            $(this).parent().find('.facet-item-principal .check').addClass('activo')
          }
          if ((total_marcados > 0) & (total_marcados < total)) {
            $(this).parent().find('.facet-item-principal .facet-item__count').text('(' + total_marcados + ')')
          }
        })

        //pliega y despliega las colecciones al pulsar sobre el icono.
        $('.colecciones-checkbox-list .facet-item-principal .collapse-button ').click(function (e) {
          $(this).parent().parent().find('.subcolecciones').slideToggle()
          $(this).toggleClass("rotate-icon");
        })


        //pliega y despliega las materias al pulsar sobre el icono.
        $('.materias-checkbox-list .facet-item-principal .collapse-button ').click(function (e) {
          $(this).parent().parent().find('.submaterias').slideToggle();
          $(this).toggleClass("rotate-icon");
        })



        //Pliega y despliega el subnivel de colecciones cuando se pulsa sobre la etiqueta
        $('.colecciones-checkbox-list .facet-item-principal label').click(function (e) {
            $(this).parent().parent().find('.subcolecciones').slideToggle(); //pliega o despliega el primer nivel
            $(this).parent().find('.collapse-button').toggleClass('rotate-icon'); //añade clase para que rote el icono
            $(this).parent().find('.collapse-button svg').toggleClass('facet-item-principal-active'); //añade o limina clase para dar color a icono
            $('#ps-num-page').val(1); //Se establece numero de página a 1 porque es búsqueda nueva
          }
        )

        // Se marcan o desmarcan todas las subcolecciones al hecer click sobre el checkbox del primer nivel de la coleccion
        $('.colecciones-checkbox-list .facet-item-principal .check').click(function (e) {
          $('#ps-num-page').val(1); //Se establece numero de página a 1 porque es búsqueda nueva

          //Si el check de primer nivel de una coleccion esta marcado se marcan todas las subcolecciones.
          let check_seleccionado = $(this).parent().find(".facets-checkbox")

          if (check_seleccionado.prop('checked')) {

            $(this).parent().parent().find('.subcolecciones .facets-checkbox').prop('checked', true)
            $(this).parent().parent().find('.subcolecciones .check').addClass('activo')
            $(this).parent().find('.facet-item__count').css('display', 'none');
            actualizaColecciones();
          }
          //Si el check de primer nivel se desmarca se desmarcan todas las subcolecciones.
          else {

            $(this).parent().parent().find('.subcolecciones .facets-checkbox').prop('checked', false)
            $(this).parent().parent().find('.subcolecciones .check').removeClass('activo')
            $(this).parent().find('.facet-item__count').css('display', 'none');
            actualizaColecciones();
          }
        }
      )

         //se añaden los valores de los check seleccionados del filtro de colecciones al campo coleccion del formulario y se marcan los checkboxes correpondientes
         $('.colecciones-checkbox-list .subcolecciones .facets-checkbox').change(function () {
            $('#ps-num-page').val('1');
            actualizaColecciones();


            let total = $(this).parent().parent().find('input').length;
            let totalMarcados = $(this).parent().parent().find('input[type=checkbox]:checked').length;
            if (totalMarcados == total) {

              $(this).parent().parent().parent().find('.facet-item-principal .facet-item__count').css('display', 'none');
              $(this).parent().parent().parent().find('.facet-item-principal input[type=checkbox]').prop('checked', true);
              $(this).parent().parent().parent().find('.facet-item-principal .check').addClass('activo');

            }
            if ((totalMarcados > 0) & (totalMarcados < total)) {

              $(this).parent().parent().parent().find('.facet-item-principal .facet-item__count').css('display', 'block');
              $(this).parent().parent().parent().find('.facet-item-principal .facet-item__count').text('(' + totalMarcados + ')');
              $(this).parent().parent().parent().find('.facet-item-principal input[type=checkbox]').prop('checked', false);
              $(this).parent().parent().parent().find('.facet-item-principal .check').removeClass('activo');
              ;
            }
            if (totalMarcados == 0) {

              $(this).parent().parent().parent().find('.facet-item-principal .facet-item__count').css('display', 'none');
              $(this).parent().parent().parent().find('.facet-item-principal input[type=checkbox]').prop('checked', false);
              $(this).parent().parent().parent().find('.facet-item-principal .check').removeClass('activo');

            }

          }
        )

         //Función que actualiza las materias marcadas en los campos de materias y materias_id del formulario
         function actualizaColecciones(){

          //Se actualizan los value de los checkbox marcados en el campo materias del formulario
          let seleccionadosColeccion = ''
          $('.colecciones-checkbox-list .subcolecciones input[type=checkbox]:checked').each(function () {
            seleccionadosColeccion = seleccionadosColeccion + '-' + $(this).val();
          })
          $('#ps-coleccion').val(seleccionadosColeccion.replace('-', ''));

          //Se actualizan los id de los checkbox marcados en el campo materias_id del formulario
          let seleccionadosColeccion_id = '';
          $('.colecciones-checkbox-list .subcolecciones input[type=checkbox]:checked').each(function () {
            seleccionadosColeccion_id = seleccionadosColeccion_id + '-' + $(this).attr('id');
          })
          $('#ps-colecciones-id').val(seleccionadosColeccion_id.replace('-', ''));
        }


        //Pliega y despliega el subnivel de materias cuando se pulsa sobre la etiqueta
         $('.materias-checkbox-list .facet-item-principal label').click(function (e) {
          $(this).parent().parent().find('.submaterias').slideToggle();  //pliega o despliga primer nivel
          $(this).parent().find('.collapse-button').toggleClass('rotate-icon'); //añade clase para que rote el icono.
          $(this).parent().find('.collapse-button svg').toggleClass('facet-item-principal-active'); //añade o elimina clase para dar color a icono.
          $('#ps-num-page').val(1); //Se establece numero de página a 1 porque es busqueda nueva.

        }
      )



        //marca y desmarca todas las materias
        $('.materias-checkbox-list .facet-item-principal .check').click(function (e) {
            $('#ps-num-page').val(1); //Se establece numero de página a 1 porque es busqueda nueva.
            //Si el check de primer nivel de una materia esta marcado se marcan todas las submaterias.
            let check_seleccionado = $(this).parent().find('.facets-checkbox')
            if (check_seleccionado.prop('checked')) {
              $(this).parent().parent().find('.submaterias .facets-checkbox').prop('checked', true)
              $(this).parent().parent().find('.submaterias .check').addClass('activo')
              $(this).parent().find('.facet-item__count').css('display', 'none');
              actualizaMaterias(); //se llama a la funcion que añade los id de busqueda de materias de las opciones seleccionadas
            }
            //Si el check de primer nivel se desmarca se desmarcan todas las submaterias
            else {

              $(this).parent().parent().find('.submaterias .facets-checkbox').prop('checked', false)
              $(this).parent().parent().find('.submaterias .check').removeClass('activo')
              $(this).parent().find('.facet-item__count').css('display', 'none');
               actualizaMaterias();
            }

          }
        )

         // Se añaden los valores de los check seleccionados del filtro de materias al campo materia del formulario y se marcan los checkboxes correpondientes
         $('.materias-checkbox-list .submaterias .facets-checkbox').change(function () {
            $('#ps-num-page').val('1'); // Se establece la pagina a 1 porque es nueva búsqueda
            actualizaMaterias(); // Se añaden las materias seleccionadas al campo de busqueda del formulario.

            let total = $(this).parent().parent().find('input').length; // Total de submaterias existentes en esa materia.
            let totalMarcados = $(this).parent().parent().find('input[type=checkbox]:checked').length; // Total de submaterias marcadas en esa materia.
            if (totalMarcados == total) { //si estan todos marcados
              $(this).parent().parent().parent().find('.facet-item-principal .facet-item__count').css('display', 'none'); // Se oculta el contador de esa materia.
              $(this).parent().parent().parent().find('.facet-item-principal input[type=checkbox]').prop('checked', true); // Se marca el check de la materia.
              $(this).parent().parent().parent().find('.facet-item-principal .check').addClass('activo'); // Se marcan todas las submaterias de la materia seleccionada.


            }
            if ((totalMarcados > 0) & (totalMarcados < total)) { //Si hay alguna submateria marcada
              $(this).parent().parent().parent().find('.facet-item-principal .facet-item__count').css('display', 'block'); // Se muestra el contador
              $(this).parent().parent().parent().find('.facet-item-principal .facet-item__count').text('(' + totalMarcados + ')'); // Se añade al contador el total de submaterias marcadas.
              $(this).parent().parent().parent().find('.facet-item-principal input[type=checkbox]').prop('checked', false); // Se desmarca el check de la materia porque no estan marcadas todas sus submaterias.
              $(this).parent().parent().parent().find('.facet-item-principal .check').removeClass('activo'); // Se desmarca la caja que simula el check


            }
            if (totalMarcados == 0) { // Si estan todas las submaterias desmarcadas
              $(this).parent().parent().parent().find('.facet-item-principal .facet-item__count').css('display', 'none'); // Se oculta el contador.
              $(this).parent().parent().parent().find('.facet-item-principal input[type=checkbox]').prop('checked', false); // Se desmarca el check de la materia porque no estan marcadas todas las submaterias (no hay ninguna)
              $(this).parent().parent().parent().find('.facet-item-principal .check').removeClass('activo'); // Se desmarcan las cajas que simulan los check



            }
          }
        )


          //Función que actualiza las materias marcadas en los campos de materias y materias_id del formulario
          function actualizaMaterias(){

            //Se actualizan los value de los checkbox marcados en el campo materias del formulario
            let seleccionadosMateria = ''
            $('.materias-checkbox-list .submaterias input[type=checkbox]:checked').each(function () {
              seleccionadosMateria = seleccionadosMateria + '-' + $(this).val()
            })
            $('#ps-materia').val(seleccionadosMateria.replace('-', ''))

            //Se actualizan los id de los checkbox marcados en el campo materias_id del formulario
            let seleccionadosMateria_id = ''
            $('.materias-checkbox-list .submaterias input[type=checkbox]:checked').each(function () {
              seleccionadosMateria_id = seleccionadosMateria_id + '-' + $(this).attr('id');
            })
            $('#ps-materias-id').val(seleccionadosMateria_id.replace('-', ''))
          }


        //Se muestra el mensaje de no hay resultados si el numero de paginas es igual a 0
        if ($('#ps-total-paginas').val() == 0) {
          $('.ps-listado-archivo-web .no-archivo-web-result').css('display','block');
          $('.ps-listado-archivo-web .pager').css('display', 'none');
        }

        //decrementa el campo pagina y lanza la consulta al  pulsar el botón anterior del paginador
        $('.pager .pager__item--previous ').click(function (e) {
          let pagina_actual = $('#ps-num-page').val();
          if (pagina_actual > 1) {
            $('#ps-num-page').val(pagina_actual - 1);
            changePage();
          }
        })

        //incrementa el campo pagina y lanza la consulta al pulsar el botón siguiente del paginador.
        $('.pager .pager__item--next ').click(function (e) {
          let pagina_actual = parseInt($('#ps-num-page').val());
          let total_paginas = parseInt($('#ps-total-paginas').val());
          if (pagina_actual < total_paginas) {
            $('#ps-num-page').val(pagina_actual + 1);
            changePage();
          }
        })

        //se obtiene la url del row y se redirecciona al enlace.
        $('.ps-listado-archivo-web .view-content .view-row').click(function (e) {
          var hrefActive = $(this).eq(0).find('.url .link').attr('href');
          window.open(hrefActive, '_blank', 'location=yes, scrollbars=yes, status=yes');
          return false
        })

        //Metodo que realiza una nueva búsqueda con los valores seccionados en el formulario.
        $('#form-buscar-archivo-web').submit(function (event) {
          event.preventDefault()


            let texto_buscar = '?buscar=' + $('#ps-search-text-archivo-web').val().split(' ').join('+');
            let materias = '&materia=' + $('#ps-materia').val();
            let materias_id = '&materia-id=' + $('#ps-materias-id').val();
            let colecciones = '&coleccion=' + $('#ps-coleccion').val();
            let colecciones_id = '&coleccion-id=' + $('#ps-colecciones-id').val();
            let total_paginas = '&total=' + $('#ps-total-paginas').val();
            //let pagina_actual = '&page=' + $('#ps-num-page').val();
            let pagina_actual = '&page=1';
            let orden = '&orden=' + $('#ordenarPor').val();

          let buscar_por = '';
          if ($('#ps-archivo-web-todos').is(':checked')) {
            buscar_por = '&todos=on'
          } else {
            if ($('#ps-archivo-web-titulo').is(':checked')) {
              buscar_por = '&titulo=on'
            } else {
              buscar_por = '&palabras-clave=on'
            }
          }


          let texto_valido = $('#ps-search-text-archivo-web').val();

          if (texto_valido == ""){
            let query = window.location.pathname + texto_buscar + buscar_por + materias + colecciones + total_paginas + pagina_actual + materias_id + colecciones_id + orden;
            window.open(query, '_self')
          }
          else{
            if (texto_valido.length < 4 && !/^".*"$/.test(texto_valido)) {

              // Obtener el popup
              var modal = $("#modal-archivo-web");

              // Obtener el elemento <span> que cierra el popup
              var span = $(".close-modal-web");

              modal.css("display", "block");

              span.click(function() {
                modal.css("display", "none");
              });

              // Cuando el usuario haga clic fuera del popup, cerrarlo
              $(window).click(function(event) {
                if (event.target == modal[0]) {
                  modal.css("display", "none");
                }
              });

            }
            else{
              let query = window.location.pathname + texto_buscar + buscar_por + materias + colecciones + total_paginas + pagina_actual + materias_id + colecciones_id + orden;
            window.open(query, '_self')
            }

          }



          // if (texto_valido.length < 4 && !/^".*"$/.test(texto_valido)) {

          //   // Obtener el popup
          //   var modal = $("#modal-archivo-web");

          //   // Obtener el elemento <span> que cierra el popup
          //   var span = $(".close-modal-web");

          //   modal.css("display", "block");

          //   span.click(function() {
          //     modal.css("display", "none");
          //   });

          //   // Cuando el usuario haga clic fuera del popup, cerrarlo
          //   $(window).click(function(event) {
          //     if (event.target == modal[0]) {
          //       modal.css("display", "none");
          //     }
          //   });

          // }
          // else{
          //   let query = window.location.pathname + texto_buscar + buscar_por + materias + colecciones + total_paginas + pagina_actual + materias_id + colecciones_id + orden;
          // window.open(query, '_self')
          // }



          // let query = window.location.pathname + texto_buscar + buscar_por + materias + colecciones + total_paginas + pagina_actual + materias_id + colecciones_id;
          // window.open(query, '_self')
        })

        //Método que muestra la pagina seleccionada en el paginador.
        function changePage() {
          let texto_buscar =
            '?buscar=' +
            $('#ps-search-text-archivo-web').val().split(' ').join('+')
          let materias = '&materia=' + $('#ps-materia').val()
          let materias_id = '&materia-id=' + $('#ps-materias-id').val()
          let colecciones = '&coleccion=' + $('#ps-coleccion').val()
          let colecciones_id = '&coleccion-id=' + $('#ps-colecciones-id').val()
          let total_paginas = '&total=' + $('#ps-total-paginas').val()
          let pagina_actual = '&page=' + $('#ps-num-page').val()
          let orden = '&orden=' + $('#ordenarPor').val();

          let buscar_por = ''
          if ($('#ps-archivo-web-todos').is(':checked')) {
            buscar_por = '&todos=on'
          } else {
            if ($('#ps-archivo-web-titulo').is(':checked')) {
              buscar_por = '&titulo=on'
            } else {
              buscar_por = '&palabras-clave=on'
            }
          }
          let query = window.location.pathname + texto_buscar + buscar_por + materias + colecciones + total_paginas + pagina_actual + materias_id + colecciones_id + orden;
          window.open(query, '_self')
        }

        // A peticion de bne se oculta el icono de desplegar y las submaterias de la materia llamada Riesgo.
        if ($('#mat-riesgo').length){
          $('#mat-riesgo').parent().find('.collapse-button').css('display', 'none');
          $('#mat-riesgo').parent().parent().find('.subcolecciones').css('height', '0');
          $('#mat-riesgo').parent().parent().find('.subcolecciones').css('visibility', 'hidden');
          $('#mat-riesgo').parent().parent().find('.subcolecciones li').css('display', 'none');
        }

        //Se muestra el enlace quitar filtros si hay filtros seleccionados.
        if ($('.facets-widget-checkbox .facet-item .facets-checkbox:checked').length > 0) {
          $('.quitar-filtros').css("display", "block")
        }

        //funcion que lanza la consulta cuando se cambia el criterio de ordenación
        $('#ordenarPor').on('change', function() {
          changePage();
        });


       if ($('.ps-listado-archivo-web').length){

        $('select').select2();

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
  }







  /* funcion que marca los checkbox del listado de materias cuyo valor coincida con el valor suministrado */
  function seleccionaCheckboxMateria (value) {
    $('.materias-checkbox-list .facets-checkbox').each(function (index) {
      if ($(this).attr('id') == value) {
        $(this).prop('checked', true)
        $(this).parent().find(".check").addClass("activo"); //se marca la caja que simula el checkbox
      }
    })
  }

  /* funcion que marca los checkbox del listado de colecciones cuyo valor coincida con el valor suministrado */
  function seleccionaCheckboxColeccion (value) {
    $('.colecciones-checkbox-list .facets-checkbox').each(function (index) {
      if ($(this).attr('id') == value) {
        $(this).prop('checked', true)
        $(this).parent().find(".check").addClass("activo"); //se marca la caja que simula el checkbox
      }
    })
  }
})

/* funcion que obtiene el valor de un parametro de la url */
function getParametro (sParametroNombre) {
  var sPaginaURL = window.location.search.substring(1)
  var sURLVariables = sPaginaURL.split('&')
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParametro = sURLVariables[i].split('=')
    if (sParametro[0] == sParametroNombre) {
      return sParametro[1]
    }
  }
  return ''
}
