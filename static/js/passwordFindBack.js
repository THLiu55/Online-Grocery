let email_find_back = ''
let validFindBackEmail = false, validFindBackCaptcha = false

// get the elements (input & button)
const forget_pass_btn = document.getElementById("forget_password");
const back_to_main_btn = document.getElementById("back_btn");

const EmailArea = document.getElementById("email-area");
const CaptchaArea = document.getElementById("captcha-area");
const PasswordArea = document.getElementById("password-area");

const find_back_email_input = document.getElementById("find-back-email")

const email_error_in_forget = document.getElementById("email_error_inForget")

// set delay for animation
setTimeout(function () {EmailArea.style.opacity = '1';}, .2)
setTimeout(function () {CaptchaArea.style.opacity = '0';}, .2)
setTimeout(function () {PasswordArea.style.opacity = '0';}, .2)

// open find-back-password window
forget_pass_btn.addEventListener("click", function (){
    // show the forget-password frame
    console.log('click');
    let forget_component = document.getElementsByClassName("forget-pass-component")[0];
    forget_component.style.visibility = `visible`;
    forget_component.style.opacity = `1`;
    // show main component at back
    let back_effect = document.getElementsByClassName("back_effect")[0];
    back_effect.style.visibility = `visible`;
    back_effect.style.opacity = `1`;
})

// add listener for button back to main
back_to_main_btn.addEventListener("click", function (event){
    // set cached email and its validity to be initial value
    email_find_back = ''
    validFindBackEmail = false
    validFindBackCaptcha = false

    // close the frame (The parent of the back button must be forget password component)
    event.target.parentNode.style.visibility = `hidden`;
    event.target.parentNode.style.opacity = `0`;

    // close the back effect
    let back_effect = document.getElementsByClassName("back_effect")[0];
    back_effect.style.visibility = `hidden`;
    back_effect.style.opacity = `0`;

    //-- the initial setting of email, captcha and submit area
    let EmailArea = document.getElementById("email-area");
    let CaptchaArea = document.getElementById("captcha-area");
    let PasswordArea = document.getElementById("password-area");
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


//
function email_continue(){
    // clear wrong notation
    email_error_in_forget.style = ''

    // get input email
    email_find_back = find_back_email_input.value
    if (!checkEmailFormat(email_find_back)) {
        email_error_in_forget.innerHTML = "format wrong"
        return
    }
    // redirect animation
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
    CaptchaArea.style.display = 'none';
    PasswordArea.style.display = 'block';
    setTimeout(function (){
        PasswordArea.style.opacity = '1';
    }, .2)
    setTimeout(function (){
        CaptchaArea.style.opacity = '0';
    }, .2)
}