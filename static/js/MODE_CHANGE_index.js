        // get the necessary elements for switching mode
        const card_item = document.getElementsByClassName('card-item');
        const category_description = document.getElementsByClassName('category-description');
        const shopping_cart_present = document.getElementsByClassName('shopping-cart-present')[0];
        const shopping_item = document.getElementsByClassName('shopping-item');
        const mode_img = document.getElementById("mode_img_id");
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
            // relevant element switching
            if (card_item !== undefined){
                for (let i = 0; i < card_item.length; i++){
                    card_item[i].classList.remove('DARKMODE_BACKGROUND_CARD')
                }
            }
            if (category_description !== undefined){
                for (let i = 0; i < category_description.length; i++){
                    category_description[i].classList.remove('DARKMODE_TEXT');
                }
            }
            if (shopping_cart_present !== undefined){
                shopping_cart_present.classList.remove('DARKMODE_BACKGROUND_CARD');
                shopping_cart_present.classList.remove('DARKMODE_TEXT');
            }
            if (shopping_item !== undefined){
                for (let i = 0; i < shopping_item.length; i++){
                    shopping_item[i].classList.remove('DARKMODE_BACKGROUND_MAIN');
                }
            }
        }
        function dark_mode(){
            // body background dark
            document.body.style.background = '#2F2F33FF';
            // relevant element switching
            if (card_item !== undefined){
                for (let i = 0; i < card_item.length; i++){
                    card_item[i].classList.add('DARKMODE_BACKGROUND_CARD')
                }
            }
            if (category_description !== undefined){
                for (let i = 0; i < category_description.length; i++){
                    category_description[i].classList.add('DARKMODE_TEXT');
                }
            }
            if (shopping_cart_present !== undefined){
                shopping_cart_present.classList.add('DARKMODE_BACKGROUND_CARD');
                shopping_cart_present.classList.add('DARKMODE_TEXT');
            }
            if (shopping_item !== undefined){
                for (let i = 0; i < shopping_item.length; i++){
                    shopping_item[i].classList.add('DARKMODE_BACKGROUND_MAIN');
                }
            }
        }