/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var CHESS = CHESS || {};
CHESS.Views = CHESS.Views || {};

CHESS.Views.Pgn = function(boardData,pgnData){
    this.pgnContainer = $('#pgnContainer');
    this.boardModel = boardData;
    this.getRowTemp = function(){
        var tmp = '<div class="{{rowType}}">'+
        '<span class=num>{{moveNum}}</span>'+
        '<span id="movelistw_{{moveListId}}" class="">{{move1}}</span>'+
        '<span id="movelistb_{{moveListId}}" class="">{{move2}}</span>'+                
        '</div>';
        return tmp;
    }
    this.model = pgnData;
    var _this = this;
    this.boardModel.movePieceEvent.subscribe(function (sender, args) {
        _this.movePiece(args);
    });
    this.boardModel.exchangePieceEvent.subscribe(function (sender, args) {
        _this.movePiece(args);
    });
    this.movePiece = function(args){
        console.log('move piece pgn >>>>> ',args);
        var turn = _this.boardModel.getTurn();
        var num = _this.boardModel.getMoveNum();
        var pgn = getPgn(args);
        var type = args.selected.model.getTypeToPgn();
        var move;
        if(type == 'P'){
            move = pgn;
        }else{
            move = type + pgn;
        }
        var moveData = {
            moveNum:num,
            moveListId:num,
            move:move
        }
        if(turn == 'white'){
            this.whiteMove(moveData);
            this.model.addMove(num,move,'white');
        }else{
            this.blackMove(moveData);
            this.model.addMove(num,move,'black');
        }
        console.log(this.model.getPgn());
    }
    function getPgn(args){
        var pgn;
        var id;
        if(args.moveId){
            pgn = _this.boardModel.getIdToPgn(args.moveId);
        }else{
            id = args.exchanged.model.getPositionId();
            pgn = _this.boardModel.getIdToPgn(id);
        }
        return pgn;
    }
}
CHESS.Views.Pgn.prototype = {           
    whiteMove:function(moveData){
        var num = moveData.moveNum;
        var rowType = (num%2 == 0)?'notationVertical even':'notationVertical'
        var d = {
            moveNum:num,
            moveListId:num,
            move1:moveData.move,
            rowType:rowType
        };          
        var tmp = this.getRowTemp();
        var result = Mustache.render(tmp, d);
        this.pgnContainer.append(result);
        $('#movelistw_'+num).bind('click',moveData,function(e){
            console.log(e.data);
        });
    },
    blackMove:function(moveData){
        var num = moveData.moveNum; 
        var el = document.getElementById('movelistb_'+num);
        el.innerHTML = moveData.move;
        
        $('#movelistb_'+num).bind('click',moveData, function(e){
            console.log(e.data);
        });
    }
}
