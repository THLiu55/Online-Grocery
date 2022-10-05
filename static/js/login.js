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
    const fd = new FormData()
    fd.set('email', document.getElementById('email_input').value)
    var xhr = new XMLHttpRequest()
    xhr.onload = function() {
        console.log(JSON.parse(xhr.responseText))
        countDown().then(r => {})
    }
    xhr.open('POST', '/user/register?type=send', false)
    xhr.send(fd)
}

function register() {
    document.form2.action = "/user/register?type=register"
    document.form2.submit()
}

function login() {
    document.form2.action = "/user/login"
    document.form2.submit()
}




