var files = {
    'images/robot.png' : 0.6,
    'images/twain.png' : 0.7,
    'images/trex.png' : 1,
    'images/poe.png' : 1,
    'images/triceratops.png' : 1,
    'images/t-rex.png' : 1,
    'images/apatosaur.png' : 1,
    'images/raptor.png' : 1,
    'images/spy.png' : 0.8
};

var createQueue = require('../');
var queue = createQueue(files);
queue.appendTo(document.body);

var spot = 15;
var total = 20;
var iv = setInterval(function () {
    spot --;
    total --;
    if (spot === 0) return clearInterval(iv);
    
    queue.spot(spot, total);
    
    if (Math.random() > 0.7) {
        setTimeout(function () {
            total ++;
        }, 500 * Math.random());
    }
}, 500);

/*
setTimeout(function f () {
    if (queue.spots.length === 0) return;
    var s = queue.spots[Math.floor(Math.random() * queue.spots.length)];
    var c = String.fromCharCode(Math.floor(97 + 26 * Math.random()));
    s.showMessage(c);
    setTimeout(f, Math.random() * 6000);
}, 2000);
*/
