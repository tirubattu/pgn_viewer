/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var CHESS = CHESS || {};
CHESS.Models = CHESS.Models || {};

CHESS.Models.Pgn = function(){
    var moveNum = 1;
    var pgnArr = {};
    return{
        getCurMoveNum:function(){
            return moveNum;
        },
        setCurMoveNum:function(val){
            moveNum = val;
        },
        /*
         * @ type = 1 white and 2 is black
         * @move is notation
         */
        addMove:function(num,move,turn){
            if(turn == 'white'){
                pgnArr[num] = {
                    w:move
                };
            }else{
                pgnArr[num].b = move;
            }
        },
        getPgn:function(){
            return pgnArr;
        },
        setPgn:function(val){
            pgnArr = val;
        }
    }
}
