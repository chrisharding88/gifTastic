$(document).ready(function() {
    var artistsArr =[];
    var musicInput;
    var musicArtist;


function applyButtons(){

    $('#button-view').empty();

    for (var i = 0; i < artistsArr.length; i++){

     musicArtist = $('<button>');
     musicArtist.addClass("music");
     musicArtist.attr('data-name', artistsArr[i]);
     musicArtist.html(artistsArr[i]);
     $('#button-view').append(musicArtist);
     

    }

    $(".music").css({'margin': '5px'});


}





$('#addMusicArtist').click(function(){
    event.preventDefault();

    musicInput = $('#music-input').val().trim();

    artistsArr.push(musicInput);

    applyButtons();

});



applyButtons();






});