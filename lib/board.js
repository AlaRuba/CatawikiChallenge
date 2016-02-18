function Board (maxX, maxY) {
  if (maxX < 0) {
    throw new Error("Board: Invalid X passed. It must be positive") 
  }
  if (maxY < 0) {
    throw new Error("Board: Invalid Y passed. It must be positive") 
  }
  if (!(maxX % 1 === 0)) {
    throw new Error("Board: Invalid X passed. It must be integer") 
  }
  if (!(maxY % 1 === 0)) {
    throw new Error("Board: Invalid Y passed. It must be integer") 
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
