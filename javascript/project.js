console.log("link");

// function imageSearch(images) {

  // Querying the images
  
  
  var queryURL = "https://pixabay.com/api/" + "cat" + "13029028-9381a11b0fa22374fee40bef8";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Printing the entire object to console
    console.log(response);


    var artistImage = $("<img>").attr("src", response.thumb_url);
    
   
   

    // Empty the contents of the image-div, 
    $("#image-view").empty();
    $("#image-view").append(artistImage);
  });
// }

// Event handler for user clicking the searching images  button
$("SearchButton").on("click", function(event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();
  // Storing the image name
  var inputImage = $("#SearchImage").val().trim();

  // Running the imageSearch function
  imageSearch(inputImage);
});