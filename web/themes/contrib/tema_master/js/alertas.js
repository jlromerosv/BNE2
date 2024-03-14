// jQuery(document).ready(function ($) {
//     console.log('Alertas script loaded');

//     if( $('.ps-alertas-markup').length ){
//         $('.ps-alertas-markup .views-row').each(function () {
//             var classList = $(this).attr('class').split(/\s+/);
//             if(getCookie(classList[0]) == null ){
//                 $(this).show()
//             }
//         }) 
//     }

//     $('.ps-alertas-markup').on('click', '.close-alert', function () {
//         var ps_alerta_id = $(this).attr('class').split(/\s+/)
//         setCookie_noExpire(ps_alerta_id[1], 'Ocultar Alerta ' + ps_alerta_id[1])
//         $('.'+ps_alerta_id[1]).hide()
//     })
	

// })

// function setCookie(key, value) {
//     var expires = new Date();
//     expires.setTime(expires.getTime() + 31536000000); //1 year  
//     document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
// }

// function setCookie_noExpire(key, value) {
//     document.cookie = key + '=' + value + ';';
// }

// function getCookie(key) {
//     var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)'); 
//     return keyValue ? keyValue[2] : null;
// }