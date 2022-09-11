let GameScreen = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.displayGameUI();
    },

    displayGameUI: function () {
        cc.log("GameScreen.displayGameUI()");
        let winSize = cc.director.getWinSize();

        this.mapBg = new cc.Sprite(res.map_background_png);
        this.mapBg.setPosition(winSize.width/2, winSize.height/2);
        this.mapBg.setScale(2);
        this.addChild(this.mapBg, 0);

        this.playerSide = new Side(PLAYER_SIDE);
        //this.playerSide.initPlayerMap();
        this.addChild(this.playerSide, 3);
        cc.log("playerSide : " + this.playerSide.x + ", " + this.playerSide.y);

        this.enemySide = new Side(ENEMY_SIDE);
        //g_shared_enemyside = this.enemySide;
        this.enemySide.setPositionY(120);
        this.enemySide.runAction(cc.rotateBy(0, 180));
        //this.enemySide.initPlayerMap();
        this.addChild(this.enemySide, 2);
        //this.enemySide.addMainTower();

        //this.bot = new Bot();

        cc.log("enemySide : " + this.enemySide.x + ", " + this.enemySide.y);




        /*var monsterGatePlayer = new cc.Sprite(res.map_monster_gate_player_png);
        monsterGatePlayer.setScaleX(1);
        monsterGatePlayer.setPosition(320-77*2.5, 390.5+77*3.2+2);
        this.addChild(monsterGatePlayer, 3);



        var monsterGateEnemy = new cc.Sprite(res.map_monster_gate_enemy_png);
        monsterGateEnemy.setScaleX(1);
        monsterGateEnemy.setPosition(640-77*2+20, 390.5+77*3.2+8);
        this.addChild(monsterGateEnemy, 3);

         */


        var mapRiver = new cc.Sprite(res.map_river_0000_png, cc.rect(0, 75, 640, 87));
        mapRiver.setPosition(winSize.width/2, MapUtils.getPositionFromCellPos(0, MAP_SIDE_HEIGHT).y+7);
        this.addChild(mapRiver, 1);

        var mapDecoration1 = new cc.Sprite(res.map_decoration_0001_png);
        mapDecoration1.setPosition(-80, MapUtils.getPositionFromCellPos(0, MAP_SIDE_HEIGHT).y+30);
        this.addChild(mapDecoration1, 2);

        var mapDecoration2 = new cc.Sprite(res.map_decoration_0002_png);
        mapDecoration2.setPosition(730, MapUtils.getPositionFromCellPos(0, MAP_SIDE_HEIGHT).y+10);
        this.addChild(mapDecoration2, 2);

        var iconTrophy = new cc.Sprite(res.common_icon_trophy_small_png);
        iconTrophy.setPosition(500, 1100);
        this.addChild(iconTrophy, 6);

        var trophyLabel = new ccui.Text("000.000", res.SVN_Supercell_Magic_ttf, 11);
        trophyLabel.setString("100");
        trophyLabel.setScale(2);
        trophyLabel.setPosition(570, 1100);
        this.addChild(trophyLabel, 6);

        var battleDeck = new cc.Sprite("res/Art/battle/battle_deck.png");
        battleDeck.setPosition(winSize.width/2, battleDeck.height/2);
        this.addChild(battleDeck, 6);

        var infoBox1 = new cc.Sprite("res/Art/battle/battle_info_box.png");
        infoBox1.setScale(300/infoBox1.width, 50/infoBox1.height);
        infoBox1.setPosition(200, 1100);
        this.addChild(infoBox1, 5);
        var avatarBorder = new cc.Sprite(res.common_avatar_border_png);
        avatarBorder.setPosition(40, 1100);
        avatarBorder.setScaleX(50/avatarBorder.width);
        avatarBorder.setScaleY(50/avatarBorder.height);
        this.addChild(avatarBorder, 7);
        var avatar = new cc.Sprite(res.common_avatar_png);
        avatar.setPosition(40, 1100);
        avatar.setScale(50/avatar.width);
        this.addChild(avatar, 6);
        var enemyNameLabel = new ccui.Text("00", res.SVN_Supercell_Magic_ttf, 20);
        enemyNameLabel.setString("Dat dep trai");
        enemyNameLabel.setAnchorPoint(0, 0);
        enemyNameLabel.setPosition(80, 1085);
        this.addChild(enemyNameLabel, 6);

        var infoBox2 = new cc.Sprite("res/Art/battle/battle_info_box.png");
        infoBox2.setScale(120/infoBox2.width, (iconTrophy.height-10)/infoBox2.height);
        infoBox2.setPosition(550, 1100);
        this.addChild(infoBox2, 5);

        var infoBox3 = new cc.Sprite("res/Art/battle/battle_info_box.png");
        infoBox3.setScaleY(2);
        infoBox3.setPosition(630, 630);
        this.addChild(infoBox3, 5);

        var iconHouse = new cc.Sprite(res.common_icon_house_png);
        iconHouse.setPosition(620, 630);
        this.addChild(iconHouse, 6);

        this.enemyHPLabel = new ccui.Text("00", res.SVN_Supercell_Magic_ttf, 24);
        this.enemyHPLabel.setPosition(620, 685);
        this.enemyHPLabel.setColor(cc.color.RED);
        //this.enemyHPLabel.setString(this.enemySide.mainTower.getHP());
        this.addChild(this.enemyHPLabel, 6);

        this.playerHPLabel = new ccui.Text("00", res.SVN_Supercell_Magic_ttf, 24);
        this.playerHPLabel.setPosition(620, 575);
        this.playerHPLabel.setColor(cc.color(51, 153, 255));
        //this.playerHPLabel.setString(this.playerSide.mainTower.getHP());
        this.addChild(this.playerHPLabel, 6);

        var infoBox4 = new cc.Sprite("res/Art/battle/battle_info_box.png");
        infoBox4.setScaleY(0.75);
        infoBox4.setPosition(40, 630);
        this.addChild(infoBox4, 5);

        var label1 = new ccui.Text("Vòng", res.SVN_Supercell_Magic_ttf, 17);
        label1.setPosition(40, 650);
        this.addChild(label1, 6);

        this.waveLabel = new ccui.Text("00", res.SVN_Supercell_Magic_ttf, 28);
        //this.waveLabel.setString(this.playerSide.wave);
        this.waveLabel.setPosition(40, 620);
        this.addChild(this.waveLabel, 6);

        // Dong ho` battle timer
        var battleTimerBG = new cc.Sprite("res/Art/battle/battle_timer_background.png");
        battleTimerBG.setPosition(winSize.width/2, 630);
        this.addChild(battleTimerBG, 3);
        var battleTimerBorder = new cc.Sprite("res/Art/battle/battle_timer_border.png");
        battleTimerBorder.setPosition(winSize.width/2, 630);
        this.addChild(battleTimerBorder, 4);
        var battleTimer = new cc.Sprite("res/Art/battle/battle_timer.png");
        /*
        battleTimer.setPosition(winSize.width/2, 630);
        this.addChild(battleTimer, 5);

         */
        this.battleTimerLabel = new ccui.Text("00", res.SVN_Supercell_Magic_ttf, 28);
        this.battleTimerLabel.setPosition(winSize.width/2, 633);
        this.addChild(this.battleTimerLabel, 6);

        this.countdown = new cc.ProgressTimer(battleTimer);
        this.countdown.setMidpoint(cc.p(0.5, 0.5));
        this.countdown.setType(cc.ProgressTimer.TYPE_RADIAL);
        this.countdown.setBarChangeRate(cc.p(1,1));
        this.countdown.setPosition(winSize.width/2, 630);
        this.addChild(this.countdown, 5);

        var iconEnergy = new cc.Sprite("res/Art/common/common_icon_energy.png");
        iconEnergy.setPosition(100, 30);
        iconEnergy.setScale(0.5);
        this.addChild(iconEnergy, 7);

        this.energyLabel = new ccui.Text("00", res.SVN_Supercell_Magic_ttf, 28);
        this.energyLabel.setPosition(100, 30);
        this.addChild(this.energyLabel, 8);
    }
})