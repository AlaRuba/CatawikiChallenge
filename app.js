var Rover = require("./lib/rover.js");
var Board = require("./lib/board.js");
var lineReader = require('line-reader');


var boardSetup = false;
var board;
function setupBoard(line) {
  var coordinates = line.split(' ');
  board = new Board(Number(coordinates[0]), Number(coordinates[1]))
  boardSetup = true;
}

var roverSetup = false;
var rover;
function setupRover(line) {
  var coordinates = line.split(' ');
  rover = new Rover(coordinates[0], coordinates[1], coordinates[2], board)
  roverSetup = true;
}

var results = [];
lineReader.open('testInput.txt', function(err, reader) {
  try{ 
    if (err) throw err;
    while (reader.hasNextLine()) {
      reader.nextLine(function(err, line) {
        if (!boardSetup) {
          setupBoard(line);
        } else {
          if (!roverSetup) {
            setupRover(line);
          } else {
            endPos = rover.move(line);
            results.push(endPos);
            //This is so we can set-up the next rover
            roverSetup = false;
          }
        }
      });
    }
  } catch(err) {
    console.log(err);
  }
  reader.close(function(err) {
    if (err) throw err;          
    });

});

for (var i =0; i < results.length; i++) {
  console.log(results[i]);
}