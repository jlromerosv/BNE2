jQuery(document).ready(function ($) {


    var observer = new MutationObserver(function(mutations) {
        if ($('.view-envio-postal select').length) {

            $("select").select2();
            observer.disconnect();
        }
    });
    observer.observe(document, {
        attributes: false,
        childList: true,
        characterData: false,
        subtree: true,
      });

});