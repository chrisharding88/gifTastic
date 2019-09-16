$(document).ready(function() {
    // Global Variables
    var artistsArr = ["Drake", "Michael Jackson", "Beyonce", "Nirvana", "The Rolling Stones", "Ozzy Osbourne"];
    var musicInput;
    var musicArtist;




function applyButtons(){

    $('#button-view').html('');

    for (var i = 0; i < artistsArr.length; i++){

     musicArtist = artistsArr[i]; 

     //append the button into the DOM, adds a class "music", and sets attribute to data-name
     
     $('#button-view').append(`
     <button class = "music btn btn-primary" data-name = "${musicArtist}">${musicArtist}</button> 
     `);
    }

    //Each button margin is 5 px
    $(".music").css({'margin': '5px'});
    $(".music").hover(function(){$(this).css({'background-color': 'white', 'color':'#066ded'})}, 
    function(){$(this).css({'background-color': '#066ded', 'color':'white'})});



}


function displayImages(){

    // Grabs the data-name from the button element
    var artists = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artists + "&api_key=ZXi2qtax33y3QmASFlQ4LMMLYVESXBhr"; 

    // Plugs in the images after the button is pushed
    //It's only going to show 10 images.
    $('#musicImages').html('');


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        // Setting a for loop to display 10 images along with the ratings.
       for (let i = 0; i < 10; i++) {

            var divMusic = $('<div>');
            divMusic.addClass('divMusic');

            var rated = $('<p>')
            rated.text('Rating: ' + response.data[i].rating);
            divMusic.append(rated);
            
            var showImages = $('<img>')
            showImages.attr("src", response.data[i].images.original_still.url);
            showImages.attr("data-still", response.data[i].images.original_still.url);
            showImages.attr("data-animate", response.data[i].images.original.url);
            showImages.attr("data-state", "still");
            showImages.addClass("gifMusic");
            divMusic.append(showImages);

          $('#musicImages').append(divMusic);
          $('#musicImages').addClass("col-lg-6");


       }

       console.log(response);
       
    });



}


$('#addMusicArtist').click(function(event){
    //Resets after submit
    event.preventDefault();

    musicInput = $('#music-input').val().trim();

    // Clears out the text in the textbox after it's submitted
    $('#music-input').val("");

    artistsArr.push(musicInput);

    // Executes the applyButtons function after it's submitted
    applyButtons();

});



$(document).on('click', '.music', displayImages);


applyButtons();






});