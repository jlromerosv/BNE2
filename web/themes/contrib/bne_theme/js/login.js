jQuery(document).ready(function ($) {

    console.log("login.js loaded")

    if ($('.path-user').length > 0) {
        $('.user-login-form .form-actions .form-submit').val("ENTRAR")
        $(".user-login-form .form-type-textfield input").attr("placeholder", "Usuario");
        $(".user-login-form .form-type-password input").attr("placeholder", "Contraseña");
        $(".user-login-form .form-type-password").append('<svg xmlns="http://www.w3.org/2000/svg" width="23.534" height="13.999" viewBox="0 0 23.534 13.999"><defs><style>.a{fill:#006298;}</style></defs><g transform="translate(-0.002 -95.739)"><g transform="translate(0.002 95.739)"><g transform="translate(0 0)"><path class="a" d="M23.47,102.493a13.511,13.511,0,0,0-23.4,0,.491.491,0,0,0,0,.491,13.511,13.511,0,0,0,23.4,0A.491.491,0,0,0,23.47,102.493Zm-5.349,4.537a12.529,12.529,0,0,1-17.059-4.292,12.529,12.529,0,0,1,21.413,0A12.6,12.6,0,0,1,18.121,107.03Z" transform="translate(-0.002 -95.739)"/></g></g><g transform="translate(7.363 98.333)"><g transform="translate(0 0)"><path class="a" d="M152.239,147.832a4.406,4.406,0,1,0,4.406,4.406A4.411,4.411,0,0,0,152.239,147.832Zm0,7.831a3.425,3.425,0,1,1,3.425-3.425A3.429,3.429,0,0,1,152.239,155.663Z" transform="translate(-147.833 -147.832)"/></g></g></g></svg>');

        $(".user-pass .form-type-textfield input").attr("placeholder", "Nombre de usuario o correo electrónico");

        $('.form-type-password svg').click(function (e) {
            let tipo = $('.form-type-password input').attr("type");
            if ( tipo == "password"){
                $('.form-type-password input').attr("type", "text");
            }
            else{
                $('.form-type-password input').attr("type", "password");
            }

        });


    }

    $(document).ajaxComplete(function() {
        if ($('.path-user').length > 0) {
            $('.form-type-password svg').click(function (e) {
                let tipo = $('.form-type-password input').attr("type");
                if ( tipo == "password"){
                    $('.form-type-password input').attr("type", "text");
                }
                else{
                    $('.form-type-password input').attr("type", "password");
                }

            });
        }
    });

    //Realiza cambios en la pagina de login
    if (window.location.pathname.includes('/user/login')) {

        //cambia el texto del titulo de la pagina de login
        $('#block-bne-theme-contenidoprincipaldelapagina h1').text("Acceder")

        //cambia el enlace de reiniciar contraseña para que aparezca en el formulario bajo el input de la contraseña
        $('.ps_microsite_container .region #block-bne-theme-local-tasks nav ul li:last-child a').appendTo('.user-login-form .form-type-password')
        //cambia el texto del enlace reiniciar contraseña
        $(".user-login-form .form-type-password a").text("¿Olvidaste tu Contraseña?");


        $('.ps_microsite_container .region #block-bne-theme-local-tasks nav ul li:last-child').appendTo('.user-login-form .form-actions')

        $('.user-login-form .form-actions').append('<div class="acceso-privado"><div>Acceso privado para usuarios de la BNE.</div><div><span>Puedes suscribirte a nuestro boletín pinchando</span><a href="/">aquí.</a></div></div>')

        $('.user-login-form .form-actions li a').text("Crear cuenta")
        $(".user-login-form .form-actions li").remove();

    }

    if (window.location.pathname.includes('/user/register')) {
        $('#block-bne-theme-contenidoprincipaldelapagina h1').text("Crear cuenta de usuario")

        $(".user-register-form .form-type-email input").attr("placeholder", "Correo electrónico");
        $(".user-register-form .form-type-textfield input").attr("placeholder", "Nombre de Usuario");
        $(".user-register-form .form-type-textfield input[name*='field_nombre[0][value]']").attr("placeholder", "Nombre");
        $(".user-register-form .form-type-textfield input[name*='field_apellidos[0][value]']").attr("placeholder", "Apellidos");

        $(".user-register-form .form-actions").prepend('<div class="registerInfo"><div class="informacion">Los datos personales serán recogidos y tratados en un fichero inscrito en el Registro de Ficheros de Datos Personales de la Agencia Española de Protección de Datos, cuya finalidad es la gestión y prestación de actividades, programas públicos y educativos de la Biblioteca Nacional de España, así como, para la difusión de concursos y talleres en el ámbito de competencias de la Biblioteca. El órgano responsable del fichero es la Biblioteca Nacional de España, y la dirección donde el interesado podrá ejercer los derechos de acceso, rectificación, cancelación y oposición ante el mismo es Paseo de Recoletos 20-22, 28071, Madrid.</div><div class="consentimiento"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"><span>Doy mi consetimiento para que los datos personales que facilito puedan ser utilizados por la Biblioteca Nacional de España, para poder realizar el trámite solicitado. En caso de negativa al tratamiento de sus datosno podrá prestarse el trámite.</span></div></div>');

        $('.user-register-form .form-actions .form-submit').prop('disabled', true)
        $('.user-register-form .form-actions .form-submit').val('REGISTRARSE')

        $('.user-register-form .form-actions .consentimiento input').change(function () {
            if (this.checked) {

                $('.user-register-form .form-actions .form-submit').prop('disabled', false)
            }
            else {

                $('.user-register-form .form-actions .form-submit').prop('disabled', true)
            }

        });

    }

    if (window.location.pathname.includes('/user/password')) {
        //cambia el texto del titulo de la pagina de login
        $('#block-bne-theme-contenidoprincipaldelapagina h1').text("Reiniciar contraseña")

    }

    if ($(".ps-panel-gestion-usuario").length) {

        $("body").addClass("ps-page-gestion-usuario");

    }







})