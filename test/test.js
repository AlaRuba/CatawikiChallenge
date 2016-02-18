var expect = require("chai").expect;
var Board = require("../lib/board.js");
var Rover = require("../lib/rover.js");


describe("Board", function(){
  describe("#constructor", function(){
       it("should create a board", function(done){
           var plateau = new Board(5, 5);
           expect(plateau.getEdgeX()).to.equal(5);
           expect(plateau.getEdgeY()).to.equal(5);
           done();
       });

       it("should stop invalid boards", function(done){
          try {
            var plateau = new Board(-1, -1);
          } catch (err) { 
            expect(err.message).equal("Board: Invalid X and Y passed. They must be positive"); 
          }
          try {
            var plateau = new Board(1.1, 1.1);
          } catch (err) { 
            expect(err.message).equal("Board: Invalid X and Y passed. They must be integer"); 
          }
          try {
            var plateau = new Board(5, 6);
          } catch (err) { 
            expect(err.message).equal("Board: Must be rectangular"); 
          }
          done();
       });
   });
});

describe("Rover", function(){
  describe("#constructor", function(){
       it("should create a rover", function(done){
           var plateau = new Board(5, 5);
           var rover1 = new Rover(1, 2, "N", plateau, 1);
           done();
       });

       it("should stop invalid rovers", function(done){
          var plateau = new Board(5, 5);
          try {
            var rover1 = new Rover(-1, 2, "N", plateau, 1);
          } catch (err) { 
            expect(err.message).equal("Rover 1: Invalid X passed. It must be positive"); 
          }
          try {
            var rover1 = new Rover(1, -2, "N", plateau, 1);
          } catch (err) { 
            expect(err.message).equal("Rover 1: Invalid Y passed. It must be positive"); 
          }
          try {
            var rover1 = new Rover(1.1, 2, "N", plateau, 1);
          } catch (err) { 
            expect(err.message).equal("Rover 1: Invalid X passed. It must be integer"); 
          }
          try {
            var rover1 = new Rover(1, 2.2, "N", plateau, 1);
          } catch (err) { 
            expect(err.message).equal("Rover 1: Invalid Y passed. It must be integer"); 
          }
          try {
            var rover1 = new Rover(1, 2, "A", plateau, 1);
          } catch (err) { 
            expect(err.message).equal("Rover 1: Invalid orientation passed. It must be one of NWSE"); 
          }
          try {
            var rover1 = new Rover(6, 2, "W", plateau, 1);
          } catch (err) { 
            expect(err.message).equal("Rover 1: Invalid X passed. Past bounds of board"); 
          }
          try {
            var rover1 = new Rover(2, 7, "W", plateau, 1);
          } catch (err) { 
            expect(err.message).equal("Rover 1: Invalid Y passed. Past bounds of board"); 
          }
          done();
       });

      it("should be able to handle invalid moves", function(done) {
        var plateau = new Board(5, 5);
        var rover1 = new Rover(1, 2, "N", plateau, 1);
        try {
          curPos = rover1.move("LA23");
        } catch(err) {
          expect(err.message).to.equal("Rover 1: Invalid move passed. It must be one of LRM");
        }
        try {
          curPos = rover1.move("3");
        } catch(err) {
          expect(err.message).to.equal("Rover 1: Invalid move passed. It must be one of LRM");
        }
        done();
      });

      it("should be able to rotate left correctly", function(done) {
        var plateau = new Board(5, 5);
        var rover1 = new Rover(1, 2, "N", plateau, 1);
        curPos = rover1.move("L");
        expect(curPos).to.deep.equal([1,2,'W']);
        curPos = rover1.move("L");
        expect(curPos).to.deep.equal([1,2,'S']);
        curPos = rover1.move("L");
        expect(curPos).to.deep.equal([1,2,'E']);
        curPos = rover1.move("L");
        expect(curPos).to.deep.equal([1,2,'N']);
        curPos = rover1.move("LLLL");
        expect(curPos).to.deep.equal([1,2,'N']);
        curPos = rover1.move("LRLRLRLR");
        expect(curPos).to.deep.equal([1,2,'N']);
        done();
      });

      it("should be able to rotate right correctly", function(done) {
        var plateau = new Board(5, 5);
        var rover1 = new Rover(1, 2, "N", plateau, 1);
        curPos = rover1.move("R");
        expect(curPos).to.deep.equal([1,2,'E']);
        curPos = rover1.move("R");
        expect(curPos).to.deep.equal([1,2,'S']);
        curPos = rover1.move("R");
        expect(curPos).to.deep.equal([1,2,'W']);
        curPos = rover1.move("R");
        expect(curPos).to.deep.equal([1,2,'N']);
        curPos = rover1.move("RRRR");
        expect(curPos).to.deep.equal([1,2,'N']);
        curPos = rover1.move("RLRLRLRL");
        expect(curPos).to.deep.equal([1,2,'N']);
        done();
      });

      it("should be able to move M correctly", function(done) {
        var plateau = new Board(5, 5);
        var rover1 = new Rover(1, 2, "N", plateau, 1);
        curPos = rover1.move("M");
        expect(curPos).to.deep.equal([1,3,'N']);
        var rover2 = new Rover(1, 2, "W", plateau, 2);
        curPos = rover2.move("M")
        expect(curPos).to.deep.equal([0,2,'W']);
        var rover3 = new Rover(1, 2, "S", plateau, 3);
        curPos = rover3.move("M")
        expect(curPos).to.deep.equal([1,1,'S']);
        var rover4 = new Rover(1, 2, "E", plateau, 4);
        curPos = rover4.move("M")
        expect(curPos).to.deep.equal([2,2,'E']);
        done();
      });

      it("should not move out of bounds", function(done) {
        var plateau = new Board(5, 5);
        var rover1 = new Rover(1, 2, "N", plateau, 1);
        try {
          curPos = rover1.move("LMM");
        } catch(err) {
          expect(err.message).to.equal("Rover 1: moved out of bounds");
        }
        done();
      });  

      it("should move properly on complex moves", function(done) {
        var plateau = new Board(5, 5);
        var rover1 = new Rover(1, 2, "N", plateau, 1);
        curPos = rover1.move("LMLMLMLMM");
        expect(curPos).to.deep.equal([1,3,"N"]);
        var rover2 = new Rover(3, 3, "E", plateau, 2);
        curPos2 = rover2.move("MMRMMRMRRM");
        expect(curPos2).to.deep.equal([5,1,"E"]);
        done();
      });  

   });
});