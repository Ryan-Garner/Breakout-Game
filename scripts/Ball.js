function Ball(spec, context, particles, index) {
    'use strict';
   var that = {},
    x = spec.x,
    y = spec.y,
    dx = -5,
    dy = -5,
    ballRadius = 10,
    brickCount = 0;

    function speedUp(brickCount){
        if(brickCount == 4){
            dy = -7
        }else if(brickCount == 12){
            dy = -9
        }else if(brickCount == 36){
            dy = -12
        }else if(brickCount == 62){
            dy = -15
        }
    }

    that.drawBall = function(){
        
        context.beginPath();
        context.arc(x,y,ballRadius,0,Math.PI*2);
        context.fillStyle = "#000000";
        context.fill();
        context.closePath

    };
    that.returnHeight = function(){
        return y;
    }
    //moves ball each frame
    that.moveBall = function(){
        x += dx;
        y += dy;
    };
    //check where and if a ball hits a brick
    that.brickCollision = function(bx, by, brickWidth, brickHeight){
        if(x > bx && x < bx+brickWidth && y > by+brickHeight && y < by+(brickHeight+brickHeight)){
            dx += .02*-((bx+(brickWidth/2)) - x)
            dy = -dy;
            brickCount++;
            particles[index] = ParticleSystem({
                image : 'textures/water.png',
			    center: {x: {mean: bx+(brickWidth/2), stdev: brickWidth/2}, y: {mean: by+(brickHeight/2), stdev: brickHeight/2}},
			    speed: {mean: 50, stdev: 25},
			    lifetime: {mean: 1, stdev: 0.5}
		        },context)
                 particles[index].create();
            index++;
            speedUp(brickCount);
            return 0;
        }else if(x > bx && x < bx+brickWidth && y > by && y < by+brickHeight){
            dx += .02*-((bx+(brickWidth/2)) - x)
            dy = -dy;
            brickCount++;
            particles[index] = ParticleSystem({
                image : 'textures/water.png',
			    center: {x: {mean: bx+(brickWidth/2), stdev: brickWidth/2}, y: {mean: by+(brickHeight/2), stdev: brickHeight/2}},
			    speed: {mean: 50, stdev: 25},
			    lifetime: {mean: 1, stdev: 0.5}
		        },context)
            particles[index].create();
            index++;
            speedUp(brickCount);
            return 0;
        }else if(y > by && y < by + brickHeight && x > bx && x < bx-ballRadius){
            dx = -dx
            dy += .02*-((by+(brickWidth/2)) - y);
            brickCount++;
            particles[index] = ParticleSystem({
                image : 'textures/water.png',
			    center: {x: {mean: bx+(brickWidth/2), stdev: brickWidth/2}, y: {mean: by+(brickHeight/2), stdev: brickHeight/2}},
			    speed: {mean: 50, stdev: 25},
			    lifetime: {mean: 1, stdev: 0.5}
		        },context)
                 particles[index].create();
            index++;
            speedUp(brickCount);
            return 0;
        }else if(y > by && y < by + brickHeight && x > bx+brickWidth && x < bx+(brickWidth+ballRadius)) {
            dx = -dx
            dy += .02*-((by+(brickWidth/2)) - y);
            brickCount++;
            particles[index] = ParticleSystem({
                image : 'textures/water.png',
			    center: {x: {mean: bx+(brickWidth/2), stdev: brickWidth/2}, y: {mean: by+(brickHeight/2), stdev: brickHeight/2}},
			    speed: {mean: 50, stdev: 25},
			    lifetime: {mean: 1, stdev: 0.5}
		        },context)
                 particles[index].create();
            index++;
            speedUp(brickCount);
            return 0;
        }else{
            return 1;
        }
        
    };
    //checks if ball hits a wall or the paddle
    that.changeDir = function(paddleX, paddleWidth, width, height){
        var gameOver = false
        if( y + dy  < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > 650-ballRadius) {
            if(x+ballRadius > paddleX && x-ballRadius < paddleX + paddleWidth && y + dy < 660) {
                dx = .2*-((paddleX+(paddleWidth/2)) - x)
                dy = -dy;
            } 
            else if(y + dy > height-ballRadius) {
                gameOver = true;
                
            }
        }
        if(x + dx > width-ballRadius || x + dx  < ballRadius) {
            dx = -dx;
        }
        return gameOver
    };
   return that;
}