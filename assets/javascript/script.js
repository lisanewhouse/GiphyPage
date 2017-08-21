// $(document).ready(function() {

  var animalButton = ["dog", "cat", "rabbit", "hamster", "turtle", "octpus", "newt", "crocodile", "capybara", "aligator", "python", "horny toad", "tuatara",];
    console.log(animalButton);

  function displayAnimal() {

    // Event listener for all button elements
    $("button").on("click", function() {
      // console.log("click");
      var animal = $(this).attr("data-animal");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=52e458d2f5e64c0598c83308d84af489&limit=15";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          console.log(response);
          var results = response.data;
          
          // console.log(function(data) {("success got data", data); });


          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'></div>");
              // var imageURL = response.data.image_original_url;
              // Creating an image tag
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);

              var animalImage = $("<img>");
              // console.log(animalImage)
              // animalImage.attr("src", imageURL);
              // animalImage.attr("alt", "animal image");
              animalImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(animalImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });

  }

    function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#animal-buttons").empty();
        // Loops through the array of movies
        for (var i = 0; i < animalButton.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("animal");
          // Added a data-attribute
          a.attr("data-animal", animalButton[i]);
          // Provided the initial button text
          a.text(animalButton[i]);
          // Added the button to the buttons-view div
          $("#animal-buttons").append(a);
        }
    }
    
    $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var animal = $("#animal-input").val().trim();

        // The movie from the textbox is then added to our array
        animalButton.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        console.log(animal);
    });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".animal", displayAnimal);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

    

  //document ready function closer
  // });



  