/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var CHESS = CHESS || {};
CHESS.Views = CHESS.Views || {};


CHESS.Views.Board = function(data){
    this.getElement = function(id,cls){       
        var el = document.createElement('div');        
        el.setAttribute('class', cls);
        el.setAttribute('id', 'id'+id);
        return el;
    } 
    var _this = this;
    this.model = data;
    this.model.selectPieceEvent.subscribe(function (sender, args) {
        _this.selectPiece(args);
    });
    this.model.movePieceEvent.subscribe(function (sender, args) {
        _this.movePiece(args);
    });
    this.model.exchangePieceEvent.subscribe(function (sender, args) {
        _this.exchangePiece(args);
    });
    this.selectSquareEvent = new Event(this);
    this.pieceClickedEvent = new Event(this);
    
    this.offset = this.model.getIdToAbsPosition();
}
CHESS.Views.Board.prototype = {
    drawBoard:function(){                
        var docFrag = $('#idBoardContainer');
        var left,top;
        var i,el,white=false,pgn;
        var _this = this;
        for(i=0;i<64;i++){
            if(i%8 == 0){
                white = white?false:true;
            }
            if(white){
                el = this.getElement(i,'clsWhiteBg clsSqure');
                white = false;
            }else{
                el = this.getElement(i,'clsBlackBg clsSqure');
                white = true;
            }      
            docFrag.append(el);         
        }         
        $('#idBoardContainer > div').bind('click', function(e){
            var sqid = e.currentTarget.id.substring(2);
            _this.selectSquareEvent.notify(sqid);
        })
    },
    initPieces : function(){
        var boardArr = this.model.getBoard();
        var i,len = boardArr.length,data,piece;
        for(i=0;i<len;i+=1){
            if(boardArr[i] !== 0){
                data = new CHESS.Models.Piece(boardArr[i],i);
                piece = new CHESS.Views.Piece(data,this);
                boardArr[i] = piece;
                piece.init();
                this.model.addPiece(piece);
            }
        }
    },
    resetPieces : function(){
        var pieceArr = this.model.getPieces();
        var board = this.model.getRefBoard();
        var i,len = pieceArr.length,piece;
        for(i=0;i<len;i+=1){
            pieceArr[i].resetPos();
        }
    },
    clearBoard:function(){
        //$( "#pieceContainer" ).empty();
        this.resetPieces();
    },
    selectPiece:function(obj){  
        obj.select();        
    },
    movePiece:function(e){        
        var sqid = e.moveId;
        e.selected.move(sqid);
    },
    exchangePiece:function(e){
        e.selected.exchange(e);
    }
}
