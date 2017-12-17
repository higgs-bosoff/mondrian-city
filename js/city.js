// Model for city and its representation
var City = function(cdata) {
    /* Format for cdata:
        size: width and height of city (in cells)
        cell: side of cell
        blocks: if present: existing blocks
        roads: if present: existing roads (WARNING - these must be already checked for consistency)
    */

    this.size = cdata.size;
    this.cell = cdata.cell;
    this.blocks = cdata.blocks || [];
    this.roads = cdata.roads || [];

}

City.prototype = {
    initRepr: function(game, 
        city_repr_create_f,
        city_repr_destroy_f,
        road_repr_create_f,
        road_repr_destroy_f,
        block_repr_create_f,
        block_repr_destroy_f,
        item_repr_create_f,
        item_repr_move_f,
        item_repr_destroy_f) {

        this.game = game;
        this._crcf = city_repr_create_f;
        this._crdf = city_repr_destroy_f;
        this._rrcf = road_repr_create_f;
        this._rrdf = road_repr_destroy_f;
        this._brcf = block_repr_create_f;
        this._brdf = block_repr_destroy_f;
        this._ircf = item_repr_create_f;
        this._irmf = item_repr_move_f;
        this._irdf = item_repr_destroy_f;

        this.repr = this._crcf(this);
    },

    reprRoads: function() {
        for (var i = 0; i < this.roads.length; ++i) {
            if (!this.roads[i].repr)
                this.roads[i].repr = this._rrcf(this.roads[i]);
        }
    },

    reprBlocks: function() {
        for (var i = 0; i < this.blocks.length; ++i) {
            if (!this.blocks[i].repr)
                this.blocks[i].repr = this._brcf(this.blocks[i]);
        }
    }

}