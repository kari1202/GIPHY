
var animals = ["kitten", "puppy", "bird", "elephant", "monkey", "frog", "squirrel", "chicken"];

var apiKey = "TrWftTJtZQiw6rHMt6Iy5bHg8179Ty85";

function createAnimalButtons() {

    for (i=0; i<animals.length; i++) {

        if (!document.getElementById(animals[i])) {
            var animalButton = '<button type="button" class="btn btn-primary animal-button" id="' + animals[i] + '">' + animals[i] + "</button>";
            $(".main").append(animalButton);
            console.log('Button does not exist...adding');
        }
        console.log(animalButton);
    }
}

$(document).on("click", ".animal-button", function() {

    console.log('The animals array looks like this: ' + animals);

    var animalID = $(this).attr("id");
    console.log("animal id is " + animalID);

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + animalID + "&limit=10";
    console.log(queryURL);


    $.ajax({
        url: queryURL, 
        method: "GET"
    })
    .then(function(response) {

        console.log(response);

        var results = response.data;
        console.log('Results: ' + results);

        for (i=0; i<results.length; i++) {

            console.log('Results are: ' + results[i]);

            var animalDiv = $("<div>");
            var animalImg = $("<img>");

            var p = $("<p>").html("Title: " + results[i].title + "<br/>Rating: " + results[i].rating);

            animalImg.attr("src", results[i].images.fixed_height_still.url);
            animalImg.attr("data-still", results[i].images.fixed_height_still.url);
            animalImg.attr("data-animate", results[i].images.fixed_height.url);
            animalImg.attr("data-state", "still");
            animalImg.attr("class", "gif");

            animalDiv.append(animalImg);
            animalDiv.append(p);

            $(".gifs-main").prepend(animalDiv);

        }
    })
})

$(".btn-new-animal").on("click", function(event) {

    event.preventDefault();

    var newAnimal = $("#newInputAnimal").val().trim();
    console.log('new animal is: ' + newAnimal);
    animals.push(newAnimal);
    console.log('new animal array: ' + animals);
    createAnimalButtons();

    $("#newInputAnimal").val(" ");

})

$(document).on("click", ".gif", function() {

//$(".gif").on("click", function() {

    var state = $(this).attr("data-state");
    console.log('GIF State: ' + state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

createAnimalButtons();

