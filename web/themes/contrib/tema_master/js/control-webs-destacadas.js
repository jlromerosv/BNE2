(function ($) {

    let width = 0;
    let div_webs_destacadas = $(".ps-webs-destacadas .view-content");

    $(".ps-slider-control-web-destacadas .control-right").click(function() {
        width = div_webs_destacadas.width();
        if(posicionDeScroll() == "Al final"){
            volverAlInicio();
        }else{
            movimientoDeScroll("derecha", width)
        }
    });

    $(".ps-slider-control-web-destacadas .control-left").click(function() {
        width = div_webs_destacadas.width();
        if(posicionDeScroll() == "Al inicio"){
            volverAlFinal();
        }else{
            movimientoDeScroll("izquierda", width);
        }
    });


    function volverAlInicio() {
        $(".ps-webs-destacadas .view-content")[0].scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    function volverAlFinal() {
        $(".ps-webs-destacadas .view-content")[0].scroll({
            top: 0,
            left: 3000,
            behavior: 'smooth'
        });
    }

    function movimientoDeScroll(direccion, width) {
        $(".ps-webs-destacadas .view-content")[0].scroll({
            top: 0,
            left: direccionDeDesplazamiento(direccion, width),
            behavior: 'smooth'
        });
    }

    function direccionDeDesplazamiento(direccion, width) {
        if(direccion == "derecha") {
            return div_webs_destacadas.scrollLeft()+width;
        }else{
            return div_webs_destacadas.scrollLeft()-width;
        }
    }

    function posicionDeScroll() {
        if(div_webs_destacadas.scrollLeft()+div_webs_destacadas.innerWidth() == div_webs_destacadas[0].scrollWidth) {
            return "Al final";
        }else if(div_webs_destacadas.scrollLeft() == 0) {
            return "Al inicio";
        }else {
            return false;
        }
    }


})(jQuery);