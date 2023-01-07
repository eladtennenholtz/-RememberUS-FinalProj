`use strict`;
const path = require("path");
const person = require(path.join(__dirname, "../Classes/person"));
const MongoDBManager = require(path.join(
  __dirname,
  "../MongoDB/MongoDBManager"
));

//-------------------------------------input check Functions------------------------------------\\
const validator = require("validator");
const { IsuserNameExist } = require("../MongoDB/MongoDBManager");

function emailIsValid(email) {
  if (validator.isEmail(email)) {
    return true;
  }
  return false;
}

//-------------------------------------Help Functions-------------------------------------\\

//Function who get document and create person from the document
function createPersonFromDBDocument(Document) {
  let updatedUser = new person(
    Document.firstName,
    Document.lastName,
    Document.userName,
    Document.password,
    Document.email,
    Document.adress,
    Document.gender,
    Document.personPrivacy,
    true
  );

  let index = 0;
  for (const currentForPlan of Document.forPlanArray) {
    updatedUser.AddNewForPlan(currentForPlan.forPlanImangeBase64);
    //build that furniture array for that floorplan
    for (const currentFurnitre of currentForPlan.furnitureArray) {
      updatedUser.AddNewFurnitureForCertainIndexFloorplan(
        index,
        currentFurnitre.typeName,
        currentFurnitre.key,
        currentFurnitre.file,
        currentFurnitre.flag,
        currentFurnitre.imageInBase64
      );
    }
    //build the likes array for that floorplam
    for (let i = 0; i < currentForPlan.likes.length; i++) {
      updatedUser.LikeFloorPlanByIndex(currentForPlan.likes[i], index);
    }
    //build the comment array for that floorplan theUsernameWhoComment, commentToAdd, index
    for (let i = 0; i < currentForPlan.comments.length; i++) {
      updatedUser.CommentOnFloorPlanByIndex(
        currentForPlan.comments[i].theUserNameWhoComment,
        currentForPlan.comments[i].theComment,
        index
      );
    }
    index++;
  }
  return updatedUser;
}

//-------------------------------------Exports Functions-------------------------------------\\

//Function for conneccting to mongoDB
async function ConnectToMongoDB() {
  await MongoDBManager.ConnectToDataBase();
}

//Function for Login----(doesnt use Data Base)
//1.return "Login succssed" and and userInfo as JSON if there is such a user with that userName and password
//2.return "Login Failed" if any input for logIn is missing or there is no such a user that matching that userName and password
async function Login(userName, password) {
  if (!userName) {
    return {
      Status: "Login Failed",
      Reason: "Missing input, userName",
    };
  }
  if (!password) {
    return {
      Status: "Login Failed",
      Reason: "Missing input, password",
    };
  }

  const userDocument = await MongoDBManager.IsuserNameAndpasswordExist(
    userName,
    password
  );
  const userExist = userDocument != null ? true : false;

  if (userExist) {
    return { Status: "Login succssed", userInfo: userDocument };
  } else {
    return {
      Status: "Login failed",
      Reason: "Incorrent Username and password",
    };
  }
}

//Function for SigningUp----(doesnt use Data Base)
//1.return "Sign Up succssed" if all input valid and there is no one in data base using same userName
//2.return "Sign Up Failed" if any input for sign up is missing,Email is invalid or someone in data base using same userName
async function SignUp(
  firstName,
  lastName,
  userName,
  password,
  email,
  adress,
  gender,
  personPrivacy
) {
  if (!firstName) {
    return {
      Status: "Sign Up Failed",
      Reason: "Missing input, firstName",
    };
  }
  if (!lastName) {
    return {
      Status: "Sign Up Failed",
      Reason: "Missing input, lastName",
    };
  }
  if (!userName) {
    return {
      Status: "Sign Up Failed",
      Reason: "Missing input, userName",
    };
  }
  if (!password) {
    return {
      Status: "Sign Up Failed",
      Reason: "Missing input, password",
    };
  }
  if (!email) {
    return {
      Status: "Sign Up Failed",
      Reason: "Missing input, email",
    };
  } else if (!emailIsValid(email)) {
    return {
      Status: "Sign Up Failed",
      Reason: "email is not valid",
    };
  }
  if (!adress) {
    return {
      Status: "Sign Up Failed",
      Reason: "Missing input, adress",
    };
  }
  if (!gender) {
    return {
      Status: "Sign Up Failed",
      Reason: "Missing input, gender",
    };
  }
  if (!personPrivacy) {
    return {
      Status: "Sign Up Failed",
      Reason: "Missing input, personPrivacy",
    };
  }

  const userDocument = await MongoDBManager.IsuserNameExist(userName);
  const userExist = userDocument != null ? true : false;

  if (!userExist) {
    let newPersonToAddToDB = new person(
      firstName,
      lastName,
      userName,
      password,
      email,
      adress,
      gender,
      personPrivacy,
      true
    );

    await MongoDBManager.CreateNewPersonInDataBase(newPersonToAddToDB);

    return {
      Status: "Sign Up succssed",
    };
  } else {
    return {
      Status: "Sign Up Failed",
      Reason: "There is user with that userName already",
    };
  }
}

//Function for Deleting Account----(Using Data Base)
//1.return "Delete Succeed" if userName Found
//2.return "Delete Failed" if not sending userName or if there is no userName in data base same as send
async function DeletingAccount(userName) {
  await MongoDBManager.DeleteExistPersonFromDB(userName);
  return { Status: "Delete Succeed" };
}

//Function for Changing password----(doesnt use Data Base)
//1.return "Delete Succeed" if userName Found
//2.return "Delete Failed" if not sending userName or if there is no userName in data base same as send
async function ChangePassword(userName, oldPassword, newPassword) {
  if (!userName) {
    return {
      Status: "Change password Failed",
      Reason: "Missing input, userName",
    };
  }
  if (!oldPassword) {
    return {
      Status: "Change password Failed",
      Reason: "Missing input, old password",
    };
  }
  if (!newPassword) {
    return {
      Status: "Change password Failed",
      Reason: "Missing input, new password",
    };
  }

  let user = await MongoDBManager.IsuserNameAndpasswordExist(
    userName,
    oldPassword
  );
  const userExist = user != null ? true : false;

  if (userExist) {
    await MongoDBManager.changePasswordForExistuser(userName, newPassword);
    user.password = newPassword;
    return { Status: "Change succssed", info: user };
  } else {
    return {
      Status: "Change password Failed",
      Reason: "no user in data base with matching userName and oldPassword",
    };
  }
}

//Function for Adding new forPlanImage----(doesnt use Data Base)
//1.return "Add Succeed" if userName Found
//2.return "Add forPlanImage Failed" if  missing input or if there is no userName in data base same as send
async function addNewForPlanForExistUser(userName, forPlanImageInBase64) {
  if (!userName) {
    return {
      Status: "Add forPlanImage Failed",
      Reason: "Missing input, userName",
    };
  }
  if (!forPlanImageInBase64) {
    return {
      Status: "Add forPlanImageBase64 Failed",
      Reason: "Missing input, forPlanImageInBase64",
    };
  }

  //we know for sure user is exists
  let user = await MongoDBManager.IsuserNameExist(userName);
  await MongoDBManager.DeleteExistPersonFromDB(userName);
  const updatedPerson = createPersonFromDBDocument(user);
  updatedPerson.AddNewForPlan(forPlanImageInBase64);
  await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);

  return {
    Status: "Add forPlanImage Succssed",
    info: updatedPerson,
  };
}

//Function for Delete forPlanImage by index----(doesnt use Data Base)
//1.return "Delete Succeed" if userName Found and there is ForPlan with that index
//2.return "Delete forPlanImage Failed" if  missing input, there is no userName in data base same as send or Index is not in range of that userName
async function DeleteForPlanByIndexForExistUser(userName, forPlanIndex) {
  if (!userName) {
    return {
      Status: "Add forPlanImage Failed",
      Reason: "Missing input, userName",
    };
  }
  if (forPlanIndex === undefined) {
    return {
      Status: "Add forPlanImageBase64 Failed",
      Reason: "Missing input, forPlanIndex",
    };
  }

  //we know for sure user is exists
  let user = await MongoDBManager.IsuserNameExist(userName);
  await MongoDBManager.DeleteExistPersonFromDB(userName);
  const updatedPerson = createPersonFromDBDocument(user);
  const deleteStatus = updatedPerson.DeleteForPlanByIndex(forPlanIndex);
  await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);
  if (deleteStatus == true) {
    return {
      Status: "Delete forPlanImage Succssed",
      info: updatedPerson,
    };
  } else {
    return {
      Status: "Delete forPlanImage failed",
      Reason: "Index is not in range",
    };
  }
}

async function AddNewFurnitureManuallyWithoutPhotoToCertainIndexForPlanForCertainExistUser(
  userName,
  forPlanIndex,
  typeName
) {
  if (!userName) {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "Missing input, userName",
    };
  }
  if (forPlanIndex === undefined) {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "Missing input, forPlanIndex",
    };
  }
  if (!typeName) {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "Missing input, typeName",
    };
  }

  let user = await MongoDBManager.IsuserNameExist(userName);
  await MongoDBManager.DeleteExistPersonFromDB(userName);
  const updatedPerson = createPersonFromDBDocument(user);
  const addStatus = updatedPerson.AddNewFurnitureForCertainIndexFloorplan(
    forPlanIndex,
    typeName
  );
  await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);

  if (addStatus == true) {
    return {
      Status: "Add Furniture Succssed",
      info: updatedPerson,
    };
  } else {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "floorPlan index is not valid",
    };
  }
}

async function DeleteFurnitureByIndexOfCertainIndexFloorplanForExistUser(
  userName,
  floorPlanIndex,
  furnitureIndex
) {
  if (!userName) {
    return {
      Status: "Delete Furtinure Failed",
      Reason: "Missing input, userName",
    };
  }
  if (forPlanIndex === undefined) {
    return {
      Status: "Delete Furtinure Failed",
      Reason: "Missing input, forPlanIndex",
    };
  }
  if (furnitureIndex === undefined) {
    return {
      Status: "Delete Furtinure Failed",
      Reason: "Missing input, typeName",
    };
  }

  let user = await MongoDBManager.IsuserNameExist(userName);
  await MongoDBManager.DeleteExistPersonFromDB(userName);
  const updatedPerson = createPersonFromDBDocument(user);
  const deleteStatus =
    updatedPerson.DeleteFurnitureByIndexForCertainFloorPlanIndex(
      floorPlanIndex,
      furnitureIndex
    );
  await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);

  if (deleteStatus == true) {
    return {
      Status: "Delete Furniture Succssed",
      info: updatedPerson,
    };
  } else {
    return {
      Status: "Delete Furtinure Failed",
      Reason: "floorPlan index or furniture index is not valid",
    };
  }
}

async function AddNewFurnitureWithPhotoToCertainIndexForPlanForCertainExistUser(
  userName,
  floorPlanIndex,
  ImageInBase64
) {
  if (!userName) {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "Missing input, userName",
    };
  }
  if (floorPlanIndex === undefined) {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "Missing input, floorPlanIndex",
    };
  }
  if (!ImageInBase64) {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "Missing input, ImageInBase64",
    };
  }

  let user = await MongoDBManager.IsuserNameExist(userName);
  await MongoDBManager.DeleteExistPersonFromDB(userName);
  const updatedPerson = createPersonFromDBDocument(user);

  //send to phyton to get typeName
  const typeName = "chair";

  const addStatus = updatedPerson.AddNewFurnitureForCertainIndexFloorplan(
    forPlanIndex,
    typeName,
    ImageInBase64
  );
  await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);

  if (addStatus == true) {
    return {
      Status: "Add Furniture Succssed",
      info: updatedPerson,
    };
  } else {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "floorPlan index is not valid",
    };
  }
}

async function ChangeFurnitureTypeByFurnitureIndexAndFloorPlanIndexOfExistUser(
  userName,
  floorPlanIndex,
  furnitureIndex,
  newTypeName
) {
  if (!userName) {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "Missing input, userName",
    };
  }
  if (!floorPlanIndex) {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "Missing input, floorPlanIndex",
    };
  }
  if (!furnitureIndex) {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "Missing input, furnitureIndex",
    };
  }
  if (!newTypeName) {
    return {
      Status: "Add new Furtinure Failed",
      Reason: "Missing input, newTypeName",
    };
  }

  let user = await MongoDBManager.IsuserNameExist(userName);
  await MongoDBManager.DeleteExistPersonFromDB(userName);
  const updatedPerson = createPersonFromDBDocument(user);
  const updateStatus =
    updatedPerson.ChangeFurnitureTypeByFurnitureIndexAndFloorPlanIndex(
      floorPlanIndex,
      furnitureIndex,
      newTypeName
    );
  await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);

  if (updateStatus == true) {
    return {
      Status: "Update furniture type Succssed",
      info: updatedPerson,
    };
  } else {
    return {
      Status: "Update furniture type Failed",
      Reason: "floorPlan index or furniture index is not valid",
    };
  }
}

async function UpdateUser(LoginUserName, newFields) {
  const user = await MongoDBManager.IsuserNameExist(newFields.userName);
  if (LoginUserName === newFields.userName || user === null) {
    let user = await MongoDBManager.IsuserNameExist(LoginUserName);
    await MongoDBManager.DeleteExistPersonFromDB(LoginUserName);
    const updatedPerson = createPersonFromDBDocument(user);
    updatedPerson.changeFirstName(newFields.firstName);
    updatedPerson.changeLastName(newFields.lastName);
    updatedPerson.changeUserName(newFields.userName);
    updatedPerson.changePassword(newFields.password);
    updatedPerson.changeEmail(newFields.email);
    updatedPerson.changeAdress(newFields.adress);
    updatedPerson.changeGender(newFields.gender);
    updatedPerson.changePersonPrivacy(newFields.personPrivacy);

    await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);

    //Always succssed beacuse we send all the detals from the front
    return { Status: "Edit succssed", userInfo: updatedPerson };
  } else if (LoginUserName != newFields.userName) {
    return {
      Status: "Edit Failed",
      Reason: "Cant change userName, that userName already taken",
    };
  }
}

async function UpdateExistUserDetail(userName, updateField, updateData) {
  if (!userName) {
    return {
      Status: "Add UpdateExistUserDetails Failed",
      Reason: "Missing input, userName",
    };
  }
  if (!updateField) {
    return {
      Status: "Add UpdateExistUserDetails Failed",
      Reason: "Missing input, updateField",
    };
  }
  if (!updateData) {
    return {
      Status: "Add UpdateExistUserDetails Failed",
      Reason: "Missing input, updateData",
    };
  }

  let user = await MongoDBManager.IsuserNameExist(userName);
  await MongoDBManager.DeleteExistPersonFromDB(userName);
  const updatedPerson = createPersonFromDBDocument(user);

  switch (updateField) {
    case "firstName": {
      updatedPerson.changeFirstName(updateData);
      await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);
      return {
        Status: "Update firstName Succssed",
        info: updatedPerson,
      };
    }
    case "lastName": {
      updatedPerson.changeLastName(updateData);
      await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);
      return {
        Status: "Update lastName Succssed",
        info: updatedPerson,
      };
    }
    case "userName": {
      updatedPerson.changeUserName(updateData);
      await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);
      return {
        Status: "Update userName Succssed",
        info: updatedPerson,
      };
    }
    case "password": {
      updatedPerson.changePassword(updateData);
      await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);
      return {
        Status: "Update password Succssed",
        info: updatedPerson,
      };
    }
    case "email": {
      const emailChanged = updatedPerson.changeEmail(updateData);
      await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);
      if (emailChanged) {
        return {
          Status: "Update email Succssed",
          info: updatedPerson,
        };
      } else {
        return {
          Status: "Update email Failed",
          Reason: "Invalid Email",
        };
      }
    }
    case "adress": {
      updatedPerson.changeAdress(updateData);
      await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);
      return {
        Status: "Update adress Succssed",
        info: updatedPerson,
      };
    }
    case "gender": {
      updatedPerson.changeGender(updateData);
      await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);
      return {
        Status: "Update gender Succssed",
        info: updatedPerson,
      };
    }
    case "personPrivacy": {
      updatedPerson.changePersonPrivacy(updateData);
      await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);
      return {
        Status: "Update personPrivacy Succssed",
        info: updatedPerson,
      };
    }
  }
}

async function getPersonDocumentByHisPrivacy(userName) {
  if (!userName) {
    return {
      Status: "Add UpdateExistUserDetails Failed",
      Reason: "Missing input, userName",
    };
  }
  const userDocument = await MongoDBManager.IsuserNameExist(userName);
  if (userDocument) {
    if (userDocument.personPrivacy == "False") {
      return {
        Status: "userName exist and not private",
        info: userDocument,
      };
    } else {
      return {
        Status: "Failed",
        Reason: "userName is private",
      };
    }
  } else {
    return {
      Status: "Failed",
      Reason: "userName not found",
    };
  }
}

async function LikeFloorPlanByUserName(
  userNameThatAskToLike,
  userNameThatWeWantToLike,
  floorPlanIndex
) {
  if (!userNameThatAskToLike) {
    return {
      Status: "Like Failed",
      Reason: "Missing input, userNameThatAskToLike",
    };
  }
  if (!userNameThatWeWantToLike) {
    return {
      Status: "Like Failed",
      Reason: "Missing input, userNameThatWeWantToLike",
    };
  }
  if (floorPlanIndex === undefined) {
    return {
      Status: "Like Failed",
      Reason: "Missing input, floorPlanIndex",
    };
  }

  let user = await MongoDBManager.IsuserNameExist(userNameThatWeWantToLike);
  await MongoDBManager.DeleteExistPersonFromDB(userNameThatWeWantToLike);
  const updatedPerson = createPersonFromDBDocument(user);
  const LikeSuccssed = updatedPerson.LikeFloorPlanByIndex(
    userNameThatAskToLike,
    floorPlanIndex
  );
  await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);

  if (LikeSuccssed) {
    return { Status: "Like succssed", personWhoGotLikeInfo: updatedPerson };
  } else {
    return {
      Status: "Like Failed",
      Reason:
        "userName already liked that flooplan or no floorPlan in that with that index",
    };
  }
}

async function DislikeFloorPlanByUserName(
  userNameThatAskToDislike,
  userNameThatWeWantToDislike,
  floorPlanIndex
) {
  if (!userNameThatAskToDislike) {
    return {
      Status: "Like Failed",
      Reason: "Missing input, userNameThatAskToDislike",
    };
  }
  if (!userNameThatWeWantToDislike) {
    return {
      Status: "Like Failed",
      Reason: "Missing input, userNameThatWeWantToDislike",
    };
  }
  if (floorPlanIndex === undefined) {
    return {
      Status: "Like Failed",
      Reason: "Missing input, floorPlanIndex",
    };
  }

  let user = await MongoDBManager.IsuserNameExist(userNameThatWeWantToDislike);
  await MongoDBManager.DeleteExistPersonFromDB(userNameThatWeWantToDislike);
  const updatedPerson = createPersonFromDBDocument(user);
  const DislikeSuccssed = updatedPerson.DisLikeFloorPlanByIndex(
    userNameThatAskToDislike,
    floorPlanIndex
  );
  await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);

  if (DislikeSuccssed) {
    return {
      Status: "Dislike succssed",
      personWhoGotDislikeInfo: updatedPerson,
    };
  } else {
    return {
      Status: "Dislike Failed",
      Reason:
        "userName already Dislike that flooplan or no floorPlan in that with that index",
    };
  }
}

async function CommentFloorPlanByUserName(
  userNameThatAskToComment,
  theComment,
  userNameThatWeWantToComment,
  floorPlanIndex
) {
  if (!userNameThatAskToComment) {
    return {
      Status: "Comment Failed",
      Reason: "Missing input, userNameThatAskToComment",
    };
  }
  if (theComment === undefined) {
    return {
      Status: "Comment Failed",
      Reason: "Missing input, theComment",
    };
  }
  if (!userNameThatWeWantToComment) {
    return {
      Status: "Comment Failed",
      Reason: "Missing input, userNameThatWeWantToComment",
    };
  }
  if (floorPlanIndex === undefined) {
    return {
      Status: "Comment Failed",
      Reason: "Missing input, floorPlanIndex",
    };
  }
  let user = await MongoDBManager.IsuserNameExist(userNameThatWeWantToComment);
  await MongoDBManager.DeleteExistPersonFromDB(userNameThatWeWantToComment);
  const updatedPerson = createPersonFromDBDocument(user);
  const CommentSuccssed = updatedPerson.CommentOnFloorPlanByIndex(
    userNameThatAskToComment,
    theComment,
    floorPlanIndex
  );
  await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);

  if (CommentSuccssed) {
    return {
      Status: "Comment succssed",
      personWhoGotNewComment: updatedPerson,
    };
  } else {
    return {
      Status: "Comment Failed",
      Reason: "no floorPlan in that with that index",
    };
  }
}

async function GetAllPublicUsers() {
  let documnetArray =
    await MongoDBManager.GetAllDocumentsFromsignedUsersCollection();
  return {
    publicUsersArray: documnetArray,
    arrayLength: documnetArray.length,
  };
}

async function DeleteAllFurnituresOfCertainFloorPlanIndexForExistCertainUserName(
  userName,
  floorPlanIndex
) {
  let user = await MongoDBManager.IsuserNameExist(userName);
  console.log(user);
  await MongoDBManager.DeleteExistPersonFromDB(userName);

  const updatedPerson = createPersonFromDBDocument(user);

  const DeleteSuccssed =
    updatedPerson.DeleteAllFurnitureOfCertainFloorPlanIndex(floorPlanIndex);
  await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);

  if (DeleteSuccssed) {
    return { Status: "Delete all furniture succssed", userInfo: updatedPerson };
  } else {
    return {
      Status: "Delete all furniture Failed",
      Reason: `Cant found floorPlan for (userName: ${userName}) with that index `,
    };
  }
}

async function EditFurnitureArrayOfCertainFloorPlanIndexOfExistUsername(
  userName,
  floorPlanIndex,
  newFurnituresArray
) {
  let user = await MongoDBManager.IsuserNameExist(userName);
  console.log(user);
  await MongoDBManager.DeleteExistPersonFromDB(userName);
  const updatedPerson = createPersonFromDBDocument(user);
  if (
    floorPlanIndex <= updatedPerson.ForPlanArray.length - 1 &&
    floorPlanIndex >= 0
  ) {
    updatedPerson.ForPlanArray[floorPlanIndex].changeFurnitureArray(
      newFurnituresArray
    );
    await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);
    return { Status: "Delete furniture succssed", userInfo: updatedPerson };
  } else {
    await MongoDBManager.CreateNewPersonInDataBase(updatedPerson);
    return {
      Status: "Delete furniture Failed",
      Reason: `Cant found floorPlan for (userName: ${userName}) with that index `,
    };
  }
}
///////////////////////////////// Exports //////////////////////////

module.exports = {
  SignUp: SignUp,
  Login: Login,
  DeletingAccount: DeletingAccount,
  ChangePassword: ChangePassword,
  addNewForPlanForExistUser: addNewForPlanForExistUser,
  DeleteForPlanByIndexForExistUser: DeleteForPlanByIndexForExistUser,
  ConnectToMongoDB: ConnectToMongoDB,
  AddNewFurnitureManuallyWithoutPhotoToCertainIndexForPlanForCertainExistUser:
    AddNewFurnitureManuallyWithoutPhotoToCertainIndexForPlanForCertainExistUser,
  DeleteFurnitureByIndexOfCertainIndexFloorplanForExistUser:
    DeleteFurnitureByIndexOfCertainIndexFloorplanForExistUser,
  AddNewFurnitureWithPhotoToCertainIndexForPlanForCertainExistUser:
    AddNewFurnitureWithPhotoToCertainIndexForPlanForCertainExistUser,
  ChangeFurnitureTypeByFurnitureIndexAndFloorPlanIndexOfExistUser:
    ChangeFurnitureTypeByFurnitureIndexAndFloorPlanIndexOfExistUser,
  UpdateExistUserDetail: UpdateExistUserDetail,
  getPersonDocumentByHisPrivacy: getPersonDocumentByHisPrivacy,
  LikeFloorPlanByUserName: LikeFloorPlanByUserName,
  DislikeFloorPlanByUserName: DislikeFloorPlanByUserName,
  UpdateUser: UpdateUser,
  GetAllPublicUsers: GetAllPublicUsers,
  DeleteAllFurnituresOfCertainFloorPlanIndexForExistCertainUserName:
    DeleteAllFurnituresOfCertainFloorPlanIndexForExistCertainUserName,
  EditFurnitureArrayOfCertainFloorPlanIndexOfExistUsername:
    EditFurnitureArrayOfCertainFloorPlanIndexOfExistUsername,
  CommentFloorPlanByUserName: CommentFloorPlanByUserName,
};
