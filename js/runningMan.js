
// Get the  ReadMe modal
var modal = document.getElementById('runningModal');

// Get the button that opens the modal
var btn = document.getElementById("runningModalButton");

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
var rndm = Math.random() * (300-150) + 150;
var player;
var background;
var myObstacles = [];
var myScore;
var d2 = {
    canvas: document.getElementById("movingCanvas"),
    start: function () {                                                        // The start function handles the creation of the canvas element itself.
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;                                                       // Frame Number is being used to keep track in case we want something to appear
        this.interval = setInterval(updateCanvas, 10);                          // or move at a certain time. Set interval is needed to refresh objects perodically.
       
    },
    clear: function () {                                                          // Clear function is used to remove all objects from the canvas. 
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    
};



// Constructor for player and obsticles. 
function canvasImageObject(width, height, imgSrc, x, y, type) {
    this.type = type;
    this.img = new Image();
    this.img.src = imgSrc;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = .5;
    this.gravitySpeed = 0;
    this.update = function () {
        ctx = d2.context;
        
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = imgSrc;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        var rockbottom = d2.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.hitTop = function(){
        var tippyTop = 0;
        if(this.y < tippyTop){
            this.y = tippyTop;
            this.gravity = 2;
        }
    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

//Constructor for the background:
function canvasBackground(width, height, imgSrc, x, y) {
    this.img = new Image();
    this.img.src = imgSrc;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = d2.context;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);                   // The second drawing is needed for the update position function.
        ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);     // Without it, the image simply "snaps" back to its starting position
    }                                                                                       // and leaves a blank space. 
    // Function that redraws the object on the Canvas:
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x == -(this.width)) {                                      // These if statements are used to reset the image once it has
            this.x = 0;                                                     // crossed the screen, giving the illution of a continuous
        }                                                                   // movement for any other objects drawn in canvas.
        if (this.y == -(this.height)) {
            this.y = 0;
        }
    }
}

// Function that refreshed the Canvas:
function updateCanvas() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (player.crashWith(myObstacles[i])) {
            return;
        } 
    }
    d2.clear();
    
    background.speedX = -5;
    background.update();
    background.newPos();
    myScore.text="SCORE: " + d2.frameNo;
    myScore.update();
    d2.frameNo += 1;
    if ( Math.random()<.004) {
        x = d2.canvas.width;
        myObstacles.push(new canvasImageObject(50, 70, "media/cactus.png", x, 340, 0));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -3;
        myObstacles[i].update();
    }
    player.newPos();
    player.update();
}

// Creates Interval
function everyinterval(n) {
    if ((d2.frameNo / n) % 1 == 0) {return true;}
    return false;
}
// Creates Acceleration
function jump(n) {
    player.gravity = n;
}




// Function that initializes the demo when called.
function startDemo() {                                                      // All objects need to be instantiated here 
    background = new canvasBackground(800, 400, "media/cactusBackground.png", 0, 0);     // before the "start" function is called.
    myScore = new canvasImageObject("30px", "Consolas", "black", 280, 40, "text");
    player = new canvasImageObject(50, 100, "media/runner.png", 10, 150,0);
    player.gravity = 0.10;
    d2.start();
}

// Button event listeners:
document.getElementById("d2Btn").addEventListener("click", function () {    // This is the handler for the button which starts
    document.getElementById("d2Btn").style.display = "none";                // the canvas demo. The button is hidden after being 
    startDemo();                                                            // clicked. 
});
