let PLAYER_SIDE = 1;
let ENEMY_SIDE = 2;

let Side = cc.Layer.extend({
    ctor: function (side) {
        var mapBackground;
        this.side = side;
        switch (side) {
            case PLAYER_SIDE: mapBackground = res.map_background_0001_png; break;
            case ENEMY_SIDE: mapBackground = res.map_background_0000_png; break;
        }
        this._super();
        this.initMap(mapBackground);
    },

    initMap: function (mapBg) {
        this.resetGame();
        this.winSize = cc.winSize;

        this.mapBg1 = new cc.Sprite(res.map_background_0003_png);
        this.mapBg1.setPosition(this.winSize.width/2, this.mapBg1.height/2 + 150);
        this.addChild(this.mapBg1, 1);

        this.mapBg2 = new cc.Sprite(mapBg);
        this.mapBg2.setName("mapBackground");
        this.mapBg2.setPosition(this.winSize.width/2, this.mapBg1.getPositionY() + 24);
        this.addChild(this.mapBg2, 1);

        var uiGrid = new cc.Sprite(res.ui_grid_png);
        uiGrid.setPosition(this.winSize.width/2, this.mapBg1.getPositionY() + 24);
        this.addChild(uiGrid, 1);
    },

    resetGame: function () {

    }
})