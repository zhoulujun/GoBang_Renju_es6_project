import './styles/index.scss';

import Player from './games/Player';
import FiveGameChess from './games/FiveChessGame';
import EventObj from './games/EventObj';
import Msg from './games/Msg';

let quitBtn = document.getElementById('quitBtn');
let playerNumBtn = document.getElementById('playerNum');
let startBtn = document.getElementById('startBtn');
let retractBtn = document.getElementById('retractBtn');
let recoveryBtn = document.getElementById('recoveryBtn');
let tipsInfo = document.getElementById('tipsInfo');


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

// EventObj.on('test',function (data) {
//   console.log(data);
// });
let fiveGameChess = new FiveGameChess('#box',initProperty.chessboardWidth, initProperty.grid, initProperty.chessBordGridColor, initProperty.chessBordBackgroundColor);

fiveGameChess.listen('chessExist',function (x,y) {
  console.log('chessExist');
  tipsInfo.innerHTML='此位置已经下过了';
});

fiveGameChess.listen('wining',function (player) {
  tipsInfo.innerHTML=player.name+'赢了';
});
fiveGameChess.listen('waitPlayer',function (player) {
  waitPlayerDropNotify(player);
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

/**
 *@method 开始游戏事件
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

startGame();



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
  // console.log(arr);

  return arr;

}

/**
 *棋手下棋提醒
 * @param player
 */

function waitPlayerDropNotify(player){
  tipsInfo.innerHTML='waiting '+player.name;
}
