function Board (maxX, maxY) {
  if (maxX != maxY) {
    throw new Error("Board: Must be rectangular"); 
  }
  if (maxX < 0) {
    throw new Error("Board: Invalid X and Y passed. They must be positive") 
  }
  if (!(maxX % 1 === 0)) {
    throw new Error("Board: Invalid X and Y passed. They must be integer") 
  }
  this.edgeX = maxX;
  this.edgeY = maxY;
}

Board.prototype.getEdgeX = function() {
  return this.edgeX
}

Board.prototype.getEdgeY = function() {
  return this.edgeY
}

module.exports = Board;
