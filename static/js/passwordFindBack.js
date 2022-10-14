let email_find_back = ''
let captcha_find_back = ''

// get the elements (input & button & display error holder)
const forget_pass_btn = document.getElementById("forget_password");
const back_to_main_btn = document.getElementById("back_btn");

const EmailArea = document.getElementById("email-area");
const CaptchaArea = document.getElementById("captcha-area");
const PasswordArea = document.getElementById("password-area");

const find_back_email_input = document.getElementById("find-back-email")
const find_back_captcha_input = document.getElementById("find-back-captcha")
const find_back_password_input = document.getElementById("find-back-password")
const find_back_re_password_input = document.getElementById("find-back-re-password")

const email_error_in_forget = document.getElementById("email_error_inForget")
const captcha_error_in_forget = document.getElementById("captcha_error_inForget")
const password_error_in_forget = document.getElementById("password_error_inForget")
const re_password_error_in_forget = document.getElementById("re_password_error_inForget")

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
function email_continue() {
    // clear wrong notation
    email_error_in_forget.innerHTML = ''

    // get input email
    email_find_back = find_back_email_input.value

    // check email format
    if (!checkEmailFormat(email_find_back)) {
        email_error_in_forget.innerHTML = "format wrong"
        return
    }

    // post the captcha to the backend
    let xhr = new XMLHttpRequest()
    let fd = new FormData()
    fd.set("email", email_find_back)
    xhr.open('POST', '/user/findPassword?type=send', true)
    xhr.send(fd)

    // redirect to password resetting page
    EmailArea.style.display = 'none';
    CaptchaArea.style.display = 'block';
    setTimeout(function () {
                CaptchaArea.style.opacity = '1';
            }, .2)
    setTimeout(function () {
                EmailArea.style.opacity = '0';
            }, .2)
}


function captcha_continue() {
    // clear all error messages
    captcha_error_in_forget.innerHTML = ''

    // obtain the captcha
    captcha_find_back = find_back_captcha_input.value

    // check the format of input captcha
    if (captcha_find_back.length !== 6) {
        captcha_error_in_forget.innerHTML = 'wrong captcha'
        return
    }

    // send the captcha to backend
    let xhr = new XMLHttpRequest()
    let fd = new FormData()
    fd.set("email", email_find_back)
    fd.set("captcha", captcha_find_back)
    xhr.open('POST', '/user/findPassword?type=captcha', true)
    xhr.send(fd)

    // after the email had been sent
    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText)
        if (response.code === 400) {
            // display error message
            captcha_error_in_forget.innerHTML = "wrong captcha"
        } else {
            // redirect to password resetting page
            CaptchaArea.style.display = 'none';
            PasswordArea.style.display = 'block';
            setTimeout(function (){
                PasswordArea.style.opacity = '1';
            }, .2)
            setTimeout(function (){
                CaptchaArea.style.opacity = '0';
            }, .2)
        }
    }
}

function resetPassword() {
    // clear all error messages
    re_password_error_in_forget.innerText = ''
    password_error_in_forget.innerText = ''

    // check validity
    let correct_password = password_listener(find_back_password_input, password_error_in_forget)
    let correct_rePassword = rePassword_listener(re_password_error_in_forget, find_back_password_input, find_back_re_password_input)
    if (!(correct_password && correct_rePassword)) {
        return;
    }

    // obtain the password and re-password
    let password = find_back_password_input.value

    // send the new password to backend and  reset the password
    let xhr = new XMLHttpRequest()
    let fd = new FormData()
    fd.set("email", email_find_back)
    fd.set("captcha", captcha_find_back)
    fd.set("password", password)
    xhr.open('POST', '/user/findPassword?type=reset', true)
    xhr.send(fd)

    // after password reset operation
    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText)
        if (response.code === 400) {
            // display error message
            email_error_in_forget.innerHTML = response.message
        } else {
            // redirect to password resetting page
            PasswordArea.style.display = 'none';
            setTimeout(function (){
                PasswordArea.style.opacity = '0';
            }, .2)

            // load email and to input area automatically
            login_email_input.value = email_find_back;
        }
    }
}

// various input listeners:
function forget_email_listener() {
    email_listener(find_back_email_input, email_error_in_forget);
}

function  forget_captcha_listener() {
    captcha_listener(find_back_captcha_input, captcha_error_in_forget);
}

function forget_password_listener() {
    password_listener(find_back_password_input, password_error_in_forget);
}

function forget_re_password_listener() {
    rePassword_listener(re_password_error_in_forget, find_back_password_input, find_back_re_password_input);
}
