        // get the necessary elements for switching mode
        const component = document.getElementsByClassName('Component')[0];
        const form_title = document.getElementsByClassName('FormTitle');
        const forget_btn = document.getElementById('forget_password');
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
            if (form_title !== undefined){
                for (let i = 0; i < form_title.length; i++){
                    form_title[i].classList.remove('DARKMODE_TEXT');
                }
            }
            if (component !== undefined){
                component.classList.remove('DARKMODE_BACKGROUND_MAIN');
            }
            if (forget_btn !== undefined){
                forget_btn.classList.remove('DARKMODE_TEXT');
            }
        }
        function dark_mode(){
            // body background dark
            document.body.style.background = '#2F2F33FF';
            // relevant element switching
            if (form_title !== undefined){
                for (let i = 0; i < form_title.length; i++){
                    form_title[i].classList.add('DARKMODE_TEXT');
                }
            }
            if (component !== undefined){
                component.classList.add('DARKMODE_BACKGROUND_MAIN');
            }
            if (forget_btn !== undefined){
                forget_btn.classList.add('DARKMODE_TEXT');
            }
        }