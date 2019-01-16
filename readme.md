# 项目简介
a project for GoBang
今年一年一直是忙的连轴转，觉得自己进步不是很大。年底有人说你给我写个五指棋看看。
[//]: # （
本来不想搭理，到新公司出前端规范说明，一整理就是一万五千字，然后搞前端工程模块化、可视化配置平台。
然后被拉去搞年会，做了视频负责人，然后又是舞蹈排练——年底。
项目也是特别赶，b2g的项目之前也做过，但最终用户还是大众，现在完全是gov leader
一不觉就是吐槽了，就不泪水泛滥了……)
希望走过路过，闲暇之余不吝指教，拜谢
demo online:https://www.zhoulujun.cn/demo/gobang/index.html
# 工程说明
+ npm run start 启动工程，自动打开浏览器
+ 工程由yo Reat Webpack 搭建
+ eslint 为自定义的前对规范。
+ Test 未写

# 程序说明
## fiveGame 主程
五指棋主程序
继承 EventListen——事件蛮多，直接监听了决

主要函数如下
### 构造函数参数 
```javascript
let game=new FiveChessGame('# box');
 /**
   * @param contentSelect {String} canvas插入box的 选择器
   * @param chessBoardWidth {number} 棋盘宽度
   * @param gridCount {number} 棋盘格数
   * @param gridColor {string} 棋盘格颜色
   * @param chessBordBackground {string} 棋盘背景颜色
   * @param chessRadius {number} 棋盘背景颜色
   * @param focusColor {string} 焦点颜色
   */
```
### 启动函数 

```javascript
game.start();
/***
   *启动函数
   * @param playerArr {Array} 棋手数组
   */

```
比如多人游戏，可能单机跟多人下，或者网络上下

### 悔棋

```javascript
game.retract();
 /**
   *撤销棋局
   * @returns {boolean}
   */
```

### 撤销悔棋
```javascript
game.recovery();
 /**
   *恢复撤销
   */
```
### 重置游戏
```javascript
game.reset();
```

### 判断输赢
```javascript
this.checkWin();
 /**
   *判断棋局输赢
   * @param player {Player} 棋手
   * @param x {number} x轴坐标
   * @param y {number} y轴坐标
   * @return {boolean}
   */
```


## 事件
### chessExist
此位置已经存在棋子了
```javascript
 /**
   * @param x {number} x轴坐标
   * @param y {number} y轴坐标
   */
```
### wining
赢棋了
```javascript

 /**
   * @param player {Player} 棋手
   */
```

### waitPlayer
等待棋手落子
```javascript
 /**
   * @param player {Player} 棋手
   */
```

## 算法说明

