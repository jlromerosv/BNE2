jQuery(document).ready(function ($) {
    console.log('RRSS script loaded');

    // RRSS - Bloque compartir en mis redes sociales
    $(".ps-rrss-share").find(".view-content").hide()
    $(".ps-rrss-share").click(function(event) {
      $(this).find(".view-content .views-row").closest('.view-content').slideToggle('slow');
	  });

    // Reescritura - Compartir por email
    $(".ps-rrss-share-mailto").find('a').attr('href', '')
    $(".ps-rrss-share-mailto").click(function(event) {
      var rUrl= "mailto:destinatario?subject=Red IDI&body=" + window.location;
      window.open(rUrl, '_blank');
      return false;
	  });


    // RRSS - Bloque FEEDs

    //Script Async para Twitter FEEDs
    $.getScript( "https://platform.twitter.com/widgets.js", function( data, textStatus, jqxhr ) {
      // console.log( data ); // Data returned
      // console.log( textStatus ); // Success
      // console.log( jqxhr.status ); // 200
      // console.log( "Load was performed." );
    });
    
    //Script Async para Facebook FEEDs
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.3";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

})
