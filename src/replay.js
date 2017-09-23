/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var CHESS = CHESS || {};
CHESS.Views = CHESS.Views || {};
CHESS.Models = CHESS.Models || {};

CHESS.Models.Replay = function(){
    var moveIds = [];
    var moveNum = 0;
    this.addMoveIds = function(ids){
        moveIds[moveNum] = ids;
        moveNum++;
        console.log('moveIds ',moveIds);
    }
    this.getMoveIds = function(){
        return moveIds;
    }
    this.play = function(){
        var replayMove = 0;
        var piece,movePos,moveType
        var refreshId = setInterval( function() 
        {
            if(replayMove < moveIds.length){
                console.log(moveIds[replayMove][0]);
                piece = moveIds[replayMove][0];
                movePos = moveIds[replayMove][1];
                piece.replay = true;
                moveType = moveIds[replayMove][2];
                if(moveType == 'move'){
                   piece.move(movePos); 
                }else{
                    piece.exchange({exchanged:movePos});
                }
                replayMove++;
            }else{
                clearInterval(refreshId);
            }
        }, 1000);
    }
}

CHESS.Views.Replay = function(){
     
    }