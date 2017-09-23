/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var CHESS = CHESS || {};
CHESS.Views = CHESS.Views || {};

CHESS.Views.Piece = function(data,boardView){
    
    this.model = data;
    this.boardView = boardView;
    
    var posid = data.getPositionId();
    var elId = 'piece'+posid;
    var src = data.getUrl();
    var pos = $('#id'+posid)[0];
    var left = pos.offsetLeft+'px';
    var top = pos.offsetTop+'px'; 
    var pieceImg;
    this.zIndex = 0;
    
    this.replay = false;
    
    var _this = this;
    
    this.init = function(){
        var id = 'piece'+posid;
        var parent = $('#pieceContainer');
        var el = document.createElement('img');        
        var elParent = document.createElement('div');
        elParent.setAttribute('id', id);
        elParent.setAttribute('class', 'piece');
        el.setAttribute('src', src);
        elParent.style.position = 'absolute';
        elParent.style.left = left;
        elParent.style.top = top
        elParent.appendChild(el);
        parent.append(elParent);
        pieceImg = $(elParent);
        $(elParent).bind('click', function(e){
            //if(dragging)return;
            //var clickId = _this.model.getPositionId();
            //_this.boardView.pieceClickedEvent.notify(clickId);
            
            });
        $( elParent ).draggable({
            start: function() {
                var clickId = _this.model.getPositionId();
                console.log('start drag ',clickId);
                _this.boardView.pieceClickedEvent.notify(clickId);
                $(this).css("z-index", _this.zIndex = 1000);
            },
            drag: function() {
            //console.log('drag');
            },
            stop: function(e) {
                var l = Math.floor((e.target.offsetLeft-10)/68);
                var t = Math.floor((e.target.offsetTop-10)/68);
                var pos = t*8 + l;
                _this.boardView.pieceClickedEvent.notify(pos);
            },
            snap: ".clsSqure",
            containment: "#idBoardContainer", 
            scroll: true
        });
    }
    this.move = function(id){  
        this.model.setPositionId(id);
        var left = this.boardView.offset[id].left;
        var top = this.boardView.offset[id].top;           
        $('#'+elId).css("z-index", this.zIndex = 100);
        if(this.replay){
            $('#idHilighter1').css('left',left).css('top',top).css('display','block');
            pieceImg.animate({
                left: left,
                top: top
            }, 200 );
            $('#idHilighter2').delay(200).css('left',left).css('top',top).css('display','block');
        }else{
            pieceImg.css('left',left).css('top',top); 
            $('#idHilighter2').css('left',left).css('top',top).css('display','block');
        }
    }
    this.select = function(){
        var id = this.model.getPositionId();
        var left = this.boardView.offset[id].left;
        var top = this.boardView.offset[id].top;
        $('#idHilighter1').css('left',left).css('top',top).css('display','block');
        $('#idHilighter2').css('display','none');
    }
    this.remove = function(){        
        $('#'+elId).hide();
    }
    this.exchange = function(e){
        e.exchanged.remove();
        var id = e.exchanged.model.getPositionId();
        this.move(id);
        $('#'+elId).css("z-index", this.zIndex = 100);
    }
    this.resetPos = function(){
        console.log('reset pos');
        this.model.setPositionId(posid);
        var left = this.boardView.offset[posid].left;
        var top = this.boardView.offset[posid].top;
        console.log('left top',left,top);
        pieceImg.css('left',left).css('top',top);
        $('#'+elId).css("z-index", this.zIndex = 100);
        $('#'+elId).show();
    }
}