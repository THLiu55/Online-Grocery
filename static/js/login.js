// buttons for animation
const to_sign_in_btn = document.getElementById("to-logIn");
const to_sign_up_btn = document.getElementById("to-signUp");
const container = document.getElementsByClassName("Component")[0];

// error message displayer
const email_error = document.getElementById("email_error");
const username_error = document.getElementById("username_error");
const captcha_error = document.getElementById("captcha_error");
const password_error = document.getElementById("password_error");
const repassword_error = document.getElementById("Repassword_error");

// countdown displayer
const num_div = document.getElementById('count')

// input
const email_input = document.getElementById('email_input')
const username_input = document.getElementById("username_input")
const password_input = document.getElementById("password_input")
const repassword_input = document.getElementById("repassword_input")
const captcha_input = document.getElementById("captcha_input")


// boolean value that represent each input is valid
let validUserName = false, validPassword = false, validRePassword = false, validEmail = false, validCaptcha = false

// regular expression of email
const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

// add animation when switching from sign up to sign in
to_sign_up_btn.addEventListener("click", () => {
    container.classList.add('sign-up-mode');
});
to_sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});


// send email
function send_email() {
    // check if is empty
    let email = email_input.value
    if (email === '') {
        email_error.innerHTML = "empty email"
        return;
    }
    // check if is wrong format
    if (!validEmail) {
        email_error.innerHTML = "invalid email format"
        return;
    }
    // send email
    let xhr = new XMLHttpRequest()
    const fd = new FormData()
    fd.set('email', document.getElementById('email_input').value)
    xhr.open('POST', '/user/register?type=send', true)
    xhr.send(fd)

    // set animation after email send / error notification for registered email
    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText)
        console.log(response)
        if (response.code === 400){  // error notification for registered email
            email_error.innerHTML = response.message;
        } else {  // animation after email send
            countDown(30, num_div).then(r => {})
        }
    }

}

function register() {
    // check empty
    let flag = true

    if (username_input.value === '') {
        username_error.innerHTML = 'empty user name'
        flag = false;
    }
    if (password_input.value === '') {
        password_error.innerHTML = 'empty password'
        flag = false;
    }
    if (repassword_input.value === '') {
        repassword_error.innerHTML = 'empty password'
        flag = false;
    }
    if (email_input.value === '') {
        email_error.innerHTML = 'empty email'
        flag = false;
    }
    if (captcha_input.value === '') {
        captcha_error.innerHTML = 'empty captcha'
        flag = false;
    }
    if (!flag) return;

    // check data validation:
    if (validUserName) {
        username_error.innerHTML = "3 <= username length <= 20"
        flag = false;
    }

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

    // send registered form to flask backend
    let xhr = new XMLHttpRequest()
    const fd = new FormData(document.form2)
    xhr.open('POST', '/user/register?type=register', true)
    xhr.send(fd)

    // display error messages
    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText)
        if (response.code === 400){
            let msg = response.message
            switch (msg) {
                case 'captcha out of time':
                    captcha_error.innerHTML = msg
                    break
                case 'captcha wrong':
                    captcha_error.innerHTML = msg
                    break
                case 'registered username':
                    username_error.innerHTML = msg
                    break
            }
        }
    }
}

// set input event listeners
function email_listener() {
    // clear the error message
    email_error.innerHTML = "";
    // obtain input email
    let email = email_input.value
    console.log(email)
    // check if the email is in correct format (aaa@bbb.ccc)
    if (reg.test(email)) {
        validEmail = true
    } else {
        validEmail = false
    }
}

function username_listener() {
    // clear error message
    email_error.innerHTML = "";
    // obtain user name
    let username = username_input.value
    // check if username is valid (3 < length < 20)
    if (username.length > 3 && username.length < 20) {
        validUserName = true;
    } else {
        validUserName = false;
    }
}

function captcha_listener() {
    email_error.innerHTML = "";
    // obtain captcha
    let captcha = captcha_input.value
    // check if captcha is valid (int(0-9) * 6)
    for (let i = 0; i < captcha.length; i++) {
        if (i === 6 || captcha[i] < '0' || captcha[i] > '9') {
            validCaptcha = false;
            return;
        }
    }
    validCaptcha = true
}

function password_listener() {
    // get password
    password_error.innerHTML = ""
    let hasLetter = false, hasNum = false, hasCap = false
    let password = password_input.value
    let len = password.length

    // check length
    if (len < 6) {
        password_error.innerHTML = "too short"
        validPassword = false
        return;
    }
    if (len > 20) {
        password_error.innerHTML = "too long"
        validPassword = false
        return;
    }

    // check format
    for (let i = 0; i < password.length; i++) {
        if ('0' <= password[i] <= '9') {
            hasNum = true
        } else if ('a' <= password[i] <= 'z' || 'A' <= password[i] <= 'Z') {
            hasLetter = true
            if ('A' <= password[i] <= 'Z') {
                hasCap = true
            }
        }
        // if all satisfied -> return
        if (hasNum && hasLetter && hasCap && (6 <= len <= 20)) {
            validPassword = true;
            return;
        }
    }
    // show error message and set valid to false
    if (!hasLetter) {
        password_error.innerHTML = "weak (need letters)"
        validPassword = false
        return;
    }
    if (!hasNum) {
        password_error.innerHTML = "weak (need number)"
        validPassword = false
        return;
    }
    if (!hasCap) {
        password_error.innerHTML = "weak (need capital letter)"
        validPassword = false
    }
}

// check if re-input password == password
function rePassword_listener() {
    let pass = password_input.value
    let repass = repassword_input.value
    validRePassword = (pass === repass)
}

function login() {
    document.form2.action = "/user/login"
    document.form2.submit()
}

// open forget password html page (logic)
var forget_pass = document.getElementById("forget_password");
forget_pass.addEventListener("click", function (){
    // show the forget password frame
    console.log('click');
    var forget_component = document.getElementsByClassName("forget-pass-component")[0];
    forget_component.style.visibility = `visible`;
    forget_component.style.opacity = `1`;

    // show main component at back
    var back_effect = document.getElementsByClassName("back_effect")[0];
    back_effect.style.visibility = `visible`;
    back_effect.style.opacity = `1`;
})
var back_to_main = document.getElementById("back_btn");
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



