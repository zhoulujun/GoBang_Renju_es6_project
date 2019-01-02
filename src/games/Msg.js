class Msg {
  constructor (content){
    let box=document.querySelector(content)||document.body;
    this.content=document.createElement('div');
    box.appendChild(this.content);
  }

  showPosRepeat(str){
    this.content.innerHTML=str;
  }
}
