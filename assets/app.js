$(document).ready(function() {
    // Global Variables
    var artistsArr = ["Drake", "Michael Jackson", "Beyonce", "Nirvana", "The Rolling Stones", "Ozzy Osbourne"];
    var musicInput;
    var musicArtist;




function applyButtons(){
    //Displays buttons from the artistArr array 
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
    // The buttons will change colors when the arrow is on the button
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

            // Sets the variable for the rating
            var rated = $('<p>')
            rated.text('Rating: ' + response.data[i].rating);
            divMusic.append(rated);
            
            // Sets the variable for the images
            var showImages = $('<img>')
            // Sets attribute to grab the image source, or src
            showImages.attr("src", response.data[i].images.original_still.url);
             // Sets attribute for the image source and set it to data-still
            //  So image will be still
            showImages.attr("data-still", response.data[i].images.original_still.url);
             // Sets attribute for the image source and set it to data-animate
            //  So image will animate
            showImages.attr("data-animate", response.data[i].images.original.url);
            // Sets the image to still
            showImages.attr("data-state", "still");
            // Adds class to the img element
            showImages.addClass("gifMusic");
            divMusic.append(showImages);

          $('#musicImages').append(divMusic);
          $('#musicImages').addClass("col-lg-6");
           

       } 
       


        $('.gifMusic').click(function(){

             // Sets the variable called 'state'
             // Grabs the 'data-state' from the img element.
             // $(this) represents the .gifMusic class.
             var state = $(this).attr('data-state');
    
             // This condition of whenever the user clicked the image
             // If the user clicked image that is still, the src will be updated
             // and it will animate. If the user clicked the image that animates
            //  the src will be updated again and it will be still. And vice versa.
             if (state === 'still'){
                 $(this).attr('src', $(this).attr('data-animate'));
                 $(this).attr('data-state', 'animate');
            } else if (state ==='animate'){
                    $(this).attr('src', $(this).attr('data-still'));
                    $(this).attr('data-state', 'still');
            }
            
          }); 

          $('.gifMusic').css({'cursor': 'pointer'});



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