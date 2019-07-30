// existing code from edit.js; this gets the searched image from localstorage
var link = localStorage.getItem("img")
console.log(link)
// loads image into the div
$(".editor").html(`<img src="${link}" class="editor"/>`);

// this is the default text displayed on load
var text_title = "overlay text";

// this gets the imageLoader id, (which is used to upload images)
var imageLoader = document.getElementById('imageLoader');
	// the event is listening for a file, and calls the handleImage function
	imageLoader.addEventListener('change', handleImage, false);

// gets the canvas element and turns it into a variable we can use
var canvas = document.getElementById('imageCanvas');

//  canvas.js method to set the context for image type
var ctx = canvas.getContext('2d');
// canvas.js method to create, or instantiate, a new image object
var img = new Image();
// this modifies the CORS to allow us to make changes to the image
img.crossOrigin="anonymous";

// listens for the page to load, then calls the function "drawplaceholder"
window.addEventListener('load', DrawPlaceHolder)

// on load draw function
function DrawPlaceHolder() {
	image.onload = function() {
		DrawOverlay(img);
		DrawText();
		DynamicText(img)
	};
	// looking to load the default image as the searched result from the previous page
	img.src = link 
};

//creates the location where the text will be drawn
function DrawOverlay(img) {
	ctx.drawImage(img,0,0);
	ctx.fillStyle = 'rgba(30, 144, 255, 0.4)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// creates the text itself 
function DrawText() {
	ctx.fillStyle = "white";
	ctx.textBaseline = 'middle';
	ctx.font = "50px 'Montserrat'";
	ctx.fillText(text_title, 50, 50);

};

// this function uplaods an image
function handleImage(e) {
	var reader = new FilerReader();
	var img = "";
	var src = "";
	reader.onload = function(event) {
		img = new Image();
		img.onload = function() {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img,0,0);
		}
		img.src = event.target.result;
		src = event.target.result;
		canvas.classList.add("show");
		DrawOverlay(img);
		DrawText();
		DynamicText(img);
	}

	// this method may be helpful to later save and export the image to another API
	reader.readAsDataURL(e.target.files[0]);

};

// is this also a method we need to re-write to save the image+text overlay after we complete editing?
function convertToImage() {
	window.open(canvas.toDataURL('png'));
	completedImage = canvas.toDataURL('png');
};

var completedImage = ""
//this would allow us to download the image to local as a png file
// did I properly write this onclick function?
$('#download').on('click', function (event) {
	convertToImage();
});