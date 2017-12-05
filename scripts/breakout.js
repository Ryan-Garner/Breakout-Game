let canvas = null;
let context = null;

var balls = [];
var bricks = null;

var countdown;
var countdone;
var count = 3;

var score = 0;
var twoBall =0;
var prevScore = 0;

var highScores = {
    one: 100,
    two: 80,
    three: 60,
    four: 40,
    five: 1
}

var lostLife = false;
var lives = 3;

var part = {};
var pIndex = 0;

var paddleHeight = 10;
var paddleWidth = 80;
var paddleX = null;

var leftPressed = false;
var rightPressed = false;

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, 650, paddleWidth, paddleHeight);
    context.fillStyle = "#87000b";
    context.fill();
    context.closePath();
}

function drawWalls() {
    context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(800, 0);
	context.lineTo(800, 750);
	context.lineTo(0, 750);
	context.closePath();
}

function draw() {
    context.clear();
    for(var i = 0; i<balls.length; i++){
        if(balls[i] != 0){
            balls[i].drawBall();
        }
    }
    drawPaddle();
    bricks.drawBricks();
    interface1.drawInterface(lives);
    drawWalls();
}

function updateHighScore(){
    console.log(highScores.five);
    if(score > highScores.one){
        SaveScores.persistence.update(1);
        SaveScores.persistence.add(1, score);
    }else if(score > highScores.two){
        SaveScores.persistence.update(2);
        SaveScores.persistence.add(2, score);
        node = document.getElementById('two');
    }else if(score > highScores.three){
        SaveScores.persistence.update(3);
        SaveScores.persistence.add(3, score);
    }else if(score > highScores.four){
        SaveScores.persistence.update(4);
        SaveScores.persistence.add(4, score);
    }else if(score > highScores.five){
        SaveScores.persistence.add(5, score);
        console.log("what the hell")
    }
}

function update(elapsedTime) {
    var s = 0;
    if(!countdown && countdone){
    //console.log(String(x) + " " + String(y));
        if(rightPressed && paddleX < canvas.width - paddleWidth){
            paddleX += 15;
        }
        else if(leftPressed && paddleX > 0){
            paddleX -= 15;
        }
        for(var i = 0; i<balls.length; i++){
            if(balls[i] != 0){
                lostLife = balls[i].changeDir(paddleX, paddleWidth, canvas.width, canvas.height);
                if(lostLife == true){
                    if(lives == 0){
                        updateHighScore();
                        alert("GAME OVER");

                        document.location.reload();
                    }else{
                        if(balls[1] == 0){
                            lives--
                            countdown = true;
                        }else{
                            if(i == 1){
                                balls[1] = 0;
                            }else{
                                balls[0] = balls[1]
                                balls[1] = 0;
                            }
                        }
                    }
                }
                if(balls[i] != 0){
                    balls[i].moveBall();
                    s += bricks.collisionDetection(balls[i]);
                }
                prevScore = score;
                score += s;
                twoBall += s;
                if(prevScore != score){
                    interface1.updateScore(score);
                }
            }
        }
    }else if(countdown && countdone){
            countdone = false;
            interface1.countDown();
            var counter = setInterval(function(){
                if(count == 0){
                    count = 4;
                    countdone = true;
                    clearInterval(counter);
                }
                count--;
            },1000)
            part = {};
            pIndex = 0;
            paddleWidth = 80;
            twoBall = 0;
            bricks.reset();
            balls[0] = Ball({x,y}, context, part, pIndex);
            balls[1] = 0;
            countdown = false
    }
    x = paddleX+(paddleWidth/2);
    for(value in part){
        if(part.hasOwnProperty(value)){
            part[value].update(elapsedTime);
        }
        
    }
    
    if(bricks.checkTop()){
        paddleWidth = 40;
    }
    if(bricks.startAgain()){
        bricks.buildField();
    }
    if(twoBall > 100){
        twoBall = 0;
        if(balls[1] == 0){
            balls[1] = Ball({x,y}, context, part, pIndex); 
        }
    }
}

function render(elapsedTime) {
    draw();
    for(value in part){
        if(part.hasOwnProperty(value)){
                if(part[value].shouldDie()){
                    delete part[value];
                }else{part[value].render();}
            
        }
    }
	context.strokeStyle = 'rgb(0, 0, 0)';
	context.stroke();
}

let prevTime = performance.now();

function gameLoop(){
    
    update(performance.now()-prevTime);
    render(performance.now()-prevTime);
    prevTime = performance.now();
    if(!cancelgame){
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39){
        
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        
        leftPressed = false;
    }
}
var x;
var y;
var interface1 = null;
function initializegame() {
    document.getElementById('id-game-back').addEventListener(
			'click',
			function() {showScreen('main'); });
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');
    countdown = true;
    countdone = true;
    part = {};
    pIndex = 0;
    lives = 3;
    y = 650-30;
    paddleX = (canvas.width - paddleWidth)/2;
    x = paddleX+(paddleWidth/2);
    balls[0] = Ball({x,y}, context, part, pIndex);
    balls[1] = 0;
    bricks = Bricks({width: 50, height: 20, padding: 5, offSetTop: 75, offSetLeft: 15}, context);
    bricks.buildField();
    interface1 = Interface(context);
    CanvasRenderingContext2D.prototype.clear = function() {
		this.save();
		this.setTransform(1, 0, 0, 1, 0, 0);
		this.clearRect(0, 0, canvas.width, canvas.height);
		this.restore();
	};
}
//Menu Stuff
var cancelgame = true;
function runGame(){
    cancelgame = false
    initializegame()
    requestAnimationFrame(gameLoop);
}
function initialize(){
    initializeMenu();
    initializeCredits();
    initializeHighScores();
    showMenu();
}

function showMenu(){
    showScreen("main")
};

function initializeMenu(){

    document.getElementById('id-new-game').addEventListener(
			'click',
			function() {showScreen('gamePlay'); });
		
		document.getElementById('id-high-scores').addEventListener(
			'click',
			function() {showScreen('highScores'); });
		
		document.getElementById('id-credits').addEventListener(
			'click',
			function() {showScreen('credits'); });

};

function initializeCredits(){
    document.getElementById('id-credits-back').addEventListener(
			'click',
			function() {showScreen('main'); });
};

function initializeHighScores(){
    SaveScores.persistence.report(highScores);
    document.getElementById('id-highScores-back').addEventListener(
			'click',
			function() {showScreen('main');});
    document.getElementById('id-reset-scores').addEventListener(
			'click',
			function() {resetScores();});
};

function resetScores(){
    for(var i = 1; i < 6; i++){
        SaveScores.persistence.remove(i);
    }
    SaveScores.persistence.report(highScores);
};

function showScreen(id) {
		var screen = 0,
			active = null;
		//
		// Remove the active state from all screens.  There should only be one...
		active = document.getElementsByClassName('active');
		for (screen = 0; screen < active.length; screen++) {
			active[screen].classList.remove('active');
		}
		//
		// Then, set the new screen to be active
        document.getElementById(id).classList.add('active');
        if(id == 'gamePlay'){
            runGame();
        }else if(id == 'credits'){
            cancelgame = true;
        }else if(id == 'highScores'){
            cancelgame = true;
        }else if(id == 'main'){
            cancelgame = true;   
        }
		
};

