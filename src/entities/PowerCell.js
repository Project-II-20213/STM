let PowerCell = MapBlock.extend({

    cellSpr: null,

    ctor: function (type) {
        this._super();
        this.init(type);
    },

    init: function (type) {
        var textureName;
        switch (type) {
            case MW.CELL_STATE.POWER_UP.DAMAGE: textureName = res.battle_item_damage_png; break;
            case MW.CELL_STATE.POWER_UP.SHOOT_SPEED: textureName = res.battle_item_attack_speed_png; break;
            case MW.CELL_STATE.POWER_UP.RANGE: textureName = res.battle_item_range_png; break;
        }
        this.cellSpr = new cc.Sprite(textureName);
        this.cellSpr.setAnchorPoint(0.5, 1-CELL_SIZE/2/this.cellSpr.height);
        this.addChild(this.cellSpr);
    },

    buff: function (type, sender) {

    }
})