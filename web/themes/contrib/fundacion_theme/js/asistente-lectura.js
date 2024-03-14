jQuery(document).ready(function ($) {

    if ($('.sintesis-voz').length){
        let selVoces = document.getElementById('selvoces');
    let ctrlTexto = generarTexto();
    // let ctrlTexto = document.getElementById('textoADecir');
    let infoArea = document.getElementById('infoArea');
    let btnControl = document.getElementById('btnControl');
    let btnStop = document.getElementById('btnStop');
    let btnPause = document.getElementById('btnPause');


    function generarTexto() {
        let titulo = "";
        let subtitulo = "";
        let fecha = "";
        let fecha_inicio = "";
        let fecha_fin = "";
        let fecha_desde_hasta = "";
        let fecha_dia = "";
        let fecha_hora = "";
        let fecha_anio = "";
        let fecha_galeria = ";"
        let descripcion = "";
        let descripcion_vista = "";
        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-title').length) {
            titulo = $('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-title').eq(0).text() + ". "
        }
        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-field-subtitulo').length) {
            subtitulo = $('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-field-subtitulo').eq(0).text() + ". "
        }

        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-created').length) {
            fecha = $('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-created').eq(0).text() + ". "
        }
        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-field-fecha-inicio').length) {
            fecha_inicio = $('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-field-fecha-inicio').eq(0).text() + ". "
        }
        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-field-fecha-fin').length) {
            fecha_fin = $('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-field-fecha-fin').eq(0).text() + ". "
        }
        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .fecha-desde-hasta').length) {
            fecha_desde_hasta = $('#block-fundacion-theme-contenidoprincipaldelapagina .fecha-desde-hasta').eq(0).text() + ". "
        }
        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .fecha-dia').length) {
            fecha_dia = $('#block-fundacion-theme-contenidoprincipaldelapagina .fecha-dia').eq(0).text()
        }
        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .fecha-hora').length) {
            fecha_hora = $('#block-fundacion-theme-contenidoprincipaldelapagina .fecha-hora').eq(0).text() + ". "
        }
        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .fecha-anio').length) {
            fecha_anio = $('#block-fundacion-theme-contenidoprincipaldelapagina .fecha-anio').text() + ". "
        }
        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-field-fecha-galeria').length) {
            fecha_galeria = $('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-field-fecha-galeria').eq(0).text() + ". "
        }
        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-body').length) {
            descripcion = $('#block-fundacion-theme-contenidoprincipaldelapagina .field--name-body').eq(0).text() + ". "
        }
        if ($('#block-fundacion-theme-contenidoprincipaldelapagina .views-field-body').length) {
            descripcion_vista = $('#block-fundacion-theme-contenidoprincipaldelapagina .views-field-body').eq(0).text() + ". "
        }

        let resultado = titulo + subtitulo + fecha + fecha_inicio + fecha_fin + fecha_desde_hasta + fecha_dia + fecha_hora + fecha_anio + fecha_galeria + descripcion + descripcion_vista;
        console.log(resultado);
        return resultado;


    }

    ///////////Funciones axuliares
    //Mostrar información sobre el proceso
    let muestraInfo = function (msg) {
        infoArea.innerText = msg;
    };

    //Cambiar texto del botón de hablar y anoto la acción actual (hablar o parar)
    let cambiaTextoControl = function (accion) {
        btnControl.innerText = accion;
    };
    ///////////Fin de funciones axuliares

    //Antes de nada vemos si la API está soportada o no
    let sintetizador = window.speechSynthesis;
    if (!sintetizador) {
        document.getElementById('contenido').innerHTML = "¡¡La API de síntesis de voz no está soportada en este navegador!!. Usa Firefox, Chrome o algún navegador moderno...";
        return;
    }

    //No podemos cargar la lista de voces, ni usarlas, hasta que el navegador las haya cargado,
    //lo cual se notifica con el evento 'voiceschanged'
    let voces;
    let listaVocesCargada = false;  //Para evitar cargar la lista varias veces
    let vocesCargadas = function () {
        if (!listaVocesCargada) {
            //Obtenemos la lista de voces
            voces = sintetizador.getVoices();
            if (voces.length > 0) {
                //Las añadimos al selector
                voces.forEach(v => {
                    let optVoz = document.createElement('option');
                    optVoz.textContent = `${v.name} - ${v.lang}`;
                    if (v.default) optVoz.selected = true;
                    optVoz.setAttribute('data-voz', v.name);
                    optVoz.setAttribute('id', `${v.lang}`);
                    selVoces.appendChild(optVoz);
                });
                listaVocesCargada = true;
            }
        }
    };
    //Para los navegadores compatibles (todos menos Safari), cargar las voces cuando estén disponibles
    if (sintetizador.addEventListener)
        sintetizador.addEventListener('voiceschanged', vocesCargadas);

    vocesCargadas();    //Necesario para forzar la carga de las voces en Safari

    //Determinar la voz actualmente elegida en el desplegable
    let getVozElegida = function () {
        //Averiguamos la voz elegida
        let idioma_actual = window.location.href.split('/')[3];
        console.log(idioma_actual)
        $("#selvoces option").each(function () {
            if (idioma_actual == "es") {
                let idioma = $(this).attr('id')
                if (idioma == "es-ES") {
                    $(this).attr('selected', 'selected');
                }

            }
            if (idioma_actual == "en") {
                let idioma = $(this).attr('id')
                if (idioma == "en-GB") {
                    $(this).attr('selected', 'selected');
                }

            }

        });

        let vozElegida = selVoces.selectedOptions[0].getAttribute('data-voz');
        return voces.find(function (voz) {
            return voz.name == vozElegida;
        });
    };

    //Lanzar texto a voz
    let hablar = function () {
        if (sintetizador.paused || sintetizador.speaking) {
            sintetizador.resume();
            console.log("el sintetizador esta pausado")
        }
        else {
            sintetizador.cancel();

            console.log("comienza la reproduccion")
            //Lanzamos la síntesis de voz
            let txt = ctrlTexto;   //Texto a convertir a voz
            if (txt) {
                let declaracion = new SpeechSynthesisUtterance(txt);
                //Asignamos la voz elegida
                declaracion.voice = getVozElegida();
                declaracion.lang = declaracion.voice.lang;  //Necesario en móviles
                declaracion.rate = velocidad.value;
                declaracion.pitch = tono.value;

                //Detectar inicio de síntesis
                declaracion.addEventListener('start', function (ev) {

                    // muestraInfo(`🔊 Síntesis de voz iniciada con la voz "${declaracion.voice.name}" - Velocidad: ${velocidad.value} - Tono: ${tono.value}`);
                });
                //Detectar fin de síntesis
                declaracion.addEventListener('end', function (ev) {
                    sintetizador.cancel();
                    // muestraInfo(`🔇 Fin de síntesis de voz. Tiempo empleado: ${(ev.elapsedTime / 1000).toFixed(2)} segundos`);
                });
                //Detectar posibles errores
                declaracion.addEventListener('error', function (ev) {
                    console.log(ev);
                });
                //Lanzamos la síntesis de voz
                sintetizador.speak(declaracion);
            }
        }
    };

    let parar = function () {
        sintetizador.cancel();
    };

    let pausar = function () {
        sintetizador.pause();
    };

    //sintetizador.getVoices();   //Necesario para forzar la carga de las voces en Firefox

    //Establezco eventos de UI
    btnControl.addEventListener('click', hablar);
    btnStop.addEventListener('click', parar);
    btnPause.addEventListener('click', pausar);

    }



    $('a.rsbtn_play').click(function (e) {
        e.preventDefault();


    });








});


