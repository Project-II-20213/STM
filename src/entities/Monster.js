let Monster = cc.Node.extend({
    ctor: function (monsterID, pos, side) {
        this._super();
        this.side = side;
        this.active = true;
        var arg = MonsterType[monsterID];
        this.setEnergyRequire(arg.energyRequire);
        this.setHP(arg.hp);
        this.baseHP = this.hp;
        this.setMoveSpeed(arg.moveSpeed);
        this.setMoveType(arg.moveType);
        this.setEnergyEarnDestroy(arg.energyEarnDestroy);
        this.setDamageMainTower(arg.damageMainTower);
        this.setWeight(arg.weight);
        this.setSize(arg.size);
        this.setMonsterType(arg.monsterType);
        this.setNumberOfHeads(arg.numberOfHeads);
        this.setName(arg.name);
        this.setPosition(pos);
        this.lastPos = pos;
        this.spritePath = arg.textureName;
        this.animConfig = arg.anim;
        this.direction = null;

        this.takenDamageIncreaseRate = 1;
        this.isStunned = false;
        this.isFrozen = false;
        this.path = [];
        this.towerTarget = [];
        this.nextCellPosIndex = 0;

        this.hpBar = ccui.LoadingBar.create(res.battle_target_hp_png);
        this.hpBar.setPosition(0, CELL_SIZE/2);
        this.hpBar.setPercent(100);
        this.hpBackground = new cc.Sprite(res.battle_target_hp_background_png);
        this.hpBackground.setPosition(0, CELL_SIZE/2);
        this.addChild(this.hpBackground, 1);
        this.addChild(this.hpBar, 2);

        this.setMonsterSpr(new cc.Sprite());
        this.addChild(this.monsterSpr, 0);
    },

    setEnergyRequire: function (energyRequire) {
        this.energyRequire = energyRequire;
    },

    setHP: function (hp) {
        this.hp = hp;
    },

    setMoveSpeed: function (moveSpeed) {
        this.moveSpeed = moveSpeed;
    },

    setMoveType: function (type) {
        this.moveType = type;
    },

    setEnergyEarnDestroy: function (energyEarnDestroy) {
        this.energyEarnDestroy = energyEarnDestroy;
    },

    setDamageMainTower: function (damageMainTower) {
        this.damageMainTower = damageMainTower;
    },

    setWeight: function (weight) {
        this.weight = weight;
    },

    setSize: function (size) {
        this.size = size;
    },

    setMonsterType: function (monsterType) {
        this.monsterType = monsterType;
    },

    setNumberOfHeads: function (numberOfHeads) {
        this.numberOfHeads = numberOfHeads;
    },

    setName: function (name) {
        this.name = name;
    },

    setMonsterSpr: function (monsterSpr) {
        this.monsterSpr = monsterSpr;
    },
})