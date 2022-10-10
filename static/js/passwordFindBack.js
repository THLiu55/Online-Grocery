// open forget password html page (logic)
let forget_pass = document.getElementById("forget_password");
forget_pass.addEventListener("click", function (){
    // show the forget password frame
    console.log('click');
    let forget_component = document.getElementsByClassName("forget-pass-component")[0];
    forget_component.style.visibility = `visible`;
    forget_component.style.opacity = `1`;

    // show main component at back
    let back_effect = document.getElementsByClassName("back_effect")[0];
    back_effect.style.visibility = `visible`;
    back_effect.style.opacity = `1`;
})

let back_to_main = document.getElementById("back_btn");
back_to_main.addEventListener("click", function (event){
    // close the frame (The parent of the back button must be forget password component)
    event.target.parentNode.style.visibility = `hidden`;
    event.target.parentNode.style.opacity = `0`;

    // close the back effect
    var back_effect = document.getElementsByClassName("back_effect")[0];
    back_effect.style.visibility = `hidden`;
    back_effect.style.opacity = `0`;

    //-- the initial setting of email, captcha and submit area
    var EmailArea = document.getElementById("email-area");
    var CaptchaArea = document.getElementById("captcha-area");
    var PasswordArea = document.getElementById("password-area");
    EmailArea.style.display = 'block';
    CaptchaArea.style.display = 'none';
    PasswordArea.style.display = 'none';
    setTimeout(function (){
        EmailArea.style.opacity = '1';
    }, .2)
    setTimeout(function (){
        CaptchaArea.style.opacity = '0';
    }, .2)
    setTimeout(function (){
        PasswordArea.style.opacity = '0';
    }, .2)
})

//the 'continue' logic in forget password framework
//-- the initial setting of email, captcha and submit area
    var EmailArea = document.getElementById("email-area");
    var CaptchaArea = document.getElementById("captcha-area");
    var PasswordArea = document.getElementById("password-area");
    setTimeout(function (){
        EmailArea.style.opacity = '1';
    }, .2)
    setTimeout(function (){
        CaptchaArea.style.opacity = '0';
    }, .2)
    setTimeout(function (){
        PasswordArea.style.opacity = '0';
    }, .2)

function email_continue(){
    var EmailArea = document.getElementById("email-area");
    var CaptchaArea = document.getElementById("captcha-area");

    EmailArea.style.display = 'none';
    CaptchaArea.style.display = 'block';
    setTimeout(function (){
        CaptchaArea.style.opacity = '1';
    }, .2)
    setTimeout(function (){
        EmailArea.style.opacity = '0';
    }, .2)
}

function captcha_continue(){
    var CaptchaArea = document.getElementById("captcha-area");
    var PasswordArea = document.getElementById("password-area");

    CaptchaArea.style.display = 'none';
    PasswordArea.style.display = 'block';
    setTimeout(function (){
        PasswordArea.style.opacity = '1';
    }, .2)
    setTimeout(function (){
        CaptchaArea.style.opacity = '0';
    }, .2)
}