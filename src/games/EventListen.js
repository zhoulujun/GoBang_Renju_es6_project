/**
 *@author Create by zhoulujun.cn
 *@version 1.0.0
 *@description 事件
 */

class EventListen {
  constructor () {
    this.handers = [];
  }
  /**
   *事件监听
   * @param event {string} 事件名称
   * @param fn {function} 触发函数
   */
  listen (event, fn) {
    if (!this.handers[event]) {
      this.handers[event] = [];
    }
    this.handers[event].push(fn);
  }

  /**
   *触发函数
   * @param event {string} 事件名
   */
  triger (event, ...rest) {
    let fns = this.handers[event];
    if (!fns || fns.length === 0) {//没有订阅 则返回
      return null;
    }
    fns.forEach(function (fn) {
      fn.apply(this, rest);
    });
    return null;

  }
}

export default EventListen;
