// Colors
var bkg_col = '#111111';
var road_color = '#ecece1';

var Game = function(svg) {

    this.svg = svg;

    // Create background
    this.vBox = this.svg.attr('viewBox');
    this.bkg = this.svg.rect(this.vBox.x, this.vBox.y,
        this.vBox.w, this.vBox.h);

    // Create World group
    this.world = this.svg.group().attr('id', 'world-g');
    // And UI
    this.ui = this.svg.group().attr('id', 'ui-g');

    this.camera = new Camera(this.world, this.vBox);
    this.city = new City({
        size: [40, 30],
        cell: 5        
    });

    this.city.initRepr(this, function(c) {
        var w = (c.size[0]+1)*c.cell;
        var h = (c.size[1]+1)*c.cell;
        var rect = c.game.svg.rect(-w/2.0, -h/2.0, w, h)
                    .attr({
                        'stroke': road_color,
                        'stroke-width': c.cell,
                        'fill': 'none'
                    });
        c.game.addToWorld(rect);
    });
}

Game.prototype = {

    addToWorld: function(el) {
        this.world.append(el);
    },

    addToUI: function(el) {
        this.ui.append(el);
    }
}