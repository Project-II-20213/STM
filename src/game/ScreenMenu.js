
var gv = gv||{};

gv.commonButton = function(w, h, x, y, text){
    if(text === undefined)
        text = "";
    var btn = new ccui.Button("res/Default/Button_Normal.png", "res/Default/Button_Normal.png", "res/Default/Button_Disable.png");
    if(x === undefined)
        x = 0;
    if(y === undefined)
        y = 0;
    btn.attr({
        x: x,
        y: y
    });

    btn.setTitleText(text);
    btn.setTitleFontSize(32);
    btn.setTitleColor(cc.color(65,65,65,255));
    btn.setZoomScale(0.1);
    btn.setPressedActionEnabled(true);

    btn.setScale9Enabled(true);
    btn.setUnifySizeEnabled(false);
    btn.ignoreContentAdaptWithSize(false);
    var capInsets = cc.rect(15,15, 15, 15);
    btn.setCapInsets(capInsets);
    btn.setContentSize(cc.size(w,h));
    return btn;
};

var ScreenMenu = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var yBtn = 3*size.height/5;

        var btnNewGame = gv.commonButton(200, 64, cc.winSize.width/2, yBtn, "New Game");
        this.addChild(btnNewGame);
        btnNewGame.addClickEventListener(this.onSelectNewGame.bind(this));


    },
    onSelectNewGame: function (sender) {
        //var layer1 = new Side();
        var layer2 = new GameScreen();
        var scene = new cc.Scene();
        //scene.addChild(layer1, 1);
        scene.addChild(layer2, 2);
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }

});