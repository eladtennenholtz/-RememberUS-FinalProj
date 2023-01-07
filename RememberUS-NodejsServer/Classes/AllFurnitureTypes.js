"use strict";
const furnitureClass = require("./furniture.js");

class sofa extends furnitureClass.furnitureClass {
  constructor(furnitureIndex, key, file, flag) {
    super("sofa", furnitureIndex, key, file, flag);
  }
}

class bath extends furnitureClass.furnitureClass {
  constructor(furnitureIndex, key, file, flag) {
    super("bath", furnitureIndex, key, file, flag);
  }
}

class toilet extends furnitureClass.furnitureClass {
  constructor(furnitureIndex, key, file, flag) {
    super("toilet", furnitureIndex, key, file, flag);
  }
}

class television extends furnitureClass.furnitureClass {
  constructor(furnitureIndex, key, file, flag) {
    super("television", furnitureIndex, key, file, flag);
  }
}

class fridge extends furnitureClass.furnitureClass {
  constructor(furnitureIndex, key, file, flag) {
    super("fridge", furnitureIndex, key, file, flag);
  }
}

class door extends furnitureClass.furnitureClass {
  constructor(furnitureIndex, key, file, flag) {
    super("door", furnitureIndex, key, file, flag);
  }
}

class chair extends furnitureClass.furnitureClass {
  constructor(furnitureIndex, key, file, flag) {
    super("chair", furnitureIndex, key, file, flag);
  }
}

class table extends furnitureClass.furnitureClass {
  constructor(furnitureIndex, key, file, flag) {
    super("table", furnitureIndex, key, file, flag);
  }
}

class carpet extends furnitureClass.furnitureClass {
  constructor(furnitureIndex, key, file, flag) {
    super("carpet", furnitureIndex, key, file, flag);
  }
}

module.exports = {
  sofa: sofa,
  bath: bath,
  toilet: toilet,
  television: television,
  fridge: fridge,
  door: door,
  chair: chair,
  table: table,
  carpet: carpet,
};
