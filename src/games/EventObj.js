const EventObj = {
  /**
   *监听事件
   * @param eventName {string}
   * @param callback {function}
   */
  handles: {},
  on: function (eventName, callback) {
    //我的代码

    if (!this.handles[eventName]) {
      this.handles[eventName] = [];
    }
    this.handles[eventName].push(callback);
  },
  /**
   * 触发事件
   * @param eventName {string}
   */
  emit: function (eventName) {
    if (this.handles[arguments[0]]) {
      for (var i = 0; i < this.handles[arguments[0]].length; i++) {
        this.handles[arguments[0]][i](arguments[1]);
      }
    }
  }
};

export default EventObj;



