function Bricks(spec, context){
    'use strict';
    var rowCount = []
    
    function checkScore(row){
        var score = 0;
        if(rowCount[row] < 14){
            if(row == 7||row == 6){
                rowCount[row]++;
                score += 1;
            }else if(row == 5||row == 4){
                rowCount[row]++;
                score += 2;
            }else if(row == 3||row == 2){
                rowCount[row]++;
                score += 3;
            }else if(row == 1||row == 0){
                rowCount[row]++;
                score += 5;
            }
        }
        if(rowCount[row] == 14){
            score += 25;
            rowCount[row] += 100;
        }
        return score;
    }

    var that = {},
         brickRowCount = 8,
         brickColCount = 14,
         brickWidth = spec.width,
         brickHeight = spec.height,
         brickPadding = spec.padding,
         brickOffsetTop = spec.offSetTop,
         brickOffsetLeft = spec.offSetLeft,
         topGone = false,
         topOnce = false,
         bricksGone = 0,
         startOver = false,
         brickfield = [];

        that.buildField = function(){
            startOver = false;
            bricksGone = 0;
            for(var c=0; c<brickColCount; c++) {
                brickfield[c] = [];
                for(var r=0; r<brickRowCount; r++) {
                    brickfield[c][r] = { x: 0, y: 0, status: 1, scored: 1};
                }
            }
            for(var i = 0; i < 8; i++){
                rowCount[i] = 0;
            }
        };
        that.startAgain = function(){
            return startOver
        };
        that.checkTop = function(){
            if(!topOnce){
                return topGone;
                topOnce = true
            }else{
                return false;
            }
        };
        that.reset = function(){
            topGone = false;
            topOnce = false;
        };
        that.drawBricks = function() {
            for(var c=0;c<brickColCount;c++) {
                for(var r=0;r<brickRowCount;r++) {
                    if(brickfield[c][r].status == 1){
                        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                        brickfield[c][r].x = brickX;
                        brickfield[c][r].y = brickY;
                        context.beginPath();
                        context.rect(brickX,brickY,brickWidth,brickHeight);
                        if(r==6||r==7){
                            context.fillStyle = "#ebff3d";
                        }
                        else if(r==4||r==5) {
                            context.fillStyle = "#ff7200";
                        }
                        else if(r==2||r==3) {
                            context.fillStyle = "#3842ff";
                        }
                        else if(r==0||r==1) {
                            context.fillStyle = "#08a500";
                        }
                        context.fill();
                        context.closePath();
                    }
                }
            }

        }
        that.collisionDetection = function(ball) {
            // console.log(ball);
            var score = 0;
            for(var c=0;c<brickColCount;c++) {
                for(var r=0;r<brickRowCount;r++){
                    var b = brickfield[c][r];
                    if(b.status == 1){
                        b.status = ball.brickCollision(b.x,b.y,brickWidth,brickHeight, c);
                        if(b.status == 0){
                            score = checkScore(r);
                            bricksGone += 1;
                            if(bricksGone == 122){
                                startOver = true;
                            }
                            if(r == 0){
                                if(!topGone){
                                    topGone = true;
                                }
                            }
                        }
                    }
                }
            }
            return score;
        }
    return that;
}