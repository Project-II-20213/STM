let MainTower = MapBlock.extend({
    hp: MW.MAIN_TOWER.HP,

    ctor: function (textureName) {
        this._super();
        this.init(textureName);
    },

    init: function (textureName) {
        var mainTowerSpr = new cc.Sprite(textureName);
        this.addChild(mainTowerSpr);
    },

    takeDame: function (damage) {
        this.setHP(this.getHP() - damage);
    },

    getHP: function () {
        return this.hp;
    },

    setHP: function (hp) {
        if(hp >= 0) {
            this.hp = hp;
        }
        if(hp < 0){
            this.hp = 0;
        }
    }

})