jQuery(document).ready(function ($) {
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
        var hrefActive = $(this)
          .eq(0)
          .find(".views-field-title a")
          .attr("href");
        window.open(hrefActive, "_self");
        return false;
      });
    }
  });

  //funcionalidad mostrar texto completo ficha coleccion
  if ($(".page-node-type-autor").length > 0) {
    if ($(".ps-collapse-descripcion-autor").length) {
      $(".ps-collapse-descripcion-autor .ps-show-description").click(function (
        e
      ) {
        e.preventDefault();

        $(".views-field-body .descripcion-autor").slideDown();
        $(".ps-hide-description").css("display", "flex");
        $(".ps-show-description").css("display", "none");
      });
      $(".ps-collapse-descripcion-autor .ps-hide-description").click(function (
        e
      ) {
        e.preventDefault();

        $(" .views-field-body .descripcion-autor").slideUp();
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
    // if ($('.ps-hitos-timeline').length) {
    //     $('.ps-hitos-timeline .view-header .header-movil h2').append('<div><svg class="mas" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><defs></defs><g transform="translate(0 0)"><path class="a" d="M9.608,4.61H5.39V.39a.391.391,0,1,0-.781,0V4.61H.39a.391.391,0,0,0,0,.781H4.61V9.609a.391.391,0,1,0,.781,0V5.39H9.609a.391.391,0,1,0,0-.781Z" transform="translate(0 0)"/></g></svg><svg class="menos" xmlns="http://www.w3.org/2000/svg" width="29.309" height="2.353" viewBox="0 0 29.309 2.353"><g transform="translate(-0.042)"><path  d="M28.175,187.733H1.218a1.176,1.176,0,1,0,0,2.353H28.175a1.176,1.176,0,1,0,0-2.353Z" transform="translate(0 -187.733)"/></g></svg></div>')
    //     $('.ps-hitos-timeline .view-header .header-movil').click(function (e) {
    //             $('.ps-hitos-timeline .view-content .ps-timeline-container').slideToggle();
    //             $('.ps-hitos-timeline .view-content .ps-timeline-container').toggleClass('esta-visible');

    //             if ($('.ps-hitos-timeline .view-content .ps-timeline-container').hasClass('esta-visible')) {
    //                 console.log("esta visible")
    //                 $('.view-hitos .view-header .mas').css('display', "none");
    //                 $('.view-hitos .view-header .menos').css('display', "block");

    //             } else {
    //                 console.log("no esta visible")

    //                 $('.view-hitos .view-header .header-movil .mas').css('display', "block");
    //                 $('.view-hitos .view-header .header-movil .menos').css('display', "none");
    //             }

    //     });
    // }

    //Se pliega y despliega la cronología en móvil.
    if ($(".view-hitos").length) {
      $(".view-hitos .view-footer").append(
        '<svg height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m6.293 11.707-4-4a1 1 0 0 1 0-1.416l4-4a1 1 0 0 1 1.414 1.416l-2.293 2.293h11.586a1 1 0 0 1 0 2h-11.586l2.293 2.293a1 1 0 1 1 -1.414 1.414zm15.63 4.911a1 1 0 0 0 -.217-.326l-4-4a1 1 0 0 0 -1.414 1.414l2.294 2.294h-11.586a1 1 0 0 0 0 2h11.586l-2.293 2.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 .217-1.09z" fill="rgb(0,0,0)"/></svg>'
      );
    }
  }
});
