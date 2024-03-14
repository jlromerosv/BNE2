jQuery(document).ready(function ($) {
    if($('.ps-enlaces-interes .views-field-rh-redirect').length) {
        $('.ps-enlaces-interes .views-field-rh-redirect').each(function() {
          if(!$(this).find('a').length) {
            $(this).remove();
          }
        });
      }
  });