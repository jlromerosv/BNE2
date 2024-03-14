jQuery(document).ready(function ($) {
  console.log("load footer.js");





  var observer = new MutationObserver(function (mutations) {
    var errorDiv = $(".messages--error");

    // Verificar si el div con clase messages--error existe y tiene el texto específico
    if (errorDiv.length > 0 && errorDiv.text().indexOf("search_api_fulltext no puede tener más de") !== -1 ) {
      console.log("contiene la cadena");

      errorDiv.find('h2').remove();
      // Reemplazar la parte de "search_api_fulltext" por "La búsqueda"
      var newText = errorDiv
        .text()
        .replace(/search_api_fulltext/g, "La búsqueda");
      errorDiv.text(newText);
      observer.disconnect();
    }
  });

  observer.observe(document, {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true
});



});
