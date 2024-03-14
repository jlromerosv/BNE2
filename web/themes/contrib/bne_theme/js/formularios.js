jQuery(document).ready(function ($) {
  var observer = new MutationObserver(function (mutations) {
    if ($(".view-envio-postal").length) {
      if ($(".view-envio-postal select").length) {
        $("select").select2();

        $(".webform-button--submit.button.button--primary.js-form-submit.form-submit").click(function () {
          $("input#edit-destinatario-").val(
            $("textarea#edit-direcciones-de-e-mail-de-los-destinatarios").val()
          );
        });
        $("input#edit-actions-preview-next").click(function () {
          $("input#edit-destinatario-").val(
            $("textarea#edit-direcciones-de-e-mail-de-los-destinatarios").val()
          );
        });

        observer.disconnect();
      }

      if ($(".webform-preview").length) {

        $(".view-envio-postal .view-footer .condiciones-uso").css(
          "display",
          "none"
        );
        $(".ps-postal-ficha .view-footer").css("display", "none");
        $(".ps-postal-ficha").addClass("postal-preview");
        let titulo_obra = $('.ps-postal-ficha .view-content .views-row  h2 a .field--name-title').text();
        let titulo_bne = $('.ps-postal-ficha .view-header .titulo-obra').text();
        console.log("titulo bne " + titulo_bne)
        console.log("titulo obra " + titulo_obra)
        $('.ps-postal-ficha .view-content .views-row article h2 a .field--name-title').text(titulo_bne)
        $('.ps-postal-ficha .view-header .titulo-obra').text(titulo_obra);
        observer.disconnect();
      }

      if ($(".webform-confirmation").length) {
        $(".ps-postal-ficha").addClass("ps-postal-confirmation");
        $(".view-envio-postal .view-footer .condiciones-uso").css(
          "display",
          "none"
        );
        if ($(".ps-postal-ficha").length) {
          $(".ps-postal-ficha").appendTo(
            ".view-envio-postal .webform-confirmation .imagen-postal"
          );

          let destinatarios = $(".destinatarios-email").text();
          let items = destinatarios.split(",");
          $(".destinatarios-email").text("");
          $.each(items, function (ind, elem) {
            let email =
              '<div class="email"><svg xmlns="http://www.w3.org/2000/svg" width="6.59" height="7.249" viewBox="0 0 6.59 7.249"><path id="Right_Arrow_3_" d="M2.966,7.249a.329.329,0,0,1-.233-.562L5.795,3.624,2.733.562A.329.329,0,0,1,3.2.1l3.3,3.295a.329.329,0,0,1,0,.466L3.2,7.152A.329.329,0,0,1,2.966,7.249Zm-2.4-.1,3.3-3.295a.329.329,0,0,0,0-.466L.562.1A.329.329,0,0,0,.1.562L3.159,3.624.1,6.686a.329.329,0,1,0,.466.466Z" transform="translate(6.59 7.249) rotate(180)" fill="#606060"/></svg><a href="mailto:' +
              elem.trim() +
              '">' +
              elem.trim() +
              "</a></div>";
            $(".destinatarios-email").append(email);
          });
          observer.disconnect();
        }
      }
    }
  });
  observer.observe(document, {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true
  });
});
