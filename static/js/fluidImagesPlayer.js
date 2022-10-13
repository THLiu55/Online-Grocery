// the logic of timer
let left = 0;
// get the <ul> image list
let image_list = document.getElementById("image-list");
// the total number of image blocks
let images_number = document.getElementsByClassName("block-item").length;
// the total length of image list
let image_length = parseInt(window.getComputedStyle(image_list).width);
// length of a single image block
let single_length = image_length / images_number;
// get prev and next block
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

// show the direction of turning page operation
let go_next = true
let nextClickable = true;
let prevClickable = true;
let speed = 1

prev.onclick = function() {
    if (prevClickable) {
        go_next = false
        prevClickable = false
        turnToPrevPage()
    }
}

function turnToPrevPage() {
    // if all the pictures are traveled, recycle
    if (left >= 0) {
        left = -400
    }

    // pull pictures to right (one frame)
    if (!go_next) {
        left += speed
        image_list.style.marginLeft = left + "%";
    } else {
        return;
    }

    // if the picture fully disappear
    if (left % 100 === 0) {
        go_next = true
        prevClickable = true
        nextClickable = true
        return
    }
    setTimeout(turnToPrevPage, 1)
}

next.onclick = function() {
    if (nextClickable) {
        go_next = true
        nextClickable = false;
        turnToNextPage()
    }
}

function turnToNextPage() {
    // if all picture are travelled, recycle
    if (left <= -400){
        left = 0;
    }

    if (go_next) {
        left -= 1
        image_list.style.marginLeft = left + "%";
    } else {
        return
    }

    // if the picture fully disappear
    if (left % 100 === 0) {
        go_next = true
        prevClickable = true
        nextClickable = true
        return
    }
    setTimeout(turnToNextPage, 1)
}