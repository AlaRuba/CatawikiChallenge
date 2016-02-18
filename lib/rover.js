function Rover (x, y, orientation, board, counter) {
  //The counter is for easier debugging so we know which rover messed up
  if (x < 0) {
    throw new Error("Rover "+counter+": Invalid X passed. It must be positive") 
  }
  if (y < 0) {
    throw new Error("Rover "+counter+": Invalid Y passed. It must be positive") 
  }
  if (!(x % 1 === 0)) {
    throw new Error("Rover "+counter+": Invalid X passed. It must be integer") 
  }
  if (!(y % 1 === 0)) {
    throw new Error("Rover "+counter+": Invalid Y passed. It must be integer") 
  }
  if (!(orientation == "N" || orientation == "W" || orientation == "E" || orientation == "S")) {
    throw new Error("Rover "+counter+": Invalid orientation passed. It must be one of NWSE");
  } 

  this.x = x;
  this.y = y;
  this.orientation = orientation;
  this.board = board;
  this.counter = counter

  if (x > this.board.getEdgeX()) {
    throw new Error("Rover "+counter+": Invalid X passed. Past bounds of board") 
  }
  if (y > this.board.getEdgeY()) {
    throw new Error("Rover "+counter+": Invalid Y passed. Past bounds of board") 
  }
}

Rover.prototype.getPos = function() {
  return [this.x, this.y, this.orientation];
}

function rotateLeft() {
  //This is done to ensure string comparison is done right
  if (this.orientation === "N") {
    this.orientation = "W";
  } else if (this.orientation === "W") {
    this.orientation = "S";
  } else if (this.orientation === "E") {
    this.orientation = "N";
  } else if (this.orientation === "S") {
    this.orientation = "E";
  }
}

function rotateRight() {
  //This is done to ensure string comparison is done right

  if (this.orientation === "N") {
    this.orientation = "E";
  } else if (this.orientation === "W") {
    this.orientation = "N";
  } else if (this.orientation === "E") {
    this.orientation = "S";
  } else if (this.orientation === "S") {
    this.orientation = "W";
  }
}

function moveM() {
  //This is done to ensure string comparison is done right
  if (this.orientation === "N") {
    this.y += 1;
  } else if (this.orientation === "W") {
    this.x -= 1;
  } else if (this.orientation === "E") {
    this.x += 1;
  } else if (this.orientation === "S") {
    this.y -= 1;
  }
  if (this.x < 0 || this.x > this.board.getEdgeX() || this.y < 0 || this.y > this.board.getEdgeY()) {
    throw new Error("Rover "+this.counter+": moved out of bounds");
  }
}

Rover.prototype.move = function(moves) {
  for (var i = 0; i < moves.length; i++) {
    var currentMove = moves[i];
    switch(currentMove) {
      case "L":
        rotateLeft.call(this);
        break;
      case "R":
        rotateRight.call(this);
        break;
      case "M":
        moveM.call(this);
        break;
      default:
         throw new Error("Rover "+this.counter+": Invalid move passed. It must be one of LRM");
    }
  }
  return this.getPos();
}

module.exports = Rover;
