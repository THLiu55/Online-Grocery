// get add good button
const add_good_btn = document.getElementById("products-add");
const back_btn = document.getElementById("add-product-back-btn");

// get picture input
const product_input_file = document.getElementById("good-pic-upload");

product_input_file.addEventListener("change", function () {
    // when uploading picture, we get picture file
    const { files } = this;
    // get the first file
    if (files.length >= 2){
        files[0].remove();
    }
    const pic = files[0];
    // preview this picture
    const pic_preview = document.getElementById("preview-pic-good");
    pic_preview.src = URL.createObjectURL(pic);
})

// add event
add_good_btn.addEventListener("click", function () {
     let register_frame = document.getElementsByClassName("register-component")[1];
    register_frame.style.visibility = `visible`;
    register_frame.style.opacity = `1`;
    let profile_back_effect = document.getElementsByClassName("profile_back_effect")[0];
    profile_back_effect.style.visibility = `visible`;
    profile_back_effect.style.opacity = `1`;
})

back_btn.addEventListener("click", function (event) {
    // close the frame (The parent of the back button is forget password component)
    event.target.parentNode.style.visibility = `hidden`;
    event.target.parentNode.style.opacity = `0`;

    let profile_back_effect = document.getElementsByClassName("profile_back_effect")[0];
    profile_back_effect.style.visibility = `hidden`;
    profile_back_effect.style.opacity = `0`;
})




