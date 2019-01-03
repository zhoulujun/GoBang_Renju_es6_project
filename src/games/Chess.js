/**
 *@author Create by zhoulujun.cn
 *@version 1.0.0
 *@description 棋子
 */

/**
 *@class Chess 棋子
 **/
class Chess {
  /**
   * @param x {number}  xAxis
   * @param y {number}  yAxis
   * @param color {string}  color
   * @param id {string||number}  color
   */
  constructor (x, y,color,id) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.id=id;
  }
}

export default Chess;
