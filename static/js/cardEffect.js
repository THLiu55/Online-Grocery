// the effect of the pictures loaded at the first time

//set timer for loading process (timeout)
window.addEventListener('load', function() {

	// setTimeout to simulate the delay from a real page load
	setTimeout(Reload, 1000);

});
//reload function (change the url of card images)
function Reload(){
	var category_images = document.querySelectorAll('.category-image');

	// loop over each card image
	category_images.forEach(function (category_image){
		var new_url = category_image.getAttribute('hover_image');
		var content_image = category_image.querySelector('img');

		//change the image inside the <a> tag
		content_image.src = new_url;

		// listen for load event when the new photo is finished loading
		content_image.addEventListener('load', function() {
			// swap out the visible background image with the new fully downloaded photo
			category_image.style.backgroundImage = 'url(' + new_url+ ')';
			// add a class to remove the blur filter to smoothly transition the image change
			category_image.className = category_image.className + ' loaded';
		});
	})
}
