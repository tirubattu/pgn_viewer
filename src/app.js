var CHESS = CHESS || {};
CHESS.Views = CHESS.Views || {};
CHESS.Models = CHESS.Models || {};
/*
 * Mediator is game control, which knows 
 * everything about all the modules
 */
CHESS.mediator = (function(){    
    var boardData;
    var boardView;    
    var pgnView;
    var pgnModel;
    
    var Game = function(){
        this.init=function(){   
            boardData = CHESS.Models.Board();
            boardView = new CHESS.Views.Board(boardData);            
            boardView.drawBoard();
            boardView.initPieces();
            var boardController = new CHESS.Controller.Board(boardData,boardView);
            pgnModel = CHESS.Models.Pgn();
            pgnView = new CHESS.Views.Pgn(boardData,pgnModel,boardData);
            CHESS.Controllers.PgnController(pgnModel,pgnView,boardView);
        }
    }
    var instance;
    return{
        getInstance: function () {
            if (instance === undefined) {
                instance = new Game();
            }
            return instance;
        }
    }
}());
$(function(){
    var game = CHESS.mediator.getInstance();
    game.init();
});


