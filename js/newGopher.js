// Get the modal
var modal = document.getElementById('whackAGopherModal');

// Get the button that opens the modal
var btn = document.getElementById("whackAGopherModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// some code is pulled from https://subscription.packtpub.com/video/game_development/9781789617092/74283/74284/wack-a-mole-introduction
var score = 0;
var gameover = false;
var lastHole = 0;

$(function(){
    $('#start').click(startGame);
    $('.game').on('click','.gopher',hitgopher);
});

function hitgopher(){
    $(this).parent().find('img').show();
    $(this).hide();
    $(this).parent().find('img').fadeOut(1000);
    score++;
    $('.score').text(score);
}

function startGame(){
    makeGameBoard();
    score = 0;
    $('.score').text(score);
    startGophers();
    gameover = false;
    setTimeout(function(){
        return gameend();
    },15000);
}

function gameend(){
    gameover = true;
    $('#message').html('Game Over');
}

function startGophers() {
    var jumpUp = $('.hole' + randomHole() + '> .gopher');
    var timer = Math.round(Math.random() *1000)+200;
    jumpUp.show();
    jumpUp.animate({
        top: '50px'
    }, 1000);
    //console.log(jumpUp);
    setTimeout(function () {
            jumpUp.animate({
                top: '250px'
            }, 1000);
        if(!gameover) startGophers();
        },timer);
    }

    function randomHole() {
        var hole = Math.floor(Math.random() * $('.hole').length);
        if(hole ==lastHole){
            return randomHole();
        }
        lastHole = hole;
        return hole;
        //console.log(hole);
    }

    function makeGameBoard() {
        var gophers = 8;
        var html = ' ';
        for (var gopher = 0; gopher < gophers; gopher++) {
            html += '<div class="hole hole' + gopher + '"><div class="gopher"></div>';
            html += '<img src="../media/splat.png" class="wack"><div class="dirt"></div></div>';
        }
        $('.game').html(html);
    }