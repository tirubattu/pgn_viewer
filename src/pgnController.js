/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var CHESS = CHESS || {};
CHESS.Controllers = CHESS.Controllers || {};

CHESS.Controllers.PgnController = function(model,view,bView){
    this.model = model;
    this.view = view;
    var _this = this;
    var boardView = bView;
    $( "#first" ).button({
        text: false,
        icons: {
            primary: "ui-icon-seek-start"
        }
    }).click(function() {
        console.log('beginning');
        boardView.clearBoard();
    });
    $( "#prev" ).button({
        text: false,
        icons: {
            primary: "ui-icon-seek-prev"
        }
    }).click(function() {
        console.log('prev');
    });
    $( "#play" ).button({
        text: false,
        icons: {
            primary: "ui-icon-play"
        }
    }).click(function() {
        boardView.model.replay.play();
    });
    $( "#next" ).button({
        text: false,
        icons: {
            primary: "ui-icon-seek-next"
        }
    }).click(function() {
        console.log('next');
    });
    $( "#last" ).button({
        text: false,
        icons: {
            primary: "ui-icon-seek-end"
        }
    }).click(function() {
        console.log('end');
    });
    $( "#exportPgn" ).button({
    }).click(function() {
        var pgn = _this.model.getPgn();
        console.log('export ',pgn);
    });
    $( "#reset" ).button({
    }).click(function() {
        console.log('export');
    });
}