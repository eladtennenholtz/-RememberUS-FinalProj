"use strict";
const forPlanImage = require("./forPlanImage.js");
const validator = require("validator");

class person {
  constructor(
    firstName,
    lastName,
    userName,
    password,
    email,
    adress,
    gender,
    personPrivacy,
    savedInDataBase = false
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.adress = adress;
    this.gender = gender;
    this.forPlanArray = [];
    this.savedInDataBase = savedInDataBase;
    this.personPrivacy = personPrivacy;
  }

  //Getters
  get FirstName() {
    return this.firstName;
  }
  get LastName() {
    return this.lastName;
  }
  get UserName() {
    return this.userName;
  }
  get Password() {
    return this.password;
  }
  get Email() {
    return this.email;
  }
  get Adress() {
    return this.adress;
  }
  get Gender() {
    return this.gender;
  }
  get ForPlanArray() {
    return this.forPlanArray;
  }
  get SavedInDataBase() {
    return this.savedInDataBase;
  }
  get PersonPrivacy() {
    return this.personPrivacy;
  }

  //Setters
  changeFirstName(newFirstName) {
    this.firstName = newFirstName;
  }
  changeLastName(newLastName) {
    this.lastName = newLastName;
  }
  changeUserName(newUserName) {
    this.userName = newUserName;
  }
  changePassword(newPassword) {
    this.password = newPassword;
  }
  changeEmail(newEmail) {
    if (this.emailIsValid(newEmail)) {
      this.email = newEmail;
      return true;
    }
    return false;
  }
  changeAdress(newAdress) {
    this.adress = newAdress;
  }
  changeGender(newGender) {
    this.gender = newGender;
  }
  changeForPlanArray(newArray) {
    this.forPlanArray = newArray;
  }
  changeSavedInDataBase(status) {
    this.savedInDataBase = status;
  }
  changePersonPrivacy(status) {
    this.personPrivacy = status;
  }

  //Methods
  AddNewForPlan(forPlanBase64) {
    let newForPlanToAdd = new forPlanImage(
      forPlanBase64,
      this.forPlanArray.length
    );
    this.forPlanArray.push(newForPlanToAdd);
  }

  DeleteForPlanByIndex(forPlanToDeleteIndex) {
    if (
      forPlanToDeleteIndex <= this.forPlanArray.length - 1 &&
      forPlanToDeleteIndex >= 0
    ) {
      this.forPlanArray.splice(forPlanToDeleteIndex, 1);
      for (
        let i = forPlanToDeleteIndex;
        i <= this.forPlanArray.length - 1;
        i++
      ) {
        this.forPlanArray[i].changeforPlanIndex(
          this.forPlanArray[i].ForPlanIndex - 1
        );
      }
      return true;
    } else {
      return false;
    }
  }

  AddNewFurnitureForCertainIndexFloorplan(
    forPlanIndex,
    typeName,
    key,
    file,
    flag,
    ImageInBase64 = undefined
  ) {
    if (forPlanIndex <= this.forPlanArray.length - 1 && forPlanIndex >= 0) {
      this.forPlanArray[forPlanIndex].addNewFurniture(
        typeName,
        key,
        file,
        flag,
        ImageInBase64
      );
      return true;
    }
    return false;
  }

  DeleteFurnitureByIndexForCertainFloorPlanIndex(
    floorPlanIndex,
    furnitureIndex
  ) {
    if (floorPlanIndex <= this.forPlanArray.length - 1 && floorPlanIndex >= 0) {
      const floorPlan = this.forPlanArray[floorPlanIndex];
      return floorPlan.DeleteFurnitureByIndex(furnitureIndex);
    }
    return false;
  }

  DeleteAllFurnitureOfCertainFloorPlanIndex(floorPlanIndex) {
    if (floorPlanIndex <= this.forPlanArray.length - 1 && floorPlanIndex >= 0) {
      this.forPlanArray[floorPlanIndex].changeFurnitureArray([]);
      return true;
    }
    return false;
  }

  ChangeFurnitureTypeByFurnitureIndexAndFloorPlanIndex(
    floorPlanIndex,
    furnitureIndex,
    newTypeName
  ) {
    if (floorPlanIndex <= this.forPlanArray.length - 1 && floorPlanIndex >= 0) {
      const floorPlan = this.forPlanArray[floorPlanIndex];
      return floorPlan.ChangeFurnitureTypeByIndex(furnitureIndex, newTypeName);
    }
    return false;
  }
  emailIsValid(email) {
    if (validator.isEmail(email)) {
      return true;
    }
    return false;
  }
  LikeFloorPlanByIndex(userName, index) {
    //floorplanIndex is valid
    if (index >= 0 && index <= this.forPlanArray.length - 1) {
      //liked succssed->that userName didnt liked that person floorplan already
      if (this.forPlanArray[index].LikeFloorPlan(userName) === true) {
        return true;
      }
      //liked failed->that userName already liked that person floorplan already
      else {
        return false;
      }
    }
    return false;
  }
  DisLikeFloorPlanByIndex(userName, index) {
    //floorplanIndex is valid
    if (index >= 0 && index <= this.forPlanArray.length - 1) {
      //Dislike succssed->that userName liked that person floorplan
      if (this.forPlanArray[index].DislikeFloorPlan(userName) === true) {
        return true;
      }
      //liked failed->that userName already liked that person floorplan already
      else {
        return false;
      }
    }
    return false;
  }
  CommentOnFloorPlanByIndex(theUsernameWhoComment, commentToAdd, index) {
    //floorplanIndex is valid
    if (index >= 0 && index <= this.forPlanArray.length - 1) {
      this.forPlanArray[index].CommentOnFloorPlan(
        theUsernameWhoComment,
        commentToAdd
      );
      return true;
    }
    return false;
  }
}

module.exports = person;
