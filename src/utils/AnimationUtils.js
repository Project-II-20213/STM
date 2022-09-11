var AnimationUtils = AnimationUtils || {};

AnimationUtils.createAnimationFromPath = function (folderPath, start, end, delay) {
    var animFrames = [];
    for(var i = start; i <= end; i++) {
        var path = folderPath;
        if(i < 1000) {
            path += "0";
        }
        if(i < 100) {
            path += "0";
        }
        if(i < 10) {
            path += "0";
        }
        path += i.toString() + ".png";
        var spr = new cc.Sprite(path);
        //var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(path);
        var frame = spr.getSpriteFrame();
        animFrames.push(frame);
    }
    var animation = new cc.Animation(animFrames, delay);
    return animation;
}

AnimationUtils.createAnimationFromFrames = function (frames, delay) {
    var animation = new cc.Animation(frames, delay);
    return animation;
}

/*
AnimationUtils.changeAnimation = function (folderPath, start, end, crrAnimation, obj) {
    if(crrAnimation != null) {
        crrAnimation.release();
    }
    crrAnimation = AnimationUtils.createAnimation(folderPath, start, end);
    var animate = cc.animate(crrAnimation);
    obj.runAction(cc.repeatForever(animate));
}

 */