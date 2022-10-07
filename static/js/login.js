// buttons for animation
const to_sign_in_btn = document.getElementById("to-logIn");
const to_sign_up_btn = document.getElementById("to-signUp");
const container = document.getElementsByClassName("Component")[0];

// add animation when switching from sign up to sign in
to_sign_up_btn.addEventListener("click", () => {
    container.classList.add('sign-up-mode');
});
to_sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});


// send email
function send_email() {
    const email_error = document.getElementById("email_error");
    const num_div = document.getElementById('count')
    const fd = new FormData()
    fd.set('email', document.getElementById('email_input').value)
    let xhr = new XMLHttpRequest()
    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText)
        console.log(response)
        if (response.code === 400){
            email_error.innerHTML = response.message;
        } else {
            countDown(30, num_div).then(r => {})
        }
    }
    xhr.open('POST', '/user/register?type=send', true)
    xhr.send(fd)
}

function register() {
    const email_error = document.getElementById("email_error");
    const username_error = document.getElementById("username_error");
    const password_error = document.getElementById("password_error");
    const repassword_error = document.getElementById("Repassword_error");
    const captcha_error = document.getElementById("captcha_error");

    const fd = new FormData(document.form2)

    let xhr = new XMLHttpRequest()
    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText)
        console.log(response)
        if (response.code === 400){

        }
        if (response.code === 200){

        }
    }
    xhr.open('POST', '/user/register?type=register', true)
    xhr.send(fd)
}

// set input event listener, present the error message
function email_listener(){
    const email_error = document.getElementById("email_error");
    email_error.innerHTML = "";
}

function login() {
    document.form2.action = "/user/login"
    document.form2.submit()
}




