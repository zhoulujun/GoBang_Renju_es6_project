/**
 *@author Create by zhoulujun.cn on 1/3/1911:45 AM
 *@version 1.0.0
 */

class Message {
  /**
   * @param selector {string} 消息展示区域选择器
   */
  constructor (selector){

    this.msgBox = document.querySelector(selector);
    console.log(this.msgBox);

  }

  /**
   *show message to user
   * @param msg 消息内容
   * @param type 消息类型
   * @return {boolean}
   */
  showMsg(msg,type){
    try {
      this.msgBox.innerHTML=msg;
      return true;
    }catch (e) {
      console.log(e)
    }
    return false;

  }

}

export default Message;
