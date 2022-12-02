// aims to achieve the slider of shopping cart items
let slider = document.getElementById("slider");

// set the margin of div of shopping cart
// -- get a single <li>
let single_li = document.getElementsByClassName("card-item")[0];
// -- get the width of a single <li>
let single_li_length = window.getComputedStyle(document.getElementsByClassName("card-item")[0]).width;
// -- get the margin of a single <li>
let single_li_margin = window.getComputedStyle(document.getElementsByClassName("card-item")[0]).margin;
// -- compute the total length of <li>s in a line
let total_length = 4 * (parseInt(single_li_length) + 2 * parseInt(single_li_margin));
// -- get the width of the window
let window_width = window.screen.width;
console.log(window_width);
// -- compute the margin
let margin_cart = (window_width - total_length) / 2;
console.log(margin_cart);
// set the margin
let cart_area = document.getElementsByClassName("shopping-cart-present")[0];
cart_area.style.marginLeft = (margin_cart+16) + 'px';
cart_area.style.marginRight = (margin_cart+16) + 'px';