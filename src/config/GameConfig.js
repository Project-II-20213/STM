var MW = MW || {};

var MAP_SIDE_WIDTH = 7;
var MAP_SIDE_HEIGHT = 5;
var CELL_SIZE = 77;
var CELL_DEFAULT_POS = cc.p(89, 236.5); // cell position (0, 0), anchor (0.5, 0.5)
var CELL_DEFAULT_POS_1 = cc.p(50.5, 198); // cell position (0, 0), anchor (0, 0)
var MAX_NUM_OF_TREES = 2;
var NUM_OF_HOLES = 1;
var MAP_STRUCTURE = [
    cc.p(1, 1), cc.p(2, 1), cc.p(3, 1), cc.p(4, 1), cc.p(5, 1),
    cc.p(1, 2), cc.p(2, 2), cc.p(3, 2), cc.p(4, 2), cc.p(5, 2),
    cc.p(2, 3), cc.p(3, 3), cc.p(4, 3), cc.p(5, 3),
]

MW.NUMBER_OF_POWERCELLS = 3;

MW.BLOCK_TYPE = {
    NORMAL: 0,
    TREE: {type: 1, HP: 200, isBlockMonster: true},
    HOLE: {type: 2, isBlockMonster: true}
}

MW.WAVE_DURATION = 20;
MW.WAIT_FIRST_WAVE_DURATION = 5;
MW.NUMBER_OF_WAVES = 20;

MW.DURATION_BETWEEN_2_MONSTERS_SPAWN = 1;

MW.CELL_STATE = {
    NORMAL: 0,
    TREE: 1,
    HOLE: 2,
    TOWER: 3,
    POWER_UP: {
        DAMAGE: 4,
        SHOOT_SPEED: 5,
        RANGE: 6
    }
}

MW.MAIN_TOWER = {
    HP: 20,
    CELL_POS: cc.p(MAP_SIDE_WIDTH - 1, 0)
}

MW.MONSTER = {
    START_CELL_POS: cc.p(0, MAP_SIDE_HEIGHT - 1),
    PRE_START_CELL_POS: cc.p(0, MAP_SIDE_HEIGHT),
    BORN_CELL_POS: cc.p(1, MAP_SIDE_HEIGHT)
}

MW.ENERGY = {
    START: 15,
    EARN_LOSE_HP: 10,
    EARN_CANCEL_CARD: 5,
    LOSE_DROP_TOWER: 5
}

MW.MONSTER_MOVE_TYPE = {
    WALK: 0,
    FLY: 1
}

MW.TOWER = {
    BUILD_TIME: {
        DEFAULT: 1.0
    },

    TARGET: {
        GROUND: 0,
        OVERHEAD: 1,
        BOTH: 2,
        TOWER: 3,
    },

    TYPE: {
        COMBAT: 1,
        MAGIC: 2,
        SUPPORT: 3
    },

    DAME_TYPE: {
        SINGLE: 1,
        MULTI: 1
    },

    BULLET_TYPE: {
        LOCK_MONSTER: 1,
        LOCK_POSITION: 2
    },

    FIND_TARGET_TYPE: {
        NEAREST: 0,
        FURTHEST: 1,
        FULL_HP: 2,
        LOW_HP: 3
    },

    INCREASE_IMPACT_NUMBER_RATE: 10
}

MW.IMPACT = {
    DAME: 1,
    FROZEN: 2,
    BUFF: 3,
    STUN: 4,
    SLOW: 5
}

MW.LEVEL = {
    MAX: 3
}

MW.POWER_CELL = {
    PERCENT : {
        DAMAGE: 25,
        SHOOT_SPEED: 25,
        RANGE: 25
    }
}

MW.TROPHY_EARN = {
    WIN: 10,
    LOSE: -10,
    DRAW: 0
}

MW.TREE_HP = 200;