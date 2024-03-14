(function ($) {

    let submenu_items = $(".ps-submenu-card .menu-level-0 > .menu-item");

    for(let i = 0; i< submenu_items.length; i++) {
        let element = $(submenu_items[i])
        let img_element = element.find("img");
        if(img_element.length == 1) {
            let img_element_src = img_element.attr("src");
            element.css("background-image", "url("+img_element_src+")");
        }else{
            element.css("background-color", "#EEEEEE");
        }
    }

})(jQuery);