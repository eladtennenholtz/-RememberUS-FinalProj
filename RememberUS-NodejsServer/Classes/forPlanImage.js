"use strict";
const allFurnitureClass = require("./allFurnitureTypes.js");

class forPlanImage {
  constructor(forPlanImangeBase64 = undefined, forPlanIndex) {
    this.forPlanIndex = forPlanIndex;
    this.forPlanImangeBase64 = forPlanImangeBase64;
    this.furnitureArray = [];
    this.likes = [];
    this.comments = [];
  }

  //Getters
  get ForPlanImangeBase64() {
    return this.forPlanImangeBase64;
  }
  get ForPlanIndex() {
    return this.forPlanIndex;
  }
  get FurnitureArray() {
    return this.furnitureArray;
  }
  get LikesAmount() {
    return this.likes.length();
  }

  //Setters
  changeforPlanImangeBase64(newforPlanImangeBase64) {
    this.forPlanImangeBase64 = newforPlanImangeBase64;
  }
  changeforPlanIndex(newIndex) {
    this.forPlanIndex = newIndex;
  }
  changeFurnitureArray(newArray) {
    this.furnitureArray = newArray;
  }

  //Methods
  addNewFurniture(typeName, key, file, flag, ImageInBase64 = undefined) {
    let newFurnitureToAdd = BuildCertainFurniture(
      typeName,
      this.furnitureArray.length,
      key,
      file,
      flag
    );
    newFurnitureToAdd.changeImageInBase64(ImageInBase64);
    this.furnitureArray.push(newFurnitureToAdd);
  }

  DeleteFurnitureByIndex(furnitureIndex) {
    if (
      furnitureIndex <= this.furnitureArray.length - 1 &&
      furnitureIndex >= 0
    ) {
      this.furnitureArray.splice(furnitureIndex, 1);
      for (let i = furnitureIndex; i <= this.furnitureArray.length - 1; i++) {
        this.furnitureArray[i].changeFurnitureIndex(
          this.furnitureArray[i].FurnitureIndex - 1
        );
      }
      return true;
    } else {
      return false;
    }
  }

  ChangeFurnitureTypeByIndex(furnitureIndex, newTypeName) {
    if (
      furnitureIndex <= this.furnitureArray.length - 1 &&
      furnitureIndex >= 0
    ) {
      this.furnitureArray[furnitureIndex].changeTypeName(newTypeName);
      return true;
    } else {
      return false;
    }
  }
  LikeFloorPlan(userName) {
    for (let i = 0; i < this.likes.length; i++) {
      if (this.likes[i] == userName) {
        return false;
      }
    }
    this.likes.push(userName);
    return true;
  }
  DislikeFloorPlan(userName) {
    for (let i = 0; i < this.likes.length; i++) {
      if (this.likes[i] == userName) {
        this.likes.splice(i, 1);
        return true;
      }
    }
    return false;
  }
  CommentOnFloorPlan(theUserNameWhoComment, theComment) {
    this.comments.push({
      theUserNameWhoComment: theUserNameWhoComment,
      theComment: theComment,
    });
  }
}

function BuildCertainFurniture(typeName, furnitureIndex, key, file, flag) {
  let newFurniture;
  switch (typeName) {
    case "sofa": {
      newFurniture = new allFurnitureClass.sofa(
        furnitureIndex,
        key,
        file,
        flag
      );
      break;
    }
    case "bath": {
      newFurniture = new allFurnitureClass.bath(
        furnitureIndex,
        key,
        file,
        flag
      );
      break;
    }
    case "toilet": {
      newFurniture = new allFurnitureClass.toilet(
        furnitureIndex,
        key,
        file,
        flag
      );
      break;
    }
    case "television": {
      newFurniture = new allFurnitureClass.television(
        furnitureIndex,
        key,
        file,
        flag
      );
      break;
    }
    case "fridge": {
      newFurniture = new allFurnitureClass.fridge(
        furnitureIndex,
        key,
        file,
        flag
      );
      break;
    }
    case "door": {
      newFurniture = new allFurnitureClass.door(
        furnitureIndex,
        key,
        file,
        flag
      );
      break;
    }
    case "chair": {
      newFurniture = new allFurnitureClass.chair(
        furnitureIndex,
        key,
        file,
        flag
      );
      break;
    }
    case "table": {
      newFurniture = new allFurnitureClass.table(
        furnitureIndex,
        key,
        file,
        flag
      );
      break;
    }
    case "carpet": {
      newFurniture = new allFurnitureClass.carpet(
        furnitureIndex,
        key,
        file,
        flag
      );
      break;
    }
  }

  return newFurniture;
}

module.exports = forPlanImage;
