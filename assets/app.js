$(document).ready(function() {
    // Global Variables
    var artistsArr = [];
    var musicInput;
    var musicArtist;


function applyButtons(){

    $('#button-view').empty();

    for (var i = 0; i < artistsArr.length; i++){

     musicArtist = artistsArr[i]; 

     //append the button into the DOM, adds a class "music", and sets attribute to data-name
     $('#button-view').append(`
     <button class = "music" data-name = "${musicArtist}">${musicArtist}</button> 
     `);
    }

    //Each button margin is 5 px
    $(".music").css({'margin': '5px'});


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



applyButtons();






});