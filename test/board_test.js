var expect = require("chai").expect;
var Board = require("../lib/board.js");

describe("Board", function(){
  describe("#constructor", function(){
       it("should create a board", function(){
           var plateau = new Board(5, 6);
           expect(plateau.getEdgeX()).to.equal(5);
           expect(plateau.getEdgeY()).to.equal(6);
       });
   });
});