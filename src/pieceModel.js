/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var CHESS = CHESS || {};
CHESS.Models = CHESS.Models || {};


CHESS.Models.Piece = function(t,id){
    var pieceUrl = {
        1:'images/wp.png',
        2:'images/wr.png',
        3:'images/wn.png',
        4:'images/wb.png',
        5:'images/wq.png',
        6:'images/wk.png',
        7:'images/bp.png',
        8:'images/br.png',
        9:'images/bn.png',
        10:'images/bb.png',
        11:'images/bq.png',
        12:'images/bk.png'
    };
    var typeToPgnArr = {
        1:'P',
        2:'R',
        3:'N',
        4:'B',
        5:'Q',
        6:'K',
        7:'P',
        8:'R',
        9:'N',
        10:'B',
        11:'Q',
        12:'K'
    }
    var color;
    var type = t;
    var url;
    var posid = id;
    var selected = false;    
    this.getColor = function(){
        return color;
    }
    this.getType = function(){
        return type;
    }
    this.getTypeToPgn = function(){
        return typeToPgnArr[type];
    }
    this.getUrl = function(){
        return url;
    }
    this.getPositionId = function(){
        return posid;
    }    
    this.setPositionId = function(id){
        posid = id;
    }    
    this.getSelected = function(){
        return selected;
    }
    this.getPieceUrl = function(type){
        return pieceUrl[type];
    }
    (function(){
        if(type>6){
            color = 'black';
        }else{
            color = 'white';
        }
        url = pieceUrl[type];
    }());
}