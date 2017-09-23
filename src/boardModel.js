/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var CHESS = CHESS || {};
CHESS.Models = CHESS.Models || {};

CHESS.Models.Board = function(){
    var selectedPiece = null;
    var curTurn = 'white';
    var moveNum = 1;
    var boardArr = [
    8,9,10,11,12,10,9,8,
    7,7,7,7,7,7,7,7,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,
    2,3,4,5,6,4,3,2
    ];
    var refBoardArr = [
    8,9,10,11,12,10,9,8,
    7,7,7,7,7,7,7,7,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,
    2,3,4,5,6,4,3,2
    ];
    var pieceObjArr = [];
    var idPgn = [
    'a8','b8','c8','d8','e8','f8','g8','h8',
    'a7','b7','c7','d7','e7','f7','g7','h7',
    'a6','b6','c6','d6','e6','f6','g6','h6',
    'a5','b5','c5','d5','e5','f5','g5','h5',
    'a4','b4','c4','d4','e4','f4','g4','h4',
    'a3','b3','c3','d3','e3','f3','g3','h3',
    'a2','b2','c2','d2','e2','f2','g2','h2',
    'a1','b1','c1','d1','e1','f1','g1','h1'
    ];
    var idToPgnMap = {}; 
    var pgnToIdMap = {}; 
    var idToAbsPosMap = {};  
    var initIdToPgn = function(){
        for(var i=0;i<64;i++){
            idToPgnMap[i] = idPgn[i];
        }
    }   
    var initPgnToId = function(){
        for(var i=0;i<64;i++){
            pgnToIdMap[idPgn[i]] = i;
        }
    }    
    var initAbsPosMap = function(){
        var index = 0;
        for(var i=0;i<8;i++){
            for(var j=0;j<8;j++){
                idToAbsPosMap[index] = {
                    id:i,
                    left:j*68+10,
                    top:i*68+10
                };
                index++;
            }
        }
    }
    initIdToPgn();
    initPgnToId();
    initAbsPosMap();
    var toggleCurMove = function(){
        if(curTurn == 'white'){
            curTurn = 'black'
        }
        else{
            curTurn = 'white'
        }
    }
    
    return{
        replay : new CHESS.Models.Replay(),
        selectPieceEvent : new Event(this),
        movePieceEvent : new Event(this),
        exchangePieceEvent : new Event(this),
        getBoard:function(){
            return boardArr;
        },
        getIdToPgn:function(id){
            return idToPgnMap[id];
        },
        getPgnToId:function(pgn){
            return pgnToIdMap[pgn];
        },
        getIdToAbsPosition:function(){
            return idToAbsPosMap;
        },
        getMoveNum:function(){
            return moveNum;
        },
        setMoveNum:function(){
            if(curTurn == 'white'){
                moveNum += 1;
            }
        },
        getTurn:function(){
            return curTurn;
        },
        updateMove:function(prevPos,curPos,obj){
            boardArr[curPos] = obj;
            boardArr[prevPos] = '0';
        },
        determineMove:function(id){
            var piece = boardArr[id];
            var turn = this.getTurn();
            if(piece && selectedPiece == null){
                this.selectPiece(piece);
                return;
            }
            if(piece == '0' && selectedPiece){
                this.replay.addMoveIds([selectedPiece,id,'move']);
                this.movePiece(id);
                return;
            }
            if(piece && selectedPiece){
                var color = piece.model.getColor();
                if(turn !== color){
                    this.replay.addMoveIds([selectedPiece,piece,'exchange']);
                    this.exchangePiece(piece);
                }
                return;
            }
        },
        updateSquareSelection:function(id){
            if(selectedPiece){
                this.movePiece(id);
            }
        },
        selectPiece:function(obj){
            selectedPiece = obj;
            this.selectPieceEvent.notify(obj);
        },
        movePiece:function(moveId){    
            var prevPos = selectedPiece.model.getPositionId();
            var curPos = moveId;
            this.updateMove(prevPos,curPos,selectedPiece);
            this.movePieceEvent.notify({
                selected:selectedPiece,
                moveId:moveId
            });
            toggleCurMove(); 
            this.setMoveNum();             
            selectedPiece = null;
        },
        exchangePiece:function(movedId){
            var prevPos = selectedPiece.model.getPositionId();
            var curPos = movedId.model.getPositionId();
            this.updateMove(prevPos,curPos,selectedPiece);
            this.exchangePieceEvent.notify({
                selected:selectedPiece,
                exchanged:movedId
            });
            toggleCurMove(); 
            this.setMoveNum();             
            selectedPiece = null; 
        },
        addPiece:function(piece){
            pieceObjArr.push(piece);
        },
        getPieces:function(piece){
            return pieceObjArr;
        },
        getRefBoard:function(){
            return refBoardArr;
        }
    }
}