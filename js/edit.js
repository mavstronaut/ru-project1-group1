/* Commenting this code out temporarily
var link = localStorage.getItem("img")
console.log(link)
$(".editor").html(`<img src="${link}" class="editor"/>`);
*/
// existing code from edit.js; this gets the searched image from localstorage

$(document).ready(function () {	

randomFacts()

var link = localStorage.getItem("img")
console.log(link)
// loads image into the div
/* <img src="${link}"/> */
// $("#canvas-wrap").html(`<canvas style="display:block" id="imageCanvas"><canvas id="canvasID"></canvas></canvas>`);

// this is the default text displayed on load, I'm adding the Chuck Norris joke API to fill this in on default

var text_title = " ";

// chuck norris
function randomFacts(){
    var xmlhttp = new XMLHttpRequest();
    var churl = "https://api.chucknorris.io/jokes/random";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            var json = JSON.parse(this.responseText);  
			parseResponse(json);
			DrawText();
			DynamicText(img);
        }
};
xmlhttp.open("GET", churl, true);
xmlhttp.send();
}

function parseResponse(json){
 text_title =  json["value"];
 console.log(text_title);
}

document.getElementById("logo").addEventListener("click", function(){
randomFacts();
});



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
// img.src = link
// this modifies the CORS to allow us to make changes to the image
img.crossOrigin = "anonymous";
DrawPlaceHolder(link);
// listens for the page to load, then calls the function "drawplaceholder"
// window.addEventListener('load', DrawPlaceHolder);

// on load draw function
function DrawPlaceHolder() {
	img.src = link;
	img.onload = function () {
		LinkDrawOverlay(img);
		DrawText();
		DynamicText(img);
	};
	
};

function DynamicText(img) {
	document.getElementById('name').addEventListener('keyup', function() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  DrawOverlay(img);
	  DrawText(); 
	  text_title = this.value;
	  ctx.font = "60px impact";
	  ctx.fillText(text_title, 50, 50);
	});
  }

//creates the location where the text will be drawn
function DrawOverlay(img) {
	// canvas.width = img.width;
	// canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	ctx.fillStyle = 'rgba(30, 144, 255, 0.4)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};

function LinkDrawOverlay(img) {
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	ctx.fillStyle = 'rgba(30, 144, 255, 0.4)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};


// creates the text itself 
function DrawText() {
	ctx.fillStyle = "white";
	ctx.textBaseline = 'middle';

	ctx.font = "60px impact";

	ctx.fillText(text_title, 50, 50);

};

// this function uplaods an image
async function handleImage(e) {
	try {
	var reader = new FileReader();
	var img = "";
	var src = "";
	reader.onload = function (event) {
		img = new Image();
		img.onload = function () {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
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
	} catch {
		console.log("sad handleImage function")
	}
};

// declaring a variable which can be saved when the file is downloaded to use in the gift API
var completedImage = ""
// is this also a method we need to re-write to save the image+text overlay after we complete editing?
function convertToImage() {
	// window.open(canvas.toDataURL('png'));
	completedImage = canvas.toDataURL('png');
	return completedImage
};


//this would allow us to download the image to local as a png file
// did I properly write this onclick function?
$('#download').on('click', function (event) {
	var dlimage = convertToImage();
	var a = document.createElement('a');
	a.setAttribute('href', 'data:image/png;'+dlimage);
	a.setAttribute('download', $("#name").val());

	a.style.display = 'none';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);

});


// I still doubt that this is going to work, unless I hear back from a representative
// They denied my application and we DO need a valid API key
$("#buyGift").on("click", function () {

	var request = new XMLHttpRequest();

	request.open('POST', 'https://represent.com/api/fulfilment/orders?buyGift=' + link);

	request.setRequestHeader('Content-Type', 'application/json');
	request.setRequestHeader('Authorization', 'Bearer test_4fd5d4af12eb98fc9d6a');

	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			console.log('Status:', this.status);
			console.log('Headers:', this.getAllResponseHeaders());
			console.log('Body:', this.responseText);
		}
	};

	var body = {
		'type': 'order',
		'reference': '<your-reference-id>',
		'products': [
			{
				'product_id': 12345,
				'variant_id': 'black',
				'size': 'M',
				'quantity': 1
			},
			{
				'product_id': 12345,
				'variant_id': 'white',
				'size': 'S',
				'quantity': 1
			}
		],
		'to_address': {
			'full_name': 'John Doe',
			'shipping1': '1680 Vine St',
			'shipping2': 'Suite 400',
			'city': 'Los Angeles',
			'zip': '90028',
			'state': 'CA',
			'country': 'US'
		}
	};

	request.send(JSON.stringify(body));
});

});
