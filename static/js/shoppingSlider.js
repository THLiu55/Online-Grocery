// aims to achieve the slider of shopping cart items
var slider = document.getElementById("slider");
var btn_left = document.getElementsByClassName("slider-prev")[0];
var btn_right = document.getElementsByClassName("slider-next")[0];


// add scroll events
btn_left.addEventListener("click", function (){
    slider.scrollLeft -= 125;
});
btn_right.addEventListener("click", function (){
    slider.scrollLeft += 125;
});