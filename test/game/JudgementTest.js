/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';
import  {judgementByDropPos,judgementAllPos} from '../../src/games/judgeMengt';
describe('JudgeMengt', function() {
  it('checkY is Win',function(){
    let id=1;
    let chessPosArr=[
      [1,1,1,1,1,1,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]];
    expect(judgementAllPos(chessPosArr,id)).to.equals(true);
  });


  it('checkX is Win',function(){
    let id=1;
    let chessPosArr=[
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]];
    expect(judgementAllPos(chessPosArr,id)).to.equals(true);
  });

  it('checkXY45 is Win',function(){
    let id=1;
    let chessPosArr=[
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,1,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,1,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,1,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,1,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]];
    expect(judgementAllPos(chessPosArr,id)).to.equals(true);
  });
  it('checkXY225 is Win',function(){
    let id=1;
    let chessPosArr=[
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,1],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,1,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,1,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,1,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,1,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]];

    expect(judgementAllPos(chessPosArr,id)).to.equals(true);
  });




});


describe('judgementByDropPos check algorithm', function() {
  it('checkY is Win',function(){
    let id=1;
    let chessPosArr=[
      [1,1,1,1,1,1,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]];
    expect(judgementAllPos(chessPosArr,id)).to.equals(true);
  });


  it('checkX is Win',function(){
    let id=1;
    let chessPosArr=[
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]];
    expect(judgementAllPos(chessPosArr,id)).to.equals(true);
  });

  it('checkXY45 is Win',function(){
    let id=1;
    let chessPosArr=[
      [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,1,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,1,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,1,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,1,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]];
    expect(judgementAllPos(chessPosArr,id)).to.equals(true);
  });
  it('checkXY225 is Win',function(){
    let id=1;
    let chessPosArr=[
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,1],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,1,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,1,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,1,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,1,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]];

    expect(judgementAllPos(chessPosArr,id)).to.equals(true);
  });




});


