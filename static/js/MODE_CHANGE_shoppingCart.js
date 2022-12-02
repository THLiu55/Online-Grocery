    // get all the elements needed to be switched
    const shopping_items_container = document.getElementsByClassName('shopping-items-container')[0];
    const shopping_cart_item_frame = document.getElementsByClassName('shopping-cart-item-frame')[0];
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
        // remove dark mode classes
        if (shopping_items_container !== undefined){
            shopping_items_container.classList.remove('DARKMODE_BACKGROUND_MAIN');
            shopping_items_container.classList.remove('DARKMODE_TEXT');
        }
        if (shopping_cart_item_frame !== undefined){
            shopping_cart_item_frame.classList.remove('DARKMODE_BACKGROUND_CARD');
            shopping_cart_item_frame.classList.add('LIGHTMODE_BACKGROUND_CARD');
        }

    }

    function dark_mode(){
        // add dark mode classes
        if (shopping_items_container !== undefined){
            shopping_items_container.classList.add('DARKMODE_BACKGROUND_MAIN');
            shopping_items_container.classList.add('DARKMODE_TEXT');
        }
        if (shopping_cart_item_frame !== undefined){
            console.log("ok");
            shopping_cart_item_frame.classList.add('DARKMODE_BACKGROUND_CARD');
            shopping_cart_item_frame.classList.remove('LIGHTMODE_BACKGROUND_CARD');
        }
    }