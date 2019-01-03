/**
 *@author Create by zhoulujun.cn
 *@version 1.0.0
 *@description 人机对战，寻找最佳落子点
 */


/**
 *寻找最佳得分位置 Analysis Advantage function
 * #算法说明：1、寻找4个方向的连续位置，并去除无效位置；2、在有效位置中，寻找可以在其他方向可以拓展的位置
 * @param chessPosArr {Array} 棋盘格二维数组chessPosArr[x][y]
 * @param claimID {number} 棋手ID
 * @param competitorID {number} 对手ID
 * @return {object} 最佳位置坐标
 */
export function findBestPos2DropByLoop(chessPosArr,claimID,competitorID){


  //棋盘栏数
  let chessGrid = chessPosArr.length;

  let bestPos2Drop={x: 0,y: 0};
  let consecutiveLeft = 0;


  //存放活一、活二、活三、活四坐标数组,存数组，是因为可以对四个方向再次运算，计算出最佳位置
  let attackArrConsecutivePos={
    x: [[],[],[],[]],
    y: [[],[],[],[]],
    xy45: [[],[],[],[]],
    xy135: [[],[],[],[]],
  };
  //存放死一、死二、死三、死四坐标数组
  let blockadeArrConsecutivePos={
    x: [[],[],[],[]],
    y: [[],[],[],[]],
    xy45: [[],[],[],[]],
    xy135: [[],[],[],[]],
  };


  let continuityTestXAttackLeft;
  let continuityTestXAttackRight;
  let continuityTestXBlockadeLeft;
  let continuityTestXBlockadeRight;

  function ContinuityTest() {
    let consecutiveNum = 0;
    return function (x,y,arr,posID,claimID,type) {

      //右连续
      // console.log(JSON.stringify({x,y,posID,claimID,consecutiveNum,flag:!posID&&consecutiveNum!==0}))
      if (posID === claimID) {
        consecutiveNum++;
      } else {
        if((posID===0||posID===null||posID===false)&&consecutiveNum!==0&&consecutiveNum<5){
          arr[consecutiveNum-1].push([x,y]);
          //todo 死角优化
          /* switch (type) {
             case 'x+':
               if(x+4-consecutiveNum<chessGrid-1){
                 arr[consecutiveNum-1].push([x,y]);
               }
               break;
             case 'x-':
               if(x+consecutiveNum<chessGrid-1){
                 arr[consecutiveNum-1].push([x,y]);
               }
               break;
             case 'y+':
               if(y+consecutiveNum<chessGrid-1){
                 arr[consecutiveNum-1].push([x,y]);
               }
               break;
             case 'y-':
               if(y+consecutiveNum<chessGrid-1){
                 arr[consecutiveNum-1].push([x,y]);
               }
               break;
             case 'x+y+':
               if(x+consecutiveNum<chessGrid-2&&y+consecutiveNum<chessGrid-2){
                 arr[consecutiveNum-1].push([x,y]);
               }
               break;
             case 'x-y-':
               if(x-consecutiveNum>0&&y-consecutiveNum>0){
                 arr[consecutiveNum-1].push([x,y]);
               }
               break;
           }*/
          consecutiveNum=0;

        }else {
          consecutiveNum=0;
        }
      }

    }
  }
  function restCountNum () {
    continuityTestXAttackLeft=new ContinuityTest();
    continuityTestXAttackRight=new ContinuityTest();
    continuityTestXBlockadeLeft=new ContinuityTest();
    continuityTestXBlockadeRight=new ContinuityTest();
  }
  //待封装优化
  function continuityTestFun (x,y,posAttackArr,posBlockadeArr,
                              chessPosArr,claimID,competitorID,type){
    // continuityTestXAttackLeft,continuityTestXAttackRight,continuityTestXBlockadeLeft,continuityTestXBlockadeRight) {
    //右连续
    continuityTestXAttackLeft(x,y,posAttackArr,chessPosArr[x][y],claimID,type);
    continuityTestXBlockadeLeft(x,y,posBlockadeArr,chessPosArr[x][y],competitorID,type);
    //左连续
    let x1=chessGrid-1-x;
    let y1=chessGrid-1-y;
    switch (type) {
      case 'x+y+':
        type='x-y-';
        break;
      case 'x+y-':
        type='x-y+';
        break;
    }
    continuityTestXAttackRight(x1,y1,posAttackArr,chessPosArr[x1][y1],claimID,type);
    continuityTestXBlockadeRight(x1,y1,posBlockadeArr,chessPosArr[x1][y1],competitorID,type);

  }

  //水平垂直循环
  for(let i=0;i<chessGrid;i++){

    //水平方向
    restCountNum();
    for(let x=0;x<chessGrid;x++){
      let y=i;
      //右连续

      continuityTestXAttackLeft(x,y,attackArrConsecutivePos.x,chessPosArr[x][y],claimID,'x+');
      continuityTestXBlockadeLeft(x,y,blockadeArrConsecutivePos.x,chessPosArr[x][y],competitorID,'x+');
      // 左连续
      let x2=chessGrid-1-x;
      continuityTestXAttackRight(x2,y,attackArrConsecutivePos.x,chessPosArr[x2][y],claimID,'x-');
      continuityTestXBlockadeRight(x2,y,blockadeArrConsecutivePos.x,chessPosArr[x2][y],competitorID,'x-');
    }


    //垂直方向
    restCountNum();
    for(let y=0;y<chessGrid;y++){
      let x=i;
      //右连续
      continuityTestXAttackLeft(x,y,attackArrConsecutivePos.y,chessPosArr[x][y],claimID,'y+');
      continuityTestXBlockadeLeft(x,y,blockadeArrConsecutivePos.y,chessPosArr[x][y],competitorID,'y+');
      //左连续
      let y2=chessGrid-1-y;
      continuityTestXAttackRight(x,y2,attackArrConsecutivePos.y,chessPosArr[x][y2],claimID,'y-');
      continuityTestXBlockadeRight(x,y2,blockadeArrConsecutivePos.y,chessPosArr[x][y2],competitorID,'y-');
    }
  }

  //对角循环
  for (let i = 0; i < chessGrid - 4; i++) {
    //45度方向，x、y同步递增递减，斜率=1，程正相关
    //45度方向，下限
    restCountNum();
    for(let x=i,y=0;x<chessGrid&&y<chessGrid;x++,y++){
      continuityTestFun(x,y,attackArrConsecutivePos.xy45,blockadeArrConsecutivePos.xy45,
        chessPosArr,claimID,competitorID,'x+y+');
    }

    //45度方向，上限
    restCountNum();
    for(let x=0,y=i+1;x<chessGrid&&y<chessGrid;x++,y++){
      if(x===0&&y+4===chessGrid){
        break;
      }
      continuityTestFun(x,y,attackArrConsecutivePos.xy45,blockadeArrConsecutivePos.xy45,
        chessPosArr,claimID,competitorID,'x+y+');
    }


    //135度方向，斜率=-1，x、y程负相关，
    //135度方向，下限
    restCountNum();
    for(let x=0,y=chessGrid - i - 1;x<chessGrid&&y>=0;x++,y--){
      continuityTestFun(x,y,attackArrConsecutivePos.xy135,blockadeArrConsecutivePos.xy135,
        chessPosArr,claimID,competitorID,'x-y-');
    }
    //135度方向，上限
    restCountNum();
    for(let x=i+1,y=chessGrid -1;x<chessGrid&&y>=0;x++,y--){
      if(x===chessGrid-4&&y===chessGrid-1){
        break;
      }
      continuityTestFun(x,y,attackArrConsecutivePos.xy135,blockadeArrConsecutivePos.xy135,
        chessPosArr,claimID,competitorID,'x-y-');

    }


  }


  return getBestPosFromConsecutivePos(attackArrConsecutivePos,blockadeArrConsecutivePos);


}


export function findBestPos2DropByReg(chessPosArr,claimID,competitorID){
  //棋盘栏数
  let chessGrid = chessPosArr.length;
  //正则集合
  let regArr=[


  ];
  function getPos(id) {
  }

  //存放活一、活二、活三、活四坐标数组
  let attackArrConsecutivePos={
    x: [[],[],[],[]],
    y: [[],[],[],[]],
    xy45: [[],[],[],[]],
    xy135: [[],[],[],[]],
  };
  //存放死一、死二、死三、死四坐标数组
  let blockadeArrConsecutivePos={
    x: [[],[],[],[]],
    y: [[],[],[],[]],
    xy45: [[],[],[],[]],
    xy135: [[],[],[],[]],
  };




  //水平垂直循环
  for(let i=0;i<chessGrid;i++){
    //水平方向
    for(let x=0;x<chessGrid;x++){

    }
    //垂直方向
    for(let y=0;y<chessGrid;y++){

    }
  }

  //对角循环
  for (let i = 0; i < chessGrid - 4; i++) {
    //45度方向，x、y同步递增递减，斜率=1，程正相关
    //45度方向，下限
    for(let x=i,y=0;x<chessGrid&&y<chessGrid;x++,y++){

    }

    //45度方向，上限
    for(let x=0,y=i+1;x<chessGrid&&y<chessGrid;x++,y++){

    }


    //135度方向，斜率=-1，x、y程负相关，
    //135度方向，下限
    for(let x=0,y=chessGrid - i - 1;x<chessGrid&&y>=0;x++,y--){

    }
    //135度方向，上限
    for(let x=i+1,y=chessGrid -1;x<chessGrid&&y>=0;x++,y--){


    }


  }



  return getBestPosFromConsecutivePos(attackArrConsecutivePos,blockadeArrConsecutivePos,chessPosArr);


}

//筛选出最佳落子点：比如四连点，筛除死角，选出交叉点
function getBestPosFromConsecutivePos (attackArrConsecutivePos,blockadeArrConsecutivePos,chessPosArr) {
  let keys=Object.keys(attackArrConsecutivePos);
  let pos={x: 0,y: 0};

  // console.log(attackArrConsecutivePos,blockadeArrConsecutivePos);

  for(let i=3;i>=0;i--){
    // debugger;
    let attackArrArrTemp=[];
    let blockadeArrTemp=[];
    for(let j in attackArrConsecutivePos){
      attackArrArrTemp.push(attackArrConsecutivePos[j][i]);
      blockadeArrTemp.push(blockadeArrConsecutivePos[j][i])
    }
    attackArrArrTemp=attackArrArrTemp.sort((a,b)=>a.length<b.length)[0];
    blockadeArrTemp=blockadeArrTemp.sort((a,b)=>a.length<b.length)[0];
    // console.log('attackArrArrTemp,blockadeArrTemp')
    // console.log(attackArrArrTemp,blockadeArrTemp)
   /* attackArrArrTemp= keys.map(key=>{

      return attackArrConsecutivePos[key][i];
    }).sort((a,b)=>a.length<b.length).shift();

    blockadeArrTemp=keys.map(key=>{
      return blockadeArrConsecutivePos[key][i]
    }).sort((a,b)=>a.length<b.length).shift();*/
    // debugger;

    let tempArr;
    if(attackArrArrTemp&&attackArrArrTemp.length){
     tempArr= attackArrArrTemp[Math.floor(attackArrArrTemp.length/2)];
      return {x: tempArr[0],y: tempArr[1]};
    }
    if(blockadeArrTemp&&blockadeArrTemp.length){
      tempArr= blockadeArrTemp[Math.floor(blockadeArrTemp.length/2)];
      return {x: tempArr[0],y: tempArr[1]};
    }
  }

  chessPosArr.some(function (arr,x) {
    return arr.some(function (id,y) {
      if(!id){
        pos={x: x,y: y};
        return true;
      }
    })
  });
  return pos;

}


