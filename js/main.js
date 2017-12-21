// Colors
var bkg_col = '#111111';
var road_color = '#ecece1';
var blue_color = '#2b5ab6';
var red_color = '#c90000';
var yellow_color = '#fddb00';

function draw_city() {
    c = this;
    var w = (c.size[0] + 1) * c.cell;
    var h = (c.size[1] + 1) * c.cell;

    this.blocks_group = c.game.svg.group().attr('id', 'blocks-g');
    this.roads_group = c.game.svg.group().attr('id', 'blocks-g');
    c.game.addToWorld(this.blocks_group);
    c.game.addToWorld(this.roads_group);

    var rect = c.game.svg.rect(-w / 2.0, -h / 2.0, w, h)
    .attr({
        'stroke': road_color,
        'stroke-width': c.cell,
        'fill': 'none'
    });        
    c.roads_group.append(rect);

    return rect;
}

function draw_road(r) {
    c = this;
    if (r.dir = 'h') {
        // Horizontal
        var xmin = Math.min(r.x0, r.x1);
        var dx = Math.abs(r.x1-r.x0);
        rect = c.game.svg.rect(xmin, r.y-c.cell/2.0, dx, c.cell);
    }
    else {
        // Vertical
        var ymin = Math.min(r.y0, r.y1);
        var dy = Math.abs(r.y1-r.y0);
        rect = c.game.svg.rect(r.x-c.cell/2.0, ymin, c.cell, dy);
    }
    rect.attr({
        'fill': road_color,
        'stroke-width': 0
    });
    c.roads_group.append(rect);

    return rect;
}

function draw_block(b) {
    c = this;

    var col = {
        ind: blue_color,
        res: red_color,
        com: yellow_color,
        vac: '#00000000'
    }[b.type];

    var rect = c.game.svg.rect(b.left, b.up, b.right-b.left, b.down-b.up);

}

function remove_element(r) {
    r.remove();
}

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

    this.city.initRepr(this, draw_city, remove_element, 
                             draw_road, remove_element);

    this.city.roads.push({
        dir: 'h',
        x0: 100,
        x1: 30,
        y: 20 
    });

    this.city.reprRoads();
}

Game.prototype = {

    dom2svg: function(domX, domY) {
        var pt = this.svg.node.createSVGPoint();
        pt.x = domX;
        pt.y = domY;
        pt = pt.matrixTransform(svg.node.getScreenCTM().inverse());
        return pt;
    },

    dom2world: function(domX, domY) {
        var pt = this.dom2svg(domX, domY);
        var mat = this.svg.node.createSVGMatrix();
        mat.a = this.camera.matrix.a;
        mat.b = this.camera.matrix.b;
        mat.c = this.camera.matrix.c;
        mat.d = this.camera.matrix.d;
        mat.e = this.camera.matrix.e;
        mat.f = this.camera.matrix.f;
        pt = pt.matrixTransform(mat.inverse());
        return pt;
    },

    addToWorld: function(el) {
        this.world.append(el);
    },

    addToUI: function(el) {
        this.ui.append(el);
    }
}