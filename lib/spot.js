var $ = require('jquery-browserify');
var yarn = require('../yarn');

module.exports = function (opts) {
    return new Spot(opts);
};

function Spot (opts) {
    var html = yarn('spot.html', [ 'spot.css' ]);
    this.html = html;
    this.element = html.querySelector('.spot');
    this.label = html.querySelector('.label');
    
    this.image = html.querySelector('img');
    this.image.setAttribute('src', opts.file);
    
    this.scale = opts.scale || 1;
    this.size = opts.size;
    this.spot(opts.spot);
}

Spot.prototype.appendTo = function (target) {
    target.appendChild(this.html);
};

Spot.prototype.hideLabel = function () {
    $(this.label).hide();
};

Spot.prototype.showMessage = function (msg) {
    this.showLabel(msg);
    var label = $(this.label);
    
    setTimeout(function () {
        label.fadeOut(2000, function () {
            label.text('');
            label.css('width', 0);
            if (label.type === 'me') {
                label.showLabel('');
            }
        });
    }, 4000);
};

Spot.prototype.showLabel = function (msg) {
    var label = $(this.label);
    if (msg === undefined) {
        label.css('width', 0);
    }
    else {
        label.text(msg);
        label.css('width', 'default');
    }
    label.show();
};

Spot.prototype.setType = function (type) {
    if (type !== this.type) {
        this.element.removeClass(this.type);
    }
    
    this.element.addClass(type);
    this.type = type;
};

Spot.prototype.spot = function (spot) {
    var self = this;
    
    function width (n) {
        var base = Math.pow(1 - 100 / self.size.width, 1.1);
        return 120 * Math.pow(base, n);
    }
    
    function position (n) {
        if (n <= 0) return { x : 0, y : 0 };
        
        var pos = position(n - 1);
        pos.x += width(n);
        pos.y += Math.max(0, (Math.log(n + 1) - 1) * 20);
        return pos;
    }
    
    $(self.image).width(width(spot) * self.scale);
    var pos = position(spot);
    
    $(self.element).css({
        position : 'absolute',
        left : pos.x,
        top : 100,
        opacity : Math.pow(0.97, spot - 1)
    });
};

Spot.prototype.remove = function (target) {
    var elem = $(this.element);
    elem.fadeOut(400, function () { elem.remove() });
};
