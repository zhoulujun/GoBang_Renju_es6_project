//
/**
 * 基于落子位置，就水平、垂直、45度、135度四个方向方向拓展，是否5子相连。
 * @param chessPosArr {Array} 棋盘格二维数组
 * @param id {number} 棋手ID
 * @param xPos {number}
 * @param yPos {number}
 * @returns {boolean} 输赢结果，默认false
 */
export function judgementByDropPos(chessPosArr,id, xPos, yPos,) {
  //棋盘格数
  let chessGrid = chessPosArr.length;
  //棋子相同接连连续数
  let count = 1;
  //水平方向 x++，往后查看5步，是否跟是否当前棋手落子，不是跳出循环。
  for (let x = xPos + 1;x<xPos+5&&x < chessGrid; x++) {
    if (chessPosArr[x][yPos] === id) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }
  //水平方向 x--，往后查看5步，是否跟是否当前棋手落子，不是跳出循环。
  for (let x = xPos - 1; x>xPos-5&&x >= 0; x--) {
    if (chessPosArr[x][yPos] === id) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }


  //垂直方向
  count = 1;
  for (let y = yPos + 1; y<yPos+5&&y < chessGrid; y++) {
    if (chessPosArr[xPos][y] === id) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }
  for (let y = yPos - 1;y>yPos-5&& y > -0; y--) {
    if (chessPosArr[xPos][y] === id) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }
  //45度方向 斜率=1，x随y增加， x、y程正相关性
  count = 1;
  for (let x = xPos + 1, y = yPos + 1;x<xPos+5&&y<xPos+5&& x < chessGrid && y < chessGrid; x++, y++) {
    if (chessPosArr[x][y] === id) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }
  for (let x = xPos - 1, y = yPos - 1;x>xPos-5&&y>yPos-5 && x >= 0 && y >= 0; x--, y--) {
    if (chessPosArr[x][y] === id) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }

  //135度方向 斜率=-1，随着x增加而y减少， x、y程负相关性
  count = 1;
  for (let x = xPos - 1, y = yPos + 1;x>xPos-5&&y<yPos+5&& x >= 0 && y < chessPosArr; x--, y++) {
    if (chessPosArr[x][y] === id) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }
  for (let x = xPos + 1, y = yPos - 1;x<xPos+5&&y>yPos-5&& x < chessGrid && y >= 0; x++, y--) {
    if (chessPosArr[x][y] === id) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      break;
    }
  }

  return false;

}

/**
 * 基于棋盘位置判断，四个方向，是否有5棋子连续
 * @param chessPosArr {Array} 棋盘格二维数组chessPosArr[x][y]
 * @param id {number} 棋手ID
 * @returns {boolean} 输赢结果，默认false
 */
export function judgementAllPos( chessPosArr,id) {
  let chessGrid = chessPosArr.length;

  // y轴0-90度判断 正则表达式判断 虽然简洁，现阶段二维数组，性能不如遍历循环——性能结果待测
  let xWin = chessPosArr.some(xArr => new RegExp((id + '').repeat(5)).test(xArr.join('')));
  if (xWin) {
    return true;
  }

  //x轴0-180度判断
  let count = 0;
  for (let y = 0; y < chessGrid; y++) {
    for (let x = 0; x < chessGrid; x++) {
      if (chessPosArr[x][y] === id) {
        count++;
        if (count === 5) {
          return true;
        }
        /*if (chessPosArr[x + 1][y]) {
          if (count === 4) {
            return true;
          }
          x++;
        } else {
          count = 0;
          x++;
        }*/

      } else {
        count = 0;
      }
    }
  }


  for (let i = 0; i < chessGrid - 4; i++) {
    //45度方向，下限
    count = 0;
    for(let x=i,y=0;x<chessGrid&&y<chessGrid;x++,y++){
      if (chessPosArr[x][y] === id) {
        count++;
        if (count === 5) {
          return true;
        }
      } else {
        count = 0;
      }
    }
    //45度方向，上限
    count = 0;
    for(let x=0,y=i+1;x<chessGrid&&y<chessGrid;x++,y++){
      //排除循环最后一组不满4，待优化
      if(x===0&&y+4===chessGrid){
        break;
      }

      if (chessPosArr[x][y] === id) {
        count++;
        if (count === 5) {
          return true;
        }
      } else {
        count = 0;
      }


    }


    //135度方向，下限
    count = 0;
    for(let x=0,y=chessGrid - i - 1;x<chessGrid&&y>=0;x++,y--){

      if (chessPosArr[x][y] === id) {
        count++;
        if (count === 5) {
          return true;
        }
      } else {
        count = 0;
      }
    }
    //135度方向，上限
    count = 0;
    for(let x=i+1,y=chessGrid -1;x<chessGrid&&y>=0;x++,y--){
      //排除循环最后一组不满4，待优化
      if(x===chessGrid-4&&y===chessGrid-1){
        break;
      }
      if (chessPosArr[x][y] === id) {
        count++;
        if (count === 5) {
          return true;
        }
      } else {
        count = 0;
      }

    }


  }

  return false;
}





