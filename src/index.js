/**
 *@author Create by zhoulujun.cn
 *@version 1.0.0
 */


//css
import './styles/index.scss';


//js
import Player from './games/Player';
import FiveGameChess from './games/FiveChessGame';
import Message from './games/Message';


//buttons
let quitBtn = document.getElementById('quitBtn');
let playerNumBtn = document.getElementById('playerNum');
let startBtn = document.getElementById('startBtn');
let retractBtn = document.getElementById('retractBtn');
let recoveryBtn = document.getElementById('recoveryBtn');


//init data
const initProperty = {
  chessColors: ['#000', '#fff', '#0f2', '#00f'],//默认棋子可选颜色
  chessRadio: 20,//棋子半径
  timer: 10,//下棋等待时间，
  grid: 15,//棋盘网格数
  chessboardWidth: 600,//棋盘宽度
  chessBordBackgroundColor: '#ddd',//棋盘背景颜色
  chessBordGridColor: '#666',//棋盘网格颜色
  focusColor: '#ff00e8'//焦点颜色
};



let msg = new Message('#tipsInfo');
let fiveGameChess = new FiveGameChess('#box',initProperty.chessboardWidth, initProperty.grid, initProperty.chessBordGridColor, initProperty.chessBordBackgroundColor);


//game notifications
fiveGameChess.listen('chessExist',function (x,y) {
  msg.showMsg('此位置已经下过了','chessExist');
});

fiveGameChess.listen('wining',function (player) {
  msg.showMsg(player.name+'赢了','wining');
  retractBtn.setAttribute('disabled', 'disabled');
  recoveryBtn.setAttribute('disabled', 'disabled');
});

fiveGameChess.listen('waitPlayer',function (player) {

  msg.showMsg('waiting '+player.name,'waitPlayer');
});


/**
 *@event start game!
 */
startBtn.addEventListener('click', startGame);

retractBtn.addEventListener('click',function () {
  if(fiveGameChess.retract()){
    recoveryBtn.removeAttribute('disabled');
  }

});

recoveryBtn.addEventListener('click',function () {

  if(fiveGameChess.recovery()){
    retractBtn.removeAttribute('disabled');
    recoveryBtn.setAttribute('disabled','disabled');
  }

});

quitBtn.addEventListener('click',function () {
  fiveGameChess.reset();
  startBtn.removeAttribute('disabled');
  playerNumBtn.removeAttribute('disabled');
  retractBtn.removeAttribute('disabled');
  recoveryBtn.setAttribute('disabled', 'disabled');
  quitBtn.setAttribute('disabled', 'disabled');

});

/**
 *@method for start game
 */

function startGame () {
  startBtn.setAttribute('disabled', 'disabled');
  playerNumBtn.setAttribute('disabled', 'disabled');
  retractBtn.removeAttribute('disabled');
  quitBtn.removeAttribute('disabled');


  // let contestantNum=parseInt(playerNumBtn.value);
  // for(let i=0;i<contestantNum;i++){
  //   playerArr.push(new Player(i,i+1,initProperty.chessColors[i]))
  // }
  let players=ensurePlayerArr(playerNumBtn.value);
  fiveGameChess.start(players);



}
// startGame();


/**
 *确定有多少选手 ensure how much player
 * @param type {string} //02  人机对战 2-4，不同人数参战
 * @returns {Array}
 */
function ensurePlayerArr (type) {
  let arr = [];
  switch (playerNumBtn.value) {
    case '02':
      arr.push(new Player(1, 'ME', initProperty.chessColors[0]));
      arr.push(new Player(2, 'AI', initProperty.chessColors[1]));
      break;
    case '2':
      arr.push(new Player(1, 'ME', initProperty.chessColors[0]));
      arr.push(new Player(2, 'OPPONENT', initProperty.chessColors[1]));
      break;
    default:
      for (let i = 1; i <= type; i++) {
        let player = new Player(i+1, i+1 , initProperty.chessColors[i],);
        arr.push(player);
      }
      break;
  }
  return arr;

}


