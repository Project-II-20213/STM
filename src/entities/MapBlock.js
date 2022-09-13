let MapBlock = cc.Node.extend({

    isBlockMonster: false,
    type: MW.BLOCK_TYPE.NORMAL,
    cellPosition: null,

    ctor: function () {
        this._super();
    },

    init: function () {
        this.sprite = new cc.Sprite("res/Art/UI New/ui_icon_arrow.png");
        this.addChild(this.sprite);
    },

    getCellPosition: function () {
        return this.cellPosition;
    },

    setCellPosition: function (pos) {
        this.cellPosition = pos;
        this.setPosition(MapUtils.getPositionFromCellPos(pos.x, pos.y));
    }

})