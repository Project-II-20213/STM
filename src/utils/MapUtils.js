var MapUtils = MapUtils || {};

var fx = [0, -1, 0, 1];
var fy = [-1, 0, 1, 0];

// check tiep xuc doc, ngang, cheo
MapUtils.isNextTo1 = function (pos1, pos2) {
    if(MapUtils.isEqual(pos1, pos2) === true) {
        return false;
    }
    return Math.abs(pos1.x - pos2.x) <= 1 && Math.abs(pos1.y - pos2.y) <= 1;
},

// check tiep xuc doc, ngang
MapUtils.isNextTo = function (pos1, pos2) {
    if(MapUtils.isEqual(pos1, pos2) === true) {
        return false;
    }
    if(Math.abs(pos1.x - pos2.x) === 0 && Math.abs(pos1.y - pos2.y) === 1) {
        return true;
    }
    if(Math.abs(pos1.x - pos2.x) === 1 && Math.abs(pos1.y - pos2.y) === 0) {
        return true;
    }
    return false;
}

MapUtils.isEqual = function (pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

MapUtils.isValid = function (pos, mapWidth, mapHeight) {
    return (pos.x >= 0 && pos.x < mapWidth && pos.y >= 0 && pos.y < mapHeight);
}

MapUtils.isCrossCell = function (prevPos, pos, nextPos) {
    var vec1 = cc.p(pos.x - prevPos.x, pos.y - prevPos.y);
    var vec2 = cc.p(nextPos.x - pos.x, nextPos.y - pos.y);
    return MapUtils.isEqual(vec1, vec2) === false;
}

MapUtils.getNextToPos = function (pos, mapWidth, mapHeight) {
    var arr = [];
    for(var i = 0; i < fx.length; i++) {
        var nextPos = cc.p(pos.x + fx[i], pos.y + fy[i]);
        if(MapUtils.isValid(nextPos, mapWidth, mapHeight) === true) {
            arr.push(nextPos);
        }
    }
    return arr;
}

MapUtils.getPositionFromCellPos = function (x, y) {
    return cc.p(CELL_DEFAULT_POS.x + x*CELL_SIZE, CELL_DEFAULT_POS.y + y*CELL_SIZE);
}

MapUtils.getCellPosFromPosition = function (pos) {
    var cellPosX = Math.floor((pos.x - CELL_DEFAULT_POS_1.x)/CELL_SIZE);
    var cellPosY = Math.floor((pos.y - CELL_DEFAULT_POS_1.y)/CELL_SIZE);
    return cc.p(cellPosX, cellPosY);
}

MapUtils.isElementOfSet = function (pos, posSet) {
    for(var i = 0; i < posSet.length; i++) {
        if(MapUtils.isEqual(pos, posSet[i]) === true) {
            return true;
        }
    }
    return false;
}

MapUtils.isNextToAnElementOfSet = function (pos, posSet) {
    for(var i = 0; i < posSet.length; i++) {
        if(MapUtils.isNextTo(pos, posSet[i]) === true) {
            return true;
        }
    }
    return false;
}

MapUtils.isInRange = function (pos, center, range) {
    return MapUtils.getDistance(pos, center) <= range;
}

MapUtils.getDistance = function (pos1, pos2) {
    return Math.sqrt((pos1.x - pos2.x)*(pos1.x - pos2.x) + (pos1.y - pos2.y)*(pos1.y - pos2.y));
}

MapUtils.getNearestMonster = function (tower, arrayMonsters) {
    var pos = tower.getPosition();
    var minDis = cc.director.getWinSize().height*2;
    var nearestMonsterIndex = null;
    for(var i in arrayMonsters) {
        if(arrayMonsters[i].active) {
            if(tower.target === MW.TOWER.TARGET.BOTH || (tower.target === MW.TOWER.TARGET.GROUND && arrayMonsters[i].moveType === MW.MONSTER_MOVE_TYPE.WALK) || (tower.target === MW.TOWER.TARGET.OVERHEAD && arrayMonsters[i].moveType === MW.MONSTER_MOVE_TYPE.FLY)) {
                if(MapUtils.isInRange(arrayMonsters[i].getPosition(), pos, tower.distance[tower.level-1]*CELL_SIZE)) {
                    var distance = MapUtils.getDistance(pos, arrayMonsters[i].getPosition());
                    if(minDis > distance) {
                        minDis = distance;
                        nearestMonsterIndex = i;
                    }
                }
            }
        }
    }
    if(nearestMonsterIndex == null) {
        return null;
    }
    return arrayMonsters[nearestMonsterIndex];
}

MapUtils.getFurthestMonster = function (tower, arrayMonsters) {
    var pos = tower.getPosition();
    var maxDis = 0;
    var furthestMonsterIndex = null;
    for(var i in arrayMonsters) {
        if(arrayMonsters[i].active) {
            if(tower.target === MW.TOWER.TARGET.BOTH || (tower.target === MW.TOWER.TARGET.GROUND && arrayMonsters[i].moveType === MW.MONSTER_MOVE_TYPE.WALK) || (tower.target === MW.TOWER.TARGET.OVERHEAD && arrayMonsters[i].moveType === MW.MONSTER_MOVE_TYPE.FLY)) {
                if(MapUtils.isInRange(arrayMonsters[i].getPosition(), pos, tower.distance[tower.level-1]*CELL_SIZE)) {
                    var distance = MapUtils.getDistance(pos, arrayMonsters[i].getPosition());
                    if(maxDis < distance) {
                        maxDis = distance;
                        furthestMonsterIndex = i;
                    }
                }
            }

        }
    }
    if(furthestMonsterIndex == null) {
        return null;
    }
    return arrayMonsters[furthestMonsterIndex];
}

MapUtils.getFullHPMonster = function (tower, arrayMonsters) {
    var pos = tower.getPosition();
    var maxHP = 0;
    var fullHPMonsterIndex = null;
    for(var i in arrayMonsters) {
        if(arrayMonsters[i].active) {
            if(tower.target === MW.TOWER.TARGET.BOTH || (tower.target === MW.TOWER.TARGET.GROUND && arrayMonsters[i].moveType === MW.MONSTER_MOVE_TYPE.WALK) || (tower.target === MW.TOWER.TARGET.OVERHEAD && arrayMonsters[i].moveType === MW.MONSTER_MOVE_TYPE.FLY)) {
                if(MapUtils.isInRange(arrayMonsters[i].getPosition(), pos, tower.distance[tower.level-1]*CELL_SIZE)) {
                    if(maxHP < arrayMonsters[i].hp) {
                        maxHP = arrayMonsters[i].hp;
                        fullHPMonsterIndex = i;
                    }
                }
            }

        }
    }
    if(fullHPMonsterIndex == null) {
        return null;
    }
    return arrayMonsters[fullHPMonsterIndex];
}

MapUtils.getLowHPMonster = function (tower, arrayMonsters) {
    var pos = tower.getPosition();
    var minHP = 2000000000;
    var lowHPMonsterIndex = null;
    for(var i in arrayMonsters) {
        if(arrayMonsters[i].active) {
            if(tower.target === MW.TOWER.TARGET.BOTH || (tower.target === MW.TOWER.TARGET.GROUND && arrayMonsters[i].moveType === MW.MONSTER_MOVE_TYPE.WALK) || (tower.target === MW.TOWER.TARGET.OVERHEAD && arrayMonsters[i].moveType === MW.MONSTER_MOVE_TYPE.FLY)) {
                if(MapUtils.isInRange(arrayMonsters[i].getPosition(), pos, tower.distance[tower.level-1]*CELL_SIZE)) {
                    if(minHP > arrayMonsters[i].hp) {
                        minHP = arrayMonsters[i].hp;
                        lowHPMonsterIndex = i;
                    }
                }
            }

        }
    }
    if(lowHPMonsterIndex == null) {
        return null;
    }
    return arrayMonsters[lowHPMonsterIndex];
}