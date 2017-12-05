function Interface(context){
    'use strict';
    function drawLives(paddles){
        for(var i = 0; i < paddles; i++){
            context.beginPath();
            if(i == 0){
                
                context.rect(730, 37.5, 60, 10);
            }else if(i == 1){
                
                context.rect(660, 37.5, 60, 10);
            }else if(i == 2){
                
                context.rect(590, 37.5, 60, 10);
            }
            context.fillStyle = "#87000b";
            context.fill();
            context.closePath();
        }
    }
    var that = {},
        score = 0,
        bCount = false,
        scoreTitle = Text({
            text : 'Score: ' + String(score),
		    font : '32px Arial, sans-serif',
		    fill : 'rgba(62, 0, 0, 1)',
		    stroke : 'rgba(206, 66, 244, 1)',
		    pos : {x : 50, y : 25},
        },context),
        counts = Text({
                text : '3',
                font : '100px Arial, sans-serif',
                fill : 'rgba(62, 0, 0, 1)',
                stroke : 'rgba(206, 66, 244, 1)',
                pos : {x : 375, y : 375},
                },context);
        that.drawInterface = function(lives){
            drawLives(lives);
            scoreTitle.draw();
            if(bCount){
                counts.draw();
            }
        };
        that.updateScore = function(s){
            score = s;
            scoreTitle = Text({
            text : 'Score: ' + String(score),
		    font : '32px Arial, sans-serif',
		    fill : 'rgba(62, 0, 0, 1)',
		    stroke : 'rgba(206, 66, 244, 1)',
		    pos : {x : 50, y : 25},
            },context);
        };
        that.countDown = function(){
            var count = 3
            var counter = setInterval(function(){
                bCount = true;
                if(count == 2){
                    counts = Text({
                    text : '2',
                    font : '100px Arial, sans-serif',
                    fill : 'rgba(62, 0, 0, 1)',
                    stroke : 'rgba(206, 66, 244, 1)',
                    pos : {x : 375, y : 375},
                    },context);
                }else if(count == 1){
                    counts = Text({
                    text : '1',
                    font : '100px Arial, sans-serif',
                    fill : 'rgba(62, 0, 0, 1)',
                    stroke : 'rgba(206, 66, 244, 1)',
                    pos : {x : 375, y : 375},
                    },context);
                }else if(count == 0){
                    bCount = false;
                    counts = Text({
                    text : '3',
                    font : '100px Arial, sans-serif',
                    fill : 'rgba(62, 0, 0, 1)',
                    stroke : 'rgba(206, 66, 244, 1)',
                    pos : {x : 375, y : 375},
                    },context);
                    clearInterval(counter);
                }
                count--;
            },1000)
            return true;
        }
    return that;
        
}