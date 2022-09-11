var MonsterType = [
    {},

    {
        monsterID: 1,
        moveType: MW.MONSTER_MOVE_TYPE.WALK,
        name: "Kiếm Ma",
        energyRequire: 1,
        hp: 30,
        moveSpeed: 0.8,
        monsterType: 1,
        energyEarnDestroy: 1,
        numberOfHeads: 3,
        damageMainTower: 1,
        size: 0.2,
        weight: 30.0,
        textureName: "res/Art/monster/frame/swordsman/monster_swordsman_run_",

        anim: [
            {from: 48, to: 59},
            {from: 0, to: 11},
            {from: 24, to: 35},
            {from: 24, to: 35},
        ],

        numOfFrames: 59
    },

    {
        monsterID: 2,
        moveType: MW.MONSTER_MOVE_TYPE.WALK,
        name: "Quạ Xương",
        energyRequire: 1,
        hp: 15.0,
        moveSpeed: 1.5,
        monsterType: 1,
        energyEarnDestroy: 1,
        numberOfHeads: 3,
        damageMainTower: 1,
        size: 0.15,
        weight: 15.0,
        textureName: "res/Art/monster/frame/assassin/monster_assassin_run_",

        anim: [
            {from: 41, to: 49},
            {from: 0, to: 9},
            {from: 20, to: 29},
            {from: 20, to: 29}
        ],

        numOfFrames: 49
    },

    {
        monsterID: 3,
        moveType: MW.MONSTER_MOVE_TYPE.FLY,
        name: "Dơi Quỷ",
        energyRequire: 2,
        hp: 25.0,
        moveSpeed: 1,
        monsterType: 1,
        energyEarnDestroy: 2,
        numberOfHeads: 3,
        damageMainTower: 1,
        size: 0.2,
        weight: 25.0,
        textureName: "res/Art/monster/frame/bat/monster_bat_run_",

        anim: [
            {from: 32, to: 39},
            {from: 0, to: 7},
            {from: 16, to: 23},
            {from: 16, to: 23},
            {from: 8, to: 15},
            {from: 8, to: 15},
            {from: 24, to: 31},
            {from: 24, to: 31},
        ],

        numOfFrames: 39
    },

    {
        monsterID: 4,
        moveType: MW.MONSTER_MOVE_TYPE.WALK,
        name: "Khổng lồ",
        energyRequire: 3,
        hp: 200,
        moveSpeed: 0.5,
        monsterType: 1,
        energyEarnDestroy: 3,
        numberOfHeads: 1,
        damageMainTower: 1,
        size: 0.5,
        weight: 200,
        textureName: "res/Art/monster/frame/giant/monster_giant_run_",

        anim: [
            {from: 64, to: 79},
            {from: 0, to: 15},
            {from: 32, to: 47},
            {from: 32, to: 47},
        ],

        numOfFrames: 59
    }
]

var UP = 0;
var DOWN = 1;
var RIGHT = 2;
var LEFT = 3;
var RIGHT_DOWN = 4;
var LEFT_DOWN = 5;
var RIGHT_UP = 6;
var LEFT_UP = 7;