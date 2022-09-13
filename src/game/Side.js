let POWER_CELL_POS = [];
let PLAYER_SIDE = 1;
let ENEMY_SIDE = 2;

let Side = cc.Layer.extend({
    ctor: function (side) {
        var mapBackground;
        this.side = side;
        this.arrayPowerCell = [];
        this.isBlocks = [];
        this.isBlockMonster = [];
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
        this.arrayTrees = [];
        this.isBlocks = [];
        this.isBlockMonster = [];
        for(var i = 0; i < MAP_SIDE_WIDTH; i++) {
            this.isBlocks[i] = [];
            this.isBlockMonster[i] = [];
            for(var j = 0; j < MAP_SIDE_HEIGHT; j++) {
                this.isBlocks[i][j] = false;
                this.isBlockMonster[i][j] = false;
            }
        }
    },

    initPlayerMap: function () {
        this.addMainTower();
        var powerCellPos = this.randomPowerCell();
        this.addPowerCells(powerCellPos);
        this.findOptimalPath();
        var treePos = this.randomTreesPos(this.optimalPath, powerCellPos, MAP_SIDE_WIDTH, MAP_SIDE_HEIGHT);
        this.addTrees(treePos);
        var holesPos = this.randomHolesPos(this.isBlocks, this.optimalPath, NUM_OF_HOLES, MAP_SIDE_WIDTH, MAP_SIDE_HEIGHT);
        this.addHoles(holesPos);
        this.showWalkPath();
        // this.addMonsterGatePlayer();
        //
        // this.scheduleUpdate();
    },

    addMainTower: function () {
        this.mainTower = new MainTower(res.map_house_png);
        this.mainTower.setCellPosition(MW.MAIN_TOWER.CELL_POS);
        //this.isBlockMonster[MW.MAIN_TOWER.CELL_POS.x][MW.MAIN_TOWER.CELL_POS.y] = true;
        if(this.side === ENEMY_SIDE) {
            this.mainTower.runAction(cc.rotateBy(0, 180));
            this.mainTower.y -= 20;
        }
        this.addChild(this.mainTower, 20);
    },

    randomPowerCell: function () {
        var mapStructure = MAP_STRUCTURE;
        var powerCellsPos = [];
        loop: while(powerCellsPos.length < MW.NUMBER_OF_POWERCELLS) {
            if(mapStructure.length === 0) {
                break;
            }
            var random = Math.floor(Math.random()*mapStructure.length);
            for(var j = 0; j < powerCellsPos.length; j++) {
                if(MapUtils.isEqual(mapStructure[random], powerCellsPos[j])) {
                    mapStructure.splice(random, 1);
                    continue loop;
                }
                if(MapUtils.isNextTo1(mapStructure[random], powerCellsPos[j])) {
                    mapStructure.splice(random, 1);
                    continue loop;
                }
            }
            powerCellsPos.push(mapStructure[random]);
        }
        return powerCellsPos;
    },

    addPowerCells: function (powerCellsPos) {
        for(var i = 0; i < powerCellsPos.length; i++) {
            var type = this.arrayPowerCell.length + MW.CELL_STATE.POWER_UP.DAMAGE;
            var newPowerCell = new PowerCell(type);
            newPowerCell.setCellPosition(powerCellsPos[i]);
            POWER_CELL_POS.push(newPowerCell.getCellPosition());
            this.isBlocks[newPowerCell.getCellPosition().x][newPowerCell.getCellPosition().y] = true;
            this.arrayPowerCell.push(newPowerCell);
            this.addChild(newPowerCell, 3);

            if(this.side === ENEMY_SIDE) {
                newPowerCell.runAction(cc.rotateBy(0, 180));
            }
        }
    },

    findOptimalPath: function () {
        var powerCellPos = [];
        for(var i = 0; i < this.arrayPowerCell.length; i++) {
            powerCellPos.push(this.arrayPowerCell[i].getCellPosition());
        }
        this.optimalPath = FindPath.findOptimalPath(MAP_SIDE_WIDTH, MAP_SIDE_HEIGHT, powerCellPos, MW.MONSTER.START_CELL_POS, MW.MAIN_TOWER.CELL_POS);
    },

    showWalkPath: function () {
        for(var i in this.arrayArrow) {
            this.removeChild(this.arrayArrow[i]);
        }
        this.arrayArrow = [];
        this.minPath = FindPath.findMinPath(MW.MONSTER.START_CELL_POS, MW.MONSTER.PRE_START_CELL_POS, MW.MAIN_TOWER.CELL_POS, this.isBlockMonster, MAP_SIDE_WIDTH, MAP_SIDE_HEIGHT);

        this.minPath.push(MW.MONSTER.PRE_START_CELL_POS);
        for(var i = this.minPath.length - 1; i > 0; i--) {
            //cc.log(this.minPath[i].x + ", " + this.minPath[i].y);
            var arrow = new cc.Sprite(res.ui_icon_arrow_png);
            this.arrayArrow.push(arrow);
            var pos = this.minPath[i];
            var nextPos = this.minPath[i-1];
            if(nextPos.x - pos.x === 0 && nextPos.y - pos.y === -1) {
                arrow.runAction(cc.rotateBy(0, 90));
            }
            if(nextPos.x - pos.x === 0 && nextPos.y - pos.y === 1) {
                arrow.runAction(cc.rotateBy(0, 270));
            }
            if(nextPos.x - pos.x === -1 && nextPos.y - pos.y === 0) {
                arrow.runAction(cc.rotateBy(0, 180));
            }
            arrow.setPosition(MapUtils.getPositionFromCellPos(pos.x, pos.y))
            this.addChild(arrow, 2);
        }
    },

    randomTreesPos: function (optimalPath, powerCellPositions, mapWidth, mapHeight) {
        var numOfTrees = Math.floor(Math.random() * (MAX_NUM_OF_TREES + 1));
        if(numOfTrees === 0) {
            return [];
        }
        var treePossiblePos = [];
        for(var i = 1; i < optimalPath.length - 1; i++) {
            if(MapUtils.isCrossCell(optimalPath[i-1], optimalPath[i], optimalPath[i+1])) {
                var nextToPositions = MapUtils.getNextToPos(optimalPath[i], mapWidth, mapHeight);
                loop: for(var j = 0; j < nextToPositions.length; j++) {
                    if(!MapUtils.isEqual(nextToPositions[j], optimalPath[i-1])) {
                        if(!MapUtils.isEqual(nextToPositions[j], optimalPath[i+1])) {
                            for(var k = 0; k < powerCellPositions.length; k++) {
                                if(MapUtils.isEqual(nextToPositions[j], powerCellPositions[k])) {
                                    continue loop;
                                }
                                if (MapUtils.isNextTo(nextToPositions[j], powerCellPositions[k])) {
                                    continue loop;
                                }
                            }
                            for(var l = 0; l < treePossiblePos.length; l++) {
                                if(MapUtils.isEqual(treePossiblePos[l], nextToPositions[j])) {
                                    continue loop;
                                }
                            }
                            treePossiblePos.push(nextToPositions[j]);
                        }
                    }
                }
            }
        }
        var treePos = [];
        loop1: while(treePos.length < numOfTrees) {
            if(treePossiblePos.length === 0) {
                break;
            }
            var random = Math.floor(Math.random() * treePossiblePos.length);
            for(var i = 0; i < treePos.length; i++) {
                if(MapUtils.isNextTo(treePos[i], treePossiblePos[random])) {
                    treePossiblePos.splice(random, 1);
                    continue loop1;
                }
            }
            for(var k = 0; k < optimalPath.length; k++) {
                if(MapUtils.isNextTo(treePossiblePos[random], optimalPath[k])) {
                    for(var j = 0; j < treePos.length; j++) {
                        if(MapUtils.isNextTo(optimalPath[k], treePos[j])) {
                            treePossiblePos.splice(random, 1);
                            continue loop1;
                        }
                    }
                }
            }
            treePos.push(treePossiblePos[random]);
            treePossiblePos.splice(random, 1);
        }
        return treePos;
    },

    addTrees: function (treePos) {
        for(var i = 0; i < treePos.length; i++) {
            var newTree = new Tree(MW.BLOCK_TYPE.TREE);
            newTree.setCellPosition(treePos[i]);
            this.isBlocks[treePos[i].x][treePos[i].y] = true;
            this.isBlockMonster[treePos[i].x][treePos[i].y] = newTree.isBlockMonster;
            this.addChild(newTree, 2);
            this.arrayTrees.push(newTree);
            if(this.side === ENEMY_SIDE) {
                newTree.sprite.runAction(cc.rotateBy(0, 180));
            }
        }
    },

    randomHolesPos: function (isBlocks, optimalPath, numOfHoles , mapWidth, mapHeight) {
        var possibleHolesPos = [];
        var holesPos = [];
        for(var i = 0; i < mapWidth; i++) {
            for(var j = 0; j < mapHeight; j++) {
                var pos = cc.p(i, j);
                if(isBlocks[i][j] === false) {
                    if(MapUtils.isElementOfSet(pos, optimalPath) === false) {
                        if(MapUtils.isNextToAnElementOfSet(pos, optimalPath) === true) {
                            var nextToPositions = MapUtils.getNextToPos(pos, mapWidth, mapHeight);
                            var isPossibleHole = true;
                            for(var k = 0; k < nextToPositions.length; k++) {
                                var posX = nextToPositions[k].x;
                                var posY = nextToPositions[k].y;
                                if(isBlocks[posX][posY] == true) {
                                    isPossibleHole = false;
                                }
                            }
                            if(isPossibleHole == true) {
                                possibleHolesPos.push(pos);
                            }
                        }
                    }
                }
            }
        }
        loop: while(holesPos.length < numOfHoles) {
            if(possibleHolesPos.length === 0) {
                break;
            }
            var random = Math.floor(Math.random() * possibleHolesPos.length);
            for(var i = 0; i < holesPos.length; i++) {
                if(MapUtils.isNextTo(holesPos[i], possibleHolesPos[random]) === true) {
                    possibleHolesPos.splice(random, 1);
                    continue loop;
                }
            }
            holesPos.push(possibleHolesPos[random]);
            cc.log(possibleHolesPos[random].x + ", " + possibleHolesPos[random].y);
            possibleHolesPos.splice(random, 1);
        }
        return holesPos;
    },

    addHoles: function (holesPos) {
        cc.log("Add Holes");
        for(var i = 0; i < holesPos.length; i++) {
            var newHole = new Hole(MW.BLOCK_TYPE.HOLE);
            newHole.setCellPosition(holesPos[i]);
            this.isBlocks[holesPos[i].x][holesPos[i].y] = true;
            this.isBlockMonster[holesPos[i].x][holesPos[i].y] = newHole.isBlockMonster;
            //this.isOptimalPathOrBlocks[holesPos[i].x][holesPos[i].y] = true;
            this.addChild(newHole, 2);
            if(this.side === ENEMY_SIDE) {
                newHole.runAction(cc.rotateBy(0, 180));
            }
        }
    },
})