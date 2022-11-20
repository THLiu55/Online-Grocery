// buttons for animation
const to_sign_in_btn = document.getElementById("to-logIn");
const to_sign_up_btn = document.getElementById("to-signUp");
const container = document.getElementsByClassName("Component")[0];
const register_submit_btn = document.getElementById('register_submit')

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
const login_email_input = document.getElementById("login-email")
const login_password_input = document.getElementById("login-password")


// boolean value that represent each input is valid
let validUserName = false, validPassword = false, validRePassword = false, validEmail = false

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

    // animation when the email is sent
    countDown(60, num_div).then(r => {})

    let xhr = new XMLHttpRequest()
    const fd = new FormData()
    fd.set('email', document.getElementById('email_input').value)
    xhr.open('POST', '/user/login?type=send', true)
    xhr.send(fd)

    // set animation after email send / error notification for registered email
    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText)
        console.log(response)
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
    if (!validEmail || !validUserName || !validPassword || !validRePassword) {
        return;
    }

    // send registered form to flask backend
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/user/login?type=signup', true)
    xhr.setRequestHeader("X-CSRFToken", "{{ register_form.csrf_token._value() }}")
    let form = document.getElementById("sign-up-form")
    const fd = new FormData(form)
    xhr.send(fd)

    // display error messages
    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText)
        if (response.code === 400) {
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
                case 'registered email':
                    email_error.innerHTML = msg
                    break
                case 'registered user name':
                    username_error.innerHTML = msg
                    break
                case 'email not validate':
                    email_error.innerHTML = msg
                    break
                case 'wrong username format':
                    username_error.innerHTML = msg
                    break
                case 'wrong password format':
                    password_error.innerHTML = msg
                    break
            }
        } else if (response.code === 401){
            let msg = response.message
            alert(msg)

        } else {
            // go to log in page and load email and password automatically
            container.classList.remove("sign-up-mode");
            login_email_input.value = email_input.value;
            login_password_input.value = password_input.value;
        }
    }
}


// various listeners for signup page
function username_listener_sign_up() {
    validUserName = username_listener(username_error, username_input);
}

function password_listener_sign_up() {
    validPassword = password_listener(password_input, password_error);
}

function rePassword_listener_sign_up() {
    validRePassword = rePassword_listener(repassword_error, password_input, repassword_input)
}

function email_listener_sign_up() {
    validEmail = email_listener(email_input, email_error);
}

function captcha_listener_sign_up() {
    captcha_error.innerHTML = ""
}



function login() {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/user/login?type=login', true)
    xhr.setRequestHeader("X-CSRFToken", "{{ login_form.csrf_token._value() }}")
    let form = document.getElementById("log-in-form")
    xhr.send(new FormData(form))
    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText)
        if (response.code === 200) {
            console.log(200)
            // redirect()
            window.open("/")
        } else {
            alert(response.message)
        }
    }
}



