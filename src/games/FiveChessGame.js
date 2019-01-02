import Until from '../games/Until';
import EventListen from '../games/EventListen';
import Chess from '../games/Chess';

import {judgementByDropPos,judgementAllPos} from '../games/judgeMengt';
import {findBestPos2DropByLoop,findBestPos2DropByReg} from '../games/findBestPos';

class FiveChessGame extends EventListen {
  /**
   * @param contentSelect {String} canvas插入box
   * @param chessBoardWidth {number} 棋盘宽度
   * @param gridCount {number} 棋盘格数
   * @param gridColor {string} 棋盘格颜色
   * @param chessBordBackground {string} 棋盘背景颜色
   * @param chessRadius {number} 棋盘背景颜色
   * @param focusColor {string} 焦点颜色
   */
  constructor (contentSelect, chessBoardWidth = 600, gridCount = 15, gridColor = '#333', chessBordBackground = '#ddd', chessRadius, focusColor = '#c97526') {
    super(null);
    /*初始化公共数据*/
    this.foucusColor = focusColor;
    this.chessBoardWidth = chessBoardWidth;
    this.gridCount = gridCount;
    this.gridColor = gridColor;

    // this.gridWidth = (chessBoardWidth - (gridCount + 2)) / (gridCount + 1);
    // this.canvasWidth = chessBoardWidth - this.gridWidth * 2 - 2;
    this.gridWidth = this.chessBoardWidth / this.gridCount;
    this.chessRadius = chessRadius || this.gridWidth * 0.3;

    // console.log(`gridWidth:${this.gridWidth};chessRadius:${this.chessRadius}`);


    /*下棋数据*/
    //棋手数据
    this.playersArr = [];
    //棋子数据
    this.chessArr = [];
    //撤销棋子数据；
    this.reduceArr = [];
    //棋子位置数据
    // this.chessesPosArr = new Array(gridCount).fill(new Array(gridCount).fill(null));  bug
    this.chessesPosArr = (new Array(gridCount).fill([])).map((item) => {
      // return new Array(gridCount).fill(null);
      return new Array(gridCount).fill(0);
      // return new Array(gridCount).fill(false); //不为null：join()数组转字符串，直接无视；不为0: 避免id=0的情况;false存储也是转数字(JVM)
    });

    //暂停
    this.suspendFlag=false;
    //时间
    // this.playersInitColorsArr = {};
    // this.suspend=false;

    /*棋盘dom元素f*/
    let domTemp = document.createDocumentFragment();
    let canvasGrid = document.createElement('canvas');
    canvasGrid.width = this.chessBoardWidth;
    canvasGrid.height = this.chessBoardWidth;
    canvasGrid.style.zIndex = 1;

    let canvasChess = document.createElement('canvas');
    canvasChess.width = this.chessBoardWidth;
    canvasChess.height = this.chessBoardWidth;
    canvasChess.style.zIndex = 2;

    let canvasTouch = document.createElement('canvas');
    canvasTouch.width = this.chessBoardWidth;
    canvasTouch.height = this.chessBoardWidth;
    canvasTouch.style.zIndex = 3;


    this.ctxGrid = canvasGrid.getContext('2d');
    this.ctxChess = canvasChess.getContext('2d');
    this.ctxTouch = canvasTouch.getContext('2d');
    this.canvasTouch = canvasTouch;


    domTemp.appendChild(canvasGrid);
    domTemp.appendChild(canvasChess);
    domTemp.appendChild(canvasTouch);

    let box = document.querySelector(contentSelect) || document.body;
    box.style.cssText = `width:${chessBoardWidth}px;height:${chessBoardWidth}px;border:1px solid ${gridColor};background:${chessBordBackground};`;
    //
    box.appendChild(domTemp);
    this.drawGrid(this.ctxGrid, this.chessBoardWidth, this.gridCount, this.gridWidth, this.gridColor);


  }


  start (playerArr) {
    this.playersArr = playerArr;
   /* this.playersArr.forEach((player) => {
      this.playersInitColorsArr[player.id] = player.chessColor;
    });*/

    this.triger('waitPlayer',playerArr[0]);
    this.canvasTouch.addEventListener('mousemove', Until.raf_debounce(this.moveTrack, 400).bind(this));
    this.canvasTouch.addEventListener('touchmove', Until.raf_debounce(this.moveTrack, 400).bind(this));

    this.canvasTouch.addEventListener('mouseout', this.blurChessBoard.bind(this));
    this.canvasTouch.addEventListener('touchend', this.blurChessBoard.bind(this));
    this.canvasTouch.addEventListener('click', this.oneStep.bind(this));

  }

  /**
   *撤销棋局
   * @returns {boolean}
   */
  retract () {
    //如果暂停状态，禁止悔棋，减少算法复杂度
    if(this.suspendFlag){
      return false;
    }

    if (this.chessArr.length < this.playersArr.length) {
      return false;
    }
    this.ctxChess.clearRect(0, 0, this.chessBoardWidth, this.chessBoardWidth);
    this.reduceArr = this.chessArr.splice(this.chessArr.length - this.playersArr.length, this.playersArr.length);
    this.chessArr.forEach((chess) => {
      this.drawChess(chess.x, chess.y, chess.color);
    });
    this.reduceArr.forEach(chess => {
      this.chessesPosArr[chess.x][chess.y] = 0;
    });
    return true;
  }

  /**
   *恢复撤销
   */
  recovery () {
    if (this.reduceArr.length) {
      this.reduceArr.forEach((chess) => {
        this.drawChess(chess.x, chess.y, chess.color);
        this.chessesPosArr[chess.x][chess.y] = chess.id;
      });
      this.chessArr = this.chessArr.concat(this.reduceArr);
      this.reduceArr = [];
      return true;
    }
    return false;
  }

  /**
   *绘制棋盘格
   * @param context
   * @param width
   * @param grid
   * @param gridWidth
   * @param color
   */
  drawGrid (context, width, grid, gridWidth, color) {
    context.strokeStyle = color;
    for (let i = 0; i < grid; i++) {
      let num = gridWidth * i + gridWidth / 2;
      // console.log(num);
      context.beginPath();
      context.moveTo(num, gridWidth / 2);
      context.lineTo(num, width - gridWidth / 2);
      context.closePath();
      context.stroke();
      context.beginPath();
      context.moveTo(gridWidth / 2, num);
      context.lineTo(width - gridWidth / 2, num);
      context.closePath();
      context.stroke();
    }
  }

  /**
   * @event  鼠标、触摸事件处理
   * @param e
   */
  moveTrack (e) {
    //低端安卓 touch事件 有的导致touchend事件时效
    e.preventDefault();
    this.ctxTouch.clearRect(0, 0, this.chessBoardWidth, this.chessBoardWidth);
    // console.log(e,e.offsetX,e.offsetY,this.chessBoardWidth);
    let x = Math.floor(e.offsetX / this.gridWidth);
    let y = Math.floor(e.offsetY / this.gridWidth);
    this.focusChess(this.gridWidth * x + this.gridWidth / 2, this.gridWidth * y + this.gridWidth / 2);


  }

  blurChessBoard(){
    this.ctxTouch.clearRect(0, 0, this.chessBoardWidth, this.chessBoardWidth);
  }

  focusChess (x, y) {
    this.ctxTouch.beginPath();
    this.ctxTouch.fillStyle = this.foucusColor;
    this.ctxTouch.arc(x, y, 8, 0, Math.PI * 2);
    this.ctxTouch.fill();

  }


  drawChess (x, y, chessColor) {
    this.ctxChess.beginPath();
    this.ctxChess.fillStyle = chessColor;
    // this.ctxChess.arc(x, y, this.chessRadius, 0, Math.PI * 2);
    this.ctxChess.arc(this.gridWidth * x + this.gridWidth / 2, this.gridWidth * y + this.gridWidth / 2, this.chessRadius, 0, Math.PI * 2);
    this.ctxChess.fill();
  }

  oneStep (e) {
    //如果暂停状态
    if(this.suspendFlag){
      return;
    }

    //计算坐标值
    let x = Math.floor(e.offsetX / this.gridWidth);
    let y = Math.floor(e.offsetY / this.gridWidth);

    // console.log(this.chessesPosArr[x][y]);
    /*判断该位置是否下过*/
    if (this.chessesPosArr[x][y]) {
      this.triger('chessExist', x, y);
      return;
    }

    /*修改棋手顺讯*/
    let player = this.playersArr[0];
    let competitor=this.playersArr[1];
    this.dropChesss(player,competitor,x,y);

    this.playersArr.push(this.playersArr.shift());
    if(competitor.name==='AI'&&!this.suspendFlag){
      let pos=findBestPos2DropByLoop(this.chessesPosArr,competitor.id,player.id);
      this.dropChesss(competitor,player,pos.x,pos.y);
      this.playersArr.reverse();
    }
  }

  dropChesss(player,competitor,x,y){
    // console.log(`{plater:${player.name},competitor:${competitor.name}`)
    /*修改 围棋数据*/
    this.chessesPosArr[x][y] = player.id;
    this.chessArr.push(new Chess(x, y, player.chessColor,player.id));

    this.drawChess(x, y, player.chessColor, player.id);
    // this.drawChess(this.gridWidth * x + this.gridWidth / 2, this.gridWidth * y + this.gridWidth / 2, player.chessColor);

    //判断输赢
    this.checkWin(player,x,y);
    if(!this.suspendFlag){
      this.triger('waitPlayer',competitor)
    }
  }

  checkWin(player,x,y){
    // if(player.name==='ME'||player.name==='OPPONENT'){
      if(this.chessArr.length>8){
        if(judgementByDropPos(this.chessesPosArr,player.id,x,y)){
        // if(judgementByDropPos(player.id,this.chessesPosArr,this.gridCount)){
          this.triger('wining', player);
          this.suspendFlag=true;
          return true;
        }
      // }
    }
    return false;

  }



}


export default FiveChessGame;
