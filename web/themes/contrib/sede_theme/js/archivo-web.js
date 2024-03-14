jQuery(document).ready(function($) {
  if ($(".ps-node-26939").length) {
    //Se espera a que esten cargados los filtros y el formulario.
    var observer = new MutationObserver(function(mutations) {
      // Una vez estan cargados los filtros y el formulario se obtienen los valores de los parametros de la url
      if (
        $(".ps-listado-archivo-web").length &&
        $("#bloque-filtros-archivos-web").length
      ) {
        let titulo = getParametro("titulo");
        let palabras_clave = getParametro("palabras-clave");
        let texto = decodeURI(getParametro("buscar"));
        let coleccion = decodeURI(getParametro("coleccion"));
        let materia = decodeURI(getParametro("materia"));
        let pagina = decodeURI(getParametro("page"));
        let total = decodeURI(getParametro("total"));

        if ( titulo.length > 0 | palabras_clave.length > 0 | texto.length > 0 | pagina.length > 0 | materia != "" | coleccion != "") {
          //Si existe el parametro page en la url
          if (pagina.length) {
            $("#ps-num-page").val(pagina); //se establece el valor del parametro page al campo pagina actual del formulario.
            //Si el valor del parametro es mayor que uno se habilita el botón anterior del paginador porque existen páginas anteriores.
            if (pagina > 1) {
              $(".pager .pager__item--previous").removeClass("inactive");
            }
            // Si el valor del parametro page de la url es igual al valor del parametro de la
            //  url total se inhabilita el botón siguiente del paginador porque estamos en
            //  la última página.
            if (pagina == $('#ps-total-paginas').val()) {
              $(".pager .pager__item--next").addClass("inactive");
            }
          }
          //Si existe el parametro titulo en la url se marca el checkbox del formulario y se desmarcan el resto.
          if (titulo.length > 0) {
            $(".details-wrapper input").prop("checked", false);
            $("#ps-archivo-web-titulo").prop("checked", true);
          }
          //Si existe el parametro palabras-clave en la url se marca el checkbox del formulario y se desmarcan el resto.
          if (palabras_clave.length > 0) {
            $(".details-wrapper input").prop("checked", false);
            $("#ps-archivo-web-palabras-clave").prop("checked", true);
          }
          //Si existe texto en el parametro buscar de la url se sustituye el campo tipo texto del buscador por dicho texto.
          if (texto.length > 0) {
            $("#ps-search-text-archivo-web").val(texto.replace(/\+/g, " "));
          }

          //Se hace visible el botón restablecer porque existen parametros de busqueda marcados en el formulario.
          $("#ps-archivo-web-reload").css("display", "block");

          //Se oculta el boton de restablecer filtros porque no existen filtros de busqueda.
          if (window.location.search.length < 1) {
            $("#ps-archivo-web-reload").css("display", "none");
          }

          if ( titulo.length < 1 && palabras_clave.length < 1 && texto.length < 1 && materia.length < 1 && coleccion.length < 1) {
            $("#ps-archivo-web-reload").css("display", "none");
          }
          //boton restablecer filtros
          $("#ps-archivo-web-reload").click(function(e) {
            e.preventDefault();
            let url =
              window.location.protocol +
              "//" +
              window.location.hostname +
              window.location.pathname;
            window.open(url, "_self");
          });
        }

        //Intercambiador de checkbox seleccionado en tipo de busqueda.
        $(".details-wrapper input").click(function(e) {
          $(".details-wrapper input").prop("checked", false);
          $(this).prop("checked", true);
        });

        //Se obtienen los parametros de coleccion y materia de la URL y se seleccionan los option de los select.
        let valor_coleccion = getParametro("coleccion");
        if (valor_coleccion.length > 0) {
          // Se establece el valor del parametro de la url coleccion al campo coleccion del formulario.
          $("#ps-coleccion").val(valor_coleccion);

          // Se marcan los checkbox del filtro de colecciones con las opciones que coinciden con los valores del parametro de url coleccion.
          let valores_coleccion = valor_coleccion.split("-");
          for (var i = 0; i < valores_coleccion.length; i++) {
            seleccionaCheckboxColeccion(valores_coleccion[i]);
          }
        }
        let valor_materia = getParametro("materia");
        if (valor_materia.length > 0) {
          // Se establece el valor del parametro de la url materia al campo materia del formulario.
          $("#ps-materia").val(valor_materia);
          // Se marcan los checkbox del filtro de materias con las opciones que coinciden con los valores del parametro de url materia.
          let valores_materia = valor_materia.split("-");
          for (var i = 0; i < valores_materia.length; i++) {
            seleccionaCheckboxMateria(valores_materia[i]);
          }
        }

        // se marca el check de la coleccion si todos las subcolecciones estan marcadas.
        $(".colecciones-checkbox-list .subcolecciones").each(function(index) {
          let total_marcados = $(this).find("input[type=checkbox]:checked")
            .length;
          let total = $(this).find("input[type=checkbox]").length;
          if (total_marcados == total) {
            $(this)
              .parent()
              .find(".facet-item-principal input")
              .prop("checked", true);
          }
          if ((total_marcados > 0) & (total_marcados < total)) {
            $(this)
              .parent()
              .find(".facet-item-principal .facet-item__count")
              .text("(" + total_marcados + ")");
          }
        });

        // se marca el check de la materia si todas las submaterias estan marcadas.
        $(".materias-checkbox-list .submaterias").each(function(index) {
          let total_marcados = $(this).find("input[type=checkbox]:checked")
            .length;
          let total = $(this).find("input[type=checkbox]").length;
          if (total_marcados == total) {
            $(this)
              .parent()
              .find(".facet-item-principal input")
              .prop("checked", true);
          }
          if ((total_marcados > 0) & (total_marcados < total)) {
            $(this)
              .parent()
              .find(".facet-item-principal .facet-item__count")
              .text("(" + total_marcados + ")");
          }
        });

        //pliega y despliega los subniveles de los checkbox.
        $(
          ".colecciones-checkbox-list .facet-item-principal .collapse-button "
        ).click(function(e) {
          $(this).parent().parent().find(".subcolecciones").slideToggle();
        });

        //pliega y despliega los subniveles de los checkbox.
        $(
          ".materias-checkbox-list .facet-item-principal .collapse-button "
        ).click(function(e) {
          $(this).parent().parent().find(".submaterias").slideToggle();
        });

        //marca y desmarca todas las subcolecciones
        $(
          ".colecciones-checkbox-list .facet-item-principal label"
        ).click(function(e) {
          $("#ps-num-page").val(1);
          let check_seleccionado = $(this).parent().find(".facets-checkbox");
          if (check_seleccionado.prop("checked")) {
            let subcoleciones = $(this)
              .parent()
              .parent()
              .find(".subcolecciones .facets-checkbox");
            $(subcoleciones).each(function(index) {
              $(this).prop("checked", false);
            });

            //Se actualizan los checkbox marcados en el campo de identificadores del formulario.
            let seleccionados = "";
            $(
              ".colecciones-checkbox-list .subcolecciones input[type=checkbox]:checked"
            ).each(function() {
              seleccionados = seleccionados + "-" + $(this).val();
            });
            $("#ps-coleccion").val(seleccionados.replace("-", ""));
          } else {
            let subcoleciones = $(this)
              .parent()
              .parent()
              .find(".subcolecciones .facets-checkbox");
            $(this)
              .parent()
              .parent()
              .find(".facet-item-principal .facet-item__count")
              .css("display", "none");
            $(subcoleciones).each(function(index) {
              $(this).prop("checked", true);
            });

            let seleccionados = "";
            $(
              ".colecciones-checkbox-list .subcolecciones input[type=checkbox]:checked"
            ).each(function() {
              seleccionados = seleccionados + "-" + $(this).val();
            });
            $("#ps-coleccion").val(seleccionados.replace("-", ""));
          }
        });

        //marca y desmarca todas las materias
        $(".materias-checkbox-list .facet-item-principal label").click(function(
          e
        ) {
          $("#ps-num-page").val(1);
          let check_seleccionado = $(this).parent().find(".facets-checkbox");
          if (check_seleccionado.prop("checked")) {
            let submaterias = $(this)
              .parent()
              .parent()
              .find(".submaterias .facets-checkbox");
            $(submaterias).each(function(index) {
              $(this).prop("checked", false);
            });

            //Se actualizan los checkbox marcados en el campo de identificadores del formulario.
            let seleccionados = "";
            $(
              ".materias-checkbox-list .submaterias input[type=checkbox]:checked"
            ).each(function() {
              seleccionados = seleccionados + "-" + $(this).val();
            });
            $("#ps-materia").val(seleccionados.replace("-", ""));
          } else {
            let submaterias = $(this)
              .parent()
              .parent()
              .find(".submaterias .facets-checkbox");
            $(this)
              .parent()
              .parent()
              .find(".facet-item-principal .facet-item__count")
              .css("display", "none");
            $(submaterias).each(function(index) {
              $(this).prop("checked", true);
            });
            let seleccionadosMateria = "";
            $(
              ".materias-checkbox-list .submaterias input[type=checkbox]:checked"
            ).each(function() {
              seleccionadosMateria = seleccionadosMateria + "-" + $(this).val();
            });
            $("#ps-materia").val(seleccionadosMateria.replace("-", ""));
          }
        });

        //se añaden los valores de los check seleccionados del filtro de colecciones al campo coleccion del formulario y se marcan los checkboxes correpondientes
        $(
          ".colecciones-checkbox-list .subcolecciones .facets-checkbox"
        ).change(function() {
          $("#ps-num-page").val("1");
          let seleccionados = "";
          $(
            ".colecciones-checkbox-list .subcolecciones input[type=checkbox]:checked"
          ).each(function() {
            seleccionados = seleccionados + "-" + $(this).val();
          });
          $("#ps-coleccion").val(seleccionados.replace("-", ""));

          let total = $(this).parent().parent().find("input").length;
          let totalMarcados = $(this)
            .parent()
            .parent()
            .find("input[type=checkbox]:checked").length;
          if (totalMarcados == total) {
            console.log("todos marcados");
            $(this)
              .parent()
              .parent()
              .parent()
              .find(".facet-item-principal .facet-item__count")
              .css("display", "none");
            $(this)
              .parent()
              .parent()
              .parent()
              .find(".facet-item-principal input[type=checkbox]")
              .prop("checked", true);
          }
          if ((totalMarcados > 0) & (totalMarcados < total)) {
            console.log("todos no estan  marcados");
            $(this)
              .parent()
              .parent()
              .parent()
              .find(".facet-item-principal .facet-item__count")
              .css("display", "block");
            $(this)
              .parent()
              .parent()
              .parent()
              .find(".facet-item-principal .facet-item__count")
              .text("(" + totalMarcados + ")");
            $(this)
              .parent()
              .parent()
              .parent()
              .find(".facet-item-principal input[type=checkbox]")
              .prop("checked", false);
          }
          if (totalMarcados == 0) {
            $(this)
              .parent()
              .parent()
              .parent()
              .find(".facet-item-principal .facet-item__count")
              .css("display", "none");
          }
        });

        //se añaden los valores de los check seleccionados del filtro de materias al campo materia del formulario y se marcan los checkboxes correpondientes
        $(
          ".materias-checkbox-list .submaterias .facets-checkbox"
        ).change(function() {
          $("#ps-num-page").val("1");
          let seleccionados = "";
          $(
            ".materias-checkbox-list .submaterias input[type=checkbox]:checked"
          ).each(function() {
            seleccionados = seleccionados + "-" + $(this).val();
          });
          $("#ps-materia").val(seleccionados.replace("-", ""));

          let total = $(this).parent().parent().find("input").length;
          let totalMarcados = $(this).parent().parent().find("input[type=checkbox]:checked").length;
          if (totalMarcados == total) {
            $(this).parent().parent().parent().find(".facet-item-principal .facet-item__count").css("display", "none");
            $(this).parent().parent().parent().find(".facet-item-principal input[type=checkbox]").prop("checked", true);
          }
          if ((totalMarcados > 0) & (totalMarcados < total)) {
            $(this).parent().parent().parent().find(".facet-item-principal .facet-item__count").css("display", "block");
            $(this).parent().parent().parent().find(".facet-item-principal .facet-item__count").text("(" + totalMarcados + ")");
            $(this).parent().parent().parent().find(".facet-item-principal input[type=checkbox]").prop("checked", false);
          }
          if (totalMarcados == 0) {
            $(this).parent().parent().parent().find(".facet-item-principal .facet-item__count").css("display", "none");
          }
        });

        // Se establece la pagina a mostrar a 1 si el texto del cuadro de búsqueda cambia.
        // let texto_inicial = $("#ps-search-text-archivo-web").val();
        // let pagina_actual = $("#ps-num-page").val();
        // $("#ps-search-text-archivo-web").on("input", function(e) {
        //   let texto_actual = $("#ps-search-text-archivo-web").val();

        //   if (texto_inicial != texto_actual) {
        //     $("#ps-num-page").val("1");
        //   } else {
        //     $("#ps-num-page").val(pagina_actual);
        //   }
        // });

        //Se muestra el mensaje de no hay resultados si el nuemero de paginas es igual a 0
        if ($("#ps-total-paginas").val() == 0) {
          $(".ps-listado-archivo-web .no-archivo-web-result").css(
            "display",
            "block"
          );
          $(".ps-listado-archivo-web .pager").css("display", "none");
        }

        //decrementa el campo pagina y lanza la consulta al  pulsar el botón anterior del paginador
        $(".pager .pager__item--previous ").click(function(e) {
          let pagina_actual = $("#ps-num-page").val();
          if (pagina_actual > 1) {
            $("#ps-num-page").val(pagina_actual - 1);
            //$("#ps-archivo-web-buscar").trigger("click");
            changePage();
          }
        });

        //incrementa el campo pagina y lanza la consulta al pulsar el botón siguiente del paginador.
        $(".pager .pager__item--next ").click(function(e) {
          let pagina_actual = parseInt($("#ps-num-page").val());
          let total_paginas = parseInt($("#ps-total-paginas").val());
          if (pagina_actual < total_paginas) {
            $("#ps-num-page").val(pagina_actual + 1);
            //$("#ps-archivo-web-buscar").trigger("click");
            changePage();
          }
        });

        //se obtiene la url del row y se redirecciona al enlace.
        $(".ps-listado-archivo-web .view-content .view-row").click(function(e) {
          var hrefActive = $(this).eq(0).find(".url .link").attr("href");
          window.open(hrefActive, "_blank");
          return false;
        });

        //Metodo que realiza una nueva búsqueda con los valores seccionados en el formulario.
        $( "#form-buscar-archivo-web" ).submit(function( event ) {
          event.preventDefault();

          let texto_buscar = "?buscar=" +  $('#ps-search-text-archivo-web').val().split(' ').join('+');
          let materias = "&materia=" + $('#ps-materia').val();
          let colecciones = "&coleccion=" + $('#ps-coleccion').val();
          let total_paginas = "&total=" + $('#ps-total-paginas').val();
          let pagina_actual = "&page=" + 1;

          let buscar_por = "";
          if ($('#ps-archivo-web-todos').is(":checked")){
            buscar_por = "&todos=on";
          }
          else {
            if ($('#ps-archivo-web-titulo').is(":checked")){
              buscar_por = "&titulo=on";
            }
            else{
              buscar_por = "&palabras-clave=on";
            }
          }
          let query = window.location.pathname + texto_buscar + buscar_por + materias + colecciones + total_paginas + pagina_actual;
          window.open(query, "_self");

        });

        //Método que muestra la pagina seleccionada en el paginador.
        function changePage(){
          let texto_buscar = "?buscar=" +  $('#ps-search-text-archivo-web').val().split(' ').join('+');
          let materias = "&materia=" + $('#ps-materia').val();
          let colecciones = "&coleccion=" + $('#ps-coleccion').val();
          let total_paginas = "&total=" + $('#ps-total-paginas').val();
          let pagina_actual = "&page=" + $('#ps-num-page').val();

          let buscar_por = "";
          if ($('#ps-archivo-web-todos').is(":checked")){
            buscar_por = "&todos=on";
          }
          else {
            if ($('#ps-archivo-web-titulo').is(":checked")){
              buscar_por = "&titulo=on";
            }
            else{
              buscar_por = "&palabras-clave=on";
            }
          }
          let query = window.location.pathname + texto_buscar + buscar_por + materias + colecciones + total_paginas + pagina_actual;
          window.open(query, "_self");

        }

        observer.disconnect();
      }
    });

    observer.observe(document, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });
  }



  /* funcion que marca los checkbox del listado de materias cuyo valor coincida con el valor suministrado */
  function seleccionaCheckboxMateria(value) {
    $(".materias-checkbox-list .facets-checkbox").each(function(index) {
      if ($(this).val() == value) {
        $(this).prop("checked", true);
      }
    });
  }

  /* funcion que marca los checkbox del listado de colecciones cuyo valor coincida con el valor suministrado */
  function seleccionaCheckboxColeccion(value) {
    $(".colecciones-checkbox-list .facets-checkbox").each(function(index) {
      if ($(this).val() == value) {
        $(this).prop("checked", true);
      }
    });
  }
});

/* funcion que obtiene el valor de un parametro de la url */
function getParametro(sParametroNombre) {
  var sPaginaURL = window.location.search.substring(1);
  var sURLVariables = sPaginaURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParametro = sURLVariables[i].split("=");
    if (sParametro[0] == sParametroNombre) {
      return sParametro[1];
    }
  }
  return "";
}
