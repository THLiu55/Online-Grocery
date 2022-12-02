    // get all the elements needed to be switched
    const shop_products_frame = document.getElementsByClassName("shop-products-frame")[0];
    const search_product_item = document.getElementsByClassName("search-product-item");
    const search_product_flex_frame = document.getElementsByClassName("search-product-flex-frame");
    const mode_img = document.getElementById("mode_img_id")
    loadBackground()

    // load background state
    function loadBackground() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/mode?type=get', true)
        xhr.send()
        xhr.onload = () => {
            let response = JSON.parse(xhr.responseText)
            if (response.message === "dark") {
                dark_mode()
                mode_img.src = "../static/images/dark.png"
            }
        }
    }

    // switch mode
    function switchMode() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/mode?type=switch', true)
        xhr.send()
        xhr.onload = () => {
            let response = JSON.parse(xhr.responseText)
            if (response.message === "dark") {
                dark_mode()
                mode_img.src = "../static/images/dark.png"
            } else {
                light_mode()
                mode_img.src = "../static/images/light.png"
            }
        }
    }

    function light_mode(){
        // body background white
        document.body.style.background = '#ffffff';
        // remove dark mode classes
        if (shop_products_frame !== undefined){
            shop_products_frame.classList.remove('DARKMODE_TEXT');
        }
        if (search_product_item !== undefined){
            for (let i = 0; i < search_product_item.length; i++){
                search_product_item[i].classList.remove('DARKMODE_BACKGROUND_CARD');
            }
        }
        if (search_product_flex_frame !== undefined){
            for (let i = 0; i < search_product_flex_frame.length; i++){
                search_product_flex_frame[i].classList.remove('DARKMODE_TEXT');
            }

        }
    }

    function dark_mode(){
        // body background dark
        document.body.style.background = '#2F2F33FF';
        // add dark mode classes
        if (shop_products_frame !== undefined){
            shop_products_frame.classList.add('DARKMODE_TEXT');
        }
        if (search_product_item !== undefined){
            for (let i = 0; i < search_product_item.length; i++){
                search_product_item[i].classList.add('DARKMODE_BACKGROUND_CARD');
            }
        }
        if (search_product_flex_frame !== undefined){
            for (let i = 0; i < search_product_flex_frame.length; i++){
                search_product_flex_frame[i].classList.add('DARKMODE_TEXT');
            }

        }
    }