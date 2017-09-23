/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Event(pub){
    this.publisher = pub;
    this.subscribers = [];
}

Event.prototype = {
    notify:function(args){
        var i,len=this.subscribers.length;
        for(i=0;i<len;i++){
            this.subscribers[i](this.publisher,args);
        }
    },
    subscribe:function(fn){
        this.subscribers.push(fn);
    }
}
