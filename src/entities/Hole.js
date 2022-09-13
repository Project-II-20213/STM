var MapBlock = cc.Node.extend({

    isBlockMonster: false,
    type: MW.BLOCK_TYPE.NORMAL,
    cellPosition: null,

    ctor: function () {
        this._super();
    },

    init: function () {
        var cellSpr = new cc.Sprite("res/Art/UI New/ui_icon_arrow.png");
        this.addChild(cellSpr);
    },

    getCellPosition: function () {
        return this.cellPosition;
    },

    setCellPosition: function (pos) {
        this.cellPosition = pos;
        this.setPosition(MapUtils.getPositionFromCellPos(pos.x, pos.y));
    }

});

var Hole = MapBlock.extend({

    ctor: function (arg) {
        this._super();
        this.init(arg);
    },

    init: function (arg) {
        var holeSpr = new cc.Sprite(res.ui_hole_png);
        this.isBlockMonster = arg.isBlockMonster;
        this.type = arg.type;
        holeSpr.setScaleY(CELL_SIZE/holeSpr.height);
        holeSpr.setScaleX(CELL_SIZE/holeSpr.width);
        this.addChild(holeSpr);
        this.sprite = holeSpr;
    }

})