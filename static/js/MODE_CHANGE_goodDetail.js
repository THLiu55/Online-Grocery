        // get the necessary elements for switching mode
        const product_info_flex_box = document.getElementsByClassName('product-info-flex-box')[0];
        const mode_img = document.getElementById("mode_img_id");
        loadBackground()

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
            if (product_info_flex_box !== undefined){
                product_info_flex_box.classList.remove('DARKMODE_TEXT');
            }
        }
        function dark_mode(){
            // body background dark
            document.body.style.background = '#2F2F33FF';
            // relevant element switching
            if (product_info_flex_box !== undefined){
                product_info_flex_box.classList.add('DARKMODE_TEXT');
            }
        }