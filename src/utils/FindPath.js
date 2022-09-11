var FindPath = FindPath || {};

FindPath.findOptimalPath = function (mapWidth, mapHeight, powerCellPositions, startCellPos, finishCellPos) {
    var weight = [];
    var dp = [];
    var trace = [];
    for(var i = 0; i < mapWidth; i++) {
        weight[i] = [];
        dp[i] = [];
        trace[i] = new Array(mapHeight);
        for(var j = 0; j < mapHeight; j++) {
            weight[i][j] = 1;
            for(var k = 0; k < powerCellPositions.length; k++) {
                if(MapUtils.isNextTo(cc.p(i, j), powerCellPositions[k]) === true) {
                    weight[i][j]++;
                }
            }
            dp[i][j] = weight[i][j];
        }
    }

    var fx = [0, -1, 0, 1];
    var fy = [-1, 0, 1, 0];
    var queue = [];
    var isVisited = [];
    for(var i = 0; i < mapWidth; i++) {
        isVisited[i] = [];
        for(var j = 0; j < mapHeight; j++) {
            isVisited[i][j] = true;
        }
    }
    queue.push(startCellPos);
    loop: while (queue.length > 0) {
        var u = queue[0];
        queue.shift();
        loop1: for(var i = 0; i < fx.length; i++) {
            var tx = u.x + fx[i];
            var ty = u.y + fy[i];
            var nextCell = cc.p(tx, ty);
            if(MapUtils.isValid(nextCell, mapWidth, mapHeight)) {
                for(var j = 0; j < powerCellPositions.length; j++) {
                    if(MapUtils.isEqual(powerCellPositions[j], nextCell)) {
                        continue loop1;
                    }
                }
                if(dp[tx][ty] < dp[u.x][u.y] + weight[tx][ty]) {
                    if(u !== startCellPos) {
                        var v = u;
                        while(v != startCellPos) {
                            v = trace[v.x][v.y];
                            if(MapUtils.isNextTo(v, nextCell) === true || MapUtils.isEqual(v, nextCell) === true) {
                                continue loop1;
                            }
                        }
                    }
                    //if(MapUtils.isEqual(nextCell, cc.p(0, 4)) == true) break loop;
                    dp[tx][ty] = dp[u.x][u.y] + weight[tx][ty];
                    trace[tx][ty] = u;
                    //cc.log(trace[tx][ty].x + ", " + trace[tx][ty].y);
                    queue.push(nextCell);
                }
            }
        }
    }
    var path = [];
    var curr = finishCellPos;
    path.push(curr);
    while(curr.x !== startCellPos.x || curr.y !== startCellPos.y) {
        //cc.log("[" + curr.x + "][" + curr.y + "], trace = [" + trace[curr.x][curr.y].x + "][" + trace[curr.x][curr.y].y + "]");
        curr = trace[curr.x][curr.y];
        path.push(curr);
    }
    return path;
}

/***
 * Hàm tìm đường đi ngắn nhất sử dụng bfs
 * @param startCellPos
 * @param prevCellPos
 * @param endPCellos
 * @param arrayIsBlock
 * @param mapWidth
 * @param mapHeight
 * @returns {null|[]}
 */
FindPath.findMinPath = function (startCellPos, prevCellPos, endPCellos, arrayIsBlock, mapWidth, mapHeight) {
    var queue = [];
    var isVisited = [];
    var dis = [];
    var trace = [];
    var maxDis = mapWidth * mapHeight;
    for(var i = 0; i < mapWidth; i++) {
        isVisited[i] = [];
        dis[i] = [];
        trace[i] = [];
        for(var j = 0; j < mapHeight; j++) {
            isVisited[i][j] = false;
            dis[i][j] = maxDis;
            trace[i][j] = null;
        }
    }
    isVisited[startCellPos.x][startCellPos.y] = true;
    trace[startCellPos.x][startCellPos.y] = prevCellPos;
    dis[startCellPos] = 0;
    queue.push(startCellPos);
    while(queue.length > 0) {
        var top = queue[0];
        queue.shift();
        var nextToPos = MapUtils.getNextToPos(top, mapWidth, mapHeight);
        var prevPos = trace[top.x][top.y];
        var tx = top.x + (top.x - prevPos.x);
        var ty = top.y + (top.y - prevPos.y);
        if(MapUtils.isValid(cc.p(tx, ty), mapWidth, mapHeight) === true) {
            nextToPos.unshift(cc.p(tx, ty));
        }
        for(var i = 0; i < nextToPos.length; i++) {
            if(isVisited[nextToPos[i].x][nextToPos[i].y] === false && arrayIsBlock[nextToPos[i].x][nextToPos[i].y] === false) {
                isVisited[nextToPos[i].x][nextToPos[i].y] = true;
                dis[nextToPos[i].x][nextToPos[i].y] = dis[top.x][top.y] + 1;
                trace[nextToPos[i].x][nextToPos[i].y] = top;
                if(MapUtils.isEqual(nextToPos[i], endPCellos) === true) {
                    isVisited[nextToPos[i].x][nextToPos[i].y] = true;
                    break;
                }
                queue.push(nextToPos[i]);
            }
        }
    }

    if(!isVisited[endPCellos.x][endPCellos.y]) {
        return null;
    }
    var path = [];
    var curr = endPCellos;
    while(curr != null) {
        if(MapUtils.isEqual(curr, startCellPos) === true) {
            break;
        }
        path.push(curr);
        curr = trace[curr.x][curr.y];
    }
    if(curr != null) {
        path.push(curr);
    }
    //path.push(prevCellPos);
    return path;

}

/*
FindPath.findMinPath = function (startCellPos, arrayIsBlock, mapWidth, mapHeight) {
    cc.log("FindMinPath()");
    var queue = [];
    var isVisited = [];
    var dis = [];
    var trace = [];
    var maxDis = mapWidth * mapHeight;
    for(var i = 0; i < mapWidth; i++) {
        isVisited[i] = [];
        dis[i] = [];
        trace[i] = [];
        for(var j = 0; j < mapHeight; j++) {
            isVisited[i][j] = false;
            dis[i][j] = maxDis;
            trace[i][j] = null;
        }
    }
    isVisited[startCellPos.x][startCellPos.y] = true;
    dis[startCellPos] = 0;
    queue.push(startCellPos);
    while(queue.length > 0) {
        var top = queue[0];
        queue.shift();
        var nextToPos = MapUtils.getNextToPos(top, mapWidth, mapHeight);
        for(var i = 0; i < nextToPos.length; i++) {
            if(isVisited[nextToPos[i].x][nextToPos[i].y] == false && arrayIsBlock[nextToPos[i].x][nextToPos[i].y] == false) {
                isVisited[nextToPos[i].x][nextToPos[i].y] = true;
                dis[nextToPos[i].x][nextToPos[i].y] = dis[top.x][top.y] + 1;
                trace[nextToPos[i].x][nextToPos[i].y] = top;
                queue.push(nextToPos[i]);
            }
        }
    }
    var minPath = [];

    for(var i = 0; i < mapWidth; i++) {
        minPath[i] = [];
        for(var j = 0; j < mapHeight; j++) {
            var pos = cc.p(i, j);
            minPath[i][j] = [];
            loop: while(MapUtils.isEqual(pos, startCellPos) == false) {
                minPath[i][j].push(pos);
                if(trace[pos.x][pos.y] == null) {
                    break loop;
                }
                pos = trace[pos.x][pos.y];
            }
        }
    }
    return minPath;
}

 */