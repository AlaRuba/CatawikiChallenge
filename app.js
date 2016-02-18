var Rover = require("./lib/rover.js");
var Board = require("./lib/board.js");

var plateau = new Board(5, 5);
var rover1 = new Rover(1, 2, "N", plateau);
rover1.move("LMLMLMLMM");