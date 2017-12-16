// Colors
var bkg_col = '#111111';

// Create backgroud
var bkg = new Rect(0, 0, stage.options.width, stage.options.height)
    .fill(bkg_col)
    .addTo(stage);

// Camera class
var Camera = function(world, worldW, worldH, stageW, stageH) {

    this.world = world;
    this.wW = worldW;
    this.wH = worldH;
    this.sW = stageW;
    this.sH = stageH;
    this.posX = worldW / 2.0;
    this.posY = worldH / 2.0;
    this.scaleX = 1;
    this.scaleY = 1;
}

Camera.prototype = {

    update: function() {
        world.attr('matrix', new Matrix(this.scaleX, 0, 0, this.scaleY,
            this.sW / 2 - this.posX, this.sH / 2 - this.posY));
    },

    translate: function(dx, dy) {
        this.posX += dx;
        this.posY += dy;
        this.update();
    }

}

// Create World group
var world = new Group().addTo(stage);
// And UI
var ui = new Group().addTo(stage);

new Circle(135, 300, 20).fill('blue').addTo(ui);
new Circle(100, 300, 20).fill('red').addTo(world);

var cam = new Camera(world, stage.options.width, stage.options.height,
    stage.options.width, stage.options.height)

/*
setInterval(function() {
    cam.translate(-1);
}, 1000/30);
*/