
var dataAnimal = ["Dog", "Cat", "Bird", "Human", "Duck", "Chicken"];

function display() {
    var animal = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=yvXJzv4KKcrFh8QjsuR5r0zELSaRC69Z";

    
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
        console.log(queryURL);
        console.log(response); 

        var results = response.data; 

        

        for (var i=0; i<10; i++) {

            var animalDiv = $("<div class=gif-display>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var animalImag = $("<img>");

            animalImag.attr("src", results[i].images.fixed_height.url);
            animalImag.attr("data-still",results[i].images.fixed_height.url);
            animalImag.attr("data-animate", results[i].images.fixed_height_still.url);
            animalImag.attr("data-state", "animate");
            
    
            animalDiv.append(p);
            animalDiv.append(animalImag);
            
            //p.append(animalImag); 
            $('#content').prepend(animalDiv); 

        }

    });
}

 $(document.body).on('click', 'img', function(){
     if($(this).attr("data-state")==="animate") {
         $(this).attr("src", $(this).attr("data-still"));
         $(this).attr("data-state","still");
         
     } else {
         $(this).attr("src", $(this).attr("data-animate"));
         $(this).attr("data-state", "animate"); 
     }
 }); 

function renderButtons() {

    $('#button-group').empty();

    for (var i = 0; i< dataAnimal.length; i++) {

        var a= $("<button>");
        a.addClass("animal-button");
        a.attr("data-name", dataAnimal[i]);
        a.text(dataAnimal[i]);
        $('#button-group').append(a); 
    }
}


$('#add-gif').on('click', function(event) {
    event.preventDefault();
    var animal = $("#gif-input").val().trim();
    dataAnimal.push(animal);
    renderButtons();
});

$(document).on('click', ".animal-button", display);

renderButtons(); 
