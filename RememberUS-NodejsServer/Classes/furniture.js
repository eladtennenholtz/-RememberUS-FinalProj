"use strict";

class furniture {
  constructor(typeName, furnitureIndex, key, file, flag) {
    this.furnitureIndex = furnitureIndex;
    this.imageInBase64 = undefined;
    this.typeName = typeName;
    this.key = key;
    this.file = file;
    this.flag = flag;
  }
  // Getter
  get ImageInBase64() {
    return this.imageInBase64;
  }
  get TypeName() {
    return this.typeName;
  }
  get FurnitureIndex() {
    return this.furnitureIndex;
  }
  get Key() {
    return this.key;
  }
  get File() {
    return this.file;
  }
  get Flag() {
    return this.flag;
  }

  // Setters
  changeImageInBase64(ImageInBase64) {
    this.imageInBase64 = ImageInBase64;
  }
  changeTypeName(typeName) {
    this.typeName = typeName;
  }
  changeFurnitureIndex(newIndex) {
    this.furnitureIndex = newIndex;
  }
  changeKey(newKey) {
    this.key = newKey;
  }
  changeFile(newFile) {
    this.file = newFile;
  }
  changeFlag(newFlag) {
    this.flag = newFlag;
  }
}

module.exports.furnitureClass = furniture;
