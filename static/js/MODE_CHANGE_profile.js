// get necessary elements for switching modes
        const personal_info_card = document.getElementsByClassName('personalInfoCard')[0];
        const profile_header = document.getElementsByClassName('profile-header')[0];
        const shop_info_frame = document.getElementsByClassName('shop-info-frame')[0];
        const shop_header_info = document.getElementsByClassName('shop-header-info')[0];
        const product_item = document.getElementsByClassName('product-item');
        const register_component = document.getElementsByClassName('register-component');
        const shop_input_area = document.getElementsByClassName('Shop-inputArea');
        const form_header = document.getElementsByClassName('ShopRegistrationFormTitle');
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
            if (personal_info_card !== undefined){
                personal_info_card.classList.remove('DARKMODE_BACKGROUND_CARD');
            }
            if (profile_header !== undefined){
                profile_header.classList.remove('DARKMODE_TEXT');
            }
            if (shop_info_frame !== undefined){
                shop_info_frame.classList.remove('DARKMODE_BACKGROUND_CARD');
            }
            if (shop_header_info !== undefined){
                shop_header_info.classList.remove('DARKMODE_TEXT');
            }
            if (product_item !== undefined){
                for (let i = 0; i < product_item.length; i++){
                    product_item[i].classList.remove('DARKMODE_BACKGROUND_MAIN');
                }
            }
            if (register_component !== undefined){
                for (let i = 0; i < register_component.length; i++){
                    register_component[i].classList.remove('DARKMODE_BACKGROUND_MAIN');
                }
            }
            if (shop_input_area !== undefined){
                for (let i = 0; i < shop_input_area.length; i++){
                    shop_input_area[i].classList.remove('DARKMODE_TEXT')
                }
            }
            if (form_header !== undefined){
                for (let i = 0; i < form_header.length; i++){
                    form_header[i].classList.remove('DARKMODE_TEXT');
                }
            }
        }
        function dark_mode(){
            // body background dark
            document.body.style.background = '#2F2F33FF';
            // relevant element switching
            if (personal_info_card !== undefined){
                personal_info_card.classList.add('DARKMODE_BACKGROUND_CARD');
            }
            if (profile_header !== undefined){
                profile_header.classList.add('DARKMODE_TEXT')
            }
            if (shop_info_frame !== undefined){
                shop_info_frame.classList.add('DARKMODE_BACKGROUND_CARD');
            }
            if (shop_header_info !== undefined){
                shop_header_info.classList.add('DARKMODE_TEXT');
            }
            if (product_item !== undefined){
                for (let i = 0; i < product_item.length; i++){
                    product_item[i].classList.add('DARKMODE_BACKGROUND_MAIN');
                }
            }
            if (register_component !== undefined){
                for (let i = 0; i < register_component.length; i++){
                    register_component[i].classList.add('DARKMODE_BACKGROUND_MAIN');
                }
            }
            if (shop_input_area !== undefined){
                for (let i = 0; i < shop_input_area.length; i++){
                    shop_input_area[i].classList.add('DARKMODE_TEXT')
                }
            }
            if (form_header !== undefined){
                for (let i = 0; i < form_header.length; i++){
                    form_header[i].classList.add('DARKMODE_TEXT');
                }
            }
        }
