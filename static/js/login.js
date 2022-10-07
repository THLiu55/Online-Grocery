// buttons for animation
const to_sign_in_btn = document.getElementById("to-logIn");
const to_sign_up_btn = document.getElementById("to-signUp");
const container = document.getElementsByClassName("Component")[0];

// input
const email_error = document.getElementById("email_error");
const num_div = document.getElementById('count')
const username_error = document.getElementById("username_error");
const captcha_error = document.getElementById("captcha_error");

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
    let email = document.getElementById('email_input').value
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
    let email = document.getElementById('email_input').value
    console.log(email)
    if (reg.test(email)) {
        validEmail = true
    } else {
        validEmail = false
    }
}

function username_listener() {
    email_error.innerHTML = "";
}

function captcha_listener() {
    email_error.innerHTML = "";
}

function login() {
    document.form2.action = "/user/login"
    document.form2.submit()
}




