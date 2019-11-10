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

// variables
var holes = document.querySelectorAll('.hole');
var scoreBoard = document.querySelectorAll('.score');
var gophers = document.querySelectorAll('.gopher');
var lastHole;
var idx;

// Fucnction to give random amount of time
function randomTime(min,max){
    return Math.round(Math.random() * (max - min) + min);
}

// Funnction to pick random holes
function randomHole(holes){
    var idx = Math.floor(Math.random() * holes.length);
    var hole = holes[idx];
    if(hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// makes gophers peek out of hole
function peep() {
    var time = randomTime(200, 1000);
    var hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }
  // function that starts the game sets variables accordingly
  function startGame() {
    scoreBoard.innerhtml = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000)
  }
  // function that changes the score and hides the gopher after it was bonked
  function bonk(e) {
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.innerhtml = score;
    console.log("Score: " + score);
  }
  // event listener for when the gopher is bonked
  gophers.forEach(gopher => gopher.addEventListener('click', bonk));

  document.getElementById("startBtn").addEventListener("click", function () {    // This is the handler for the button which starts
               
    startGame();                                                            // clicked. 
});