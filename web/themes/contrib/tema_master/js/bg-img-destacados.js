(function ($) {

    let related_contents_elements = $(".ps-contenido-relacionado .node__content");

    for(let i = 0; i< related_contents_elements.length; i++) {
        let element = $(related_contents_elements[i])
        let img_element = element.find("img");
        if(img_element.length == 1) {
            let img_element_src = img_element.attr("src");
            element.css("background-image", "url("+img_element_src+")");
        }else{
            element.css("background-color", "#EEEEEE");
        }
    }


})(jQuery);