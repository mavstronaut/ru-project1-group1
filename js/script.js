var text_title ="Overlay text";
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var img = new Image();
var imgUrl = [];
img.crossOrigin="anonymous";

window.addEventListener('load', DrawPlaceholder)


    $("#SearchButton").on("click", function (event) {
        event.preventDefault();
        var imgSearch = $("#SearchImage").val().trim();
        console.log(imgSearch);

        var queryURL = `https://pixabay.com/api/?key=13047378-53a3deeca335efb67ec1a09e6&q="${imgSearch}"&image_type=photo`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            imgUrl = []
            for (i = 0; i < 12; i++) {
                var res = response.hits[i].largeImageURL
                imgUrl.push(res)
                console.log(imgUrl)
            }

            $(".gifimages").html("")

            for (i = 0; i < 12; i++) {
                $(".gifimages").append(`<a href="editor.html"><img class="results" src="${imgUrl[i]}"/></a>`)
    
            }

        });
    });


$(document).on('click', "img", function (event) {
    var localLink = $(this).attr("src")

    localStorage.clear();
    localStorage.setItem("img", localLink);

    console.log(localStorage);

});

//adding txt to canvas
function DrawPlaceholder() {
    img.onload = function() {
        DrawOverlay(img);
        DrawText();
        DynamicText(img)
    };
    img.src = 'https://unsplash.it/400/400/?random';
  
}
function DrawOverlay(img) {
    ctx.drawImage(img,0,0);
    ctx.fillStyle = 'rgba(30, 144, 255, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function DrawText() {
    ctx.fillStyle = "white";
    ctx.textBaseline = 'middle';
    ctx.font = "50px 'Montserrat'";
    ctx.fillText(text_title, 50, 50);
}
function DynamicText(img) {
  document.getElementById('input-text').addEventListener('keyup', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DrawOverlay(img);
    DrawText(); 
    text_title = this.value;
    ctx.fillText(text_title, 50, 50);
  });
}
function handleImage(e) {
    var reader = new FileReader();
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

    reader.readAsDataURL(e.target.files[0]); 
 
}
function convertToImage() {
	window.open(canvas.toDataURL('png'));
}
document.getElementById('download').onclick = function download() {
		convertToImage();
}




  

