/**
 *@class Player 棋手
 */
class Player {
  /**
   *
   * @param id {number} id从1开始，不等于0
   * @param name {string||number}
   * @param chessColor {string}
   */
  constructor (id, name, chessColor) {
    this.id = id;
    this.name = name;
    this.chessColor = chessColor;
  }
}


export default Player;
