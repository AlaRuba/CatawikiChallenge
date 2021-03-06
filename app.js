var Rover = require("./lib/rover.js");
var Board = require("./lib/board.js");
var lineReader = require('line-reader');


var boardSetup = false;
var board;

//This helper function sets-up the board after some post-processing 
function setupBoard(line) {
  var coordinates = line.split(' ');
  board = new Board(Number(coordinates[0]), Number(coordinates[1]))
  boardSetup = true;
}

//This helper function sets-up a rover after some post-processing 
var roverSetup = false;
var rover;
function setupRover(line, counter) {
  var coordinates = line.split(' ');
  rover = new Rover(Number(coordinates[0]), Number(coordinates[1]), coordinates[2], board, counter)
  roverSetup = true;
  //This is in case the last rover gets defined and instantiated but never moved
  results[counter-1] = rover.getPos();
}

//This helper function prints the results
function printResults() {
  for (var i =0; i < results.length; i++) {
    var resultString = results[i].join(' ');
    console.log(resultString);
  }
}

var results = [];
lineReader.open('testInput.txt', function(err, reader) {
  var counter = 1;
  try{ 
    if (err) throw err;
    while (reader.hasNextLine()) {
      reader.nextLine(function(err, line) {
        if (!boardSetup) {
          setupBoard(line);
        } else {
          if (!roverSetup) {
            setupRover(line, counter);
          } else {
            endPos = rover.move(line);
            results[counter-1] = endPos;
            //This is so we can set-up the next rover
            roverSetup = false;
            counter += 1;
          }
        }
      });
    }
  } catch(err) {
    console.log(err);
  }
  reader.close(function(err) {
    printResults();
    if (err) throw err;          
  });

});