var Tree = MapBlock.extend({
    hp: MW.TREE_HP,

    ctor: function (arg) {
        this._super();
        this.init(arg);
    },

    init: function (arg) {
        this.type = arg.type;
        this.isBlockMonster = arg.isBlockMonster;
        this.sprite = new cc.Sprite(res.map_forest_obstacle_2_png);
        this.addChild(this.sprite);
    }
})