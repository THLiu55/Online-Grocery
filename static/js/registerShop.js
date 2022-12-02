// get register shop button
const register_shop_btn = document.getElementById("shop-register");
const profile_back_btn = document.getElementById("profile-back-btn");

// get picture input
const picture_input_file = document.getElementById("shop-logo-input");

// to have an overview of the logo
picture_input_file.addEventListener("change", function () {
    // when uploading picture, we get picture file
    const { files } = this;
    // get the first file
    if (files.length >= 2){
        files[0].remove();
    }
    const pic = files[0];
    // preview this picture
    const pic_preview = document.getElementById("preview-pic");
    pic_preview.src = URL.createObjectURL(pic);

})

// from login page to register page
function go_to_register() {
    let register_frame = document.getElementsByClassName("register-component")[0];
    register_frame.style.visibility = `visible`;
    register_frame.style.opacity = `1`;
    let profile_back_effect = document.getElementsByClassName("profile_back_effect")[0];
    profile_back_effect.style.visibility = `visible`;
    profile_back_effect.style.opacity = `1`;
}

// from register page back to login page
profile_back_btn.addEventListener("click", function () {
    // close the frame (The parent of the back button is forget password component)
    event.target.parentNode.style.visibility = `hidden`;
    event.target.parentNode.style.opacity = `0`;

    let profile_back_effect = document.getElementsByClassName("profile_back_effect")[0];
    profile_back_effect.style.visibility = `hidden`;
    profile_back_effect.style.opacity = `0`;
})

