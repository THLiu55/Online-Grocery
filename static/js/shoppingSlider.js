// aims to achieve the slider of shopping cart items
var slider = document.getElementById("slider");

// set the margin of div of shopping cart
// -- get a single <li>
var single_li = document.getElementsByClassName("card-item")[0];
// -- get the width of a single <li>
var single_li_length = window.getComputedStyle(single_li).width;
// -- get the margin of a single <li>
var single_li_margin = window.getComputedStyle(single_li).margin;
// -- compute the total length of <li>s in a line
var total_length = 4 * (parseInt(single_li_length) + 2 * parseInt(single_li_margin));
// -- get the width of the window
var window_width = window.screen.width;
console.log(window_width);
// -- compute the margin
var margin_cart = (window_width - total_length) / 2;
console.log(margin_cart);
// set the margin
var cart_area = document.getElementsByClassName("shopping-cart-present")[0];
cart_area.style.marginLeft = (margin_cart+16) + 'px';
cart_area.style.marginRight = (margin_cart+16) + 'px';