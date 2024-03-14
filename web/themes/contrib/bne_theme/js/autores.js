jQuery(document).ready(function ($) {



  $(this).scrollTop(0); // mueve el scroll al inicio de la página
  $('body').css('overflow-x', 'hidden'); // oculta el scroll horizontal


  //Se ubica el footer de la vista junto al resto de elementos en el bloque de autores de la home del portal de escritores.
  if ($(".ps-autores-home-block").length > 0) {
    $(".ps-autores-home-block .view-footer").appendTo(
      $(".ps-autores-home-block > .view-content")
    );
  }

  if ($(".ps-categorias-autores").length) {
    $(".ps-categorias-autores .views-row").click(function (e) {
      var hrefActive = $(this).eq(0).find(".enlace a").attr("href");
      window.open(hrefActive, "_self");
      return false;
    });
  }

// Elimina cursor pointer a los autores que no tienen descripcion
// $(".ps-listado-autores .views-row").each(function( index ) {
//   if($(this).find(".descripcion p").length < 1){
//     $(this).css('cursor', 'default');

//   }

// });

  // Obtiene la url existente dentro del elemento del listado de autores y lo ejecuta.
  if ($(".ps-listado-autores").length) {
    $(".ps-listado-autores .views-row").click(function (e) {
        var hrefActive = $(this).eq(0).find(".views-field-title a").attr("href");
        window.open(hrefActive, "_self");
        return false;
    });
  }
  $(document).ajaxComplete(function () {
    if ($(".ps-listado-autores").length) {
      $(".ps-listado-autores .views-row").click(function (e) {
          var hrefActive = $(this).eq(0).find(".views-field-title a").attr("href");
          window.open(hrefActive, "_self");
          return false;
      });
    }
  });

  // if ($(".ps-listado-autores").length) {
  //   if ($("#genero-autor-reset-all").prop('checked')){
  //     if (verificarSeleccionados()) {
  //       Todos los elementos de entrada (input) están seleccionados
  //       console.log("estan todos marcados")
  //       $('.block-facet-blockcategoria-autor ul li input').each(function (index, element) {
  //         $(this).prop('checked', false );
  //       });
  //     }
  //     else{
  //       console.log("no estan todos marcados")
  //       $("#genero-autor-reset-all").prop('checked', false)
  //     }
  //   }

  //   $(document).ajaxComplete(function () {
  //     if ($("#genero-autor-reset-all").prop('checked')){
  //       if (verificarSeleccionados()) {
  //         Todos los elementos de entrada (input) están seleccionados
  //         $('.block-facet-blockcategoria-autor ul li input').each(function (index, element) {
  //           $(this).prop('checked', false );
  //         });
  //       }
  //       else{
  //         console.log("no estan todos marcados")
  //         $("#genero-autor-reset-all").prop('checked', false)
  //       }
  //     }
  //   });

  // }

  // function verificarSeleccionados() {
  //   var todosSeleccionados = true;
  //   $('.block-facet-blockcategoria-autor input[type="checkbox"]').each(function() {
  //     if (!$(this).is(':checked')) {
  //       todosSeleccionados = false;
  //       return false;
  //     }
  //   });
  //   return todosSeleccionados;
  // }












  //funcionalidad mostrar texto completo ficha autor
  // if ($(".page-node-type-autor").length > 0) {
  //   if ($(".ps-collapse-descripcion-autor").length) {
  //     $(".ps-collapse-descripcion-autor .ps-show-description").click(function (
  //       e
  //     ) {
  //       e.preventDefault();

  //       $(".views-field-body .descripcion-autor").slideDown();
  //       $(".ps-hide-description").css("display", "flex");
  //       $(".ps-show-description").css("display", "none");
  //     });
  //     $(".ps-collapse-descripcion-autor .ps-hide-description").click(function (
  //       e
  //     ) {
  //       e.preventDefault();

  //       $(" .views-field-body .descripcion-autor").slideUp();
  //       $(".ps-hide-description").css("display", "none");
  //       $(".ps-show-description").css("display", "flex");

  //       var scrolcontainer = $("#container-autor-description").scrollTop();
  //       $("html, body").animate(
  //         {
  //           scrollTop: scrolcontainer
  //         },
  //         500
  //       );
  //     });
  //   }

  //   //Se pliega y despliega la cronología en móvil.
  //   if ($(".view-hitos").length) {
  //     $(".view-hitos .view-footer").append(
  //       '<svg height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m6.293 11.707-4-4a1 1 0 0 1 0-1.416l4-4a1 1 0 0 1 1.414 1.416l-2.293 2.293h11.586a1 1 0 0 1 0 2h-11.586l2.293 2.293a1 1 0 1 1 -1.414 1.414zm15.63 4.911a1 1 0 0 0 -.217-.326l-4-4a1 1 0 0 0 -1.414 1.414l2.294 2.294h-11.586a1 1 0 0 0 0 2h11.586l-2.293 2.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 .217-1.09z" fill="rgb(0,0,0)"/></svg>'
  //     );
  //   }

  //   //se ocultan los campos no rellenos de la caja de la ficha de autor.
  //   if ($(".ps-contenido-autores").length) {
  //     $(
  //       ".ps-contenido-autores .view-content .views-row .views-field .field-content"
  //     ).each(function (index) {
  //       if ($(this).text().trim().length < 1) {
  //         $(this).parent().css("display", "none");
  //       }
  //     });
  //   }
  // }



//funcionalidad mostrar texto completo ficha autor
if ($(".page-node-type-autor").length > 0) {

if ($(".block-field-blocknodeautorfield-requisitos").length < 1){

  $(".views-field-body-1").css('display', 'block');

}

  if ($(".ps-collapse-descripcion-autor").length) {
    $(".ps-collapse-descripcion-autor .ps-show-description").click(function (e) {
      e.preventDefault();

      $(".views-field-body-1").slideDown();
      $(".ps-hide-description").css("display", "flex");
      $(".ps-show-description").css("display", "none");
    });
    $(".ps-collapse-descripcion-autor .ps-hide-description").click(function (e) {
      e.preventDefault();

      $(" .views-field-body-1").slideUp();
      $(".ps-hide-description").css("display", "none");
      $(".ps-show-description").css("display", "flex");

      var scrolcontainer = $("#container-autor-description").scrollTop();
      $("html, body").animate(
        {
          scrollTop: scrolcontainer
        },
        500
      );
    });
  }

  //Se pliega y despliega la cronología en móvil.
  if ($(".view-hitos").length) {
    $(".view-hitos .view-footer").append(
      '<svg height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m6.293 11.707-4-4a1 1 0 0 1 0-1.416l4-4a1 1 0 0 1 1.414 1.416l-2.293 2.293h11.586a1 1 0 0 1 0 2h-11.586l2.293 2.293a1 1 0 1 1 -1.414 1.414zm15.63 4.911a1 1 0 0 0 -.217-.326l-4-4a1 1 0 0 0 -1.414 1.414l2.294 2.294h-11.586a1 1 0 0 0 0 2h11.586l-2.293 2.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 .217-1.09z" fill="rgb(0,0,0)"/></svg>'
    );
  }

  //se ocultan los campos no rellenos de la caja de la ficha de autor.
  if ($(".ps-contenido-autores").length) {
    $(
      ".ps-contenido-autores .view-content .views-row .views-field .field-content"
    ).each(function (index) {
      if ($(this).text().trim().length < 1) {
        $(this).parent().css("display", "none");
      }
    });
  }
}






  //Muestra u oculta el texto del footer de la cronología dependiendo si hay scroll horizontal o no.
  if ($(".page-node-type-autor").length > 0) {
    if ($(".ps-timeline").length > 0) {
      compruebaScroll();
    }
  }
  $(window).resize(function () {
    if ($(".page-node-type-autor").length > 0) {
      if ($(".ps-timeline").length > 0) {
        compruebaScroll();
      }
    }
  });

  //Metono que conprueba si hay scroll horizontal en la cronologia.
  function compruebaScroll() {
    let width_container_odd = $(".odd").width();
    let width_container_even = $(".even").width();
    let width_odd_elements = 0;
    let width_even_elements = 0;

    $(".ps-timeline .odd .views-row").each(function (index) {
      width_odd_elements = width_odd_elements + $(this).width() + 32;
    });

    $(".ps-timeline .even .views-row").each(function (index) {
      width_even_elements = width_even_elements + $(this).width() + 32;
    });

    if (width_odd_elements > width_container_odd) {
      $(".ps-hitos-timeline .view-footer").css("display", "flex");
    } else {
      if (width_even_elements > width_container_even) {
        $(".ps-hitos-timeline .view-footer").css("display", "flex");
      } else {
        $(".ps-hitos-timeline .view-footer").css("display", "none");
      }
    }
  }


  //se oculta o muestra el enlace de limpiar filtros en el listado de autores.
  if ($('.ps-node-26819').length){
    $(document).ajaxComplete(function() {
      if ($('.facets-widget-checkbox .facet-item .facets-checkbox:checked').length > 0) {
        $('.ps-autores-limpiar-filtros').css("display", "block")
      } else {
        $('.ps-autores-limpiar-filtros').css("display", "none")
      }
    });
  }






});
