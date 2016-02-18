function Rover (x, y, orientation, board) {
  if (x < 0) {
    throw new Error("Invalid X passed. It must be positive") 
  }
  if (y < 0) {
    throw new Error("Invalid Y passed. It must be positive") 
  }
  if (!(x % 1 === 0)) {
    throw new Error("Invalid X passed. It must be integer") 
  }
  if (!(y % 1 === 0)) {
    throw new Error("Invalid Y passed. It must be integer") 
  }
  if (!(orientation == "N" || orientation == "W" || orientation == "E" || orientation == "S")) {
    throw new Error("Invalid orientation passed. It must be one of NWSE");
  } 
  this.x = x;
  this.y = y;
  this.orientation = orientation;
  this.board = board;
}

Rover.prototype.getPos = function() {
  return [this.x, this.y, this.orientation];
}

function rotateLeft() {
  switch (this.orientation) {
    case "N":
      this.orientation = "W";
      break;
    case "W":
      this.orientation = "S";
      break;
    case "S":
      this.orientation = "E";
      break;
    case "E":
      this.orientation = "N";
      break;
  }
}

function rotateRight() {
  switch (this.orientation) {
    case "N":
      this.orientation = "E";
      break;
    case "E":
      this.orientation = "S";
      break;
    case "S":
      this.orientation = "W";
      break;
    case "W":
      this.orientation = "N";
      break;
  }
}

function moveM() {
  switch (this.orientation) {
    case "N":
      this.y += 1;
    case "W":
      this.x -= 1;
    case "E":
      this.x += 1;
    case "S":
      this.y -= 1;
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
         throw new Error("Invalid move passed. It must be one of LRM");
    }
  }
  console.log(this.getPos());
  return this.getPos();
}

module.exports = Rover;
