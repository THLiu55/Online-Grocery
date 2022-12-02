        // get the necessary elements for switching mode
        const shop_info_card = document.getElementsByClassName('shopInfoCard')[0];
        const shop_info_header = document.getElementsByClassName('info-header-text')[0];
        const card_item_s = document.getElementsByClassName('card-item-s');
        const category_description_s = document.getElementsByClassName('category-description-s');
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
            if (shop_info_card !== undefined){
                shop_info_card.classList.remove('DARKMODE_BACKGROUND_CARD');
            }
            if (shop_info_header !== undefined){
                shop_info_header.classList.remove('DARKMODE_TEXT');
            }
            if (card_item_s !== undefined){
                for (let i = 0; i < card_item_s.length; i++){
                    card_item_s[i].classList.remove('DARKMODE_BACKGROUND_CARD');
                }
            }
            if (category_description_s !== undefined){
                for (let i = 0; i < category_description_s.length; i++){
                    category_description_s[i].classList.remove('DARKMODE_TEXT');
                }
            }
        }
        function dark_mode(){
            // body background dark
            document.body.style.background = '#2F2F33FF';
            // relevant element switching
            if (shop_info_card !== undefined){
                shop_info_card.classList.add('DARKMODE_BACKGROUND_CARD');
            }
            if (shop_info_header !== undefined){
                shop_info_header.classList.add('DARKMODE_TEXT');
            }
            if (card_item_s !== undefined){
                for (let i = 0; i < card_item_s.length; i++){
                    card_item_s[i].classList.add('DARKMODE_BACKGROUND_CARD');
                }
            }
            if (category_description_s !== undefined){
                for (let i = 0; i < category_description_s.length; i++){
                    category_description_s[i].classList.add('DARKMODE_TEXT');
                }
            }
        }