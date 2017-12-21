// Camera class
var Camera = function(world, viewBox) {

    this.world = world;
    this.sW = viewBox.w;
    this.sH = viewBox.h;
    this.posX = 0;
    this.posY = 0;
    this.scale = 1;

    this.update();
}

Camera.prototype = {

    update: function() {
        this.matrix = new Snap.Matrix(this.scale, 0,
            0, this.scale,
            this.sW / 2 - this.posX, this.sH / 2 - this.posY)
        this.world.transform(this.matrix);
    },

    translate: function(dx, dy) {
        this.posX += dx;
        this.posY += dy;
        this.update();
    },

    rescale: function(ds) {
        this.scale += ds;
        this.update();
    }

}