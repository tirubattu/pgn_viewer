/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var CHESS = CHESS || {};
CHESS.Controller = CHESS.Controller || {};

CHESS.Controller.Board = function(model,view){
    this._model = model;
    this._view = view;
    var _this = this;
    
    this._view.selectSquareEvent.subscribe(function (sender, args) {
        _this.updateSquareSelected(args);
    });

    this._view.pieceClickedEvent.subscribe(function (sender, args) {
        _this.updatePieceSelected(args);
    });
}
CHESS.Controller.Board.prototype = {
    updateSquareSelected : function (args) {
//        this._model.updateSquareSelection(args);
        this._model.determineMove(args);
    },
    updatePieceSelected : function (args) {
//        this._model.updatePieceSelection(args);
        this._model.determineMove(args);
    }
}