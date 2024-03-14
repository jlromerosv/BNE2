jQuery(document).ready(function ($) {
    console.log('Alertas script loaded');


    // if ($('.ps-alertas-markup').length) {
    //     $('.ps-alertas-markup .views-row').each(function () {

    //         var classList = $(this).attr('class').split(/\s+/);
    //         console.log(classList[0])
    //         if (getCookie(classList[0]) == null) {
    //             $(this).show()
    //         }

    //     })
    // }

    if ($('.ps-alertas-markup').length) {
        $('.ps-alertas-markup .views-row').each(function () {

            var classList = $(this).attr('class').split(/\s+/);
            console.log(classList[0])
            var nameCookie = classList[0]
            checkCookieHasASpecificValue(nameCookie)
            if (checkCookieHasASpecificValue(nameCookie) == false) {
                $(this).show()
            }

        })
    }

    // $('.ps-alertas-markup').on('click', '.close-alert', function () {
    //     var ps_alerta_id = $(this).attr('class').split(/\s+/)
    //     setCookie_noExpire(ps_alerta_id[1], 'Ocultar Alerta ' + ps_alerta_id[1])
    //     $('.' + ps_alerta_id[1]).hide()
    // })

    $('.ps-alertas-markup').on('click', '.close-alert', function () {
        var ps_alerta_id = $(this).attr('class').split(/\s+/)
        setCookie(ps_alerta_id[1], 'Ocultar Alerta ' + ps_alerta_id[1])
        $('.' + ps_alerta_id[1]).hide()
    })


    if ($('.ps-node--type-alerta').length) {
        $(".ps-node--type-alerta").each(function () {
            let color = $(this).attr("alert-color-data");
            $(this).css("background-color", color);

            let color_texto = $(this).attr("alert-color-texto");
            $(this).find('h3').css("color", color_texto);
            $(this).find('.ps-field--name-body').css("color", color_texto);
            $(this).find('.close-alert').css("color", color_texto);
        });
    }



})

function checkCookieHasASpecificValue(name) {
    if (document.cookie.split(';').some((item) => item.includes(name))) {
        console.log("la cookie con nombre " + name + " esta registrada")
        return true;
    }
    else {
        console.log("la cookie con nombre " + name + " no esta registrada")
        return false
    }
}

// function setCookie(key, value) {
//     var expires = new Date();
//     expires.setTime(expires.getTime() + 31536000000); //1 year
//     document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
// }

// function setCookie_noExpire(key, value) {
//     document.cookie = key + '=' + value + ';';
// }

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function setCookie_noExpire(name, value, daysToLive) {
    // Encode value in order to escape semicolons, commas, and whitespace
    var cookie = name + "=" + encodeURIComponent(value);

    if(typeof daysToLive === "number") {
        /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
        cookie += "; max-age=" + (daysToLive*24*60*60);

        document.cookie = cookie;
    }
}

function setCookie(name, value) {
    // Encode value in order to escape semicolons, commas, and whitespace
    var cookie = name + "=" + encodeURIComponent(value);
    document.cookie = cookie;
}